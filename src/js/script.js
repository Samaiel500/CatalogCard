"use strict"

$(document).ready(function () {
    $('.modal_close').on('click', function () {
        $('.overlay, #forma').fadeOut();
    });
    $('[data-modal=card]').each(function (i) {
        $(this).on('click', function () {
            $('#forma .modal_title span').text($('.card_title').eq(i).text());
            $('.overlay, #forma').fadeIn();
        })
    });
});

document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('.feed-form'),
        formInputs = document.querySelectorAll('.form_input'),
        inputPhone = document.querySelector('.form_input-phone');
    
    function validatePhone(phone) {
        let check = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
        return check.test(String(phone));
    }
    
    form.onsubmit = function () {
        let phoneVal = inputPhone.value;
        let emptyInputs = Array.from(formInputs).filter(input => input.value === '');

        formInputs.forEach(function (input) {
            if (input.value === '') {
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        })

        if (emptyInputs.length !== 0) {
            return false;
        }

        if (!validatePhone(phoneVal)) {
            inputPhone.classList.add('error');
            return false;
        } else {
            inputPhone.classList.remove('error');
        }
    }
});

$('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function () {
        $(this).find("input").val("");

        $("form").trigger('reset');
    });
    return false;
});