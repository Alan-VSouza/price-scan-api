<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $mensagem = $_POST['mensagem'];

    $destinatario = "simplifysuporte@gmail.com";
    $assunto = "Nova mensagem de contato - SIMPLIFY";
    $corpo = "Nome: $nome\nE-mail: $email\n\nMensagem:\n$mensagem";

    $cabecalhos = "From: $email\r\nReply-To: $email\r\n";

    if (mail($destinatario, $assunto, $corpo, $cabecalhos)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
