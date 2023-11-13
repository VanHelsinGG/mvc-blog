<?php
namespace Mvc\Blog\controller\DTO\input;

require '../../vendor/autoload.php';

class HttpRequestInputDTO
{
    public $username;
    public $email;
    public $comment;
    public $timestamp;

    public function __construct($username, $email, $comment, $timestamp)
    {
        $this->username = $username;
        $this->email = $email;
        $this->comment = $comment;
        $this->timestamp = $timestamp;
    }
}