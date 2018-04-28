function quantityChange() {
    var arr = $('.description');
    var sum = 0;
    var count = Number($(this).find('#quantity').text()) + 1;
    $(this).find('#quantity').text(String(count));

    for (let i = 0; i < arr.length; i++) {

        let quantity = Number($(arr[i]).find('#quantity').text());
        let money = quantity * Number($(arr[i]).find('#price').text());
        sum += money;
        $(arr[i]).find('#money').text(String(money));
        
    }

    
    $('#sum').text(String(sum));
}
