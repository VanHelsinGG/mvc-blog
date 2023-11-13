$(document).ready(function () {

    $('#send-post').click(function () {
        let $username = $('#username');
        let $email = $('#email');
        let $comment = $('#comment');

        // Validação do nome de usuário
        if ($username.val().trim().length <= 3 || $username.val().trim().length > 15) {
            $username.removeClass('is-valid').addClass('is-invalid');
            let $usernameFeedback = $username.closest(".form-floating").find('.invalid-feedback');
            if ($usernameFeedback.length === 0) {

                $username.closest(".form-floating").append('<div class="invalid-feedback">Nome de usuário deve conter entre 4-15 caracteres</div>');
            }

            return 1;
        } else {
            $username.removeClass('is-invalid').addClass('is-valid');
            $username.closest(".form-floating").find('.invalid-feedback').remove();
        }

        // Validação do e-mail
        if (!validateEmail($email.val()) || $email.val().trim().length <= 10) {
            $email.removeClass('is-valid').addClass('is-invalid');
            let $emailFeedback = $email.closest(".form-floating").find('.invalid-feedback');

            if ($emailFeedback.length === 0) {
                $email.closest(".form-floating").append('<div class="invalid-feedback">Formato de e-mail inválido</div>');
            }

            return 1;
        } else {
            $email.removeClass('is-invalid').addClass('is-valid');
            $email.closest(".form-floating").find('.invalid-feedback').remove();
        }

        // Validação do comentário
        if ($comment.val().trim().length > 250 || $comment.val().trim().length <= 3) {
            $comment.removeClass('is-valid').addClass('is-invalid');
            let $commentFeedback = $comment.closest(".form-floating").find('.invalid-feedback');

            if ($commentFeedback.length === 0) {
                $comment.closest(".form-floating").append('<div class="invalid-feedback">O comentário deve conter entre 4-250 caracteres</div>');
            }

            return 1;
        } else {
            $comment.removeClass('is-invalid').addClass('is-valid');
            $comment.closest(".form-floating").find('.invalid-feedback').remove();
        }

        const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

        $.post('../controller/PostController.php', {
            user: $username.val(),
            email: $email.val(),
            comment: $comment.val(),
            timestamp: timestamp
        }).done(function (data){
            const response = JSON.parse(data);

            if(response.status === "success"){
                showToast();
            }
        });
    });


    function showToast() {
        const toastEl = $('.toast');
        const toast = new bootstrap.Toast(toastEl);
        const $progress = toastEl.find('.progress');
        const $progressBar = $progress.find('.progress-bar');
        let valueNow = parseInt($progress.attr('aria-valuenow'));

        const progressBarTimer = setInterval(() => {
            if (valueNow === 100) {
                clearInterval(progressBarTimer);
            }

            valueNow += 20;

            $progress.attr('aria-valuenow', valueNow);
            $progressBar.css('width', valueNow + '%');
        }, 1000);

        toast.show();
    }

    const validateEmail = function (email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});
