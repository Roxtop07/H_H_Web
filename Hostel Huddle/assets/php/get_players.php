<?php
include 'db_connect.php';
$sql = "SELECT * FROM Players WHERE sold_price = 0";
$result = $conn->query($sql);
$players = [];
while ($row = $result->fetch_assoc()) {
    $players[] = $row;
}
echo json_encode($players);
$conn->close();
?>