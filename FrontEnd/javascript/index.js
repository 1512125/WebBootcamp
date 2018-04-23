jQuery(document).ready(function() {
    var speed = 1000;
    var autoswitch = true;
    var autoswitch_speed = 8000;

    $('.intro').hide();
    $('.active').show();

    if (autoswitch) {
        setInterval(function(){
            $('.active').removeClass('active').addClass('oldActive');
            if ($('.oldActive').is(':last-child')){
                $('.intro').first().addClass('active');
            } else {
                $('.oldActive').next().addClass('active');
            }
            $('.oldActive').removeClass('oldActive');
            $('.intro').hide();
            $('.active').fadeIn(speed);
        }, autoswitch_speed);
    }
});