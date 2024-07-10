<?php
session_start();
require 'db.php'; // Make sure this file contains your database connection

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form data
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['conform_password'];

    // Basic validation
    if ($password != $confirm_password) {
        echo "Passwords do not match!";
        exit();
    }

    // Hash the new password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Update password in the database
    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
    $stmt->bind_param('ss', $hashed_password, $email);

    if ($stmt->execute()) {
        // Redirect to login page with a success message
        $_SESSION['message'] = "Password reset successfully!";
        header("Location: login.php");
        exit();
    } else {
        echo "Error updating password: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>
