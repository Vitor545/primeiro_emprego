# Deploy e atualização

Runbook de operação da plataforma Primeiro Emprego no cluster Kubernetes.

## Ambiente

| Item | Valor |
| --- | --- |
| Cluster | microk8s v1.28, nó único `srv1387219` (`76.13.168.104`) |
| Kubeconfig | `%APPDATA%\Lens\kubeconfigs\517dceb2-7e70-43e4-99e5-26caf68cd18f-pasted-kubeconfig.yaml` |
| Namespace | `primeiro-emprego` |
| Registry | `docker.vitorsouzadasilva.tech/vitorsouzadasilva` (sem autenticação) |
| Imagens | `primeiro-emprego-api:<versão>` e `primeiro-emprego-web:<versão>` |
| Host público | `emprego.vitorsouzadasilva.tech` (`/` → web, `/api` → api) |
| Banco | `postgres-postgresql.banco.svc.cluster.local:5432`, base `primeiro-emprego` |
| TLS | cert-manager, ClusterIssuer `cluster-issuer`, desafio HTTP-01 |
| Manifests | `k8s/` |

Pré-requisitos na máquina que faz o deploy: Docker em execução e `kubectl` no PATH (ambos vêm com o
Docker Desktop).

---

## Atualização de versão (caminho padrão)

O projeto usa versionamento semântico na tag da imagem. **Nunca reutilize uma tag já publicada**: o
cluster usa `imagePullPolicy: IfNotPresent` e continuaria rodando a imagem antiga em cache.

### Com o script

```powershell
.\scripts\deploy.ps1 -Version 1.1.0                # api + web
.\scripts\deploy.ps1 -Version 1.1.1 -Component api # só a API
.\scripts\deploy.ps1 -Version 1.2.0 -DryRun        # mostra os passos sem executar
```

O script constrói, publica, troca a imagem do deployment, aguarda o rollout e verifica `/api/health`.

### Manualmente

```powershell
$env:KUBECONFIG = "$env:APPDATA\Lens\kubeconfigs\517dceb2-7e70-43e4-99e5-26caf68cd18f-pasted-kubeconfig.yaml"
$v = "1.1.0"
$reg = "docker.vitorsouzadasilva.tech/vitorsouzadasilva"

docker build -t "$reg/primeiro-emprego-api:$v" back-end
docker build -t "$reg/primeiro-emprego-web:$v" front-end
docker push "$reg/primeiro-emprego-api:$v"
docker push "$reg/primeiro-emprego-web:$v"

kubectl -n primeiro-emprego set image deploy/api api="$reg/primeiro-emprego-api:$v"
kubectl -n primeiro-emprego set image deploy/web web="$reg/primeiro-emprego-web:$v"
kubectl -n primeiro-emprego rollout status deploy/api
kubectl -n primeiro-emprego rollout status deploy/web
```

Depois de publicar, atualize a tag em `k8s/10-api-deployment.yaml` e `k8s/20-web-deployment.yaml` e
faça commit, para que os manifests reflitam o que está rodando.

### Conferência pós-deploy

```powershell
kubectl -n primeiro-emprego get pods
kubectl -n primeiro-emprego logs deploy/api --tail=30
curl https://emprego.vitorsouzadasilva.tech/api/health
```

Enquanto o DNS não existir, teste pelo IP do nó forçando o cabeçalho `Host`:

```powershell
Invoke-WebRequest -Uri "http://76.13.168.104/api/health" -Headers @{ Host = "emprego.vitorsouzadasilva.tech" } -UseBasicParsing
```

---

## Rollback

```powershell
kubectl -n primeiro-emprego rollout undo deploy/api          # volta uma versão
kubectl -n primeiro-emprego rollout history deploy/api       # lista as revisões
kubectl -n primeiro-emprego rollout undo deploy/api --to-revision=3
```

O rollback desfaz apenas a imagem e a configuração do pod. **Alterações já aplicadas no banco não são
revertidas** — veja a seção de migrações.

---

## Variáveis de ambiente e segredos

Valores não sensíveis (porta, `CORS_ORIGIN`, `OPENAI_MODEL`, `S3_ENDPOINT`, `S3_BUCKET`, `S3_REGION`)
ficam no próprio `k8s/10-api-deployment.yaml`. Alterar e aplicar:

