<?php
include 'db_connect.php';

// Here, you would perform actions to close the auction, like marking all players as "sold"
$sql = "UPDATE Players SET sold_price = base_price WHERE sold_price = 0";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['message' => 'Auction closed successfully!']);
} else {
    echo json_encode(['message' => 'Error closing auction.']);
}

$conn->close();
?>
