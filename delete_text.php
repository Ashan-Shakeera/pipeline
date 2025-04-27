<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? 0;

    $stmt = $conn->prepare("DELETE FROM texts WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Text deleted successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete text']);
    }

    $stmt->close();
}
?>
