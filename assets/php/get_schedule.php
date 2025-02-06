<?php
include 'db_connect.php';
$sql = "SELECT m.match_date, m.match_time, t1.team_name AS team1_name, t2.team_name AS team2_name, m.venue
        FROM Match_Results m
        JOIN Teams t1 ON m.team1_id = t1.team_id
        JOIN Teams t2 ON m.team2_id = t2.team_id
        ORDER BY m.match_date ASC";
$result = $conn->query($sql);
$matches = [];
while ($row = $result->fetch_assoc()) {
    $matches[] = $row;
}
echo json_encode($matches);
$conn->close();
?>