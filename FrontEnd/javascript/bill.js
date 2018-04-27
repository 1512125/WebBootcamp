$(document).ready(function(){
    var x = '.products';
    $('#nav a').click(function(){
        var temp = $(this).data('quote');
        console.log(temp);
        $(x).hide();
        if (temp != 'all') $('.' + temp).show();
        else $(x).show();
    })
})