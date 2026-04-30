<#
.SYNOPSIS
    speckit 계획 수립 설정 스크립트
.DESCRIPTION
    계획 수립에 필요한 경로 정보를 반환하고 plan.md 파일을 초기화한다.
.PARAMETER Json
    JSON 형식으로 출력
#>
param(
    [switch]$Json
)

$ErrorActionPreference = "Stop"

# 경로 설정
$featureJsonPath = Join-Path $PSScriptRoot "..\..\feature.json"
$repoRoot = Join-Path $PSScriptRoot "..\..\.."
$planTemplatePath = Join-Path $PSScriptRoot "..\..\templates\plan-template.md"

# feature.json 로드
if (-not (Test-Path $featureJsonPath)) {
    Write-Error "feature.json을 찾을 수 없습니다. '/speckit.specify'를 먼저 실행하세요."
    exit 1
}

$featureConfig = Get-Content $featureJsonPath -Raw | ConvertFrom-Json
$featureDir = Join-Path $repoRoot $featureConfig.feature_directory

if (-not (Test-Path $featureDir)) {
    Write-Error "피처 디렉터리를 찾을 수 없습니다: $featureDir"
    exit 1
}

$specPath = Join-Path $featureDir "spec.md"
if (-not (Test-Path $specPath)) {
    Write-Error "spec.md를 찾을 수 없습니다. '/speckit.specify'를 먼저 실행하세요."
    exit 1
}

$implPlanPath = Join-Path $featureDir "plan.md"

# plan.md가 없으면 템플릿에서 복사
if (-not (Test-Path $implPlanPath) -and (Test-Path $planTemplatePath)) {
    Copy-Item $planTemplatePath $implPlanPath
}

# Git 브랜치 정보
$branch = "main"
try {
    $branch = git rev-parse --abbrev-ref HEAD 2>$null
    if (-not $branch) { $branch = "main" }
} catch {
    $branch = "main"
}

$result = @{
    FEATURE_SPEC = $specPath
    IMPL_PLAN    = $implPlanPath
    SPECS_DIR    = Join-Path $repoRoot "specs"
    BRANCH       = $branch
}

if ($Json) {
    $result | ConvertTo-Json -Depth 3
} else {
    foreach ($key in $result.Keys) {
        Write-Output "${key}: $($result[$key])"
    }
}