<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "it_club";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO applicants (name, id_number, birthday, email, number, whatsapp_number, programming_language, interests, expertise, motivation, rules) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssssssi", $name, $id_number, $birthday, $email, $number, $whatsapp_number, $programming_language, $interests, $expertise, $motivation, $rules);

// Set parameters and execute
$name = $_POST['name'];
$id_number = $_POST['id_number'];
$birthday = $_POST['birthday'];
$email = $_POST['email'];
$number = $_POST['number'];
$whatsapp_number = $_POST['whatsapp_number'];
$programming_language = $_POST['programming_language'];
$interests = implode(", ", $_POST['interests']);
$expertise = $_POST['expertise'];
$motivation = $_POST['motivation'];
$rules = isset($_POST['rules']) ? 1 : 0;

$stmt->execute();

echo "New record created successfully";

$stmt->close();
$conn->close();
?>
