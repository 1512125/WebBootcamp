$(document).ready(function(){
    $(".new-partern").click(function() {
        $('.add-partern').show();
    });

    $(".close").click(function() {
        $(".add-partern").hide();
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