```powershell
kubectl apply -f k8s\10-api-deployment.yaml
```

Valores sensíveis ficam no Secret `api-secrets` (`DATABASE_URL`, `JWT_SECRET`, `OPENAI_API_KEY`,
`S3_ACCESS_KEY`, `S3_SECRET_KEY`). Para trocar:

```powershell
kubectl -n primeiro-emprego create secret generic api-secrets `
  --from-literal=DATABASE_URL='postgres://usuario:senha@postgres-postgresql.banco.svc.cluster.local:5432/primeiro-emprego?sslmode=disable' `
  --from-literal=JWT_SECRET='...' `
  --from-literal=OPENAI_API_KEY='...' `
  --from-literal=S3_ACCESS_KEY='...' `
  --from-literal=S3_SECRET_KEY='...' `
  --dry-run=client -o yaml | kubectl apply -f -

kubectl -n primeiro-emprego rollout restart deploy/api
```

O `rollout restart` é obrigatório: o pod só lê o Secret na inicialização.

Trocar o `JWT_SECRET` invalida todas as sessões ativas — os usuários precisam entrar de novo.

O arquivo `k8s/secret.yaml` está no `.gitignore`; credenciais reais nunca devem ir para o
repositório. O modelo com placeholders é o `k8s/secret.example.yaml`.

---

## Migrações de banco

As migrações são idempotentes e rodam sozinhas quando a API sobe (`applyMigrations` em
`src/server.ts`). Na prática, publicar uma nova versão já aplica o esquema novo.

Consequências a considerar antes de publicar:

- Como há **1 réplica**, o pod novo sobe, roda as migrações e só então recebe tráfego. Durante a
  troca há alguns segundos de indisponibilidade.
- Migrações destrutivas (remover coluna, renomear tabela) quebram o rollback. Prefira mudanças
  aditivas: criar a coluna nova, publicar o código que a usa e só remover a antiga em uma versão
  posterior.

Rodar as migrações fora do deploy, se necessário:

```powershell
kubectl -n primeiro-emprego exec deploy/api -- node dist/database/migrate.js
```

Acessar o banco direto (via NodePort, de fora do cluster):

```powershell
psql "postgres://usuario:senha@76.13.168.104:30032/primeiro-emprego?sslmode=disable"
```

Backup antes de mudanças arriscadas:

```powershell
kubectl -n banco exec postgres-postgresql-0 -- pg_dump -U usuario primeiro-emprego > backup.sql
```

---

## Mudar o domínio

1. Criar o registro DNS do tipo A apontando para `76.13.168.104`.
2. Trocar o host em `k8s/30-ingress.yaml` (campos `spec.tls[0].hosts` e `spec.rules[0].host`).
3. Trocar `CORS_ORIGIN` em `k8s/10-api-deployment.yaml`.
4. Aplicar e acompanhar a emissão do certificado:

```powershell
kubectl apply -f k8s\30-ingress.yaml -f k8s\10-api-deployment.yaml
kubectl -n primeiro-emprego get certificate -w
```

O front **não** precisa ser recompilado: ele chama a API pelo caminho relativo `/api`, no mesmo host.

---

## Escalar

```powershell
kubectl -n primeiro-emprego scale deploy/web --replicas=2
kubectl -n primeiro-emprego scale deploy/api --replicas=2
```

O `web` escala sem ressalvas. O `api` também é sem estado (sessão por JWT, arquivos no S3, dados no
Postgres), mas com mais de uma réplica duas instâncias podem tentar aplicar as migrações ao mesmo
tempo na subida; como os comandos usam `IF NOT EXISTS`, o risco é baixo, ainda assim prefira escalar
depois que o rollout terminar.

---

## Problemas comuns

