$('#featured').flickity({
    // options
    cellAlign: 'left',
    contain: true,
    prevNextButtons: false,
    pageDots: true,
    autoPlay: 7000
});

$(document).ready(function () {
    /*Tabs*/
    var action = "click";
    var speed = "500";


    $('li.tab-header').on(action, function () {
        $(this).next()
            .slideToggle(speed)
            .siblings('li.tab-content')
            .slideUp();

    });

    $('#team-players-card').on(action, function () {
        $('#more-team').toggle();
        $('#team-players-see-more').toggle();
    });

    $('#players-tab').on(action, function () {
        $('#players-leaderboards').fadeIn(speed)
            .siblings('.leaderboard-table')
            .fadeOut();
    });
    $('#teams-tab').on(action, function () {
        $('#teams-leaderboards').fadeIn(speed)
            .siblings('.leaderboard-table')
            .fadeOut();
    });

    $('#searchBar').on("submit", function (e) {
        e.preventDefault();
    });

    /*Tabs End*/
    /*Navigation start*/
    var currentPage = "home";
    var previousPage;

    function goBack(backPage) {
        var link = "#" + backPage;

        $(link).show().siblings('main').hide();
        if (backPage == "profile") {
            $('#profile-header').show().siblings('header').hide();
        } else {
            $('#full-header').show().siblings('header').hide();
        }

        window.scroll(0, 0);

        currentPage = previousPage;
        previousPage = "home";

    };

    $(".go-back").click(function () {

        if (previousPage === "profile") {
            $('#full-header').addClass("profile-header");
            goBack(previousPage);
        } else {
            goBack(previousPage);
            $('#full-header').removeClass("profile-header");
            console.log(previousPage);
        }
        
    });


    $('#homeBtn').click(function () {
        $('#home').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);

        previousPage = currentPage;
        currentPage = "home";
    });
    $('#overviewBtn').click(function () {
        $('#home').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "home";
    });
    $('#wikiBtn').click(function () {
        $('#wiki').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "wiki";
        console.log(previousPage);
        console.log(currentPage);
    });
    $('#leaderboard-card').click(function () {
        $('#leaderboards').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "leaderboards";
    });

    $('#profileSection').click(function () {
        $('#profile').show().siblings('main').hide();
        $('#full-header').addClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "profile";

    });
    $('#achievements-card').click(function () {
        $('#achievements-page').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "achievements-page";
    });
    $('#missions-card').click(function () {
        $('#missions-page').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "missions-page";
    });
    $('#missionsBtn').click(function () {
        $('#missions-page').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "missions-page";
    });
    $('#teamBtn').click(function () {
        $('#team-page').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "team-page";
    });
    $('#chatBtn').click(function () {
        $('#chat-list').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "chat-list";
    });
    $('.chat-list-wrapper').click(function () {
        $('#chat').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "chat";
    });

    /*Navigation end*/





    /*JSON*/

    //JSON Data fetch
    function collectData(url, callback_Function) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                callback_Function(this);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();

    }
    var jsonElements;

    //JSON Show data
    function showData(jsonData) {

        jsonElements = JSON.parse(jsonData.responseText); //Parsing the object
        console.log(jsonElements);

        $('#wiki-article').show().siblings('main').hide();
        $('#wiki-header-image').attr("src", jsonElements.image);
        $('#wiki-item-name').text(jsonElements.name);
        $('#wiki-item-content1').text(jsonElements.description1);
        $('#wiki-item-content2').text(jsonElements.description2);

        $('#tab-content').empty();
        for (var i = 0; i < jsonElements.upgrades.length; i++) {
            console.log(i);
            $('#tab-content').append('<div class="wiki-upgrade-card"><img src="' + jsonElements.upgrades[i].image + '" alt=""><div class="wiki-upgrade-card-content"><h3>' + jsonElements.upgrades[i].level + '</h3><p>' + jsonElements.upgrades[i].resources + '</p></div></div>');
        }

    }

    $("#wiki-items-click").on("click", "div", function () {
        var itemClickedLink = $(this).attr("data-link");
        collectData(itemClickedLink, showData);
        if (itemClickedLink !== undefined) {
            $('#wiki-article').show().siblings('main').hide();
            previousPage = currentPage;
            currentPage = "wiki-article";
            console.log(previousPage);
            console.log(currentPage);
        }
    });





});

