<?php
include 'db_connect.php';

$team_id = $_POST['team_id'];
$points = $_POST['points'];

$sql = "UPDATE Teams SET total_points = total_points + ? WHERE team_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $points, $team_id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Points updated successfully!']);
} else {
    echo json_encode(['message' => 'Error updating points.']);
}

$stmt->close();
$conn->close();
?>
