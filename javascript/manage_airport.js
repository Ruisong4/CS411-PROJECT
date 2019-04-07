$('document').ready(function () {

    let departureDate = flatpickr('#depDateInput', {});
    let returnDate = flatpickr('#desDateInput', {});
    let numberDate = flatpickr('#flightNumberDate', {});
    let routeSuggestDep;
    let routeSuggestDes;
    let airlineSuggest;

    $("#query_port").click(function () {
        $(".query_block").css("display","block");
        $(".insert_block").css("display","none");
        $(".update_block").css("display","none");
        $(".delete_block").css("display","none");
        $("#query_port").css({
            "color":"#dfe4eb",
            "background":"#eba718",
            "cursor":"default"
        });
        $("#insert_port").css({
            "color":"#000",
            "background":"#dfe4eb",
            "cursor":"pointer"
        });
        $("#update_port").css({
            "color":"#000",
            "background":"#dfe4eb",
            "cursor":"pointer"
        });
        $("#delete_port").css({
            "color":"#000",
            "background":"#dfe4eb",
            "cursor":"pointer"
        });
    });

    $("#insert_port").click(function () {
        $(".query_block").css("display","none");
        $(".insert_block").css("display","block");
        $(".update_block").css("display","none");
        $(".delete_block").css("display","none");
        $("#query_port").css({
            "color":"#000",
            "background":"#dfe4eb",
            "cursor":"default"
        });
        $("#insert_port").css({
            "color":"#dfe4eb",
            "background":"#eba718",
            "cursor":"pointer"
        });
        $("#update_port").css({
            "color":"#000",
            "background":"#dfe4eb",
            "cursor":"pointer"
        });
        $("#delete_port").css({
            "color":"#000",
            "background":"#dfe4eb",
            "cursor":"pointer"
        });
    });

    $("#update_port").click(function () {
        $(".query_block").css("display","none");
        $(".insert_block").css("display","none");
        $(".update_block").css("display","block");
        $(".delete_block").css("display","none");
        $("#query_port").css({
            "color":"#000",
            "background":"#dfe4eb",
            "cursor":"default"
        });
        $("#insert_port").css({
            "color":"#000",
            "background":"#dfe4eb",
            "cursor":"pointer"
        });
        $("#update_port").css({
            "color":"#dfe4eb",
            "background":"#eba718",
            "cursor":"pointer"
        });
        $("#delete_port").css({
            "color":"#000",
            "background":"#dfe4eb",
            "cursor":"pointer"
        });
    });

    $("#delete_port").click(function () {
        $(".query_block").css("display","none");
        $(".insert_block").css("display","none");
        $(".update_block").css("display","none");
        $(".delete_block").css("display","block");
        $("#query_port").css({
            "color":"#000",
            "background":"#dfe4eb",
            "cursor":"default"
        });
        $("#insert_port").css({
            "color":"#000",
            "background":"#dfe4eb",
            "cursor":"pointer"
        });
        $("#update_port").css({
            "color":"#000",
            "background":"#dfe4eb",
            "cursor":"pointer"
        });
        $("#delete_port").css({
            "color":"#dfe4eb",
            "background":"#eba718",
            "cursor":"pointer"
        });
    });


    $('#depInput').autoComplete({
        source: function(term, response){
            try { routeSuggestDep.abort(); } catch(e){}
            routeSuggestDep = $.getJSON('./php/suggestion.php', { q: term, type:"airport"}, function(data){ response(data); });
        }
    });

    $('#desInput').autoComplete({
        source: function(term, response){
            try { routeSuggestDes.abort(); } catch(e){}
            routeSuggestDes = $.getJSON('./php/suggestion.php', { q: term, type:"airport"}, function(data){ response(data); });
        }
    });

    $('#airlineInput').autoComplete({
        source: function(term, response){
            try { airlineSuggest.abort(); } catch(e){}
            airlineSuggest = $.getJSON('./php/suggestion.php', { q: term, type:"airline"}, function(data){ response(data); });
        }
    });


});
