$(document).ready(function(){
    var x = '.fashion';
    $('#nav a').click(function(){
        var temp = $(this).data('quote');
        console.log(temp);
        $(x).hide();
        if (temp != 'all') $('.' + temp).show();
        else $(x).show();
    })

    $(".new-cloth").click(function() {
        $('.add-cloth').show();
    });

    $(".close").click(function() {
        $(".add-cloth").hide();
    });
})