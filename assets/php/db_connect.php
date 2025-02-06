<?php
$server = "localhost";
$username = "root"; // Default user in XAMPP
$password = ""; // No password by default
$database = "Hostel_Huddle"; 

$conn = new mysqli($server, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Database connected successfully!";
}
?>
