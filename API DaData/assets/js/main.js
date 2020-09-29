$(document).ready(function () {
    $(".container-input").bind("keyup", function () {
        $('.container-body').empty();

        var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        var token = "eff3ea61329b411f24e95c0ce87e4e5f0e0b7767";
        var query = $(".container-input").val();

        var options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({ query: query })
        }

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                result.suggestions.forEach(element => {
                    $('.container-body').append(`<li>${element.value}</li>`)
                });
                $('.container-body li').on('click', function (e) {
                    $(".container-input").val($(this).text())
                    $('.container-body').empty();
                });
            }
            )
            .catch(error => console.log("error", error));
    });
});