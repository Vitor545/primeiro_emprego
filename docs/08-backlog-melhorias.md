# Backlog de melhorias e novas funcionalidades

Levantamento feito sobre o código entregue, após a migração para PostgreSQL e a inclusão dos recursos
de inteligência artificial e de armazenamento de arquivos. Serve de insumo para o item 7 (trabalhos
futuros) e para a continuidade do projeto.

## Já implementado nesta etapa

| Recurso | Descrição | Estado |
| --- | --- | --- |
| Banco PostgreSQL | Migração de SQLite local para PostgreSQL remoto via `DATABASE_URL`; migrações idempotentes na inicialização | Funcionando |
| Resumo profissional por IA | Gera o texto do resumo a partir dos dados do currículo, sem inventar experiências | Implementado; depende de chave válida |
| Aderência currículo × vaga | Compara o currículo com a descrição da vaga e devolve nota, palavras-chave presentes e ausentes e sugestões | Implementado; depende de chave válida |
| Carta de apresentação | Gera carta de até 220 palavras a partir do currículo e da vaga | Implementado; depende de chave válida |
| Treino de entrevista | Avalia a resposta do candidato pela técnica STAR, com nota, pontos fortes, melhorias e reescrita | Implementado; depende de chave válida |
| Histórico de interações de IA | Toda chamada é gravada em `ai_interactions` (entrada e saída), permitindo auditoria e retomada | Funcionando |
| Documentos do candidato | Upload, listagem, download por URL assinada (15 min) e exclusão em armazenamento S3/SeaweedFS | Implementado; depende de credencial válida |
| Degradação controlada | Sem `OPENAI_API_KEY` ou sem `S3_*`, as telas correspondentes informam indisponibilidade em vez de quebrar | Funcionando |

## Prioridade alta

1. **Validar as credenciais externas.** A chave da OpenAI retorna `invalid_api_key` (401) e o
   armazenamento retorna `SignatureDoesNotMatch` (403) em todas as operações, inclusive
   `ListBuckets`. Enquanto isso não for resolvido, quatro recursos de IA e o módulo de documentos
   ficam indisponíveis para o usuário final. No caso do S3, a causa provável é a credencial ou o
   proxy à frente do SeaweedFS alterando o cabeçalho `Host`, o que invalida a assinatura.
2. **Controle de custo e abuso da IA.** Hoje não há limite por usuário. Recomenda-se um teto diário
   de chamadas por conta (a tabela `ai_interactions` já permite contar) e registro do consumo de
   tokens retornado pelo provedor.
3. **Testes automatizados.** Não há suíte de testes. O mínimo viável seria testar o serviço de
   análise ATS e o cálculo das simulações, que são regras puras e de alto valor.
4. **Recuperação de senha.** O usuário que esquece a senha hoje não tem como recuperar o acesso.

## Prioridade média

5. **Importar currículo existente.** Aproveitar o upload já implementado para extrair o texto de um
   PDF e preencher o formulário automaticamente com apoio da IA — reduz drasticamente o atrito do
   primeiro uso.
6. **Histórico de evolução.** Guardar a nota ATS e os resultados das simulações ao longo do tempo e
   exibir a curva no painel, tornando o progresso visível além do percentual atual.
7. **Modelos de currículo.** Oferecer dois ou três layouts de impressão (cronológico, funcional e
   por competências) a partir do mesmo conteúdo.
8. **Simulações geradas por IA.** Gerar questões situacionais a partir da vaga informada pelo
   usuário, em vez de usar apenas o banco fixo de quinze questões.
9. **Trilha personalizada.** Usar a área de interesse e a análise de aderência para ordenar guias e
   simulações mais relevantes para cada candidato.
10. **Acessibilidade.** Revisar contraste, navegação por teclado e rótulos ARIA das telas, requisito
    relevante para o público-alvo do projeto.

## Prioridade baixa

11. **Publicação da plataforma.** Empacotar a API em contêiner e publicar interface e servidor, com
    variáveis de ambiente por ambiente.
12. **Área administrativa.** Cadastrar guias e simulações pela interface, sem alterar código.
13. **Divisão do pacote da interface.** O pacote de produção passa de 500 kB; carregar as páginas sob
    demanda reduziria o tempo de primeira carga.
14. **Exportar em DOCX.** Alguns processos seletivos ainda exigem o formato editável.
15. **Notificação por e-mail.** Lembrete de retomada para quem parou a trilha pela metade.

## Observação sobre o provedor de IA

A integração está isolada em um único arquivo (`back-end/src/modules/ai/ai.provider.ts`), que
encapsula o cliente e a tradução de erros. Trocar de provedor — por exemplo, passar a usar os modelos
Claude, da Anthropic — exige alterar apenas esse arquivo e a variável de ambiente correspondente; os
serviços, controladores e telas permanecem inalterados.
