<?php
include 'db_connect.php';
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="teams.csv"');
$output = fopen('php://output', 'w');
fputcsv($output, ['Team ID', 'Team Name', 'Total Points', 'Wins', 'Losses', 'Draws']);
$sql = "SELECT * FROM Teams";
$result = $conn->query($sql);
while ($row = $result->fetch_assoc()) {
    fputcsv($output, $row);
}
fclose($output);
$conn->close();
?>