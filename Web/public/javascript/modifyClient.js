function change1(){
    var info ={
        'name': $('#inputName').val(),
        'email': $('#inputEmail3').val(),
        'address': $('#inputAddress3').val(),
        'phonenumber': $('#inputPhone3').val()
    };

    info = JSON.stringify(info);
    window.location.assign('/client/modifyClient/' + info)
}