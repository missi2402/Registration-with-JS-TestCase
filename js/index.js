var messageServer = {};
window.onload = function() {
    $("#register").submit(function(event) {
        event.preventDefault();
        var error = 0;
        $(".validation").each(function() {
            if ($(this).val() == '' || $(this).val() == null) {
                $('.alert-danger').html("<strong>Holy bolly! </strong>" + $(this).data("error"))
                    .css('visibility', 'visible');
                error++;
            }
        });
        if (error != 0) return false;
        $.ajax({
            type: "POST",
            url: "http://codeit.pro/frontTestTask/user/registration",
            data: $(this).serialize(),
            success: function(data) {
                if (data.status === 'Error' || data.status === 'Form Error') {
                    $('.alert-danger').html("<strong>Holy guacamole! </strong>" + data.message);
                    $('.alert-danger').css('visibility', 'visible');
                } else {
                    $('.alert-danger').css('display', 'none');
                    $('.alert-success').html("<strong>Well done! </strong>" + data.message);
                    $('.alert-success').css('display', 'block');
                    setTimeout(logIn(), 5000);
                }
                $.each(data, function(key, val) {
                    messageServer.key = val;
                    $('#content').append(key + '<br>' + messageServer.key + '<br>');
                });
            }
        });
        e.preventDefault();
    });
}

function logIn() {
    window.location.replace("company.html");
}
