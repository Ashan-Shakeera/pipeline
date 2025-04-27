<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $content = $_POST['content'] ?? '';

    if (empty(trim($content))) {
        echo json_encode(['status' => 'error', 'message' => 'Content is empty']);
        exit;
    }

    // Calculations
    $char_count = strlen($content);
    $char_no_spaces = strlen(str_replace(' ', '', $content));
    $word_count = str_word_count($content);
    $sentence_count = preg_match_all('/[.!?]/', $content, $matches);
    $paragraph_count = substr_count(trim($content), "\n") + 1;

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO texts (content, char_count, char_no_spaces, word_count, sentence_count, paragraph_count) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("siiiii", $content, $char_count, $char_no_spaces, $word_count, $sentence_count, $paragraph_count);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Text saved successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save text']);
    }

    $stmt->close();
}
?>
