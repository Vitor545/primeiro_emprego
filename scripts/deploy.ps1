<#
.SYNOPSIS
  Publica uma nova versao da plataforma Primeiro Emprego no cluster Kubernetes.

.EXAMPLE
  .\scripts\deploy.ps1 -Version 1.1.0
  .\scripts\deploy.ps1 -Version 1.1.1 -Component api
  .\scripts\deploy.ps1 -Version 1.2.0 -DryRun
#>
param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^\d+\.\d+\.\d+$')]
  [string]$Version,

  [ValidateSet('all', 'api', 'web')]
  [string]$Component = 'all',

  [string]$Kubeconfig = "$env:APPDATA\Lens\kubeconfigs\517dceb2-7e70-43e4-99e5-26caf68cd18f-pasted-kubeconfig.yaml",

  [string]$Namespace = 'primeiro-emprego',

  [string]$Registry = 'docker.vitorsouzadasilva.tech/vitorsouzadasilva',

  [switch]$SkipBuild,
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot

$targets = @(
  @{ Name = 'api'; Path = "$root\back-end"; Image = "$Registry/primeiro-emprego-api:$Version" }
  @{ Name = 'web'; Path = "$root\front-end"; Image = "$Registry/primeiro-emprego-web:$Version" }
) | Where-Object { $Component -eq 'all' -or $_.Name -eq $Component }

function Invoke-Step {
  param([string]$Label, [scriptblock]$Action)

  Write-Host "`n==> $Label" -ForegroundColor Cyan
  if ($DryRun) { Write-Host "    (dry-run: nao executado)" -ForegroundColor DarkGray; return }

  & $Action
  if ($LASTEXITCODE -ne 0) { throw "Falhou: $Label (exit $LASTEXITCODE)" }
}

if (-not (Test-Path $Kubeconfig)) { throw "Kubeconfig nao encontrado: $Kubeconfig" }
$env:KUBECONFIG = $Kubeconfig

Write-Host "Versao......: $Version"
Write-Host "Componentes.: $($targets.Name -join ', ')"
Write-Host "Namespace...: $Namespace"
if ($DryRun) { Write-Host "MODO DRY-RUN: nada sera alterado" -ForegroundColor Yellow }

foreach ($target in $targets) {
  if (-not $SkipBuild) {
    Invoke-Step "build $($target.Name) -> $($target.Image)" {
      docker build -t $target.Image $target.Path
    }.GetNewClosure()

    Invoke-Step "push $($target.Name)" {
      docker push $target.Image
    }.GetNewClosure()
  }

  Invoke-Step "atualiza deploy/$($target.Name)" {
    kubectl -n $Namespace set image "deploy/$($target.Name)" "$($target.Name)=$($target.Image)"
  }.GetNewClosure()

  Invoke-Step "aguarda rollout de $($target.Name)" {
    kubectl -n $Namespace rollout status "deploy/$($target.Name)" --timeout=300s
  }.GetNewClosure()
}

if (-not $DryRun) {
  Write-Host "`n==> Verificacao" -ForegroundColor Cyan
  kubectl -n $Namespace get pods

  $headers = @{ Host = 'emprego.vitorsouzadasilva.tech' }
  try {
    $health = Invoke-WebRequest -Uri 'https://emprego.vitorsouzadasilva.tech/api/health' -UseBasicParsing -TimeoutSec 20
    Write-Host "health: $($health.StatusCode) $($health.Content)" -ForegroundColor Green
  } catch {
    Write-Host "health pelo dominio falhou ($($_.Exception.Message)); tentando pelo IP do no" -ForegroundColor Yellow
    try {
      $health = Invoke-WebRequest -Uri 'http://76.13.168.104/api/health' -Headers $headers -UseBasicParsing -TimeoutSec 20
      Write-Host "health: $($health.StatusCode) $($health.Content)" -ForegroundColor Green
    } catch {
      Write-Host "health indisponivel: $($_.Exception.Message)" -ForegroundColor Red
    }
  }
}

Write-Host "`nConcluido." -ForegroundColor Green
