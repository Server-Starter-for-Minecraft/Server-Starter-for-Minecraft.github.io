# 撮影用に起動した ServerStarter2 のウィンドウを復元して前面に出す
# （最小化・背面化されていると Chromium が描画せず，スクリーンショットがハングするため）
# usage: powershell -NoProfile -ExecutionPolicy Bypass -File restore-window.ps1 -CloneRoot Q:\ss2
param([Parameter(Mandatory = $true)][string]$CloneRoot)

Add-Type -Name W -Namespace U -MemberDefinition @'
[DllImport("user32.dll")] public static extern bool ShowWindow(System.IntPtr h, int c);
[DllImport("user32.dll")] public static extern bool SetForegroundWindow(System.IntPtr h);
'@
Get-Process electron -ErrorAction SilentlyContinue |
  Where-Object { $_.MainWindowHandle -ne 0 -and $_.Path -like "$CloneRoot*" } |
  ForEach-Object {
    [U.W]::ShowWindow($_.MainWindowHandle, 9) | Out-Null   # SW_RESTORE
    [U.W]::SetForegroundWindow($_.MainWindowHandle) | Out-Null
    $_.MainWindowTitle
  }
