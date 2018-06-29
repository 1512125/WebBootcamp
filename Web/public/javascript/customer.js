function search() {
    var list = $('.customer');
    var name = document.getElementById('input').value.toLowerCase();
    for (var i = 0; i < list.length; ++i) {
        var temp = list[i].children[1].children[1].innerText.toLowerCase();
        if (temp.search(name) < 0) list[i].style.display = 'none';
        else list[i].style.display = '';
    }
    console.log('a');
}

function edit(e) {
    var id = '#customer' + e;
    var p = $(id);
    $('#ban')[0].checked = p.data('ban');
    $('#banText')[0].value = p.data('ban');
    $('#decribe')[0].value = p.data('note');
    p = p[0].children;
    console.log(p);
    $('.image img').attr('src', $(p[0]).attr('src'));
    p = p[1].children;
    $('#code')[0].value = xlstring(p[0].innerText);
    $('#name')[0].value = xlstring(p[1].innerText);
    $('#addr')[0].value = xlstring(p[2].innerText);
    $('#email')[0].value = xlstring(p[3].innerText);
    $('#phone')[0].value = xlstring(p[4].innerText);
    $('.edit-customer').show();
}

function xlstring(s) {
    var i = 1;
    while (s[i] != ':') ++i;
    return s.slice(i + 2, s.length);
}

function exit() {
    $('.edit-customer').hide();
}

$(document).ready(function () {
    $('input[name=ban]').change(function(){
        if($(this).is(':checked')) {
            $('#banText')[0].value = true;
        } else {
            $('#banText')[0].value = false;
        }
    });
});

