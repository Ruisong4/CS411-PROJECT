$('document').ready(function () {

    let departureDate = flatpickr('#depDateInput', {});
    let returnDate = flatpickr('#desDateInput', {});
    let numberDate = flatpickr('#flightNumberDate', {});
    let routeSuggestDep;
    let routeSuggestDes;
    let airlineSuggest;

    $("#byRoute").click(function () {
        $(".routeBlock").css("display","block");
        $(".flightBlock").css("display","none");
        $("#byRoute").css({
            "color":"#dfe4eb",
            "background":"#eba718",
            "cursor":"default"
        });
        $("#byFlight").css({
            "color":"#000",
            "background":"#dfe4eb",
            "cursor":"pointer"
        });
    });

    $("#byFlight").click(function () {
        $(".flightBlock").css("display","block");
        $(".routeBlock").css("display","none");
        $("#byFlight").css({
            "color":"#dfe4eb",
            "background":"#eba718",
            "cursor":"default"
        });
        $("#byRoute").css({
            "color":"#000",
            "background":"#dfe4eb",
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
