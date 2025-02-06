<?php
include 'db_connect.php';

$bid_amount = $_POST['bid_amount'];
$player_id = $_POST['player_id'];
$team_id = $_POST['team_id'];

$sql = "UPDATE Players SET sold_price = ?, sold_to = ? WHERE player_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("dii", $bid_amount, $team_id, $player_id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Bid placed successfully!']);
} else {
    echo json_encode(['message' => 'Error placing bid.']);
}

$stmt->close();
$conn->close();
?>
