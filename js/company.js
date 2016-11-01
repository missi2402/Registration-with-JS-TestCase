var objectCompany = {};
var objectNews = {};
var listOfCoutries = {};
var percentageOfCountries = {};
var listOfPartners = {};
var arrayForDrawPie = [];
var arrayForDrawColumn = [];
var firstSlide = true;
var Changer;
window.onload = function() {
    $("#status").fadeIn();
    $("#preloader").fadeIn();
    $.ajax({
        type: "POST",
        url: "http://codeit.pro/frontTestTask/company/getList",
        data: $(this).serialize(),
        success: function(data) {
            objectCompany = data;
            // Total Companies
            $('.totalCompaniesContent').html('<div>' + objectCompany.list.length + '</div>');
            // List of companies
            $.each(objectCompany.list, function(key, val) {
                $('#findLi').append('<li>' + objectCompany.list[key].name + '</li>')
            });
            // List of countries
            $.each(objectCompany.list, function(key, val) {
                var name = objectCompany.list[key].location.name;
                if (name in listOfCoutries) {
                    listOfCoutries[name]++;
                } else {
                    listOfCoutries[name] = 1;
                }
            });
            // Array for pie chart (draw.js google)
            arrayForDrawPie.push(['Country', 'Percentage']);
            $.each(listOfCoutries, function(name, val) {
                var p = (val / Object.keys(objectCompany.list).length) * 100;
                arrayForDrawPie.push([name, p]);;
            });
        }
    })
    $.ajax({
        type: "POST",
        url: "http://codeit.pro/frontTestTask/news/getList",
        data: $(this).serialize(),
        success: function(data) {
            objectNews = data;
            $.each(objectNews.list, function(key, val) {
                if (firstSlide) {
                    $('.carousel-inner').append('<div class="carousel-item active"><img src="' + objectNews.list[key].img + '"><div class="linkHeader"><a href="' + objectNews.list[key].link + '">' + objectNews.list[key].link + '</a></div><div class="description"><strong>Description: </strong>' + objectNews.list[key].description + '</div><div class="author"><strong>Author: </strong>' + objectNews.list[key].author + '</div><div class="date"><strong>Date: </strong>' + (new Date(1000 * objectNews.list[key].date)).toLocaleString() + '</div></div>');
                    firstSlide = false;
                } else {
                    $('.carousel-inner').append('<div class="carousel-item"><img src="' + objectNews.list[key].img + '"><div class="linkHeader"><a href="' + objectNews.list[key].link + '">' + objectNews.list[key].link + '</a></div><div class="description"><strong>Description: </strong>' + objectNews.list[key].description + '</div><div class="author"><strong>Author: </strong>' + objectNews.list[key].author + '</div><div class="date"><strong>Date: </strong>' + (new Date(1000 * objectNews.list[key].date)).toLocaleString() + '</div></div>');
                }
            });
            $('.carousel-inner').append('<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev"><span class="icon-prev" aria-hidden="true"></span></a>');
            $('.carousel-inner').append('<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next"><span class="icon-next" aria-hidden="true"></span></a>');
        }
    })
    $("#status").fadeOut();
    $("#preloader").fadeOut();
    event.preventDefault();
    $(".listOfCompanies").on("click", "li", function() {
        listOfPartners = {};
        var nameFromLi = $(this).text().trim();
        // gets text contents of clicked li
        $(".listOfCompanies li").removeClass("checkedLi");
        $(this).toggleClass("checkedLi");
        $.each(objectCompany.list, function(key, val) {
            if (objectCompany.list[key].name == nameFromLi) {
                $.each(objectCompany.list[key].partners, function(k, v) {
                    var namePartner = objectCompany.list[key].partners[k].name;
                    var val = objectCompany.list[key].partners[k].value;
                    listOfPartners[namePartner] = val;
                });
                return false;
            }
        });
        listOfPartners = sortObject(listOfPartners, 'nameSB');
        // Array for column chart (draw.js google)
        arrayForDrawColumn = []
        arrayForDrawColumn.push(['Company', 'Percentage']);
        $.each(listOfPartners, function(name, val) {
            var p = listOfPartners[name];
            arrayForDrawColumn.push([name, p]);
        });
        google.charts.setOnLoadCallback(drawChart2);
        $('.companyPartners').css('display', 'block');
    });
    $('.sort').change(function() {
        var item = $(this).val();
        if (item === "alpha") {
            listOfPartners = sortObject(listOfPartners, 'nameSB');
        }
        if (item === "against") {
            listOfPartners = sortObject(listOfPartners, 'nameBS');
        }
        if (item === "desc") {
            listOfPartners = sortObject(listOfPartners, 'valueBS');
        }
        if (item === "asce") {
            listOfPartners = sortObject(listOfPartners, 'valueSB');
        }
        // Array for column chart (draw.js google)
        arrayForDrawColumn = []
        arrayForDrawColumn.push(['Company', 'Percentage']);
        $.each(listOfPartners, function(name, val) {
            var p = listOfPartners[name];
            arrayForDrawColumn.push([name, p]);
        });
        google.charts.setOnLoadCallback(drawChart2);
    });
    $(".News").on("click", "div.description", function() {
        $('div.description').css('overflow', 'auto');
    });
}

function logOut() {
    window.location.replace("index.html");
}

function sortObject(obj, type) {
    var arr = [],
        prop,
        keys = Object.keys(obj),
        output = {},
        i, len = keys.length;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'name': prop,
                'value': obj[prop]
            });
        }
    }
    if (type == 'nameSB' || type == 'nameBS') {
        if (type == 'nameSB') {
            keys.sort();
        }
        if (type == 'nameBS') {
            arr = keys.sort().reverse();
        }
        for (i = 0; i < len; i++) {
            k = keys[i];
            output[k] = obj[k];
        };
    }
    if (type == 'valueSB') {
        arr.sort(function(a, b) {
            return a.value - b.value;
        });
        for (i = 0; i < len; i++) {
            var name = arr[i].name;
            var val = arr[i].value;
            output[name] = val;
        }
    }
    if (type == 'valueBS') {
        arr.sort(function(a, b) {
            return b.value - a.value;
        });
        for (i = 0; i < len; i++) {
            var name = arr[i].name;
            var val = arr[i].value;
            output[name] = val;
        }
    }
    console.log(output);
    return output;
}

function getListCompanyByLocation(nameFromList) {
    document.getElementById("ulCompanyByLocation").innerHTML = "";
    document.getElementById("piechart").style.display="none";
    $.each(objectCompany.list, function(key, val) {
                var nameCompany = objectCompany.list[key].location.name;
                if (nameCompany == nameFromList) {        
                    $('#ulCompanyByLocation').append('<li>' + objectCompany.list[key].name + '</li>');
                }
            });
    document.getElementById("listCompanyByLocation").style.display="block";
    document.getElementById("back").style.display="inline-block";
}

function back() {
    document.getElementById("piechart").style.display="block";
    document.getElementById("listCompanyByLocation").style.display="none";
    document.getElementById("back").style.display="none";
}