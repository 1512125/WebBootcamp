// var canvas;
// $(document).ready(function () {
//     canvas = new fabric.Canvas('c');
// })

function saveDesign() {
    var money = $('#money').text();
    var img = $('#shirtDiv img').attr('src');

    var canvas = new fabric.Canvas('c');

    var canvas1 = $('#tcanvas');

    var group = new fabric.Group([img]);

    canvas.add(group);

    if (!fabric.Canvas.supports('toDataURL')) {
        alert('This browser doesn\'t provide means to serialize canvas to an image');
    } else {
        window.open(canvas.toDataURL('png'));
    }
}