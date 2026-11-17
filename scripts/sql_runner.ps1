param (
    [string]$QueryFile,
    [string]$QueryText
)

$connStr = 'Server=DESKTOP-6Q3P8HQ;Database=thepetalmuse;Integrated Security=True;TrustServerCertificate=True;'

if ($QueryText) {
    $sql = $QueryText
} elseif ($QueryFile) {
    $sql = Get-Content -Path $QueryFile -Raw -Encoding UTF8
} else {
    Write-Error "Either QueryFile or QueryText must be supplied."
    exit 1
}

$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
try {
    $conn.Open()
    $batches = $sql -split "(?m)^\s*GO\s*$"
    $lastDs = $null

    foreach ($batch in $batches) {
        $trimmed = $batch.Trim()
        if ($trimmed.Length -eq 0) { continue }

        $cmd = $conn.CreateCommand()
        $cmd.CommandText = $trimmed
        $cmd.CommandTimeout = 60
        $da = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
        $ds = New-Object System.Data.DataSet
        $da.Fill($ds) | Out-Null
        $lastDs = $ds
    }
    
    if ($lastDs -ne $null -and $lastDs.Tables.Count -gt 0) {
        $dt = $lastDs.Tables[0]
        $rows = [System.Collections.ArrayList]::new()
        foreach ($r in $dt.Rows) {
            $ht = [ordered]@{}
            foreach ($c in $dt.Columns) {
                $val = $r[$c]
                if ($val -is [System.DBNull]) {
                    $ht[$c.ColumnName] = $null
                } else {
                    $ht[$c.ColumnName] = $val
                }
            }
            $null = $rows.Add([pscustomobject]$ht)
        }
        $json = $rows | ConvertTo-Json -Compress
        Write-Output $json
    } else {
        Write-Output "[]"
    }
} catch {
    Write-Error $_.Exception.Message
    exit 1
} finally {
    $conn.Close()
}
