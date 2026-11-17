const { execSync } = require('child_process');

function execSql(sqlQuery) {
  // Base64 encode the query to avoid any quoting/escaping problems in PowerShell
  const b64 = Buffer.from(sqlQuery, 'utf-8').toString('base64');
  const psScript = `
    $connStr = 'Server=DESKTOP-6Q3P8HQ;Database=thepetalmuse;Integrated Security=True;TrustServerCertificate=True;'
    $conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
    $conn.Open()
    $cmd = $conn.CreateCommand()
    $sqlBytes = [System.Convert]::FromBase64String('${b64}')
    $cmd.CommandText = [System.Text.Encoding]::UTF8.GetString($sqlBytes)
    $da = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
    $dt = New-Object System.Data.DataTable
    $da.Fill($dt) | Out-Null
    $conn.Close()
    $dt | ConvertTo-Json -Depth 5
  `;
  const psB64 = Buffer.from(psScript, 'utf16le').toString('base64');
  const out = execSync(`powershell -NoProfile -EncodedCommand ${psB64}`, { encoding: 'utf-8' });
  return JSON.parse(out.trim() || '[]');
}

try {
  const cats = execSql('EXEC sp_GetCategories');
  console.log('Categories count:', cats.length);
  console.log('First category:', cats[0]?.Name);
} catch (e) {
  console.error('Error:', e.message);
}