/*Upgrade timers*/
var countDownDate1 = new Date("May 22, 2019 14:07:00").getTime();
var countDownDate2 = new Date("May 22, 2019 11:37:25").getTime();
var upgradeTime = 86400000;
var timeLeft1;
var timeLeft2;
var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance1 = countDownDate1 - now;
    timeLeft1 = 100 - (100 * (distance1 / upgradeTime));

    var distance2 = countDownDate2 - now;
    timeLeft2 = 100 - (100 * (distance2 / upgradeTime));

    if (distance1 >= 0) {
        $('#timer1Progress').css("width", timeLeft1 + "%");
    }
    if (distance2 >= 0) {
        $('#timer2Progress').css("width", timeLeft2 + "%");
    }



    // Time calculations for days, hours, minutes and seconds
    var days1 = Math.floor(distance1 / (1000 * 60 * 60 * 24));
    var hours1 = Math.floor((distance1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes1 = Math.floor((distance1 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds1 = Math.floor((distance1 % (1000 * 60)) / 1000);

    var days2 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
    var hours2 = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes2 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds2 = Math.floor((distance2 % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("timer1").innerHTML = hours1 + "h " +
        minutes1 + "m " + seconds1 + "s ";
    document.getElementById("timer2").innerHTML = hours2 + "h " +
        minutes2 + "m " + seconds2 + "s ";

    // If the count down is finished, write some text 
    if (distance1 < 0) {
        $('#timer1Progress').css("width", "100%");
        document.getElementById("timer1").innerHTML = "Upgraded";
    }
    if (distance2 < 0) {
        $('#timer2Progress').css("width", "100%");
        document.getElementById("timer2").innerHTML = "Upgraded";
    }
}, 1000);

/*Upgrade Timers end*/

/*Donation*/
var pills = parseInt($('#pills').text(), 10);
var water = parseInt($('#water').text(), 10);
var electricity = parseInt($('#electricity').text(), 10);
var thermal = parseInt($('#thermal').text(), 10);
var teamPills = parseInt($('#team-pills').text(), 10);
var teamWater = parseInt($('#team-water').text(), 10);
var teamElectricity = parseInt($('#team-electricity').text(), 10);
var teamThermal = parseInt($('#team-thermal').text(), 10);


$("#donateBtn").click(donate);

function donate() {
    var pillsInput = parseInt($("input[type=number][name=pillsInput]").val());
    var waterInput = parseInt($("input[type=number][name=waterInput]").val());
    var electricityInput = parseInt($("input[type=number][name=electricityInput]").val());
    var thermalInput = parseInt($("input[type=number][name=thermalInput]").val());


    var pillsCheck = pills - pillsInput;
    var waterCheck = water - waterInput;
    var electricityCheck = electricity - electricityInput;
    var thermalCheck = thermal - thermalInput;


    if (pillsCheck >= 0 && waterCheck >= 0 && electricityCheck >= 0 && thermalCheck >= 0) {
        teamPills = teamPills + pillsInput;
        pills -= pillsInput;
        teamWater += waterInput;
        water -= waterInput;
        teamElectricity += electricityInput;
        electricity -= electricityInput;
        teamThermal += thermalInput;
        thermal -= thermalInput;

        $('#pills').html(pills + " <img src='images/pills@2x.png' alt=''>");
        $('#team-pills').html(teamPills + " <img src='images/pills@2x.png' alt=''>");
        $('#water').html(water + " <img src='images/water@2x.png' alt=''>");
        $('#team-water').html(teamWater + " <img src='images/water@2x.png' alt=''>");
        $('#electricity').html(electricity + " <img src='images/electricity@2x.png' alt=''>");
        $('#team-electricity').html(teamElectricity + " <img src='images/electricity@2x.png' alt=''>");
        $('#thermal').html(thermal + " <img src='images/thermal@2x.png' alt=''>");
        $('#team-thermal').html(teamThermal + " <img src='images/thermal@2x.png' alt=''>");
        console.log("worked");

        $('#donated').slideDown(300).delay(3000).slideUp(300);

    } else {

        $('#insufficient').slideDown(300).delay(3000).slideUp(300);
    }


}



/*CHAT*/
function scrollDown() {
  var focusBottom = document.getElementById("adobewordpress");
  focusBottom.scrollTop = focusBottom.scrollHeight;
}

$("input").keypress(function(event) {
  if (event.which == 13) {
    event.preventDefault();
    $('form.chat input[type="submit"]').click();
  }
});
$('form.chat input[type="submit"]').click(function(event) {
  event.preventDefault();
  var message = $('form.chat input[type="text"]').val();
  if ($('form.chat input[type="text"]').val()) {
    var d = new Date();
    var clock = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var currentDate =
      (('' + day).length < 2 ? '0' : '') + day + '.' +
      (('' + month).length < 2 ? '0' : '') + month + '.' +
      d.getFullYear() + '&nbsp;&nbsp;' + clock;
    $('form.chat div.messages').append('<div class="message"><div class="myMessage"><p>' + message + '</p><date><b>Baron Adam </b>' + currentDate + '</date></div></div>');
    
  }
  $('form.chat input[type="text"]').val('');
  scrollDown();
});



