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

function search(){
    var list = $('.fashion');
    var name = document.getElementById('input').value.toLowerCase();
    for (var i = 0; i < list.length; ++i){
        var temp = list[i].children[1].innerText.toLowerCase();
        if (temp.search(name) < 0) list[i].style.display = 'none';
        else list[i].style.display = '';
    }
}

function del(e){
    $('.fashion')[e-1].style.display = 'none';
}

