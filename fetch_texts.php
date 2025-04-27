<?php
require 'db.php';

$sql = "SELECT * FROM texts ORDER BY created_at DESC";
$result = $conn->query($sql);

$texts = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $texts[] = $row;
    }
}

echo json_encode($texts);
?>
