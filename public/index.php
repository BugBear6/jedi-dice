<?php
session_start();
    if (isset($_SESSION['logged'])) {
        include('_index.html');
    } else {
        include('login.php');
    }
?>
