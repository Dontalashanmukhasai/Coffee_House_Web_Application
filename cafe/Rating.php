<?php
// Database connection details
$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password is empty
$dbname = "coffeee_house";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$rating = $_POST['option'];
$message = $_POST['message'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO reviews (name, rating, message) VALUES (?, ?, ?)");
$stmt->bind_param("sis", $name, $rating, $message);

// Execute the statement
if ($stmt->execute()) {
    // Redirect to the home page with a success message
    header("Location: home.html?success=true");
    exit();
} else {
    // Redirect to the home page with an error message
    header("Location: home.html?success=false");
    exit();
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
