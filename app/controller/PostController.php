<?php

namespace Mvc\Blog\controller;

require '../../vendor/autoload.php';

use Mvc\Blog\controller\DTO\input\HttpRequestInputDTO;

if (isset($_REQUEST['method']) && $_REQUEST['method'] === 'post') {
    if (isset($_POST['user'], $_POST['email'], $_POST['comment'], $_POST['timestamp'])) {
        $user = $_POST['user'];
        $email = $_POST['email'];
        $comment = $_POST['comment'];
        $timestamp = $_POST['timestamp'];

        $HttpRequestInputDTO = new HttpRequestInputDTO($user,$email,$comment,$timestamp);

        if (!PostController::validateInputs($HttpRequestInputDTO)) {
            echo json_encode(['status' => 'error', 'message' => 'Formato incorreto dos parâmetros.']);
            exit;
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'A requisição HTTP está faltando parâmetros.']);
        exit;
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao enviar a requisição HTTP.']);
    exit;
}

class PostController
{
    public static function validateInputs(HttpRequestInputDTO $dto)
    {
        function validateEmail($email)
        {
            $regex = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
            return preg_match($regex, $email);
        }

        if (strlen($dto->username) <= 3 || strlen($dto->username) >= 15 || !validateEmail($dto->email) || strlen($dto->comment) <= 3 || strlen($dto->comment) >= 250) {
            return false;
        }
        return true;
    }
}


/******** CRIAR ENTITY POST */