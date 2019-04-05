$('document').ready(function () {

    $('#depDateInput').flatpickr();
    $('#desDateInput').flatpickr();

    let xhr;
    $('#depInput').autoComplete({
        source: function(term, response){
            try { xhr.abort(); } catch(e){}
            xhr = $.getJSON('./php/suggestion.php', { q: term }, function(data){ response(data); });
        }
    });
});
