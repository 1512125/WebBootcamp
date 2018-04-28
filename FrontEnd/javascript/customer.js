function search(){
    var list = $('.customer');
    var name = document.getElementById('input').value.toLowerCase();
    for (var i = 0; i < list.length; ++i){
        var temp = list[i].children[1].children[1].innerText.toLowerCase();
        if (temp.search(name) < 0) list[i].style.display = 'none';
        else list[i].style.display = '';
    }
    console.log('a');
}