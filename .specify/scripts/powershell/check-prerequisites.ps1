<#
.SYNOPSIS
    speckit 사전 조건 확인 스크립트
.DESCRIPTION
    현재 활성 피처 디렉터리 및 사용 가능한 문서 목록을 반환한다.
.PARAMETER Json
    JSON 형식으로 출력
.PARAMETER PathsOnly
    경로 정보만 출력 (최소 페이로드)
.PARAMETER RequireTasks
    tasks.md 존재를 필수 조건으로 검증
.PARAMETER IncludeTasks
    출력에 tasks.md 경로 포함
#>
param(
    [switch]$Json,
    [switch]$PathsOnly,
    [switch]$RequireTasks,
    [switch]$IncludeTasks
)

$ErrorActionPreference = "Stop"

# 피처 설정 파일 경로
$featureJsonPath = Join-Path $PSScriptRoot "..\..\feature.json"
$repoRoot = Join-Path $PSScriptRoot "..\..\.."

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

# 사용 가능한 문서 목록 탐색
$availableDocs = @()
$docFiles = @("spec.md", "plan.md", "tasks.md", "data-model.md", "research.md", "quickstart.md")

foreach ($doc in $docFiles) {
    $docPath = Join-Path $featureDir $doc
    if (Test-Path $docPath) {
        $availableDocs += $doc
    }
}

# tasks.md 필수 검증
if ($RequireTasks) {
    $tasksPath = Join-Path $featureDir "tasks.md"
    if (-not (Test-Path $tasksPath)) {
        Write-Error "tasks.md를 찾을 수 없습니다. '/speckit.tasks'를 먼저 실행하세요."
        exit 1
    }
}

# 결과 구성
$result = @{
    FEATURE_DIR    = $featureDir
    FEATURE_SPEC   = Join-Path $featureDir "spec.md"
    IMPL_PLAN      = Join-Path $featureDir "plan.md"
    AVAILABLE_DOCS = $availableDocs
}

if ($IncludeTasks) {
    $result["TASKS"] = Join-Path $featureDir "tasks.md"
}

# 출력
if ($Json) {
    $result | ConvertTo-Json -Depth 3
} else {
    foreach ($key in $result.Keys) {
        Write-Output "${key}: $($result[$key])"
    }
}