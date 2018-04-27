$(document).ready(function() {
    $(".new-post").click(function() {
        $('.post').fadeToggle('fast');
    });

    $(".close").click(function() {
            $(".post").fadeToggle("fast");
    });
});