| Sintoma | Causa provável | O que fazer |
| --- | --- | --- |
| `ImagePullBackOff` | Tag inexistente no registry ou erro de digitação | `curl https://docker.vitorsouzadasilva.tech/v2/vitorsouzadasilva/primeiro-emprego-api/tags/list` |
| `CreateContainerConfigError` | Chave faltando no Secret, ou `runAsNonRoot` sem UID numérico | `kubectl -n primeiro-emprego describe pod -l app.kubernetes.io/component=api` |
| `CrashLoopBackOff` na API | `DATABASE_URL` inválida ou banco inacessível | `kubectl -n primeiro-emprego logs deploy/api --previous` |
| 502 no `/api` | Pod da API fora do ar ou probe falhando | `kubectl -n primeiro-emprego get pods` e checar o `readinessProbe` |
| 404 ao recarregar uma rota do front | `try_files` do nginx alterado | Conferir `front-end/nginx.conf` |
| Certificado preso em `False` | DNS não resolve para `76.13.168.104` | `kubectl -n primeiro-emprego describe order` e corrigir o DNS |
| Deploy "não pegou" a alteração | Tag reutilizada com `IfNotPresent` | Publicar com uma tag nova |
| IA responde 502 | Chave da OpenAI recusada | Trocar `OPENAI_API_KEY` no Secret e reiniciar |
| Upload responde 502 | Credencial S3 recusada (`SignatureDoesNotMatch`) | Trocar `S3_ACCESS_KEY`/`S3_SECRET_KEY`; se persistir, verificar se o proxy à frente do SeaweedFS preserva o header `Host` |

---

## Recriar tudo do zero

Se o namespace for perdido:

```powershell
kubectl apply -f k8s\00-namespace.yaml
# recriar o Secret (seção "Variáveis de ambiente e segredos")
kubectl apply -f k8s\
kubectl -n primeiro-emprego rollout status deploy/api
```

Os dados sobrevivem: ficam no Postgres do namespace `banco` e no SeaweedFS, fora deste namespace.

---

## Seguranca

O repositorio e publico. Regras que valem sempre:

- **Nenhuma credencial no repositorio.** Os `.env` estao no `.gitignore` e os `.env.example` trazem
  apenas campos vazios — nunca preencha um `.env.example` com valor real, nem mesmo de exemplo:
  alguem pode acabar subindo esse valor para producao.
- **Segredos so vivem no Secret do cluster.** Gere cada um com valor aleatorio proprio:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

- **Rotacionar o `JWT_SECRET`** (invalida todas as sessoes ativas):

```powershell
$tmp = Join-Path $env:TEMP "jwt.json"
$bytes = New-Object byte[] 48
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
$novo = ($bytes | ForEach-Object { $_.ToString('x2') }) -join ''
@{ stringData = @{ JWT_SECRET = $novo } } | ConvertTo-Json | Set-Content $tmp -Encoding utf8
kubectl -n primeiro-emprego patch secret api-secrets --patch-file $tmp
Remove-Item $tmp -Force
kubectl -n primeiro-emprego rollout restart deploy/api
```

Use `--patch-file`: passar o JSON direto em `--patch` quebra no PowerShell por causa das aspas.

### Pendencias de infraestrutura conhecidas

Nao sao causadas pelo repositorio ser publico, mas ficam mais faceis de encontrar por causa dele:

| Risco | Situacao | Mitigacao sugerida |
| --- | --- | --- |
| Registry aceita push anonimo | `docker push` funciona sem `docker login`; qualquer um pode sobrescrever uma tag existente | Proteger o ingress do registry com autenticacao basica (`nginx.ingress.kubernetes.io/auth-type`) |
| Postgres exposto na internet | NodePort `30032` alcancavel de fora; so a senha protege | Restringir por firewall ao IP dos integrantes, ou trocar o Service para ClusterIP e acessar por `kubectl port-forward` |
| Uso de IA sem cota | Qualquer conta cadastrada pode disparar chamadas ilimitadas a API paga | Limite diario por usuario usando a tabela `ai_interactions` |

---

## Checklist de release

- [ ] `npm run typecheck` e `npm run lint` passando nos dois projetos
- [ ] `npm run build` do front sem erros
- [ ] Versão nova definida (não reaproveitar tag)
- [ ] `.\scripts\deploy.ps1 -Version <nova>`
- [ ] `kubectl -n primeiro-emprego get pods` com tudo `Running`
- [ ] `/api/health` respondendo e login funcionando
- [ ] Tags atualizadas nos manifests e commit feito
