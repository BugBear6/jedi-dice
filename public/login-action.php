<?php
    session_start();
    if ($_POST['username'] == 'jedi' && $_POST['password'] == 'jedi') {
        $_SESSION['logged'] = true;
    }
    header("Location: ./?v=30");
?>