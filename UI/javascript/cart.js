function verified() {
    var verified = confirm('Xác nhận thanh toán');
    if (verified) {
        alert('Cảm ơn quý khách');
        window.location.assign('shop.html')
    }
}

$(document).ready(function () {
    let sum = 0;
    let arr = $('.description');

    for (let i = 0; i < arr.length; i++) {

        let quantity = Number($(arr[i]).find('#quantity').text());
        let money = quantity * Number($(arr[i]).find('#price').text());
        sum += money;
        $(arr[i]).find('#money').text(String(money));
    }

    $('#sum').text(String(sum));

    $('.description td p img').click(function () {
        var count = Number($(this).parent().find('#quantity').text()) + 1;
        $(this).parent().find('#quantity').text(String(count));

        let sum = 0;
        let arr = $('.description');

        for (let i = 0; i < arr.length; i++) {

            let quantity = Number($(arr[i]).find('#quantity').text());
            let money = quantity * Number($(arr[i]).find('#price').text());
            sum += money;
            $(arr[i]).find('#money').text(String(money));
        }

        $('#sum').text(String(sum));
    })
});