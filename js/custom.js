//заполнение инпутов
$('[data-role="form-filter"]').on('click', function(e)
{
    e.preventDefault();
    let
        // селектим родительский блок
        filter = $(this).parents('[data-role="filter"]'),
        // получаем ИД нужного инпута
        target = filter.data('filter'),
        // получаем значение выбранной строки
        value = $(this).data('value'),
        //получаем текст выбранной строки
        text = $(this).text(),
        // ищем нужную кнопку очищения
        clear = $(target).attr('id');
    // рендерим кнопку
    $(`[data-target="#${clear}"]`).show();
    // передаём target тест выбранной строки
    $(target).val(text);
    // передаём name = target велью выбранной строки
    $(`[name="${target}"]`).val(value);
    console.log($(`[name="${target}"]`).val());
});

//Очищення инпутов
$('[data-filter="clear"]').on('click', function(){
    if( $(this).data('target') == "#filter-date" ){
        $('#datepicker').datepicker('setDate', null);
    }else{

    }
    let target = $(this).data('target');
    $(target).val('');
    $(`[name="${target}"]`).val('');

    $(this).hide();
});
( function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define( [ "../widgets/datepicker" ], factory );
    } else {

        // Browser globals
        factory( jQuery.datepicker );
    }
}( function( datepicker ) {

    datepicker.regional.ru = {
        closeText: "Закрыть",
        prevText: "&#x3C;Пред",
        nextText: "След&#x3E;",
        currentText: "Сегодня",
        monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь",
            "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
        monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн",
            "Июл","Авг","Сен","Окт","Ноя","Дек" ],
        dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
        dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
        dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
        weekHeader: "Нед",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: "" };
    datepicker.setDefaults( datepicker.regional.ru );

    return datepicker.regional.ru;

} ) );

$( "#datepicker" ).datepicker({
    onSelect: function(dateText, inst) {
        var dateAsString = dateText; //the first parameter of this function
        var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method
        console.log($(this));
        let
            // селектим родительский блок
            filter = $(this).parents('[data-role="filter"]'),
            // получаем ИД нужного инпута
            target =  '#filter-date',
            // получаем значение выбранной даты
            value = dateAsString,
            // ищем нужную кнопку очищения
            clear = $('[data-target="#filter-date"]');
        // рендерим кнопку
        clear.show();
        // передаём target тест выбранной строки
        $(target).val(value);
        // передаём name = target велью выбранной строки
    }

});

//дропдаун
$('[data-button="dropdown"]').on('click', function () {
    let target = $(this).data('drop-target');
    $(target).slideToggle();
});

//select2

$('.filter__select').select2();
var _scannerIsRunning = false;

function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner-container'),
            constraints: {
                width: 480,
                height: 320,
                facingMode: "environment"
            },
        },
        decoder: {
            readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "code_39_reader",
                "code_39_vin_reader",
                "codabar_reader",
                "upc_reader",
                "upc_e_reader",
                "i2of5_reader"
            ],
            debug: {
                showCanvas: true,
                showPatches: true,
                showFoundPatches: true,
                showSkeleton: true,
                showLabels: true,
                showPatchLabels: true,
                showRemainingPatchLabels: true,
                boxFromPatches: {
                    showTransformed: true,
                    showTransformedBox: true,
                    showBB: true
                }
            }
        },

    }, function (err) {
        if (err) {
            console.log(err);
            return
        }

        console.log("Initialization finished. Ready to start");
        Quagga.start();

        // Set flag to is running
        _scannerIsRunning = true;
    });

    Quagga.onProcessed(function (result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
            }
        }
    });


    Quagga.onDetected(function (result) {
        alert("Barcode detected and processed : [" + result.codeResult.code + "]", result);
        document.getElementById("btn-cancel").click();
        console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
    });
}


// Start/stop scanner
document.getElementById("btn").addEventListener("click", function () {
    startScanner();

}, false);

document.getElementById("btn-cancel").addEventListener("click", function () {
    Quagga.stop();
}, false);


