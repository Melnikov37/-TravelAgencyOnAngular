function DeleteTour(id) {
    var request = new XMLHttpRequest();
    url = "/api/ToursFull/" + id;
    request.open("DELETE", url, false);
    request.send();
    LoadTours();
}

var tourOperators = null;
var foodTypes = null;
var roomTypes = null;
var transports = null;
var touristDestinations = null;
var placeDestinations = null;

function CreateTour() {
    arrivalDate = document.getElementById("inputArrivalDate").value;
    departureDate = document.getElementById("inputDepartureDate").value;
    cost = document.getElementById("inputCost").value;
    numberTransactions = document.getElementById("inputNumberTransactions").value;
    destinationId = document.getElementById("inputTouristDestinations").value;
    operatorId = document.getElementById("inputOperatorId").value;
    transportId = document.getElementById("inputTransportId").value;
    numberPersons = document.getElementById("inputNumberPersons").value;
    foodType = document.getElementById("inputFoodType").value;
    roomType = document.getElementById("inputRoomType").value;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function (ev) {
        var msg = "";
        alert(xmlhttp.status);
        if (xmlhttp.status == 404) {
            msg = "У вас не хватает прав для добавления";
        } else if (xmlhttp.status == 201) {
            msg = "Запись добавлена";
        } else {
            msg = "Неизвестная ошибка";
        }
        document.getElementById("msgAdd").innerHTML = msg;
    };
    xmlhttp.open("POST", "/tours/");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        tourArrivalDate: arrivalDate,
        tourDepartureDate: departureDate,
        tourCost: cost,
        tourNumberTransactions: numberTransactions,
        touristDestinationId: destinationId,
        tourOperatorId: operatorId,
        transportId: transportId,
        tourNumberPersons: null,
        foodTypeId: foodType,
        roomTypeId: roomType,
        pointDeparture: "Москвы"
    }));
    LoadTours();
}

function EditTour(tourID) {
    arrivalDate = document.getElementById("inputArrivalDate").value;
    departureDate = document.getElementById("inputDepartureDate").value;
    cost = document.getElementById("inputCost").value;
    numberTransactions = document.getElementById("inputNumberTransactions").value;
    destinationId = document.getElementById("inputTouristDestinations").value;
    operatorId = document.getElementById("inputOperatorId").value;
    transportId = document.getElementById("inputTransportId").value;
    numberPersons = document.getElementById("inputNumberPersons").value;
    foodType = document.getElementById("inputFoodType").value;
    roomType = document.getElementById("inputRoomType").value;

    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    xmlhttp.open("PUT", "/tours/" + tourID);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        _id: tourID.toString(),
        tourArrivalDate: arrivalDate,
        tourDepartureDate: departureDate,
        tourCost: cost,
        tourNumberTransactions: numberTransactions,
        touristDestinationId: destinationId,
        tourOperatorId: operatorId,
        transportId: transportId,
        tourNumberPersons: null,
        foodTypeId: foodType,
        roomTypeId: roomType,
        pointDeparture: "Москвы"
    }));
    LoadTours();
}

function LoadTuorOperator(selectId) {
    var request = new XMLHttpRequest();
    request.open("GET", "/all_tour_operators/", false);
    request.send();

    var myObj = JSON.parse(request.responseText);
    tourOperators = myObj;
    var selectText = "";
    selectText += "<label for=\"inputOperatorId\">Туроператор</label>";
    selectText += "<select class=\"form-control\" name=\"operator\" id=\"inputOperatorId\">";
    for (i in myObj) {
        if (selectId == myObj[i]._id) {
            selectText += "<option selected value=\"" + myObj[i]._id + "\">" + myObj[i].tourOperatorName + "</option>";
        } else {
            selectText += "<option value=\"" + myObj[i]._id + "\">" + myObj[i].tourOperatorName + "</option>";
        }
    }
    selectText += "</select>";
    document.getElementById("selectOperatorId").innerHTML = selectText;
}

function LoadFoodTypes(selectId) {
    var request = new XMLHttpRequest();
    request.open("GET", "/all_place_destinations/", false);
    request.send();

    var myObj = JSON.parse(request.responseText);
    foodTypes = myObj;
    var selectText = "";
    selectText += "<label for=\"inputOperatorId\">Питание</label>";
    selectText += "<select class=\"form-control\" name=\"operator\" id=\"inputFoodType\">";
    for (let i = 0; i < 6; i++) {
        if (selectId == myObj[i].foodTypeId) {
            selectText += "<option selected value=\"" + myObj[i]._id + "\">" + myObj[i].foodTypeName + "</option>";
        } else {
            selectText += "<option value=\"" + myObj[i]._id + "\">" + myObj[i].foodTypeName + "</option>";
        }
    }
    selectText += "</select>";
    document.getElementById("selectFoodType").innerHTML = selectText;
}

function LoadRoomTypes(selectId) {
    var request = new XMLHttpRequest();
    request.open("GET", "/all_room_types/", false);
    request.send();

    var myObj = JSON.parse(request.responseText);
    roomTypes = myObj;
    var selectText = "";
    selectText += "<label for=\"inputOperatorId\">Туроператор</label>";
    selectText += "<select class=\"form-control\" name=\"operator\" id=\"inputRoomType\">";
    for (i in myObj) {
        if (selectId == myObj[i].roomTypeId) {
            selectText += "<option selected value=\"" + myObj[i]._id + "\">" + myObj[i].roomTypeName + "</option>";
        } else {
            selectText += "<option value=\"" + myObj[i]._id + "\">" + myObj[i].roomTypeName + "</option>";
        }
    }
    selectText += "</select>";
    document.getElementById("selectRoomType").innerHTML = selectText;
}

function LoadPlaceDestinations(selectID) {
    var request = new XMLHttpRequest();
    request.open("GET", "/all_place_destinations/", false);
    request.send();

    var myObj = JSON.parse(request.responseText);
    placeDestinations = myObj
}

function LoadTransports(selectID) {
    var request = new XMLHttpRequest();
    request.open("GET", "/all_transports/", false);
    request.send();

    var myObj = JSON.parse(request.responseText);
    transports = myObj
    var selectText = "";
    selectText += "<label for=\"inputTransportId\">Транспорт</label>";
    selectText += "<select class=\"form-control\" name=\"transport\" id=\"inputTransportId\">";
    for (i in myObj) {
        if (selectID == myObj[i].transportId) {
            selectText += "<option selected value=\"" + myObj[i]._id + "\">" + myObj[i].transportName + "</option>";
        } else {
            selectText += "<option value=\"" + myObj[i]._id + "\">" + myObj[i].transportName + "</option>";
        }
    }
    selectText += "</select>";
    document.getElementById("selectTransportId").innerHTML = selectText;
}

function LoadTouristDestinations(selectID) {
    var request = new XMLHttpRequest();
    request.open("GET", "/all_tourist_destinations/", false);
    request.send();

    var myObj = JSON.parse(request.responseText);
    touristDestinations = myObj;
    var selectText = "";
    selectText += "<label for=\"inputTouristDestinations\">Отель</label>";
    selectText += "<select class=\"form-control\" name=\"touristDestinations\" id=\"inputTouristDestinations\">";
    for (i in myObj) {
        if (selectID == myObj[i].touristDestinationId) {
            if (myObj[i].numberStars != null) {
                selectText += "<option selected value=\"" + myObj[i]._id + "\">" + myObj[i].hotelName + " " + myObj[i].numberStars + "*, " + myObj[i].placeDestination.country + ", " + myObj[i].placeDestination.city + "</option>";

            } else {
                selectText += "<option selected value=\"" + myObj[i]._id + "\">" + myObj[i].hotelName + ", " + myObj[i].placeDestination.country + ", " + myObj[i].placeDestination.city + "</option>";
            }
        } else {
            if (myObj[i].numberStars != null) {
                selectText += "<option value=\"" + myObj[i]._id + "\">" + myObj[i].hotelName + " " + myObj[i].numberStars + "*, " + myObj[i].placeDestination.country + ", " + myObj[i].placeDestination.city + "</option>";

            } else {
                selectText += "<option value=\"" + myObj[i]._id + "\">" + myObj[i].hotelName + ", " + myObj[i].placeDestination.country + ", " + myObj[i].placeDestination.city + "</option>";
            }
        }
    }
    selectText += "</select>";
    document.getElementById("selectTouristDestinations").innerHTML = selectText;
}

function ButtonEdit(tourID) {
    var tour = tourID;
    document.getElementById("saveButtom").onclick = function () {
        EditTour(tour);
    };
}

function ButtonAdd() {
    document.getElementById("saveButtom").onclick = function () {
        CreateTour();
    };
}
var FlagTour = [
    ["Турция", "https://png.icons8.com/office/40/000000/turkey.png"],
    ["Абхазия", "http://s1.iconbird.com/ico/1012/Flag/w64h641351178514Abkhazia.png"],
    ["Тайланд", "http://www.iconsearch.ru/uploads/icons/finalflags/48x48/thailand-flag.png"]
]

function FlagTourIdent(country) {
    var result = "";
    FlagTour.forEach(flag => {
        if (flag[0] == country) {
            result = flag[1];
        }
    });
    return result;
}

function LoadTourInfo(tourId) {
    SelectTour = tourId;
    let request = new XMLHttpRequest();
    request.open("GET", "/tours/" + tourId, false);
    request.send();
    let tour = JSON.parse(request.responseText);
    request.open("GET", "/touristDestinations/" + tour.touristDestinationId, false);
    request.send();
    let touristDestination = JSON.parse(request.responseText);
    request.open("GET", "/placeDestinations/" + touristDestination.placeDestinationId, false);
    request.send();
    let placeDestination = JSON.parse(request.responseText);
    touristDestination.placeDestination = placeDestination;
    request.open("GET", "/foodTypes/" + tour.foodTypeId, false);
    request.send();
    let foodType = JSON.parse(request.responseText);
    request.open("GET", "/roomTypes/" + tour.roomTypeId, false);
    request.send();
    let roomType = JSON.parse(request.responseText);
    tour.touristDestination = touristDestination
    tour.foodType = foodType
    tour.roomType = roomType
    var hotelInfoHeaderHTML = "";
    hotelInfoHeaderHTML += "<div class=\"d-flex flex-column bd-highlight\">";
    hotelInfoHeaderHTML += "<div class=\"bd-highlight\">";
    hotelInfoHeaderHTML += "<h5 class=\"modal-title\">" + tour.touristDestination.hotelName;
    if (tour.touristDestination.numberStars != null) {
        for (let j = 0; j < tour.touristDestination.numberStars; j++) {
            hotelInfoHeaderHTML += " <span class=\"icon star\"></span>";
        }
    }
    hotelInfoHeaderHTML += "</h5>";
    hotelInfoHeaderHTML += "</div>";
    hotelInfoHeaderHTML += "<div class=\"bd-highlight\">";
    hotelInfoHeaderHTML += "<span><img src=\"" + FlagTourIdent(tour.touristDestination.placeDestination.country) + "\" width=\"22px\" height=\"22px\"> " + tour.touristDestination.placeDestination.country + "</span>";
    hotelInfoHeaderHTML += "</div>";
    hotelInfoHeaderHTML += "</div>";
    document.getElementById("hotelInfoHeader").innerHTML = hotelInfoHeaderHTML;

    var photosDivHTML = "";
    photosDivHTML += "<div class=\"carousel-inner\">";
    photosDivHTML += "<div class=\"carousel-item active\">";
    photosDivHTML += "<img class=\"d-block\" src=\"" + "" + "\" width=\"350px\" height=\"250px\" alt=\"" + "asd" + "\">";
    photosDivHTML += "</div>"
    photosDivHTML += "<div class=\"carousel-item\">";
    photosDivHTML += "<img class=\"d-block\" src=\"" + "https://cdn.101hotels.ru/uploads/image/hotel/9595/569474.jpg" + "\" width=\"350px\" height=\"250px\" alt=\"" + "asd" + "\">";
    photosDivHTML += "</div>"
    photosDivHTML += "</div>";
    document.getElementById("photosDiv").innerHTML = photosDivHTML;

    var ratingDivHTML = "";
    ratingDivHTML += "<h5>Рейтинг отеля не указан</h5>";
    ratingDivHTML += "<div class=\"progress\">";
    ratingDivHTML += "<div class=\"progress-bar progress-bar-striped bg-warning\" role=\"progressbar\" style=\"width: 100%\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>"
    ratingDivHTML += "</div>";
    document.getElementById("ratingDiv").innerHTML = ratingDivHTML;

    var arrivalDate = new Date(tour.tourArrivalDate);
    var departureDate = new Date(tour.tourDepartureDate);
    var cardHeaderTourInfoHTML = "";
    cardHeaderTourInfoHTML += "<span>";
    cardHeaderTourInfoHTML += "<img src=\"https://png.icons8.com/ios/40/000000/marker.png\" width=\"22px\" height=\"22px\"> " + tour.touristDestination.placeDestination.city;
    cardHeaderTourInfoHTML += "<span class=\"opacity-text\">, вылет из " + tour.pointDeparture + "</span>";
    cardHeaderTourInfoHTML += "</span>";
    cardHeaderTourInfoHTML += "<hr class=\"hr-class\">";
    cardHeaderTourInfoHTML += "<span>";
    cardHeaderTourInfoHTML += "<img src=\"https://png.icons8.com/ios/40/000000/calendar.png\" width=\"22px\" height=\"22px\"> на " + NumberNights(arrivalDate, departureDate) + ", " + ArrivToDepartDate(arrivalDate, departureDate);
    cardHeaderTourInfoHTML += "</span>";
    document.getElementById("cardHeaderTourInfo").innerHTML = cardHeaderTourInfoHTML;

    var cardBodyTourInfoHTML = "";
    cardBodyTourInfoHTML += "<p class=\"card-text\">";
    cardBodyTourInfoHTML += "<img src=\"https://png.icons8.com/ios/40/000000/user.png\" width=\"22px\" width=\"22px\" height=\"22px\" height=\"22px\"> " + NumberPerson[tour.tourNumberPersons - 1];
    cardBodyTourInfoHTML += "</p>";
    cardBodyTourInfoHTML += "<p class=\"card-text\">";
    cardBodyTourInfoHTML += "<img src=\"https://png.icons8.com/ios/40/000000/restaurant.png\" width=\"22px\" width=\"22px\"> питание: " + tour.foodType.foodTypeName;
    cardBodyTourInfoHTML += "</p>";
    cardBodyTourInfoHTML += "<p class=\"card-text\">";
    cardBodyTourInfoHTML += "<img src=\"https://png.icons8.com/ios/40/000000/empty-bed.png\" width=\"22px\" width=\"22px\"> номера: " + tour.roomType.roomTypeName;
    cardBodyTourInfoHTML += "</p>";
    cardBodyTourInfoHTML += "<p class=\"card-text\">";
    cardBodyTourInfoHTML += "<img src=\"https://png.icons8.com/dotty/40/000000/money.png\" width=\"22px\" width=\"22px\"> В стоимость тура включено: авиаперелёт, трансфер, услуги гида, проживание, питание, медицинская страховка";
    cardBodyTourInfoHTML += "</p>";
    document.getElementById("cardBodyTourInfo").innerHTML = cardBodyTourInfoHTML;

    var cardCostTourInfoHTML = "";
    cardCostTourInfoHTML += "<h3 class=\"text-center-align\">" + parseInt(tour.tourCost * 62.0064) + " руб.</h3>";
    document.getElementById("cardCostTourInfo").innerHTML = cardCostTourInfoHTML;

    var tabTourInfoHTML = "";
    tabTourInfoHTML += "<p>";
    if (tour.touristDestination.hotelSite != null) {
        tabTourInfoHTML += "<span class=\"tourInfoTitelText\">Сайт отеля: </span><a href=\"" + tour.touristDestination.hotelSite + "\">" + tour.touristDestination.hotelSite + "</a>";
        tabTourInfoHTML += "<br>";
    }
    if (tour.touristDestination.hotelPhone != null) {
        tabTourInfoHTML += "<span class=\"tourInfoTitelText\">Телефоны: </span>" + tour.touristDestination.hotelPhone;
        tabTourInfoHTML += "<br>";
    }
    if (tour.touristDestination.hotelFax != null) {
        tabTourInfoHTML += "<span class=\"tourInfoTitelText\">Факс: </span>" + tour.touristDestination.hotelFax;
        tabTourInfoHTML += "<br>";
    }
    if (tour.touristDestination.hotelEmail != null) {
        tabTourInfoHTML += "<span class=\"tourInfoTitelText\">Email: </span>" + tour.touristDestination.hotelEmail;
        tabTourInfoHTML += "<br>";
    }
    if (tour.touristDestination.numberOfRooms != null) {
        tabTourInfoHTML += "<span class=\"tourInfoTitelText\">Количество номеров: </span>" + tour.touristDestination.numberOfRooms;
        tabTourInfoHTML += "<br>";
    }
    if (tour.touristDestination.distanceToAirport != null) {
        tabTourInfoHTML += "<span class=\"tourInfoTitelText\">Расстояние до аэропорта: </span>" + tour.touristDestination.distanceToAirport + " км";
        tabTourInfoHTML += "<br>";
    }
    tabTourInfoHTML += "</p>";

    if (tour.touristDestination.descriptionHotel != null) {
        tabTourInfoHTML += "<hr>";
        tabTourInfoHTML += "<p>" + tour.touristDestination.descriptionHotel + "</p>";
    }
    document.getElementById("tabTourInfo").innerHTML = tabTourInfoHTML;

    var tabSerTourInfoHTML = "";
    request.open("GET", "/api/InternetSerAtTours/" + tour.touristDestination._id, false);
    request.send();
    let internetSerAtTours = JSON.parse(request.responseText);
    request.open("GET", "/api/ParkingSerAtTours/" + tour.touristDestination._id, false);
    request.send();
    let parkingSerAtTours = JSON.parse(request.responseText);
    tabSerTourInfoHTML += "<div class=\"row\">";
    tabSerTourInfoHTML += "<div class=\"col\">";
    tabSerTourInfoHTML += "<h6><img src=\"https://png.icons8.com/metro/40/000000/wifi.png\" class=\"img-thumbnail\" width=\"32px\" height=\"32px\">Интернет</h6>";
    tabSerTourInfoHTML += "<ul>";
    for (let i = 0; i < internetSerAtTours.length; i++) {
        tabSerTourInfoHTML += "<li>" + internetSerAtTours[i].internetSer.internetSerName + "</li>";
    }
    tabSerTourInfoHTML += "</ul>";
    tabSerTourInfoHTML += "</div>";
    tabSerTourInfoHTML += "<div class=\"col\">";
    tabSerTourInfoHTML += "<h6><img src=\"https://png.icons8.com/ios/100/000000/valet-parking.png\" class=\"img-thumbnail\" width=\"32px\" height=\"32px\">Парковка</h6>";
    tabSerTourInfoHTML += "<ul>";
    for (let i = 0; i < parkingSerAtTours.length; i++) {
        tabSerTourInfoHTML += "<li>" + parkingSerAtTours[i].parkingSer.parkingSerName + "</li>";
    }
    tabSerTourInfoHTML += "</ul>";
    tabSerTourInfoHTML += "</div>";
    tabSerTourInfoHTML += "</div>";

    let sportSerAtTours = [];
    let businessSerAtTours = [];
    tabSerTourInfoHTML += "<div class=\"row\">";
    tabSerTourInfoHTML += "<div class=\"col\">";
    tabSerTourInfoHTML += "<h6><img src=\"https://png.icons8.com/ios/100/000000/deadlift.png\" class=\"img-thumbnail\" width=\"32px\" height=\"32px\">Спорт</h6>";
    tabSerTourInfoHTML += "<ul>";
    for (let i = 0; i < sportSerAtTours.length; i++) {
        tabSerTourInfoHTML += "<li>" + sportSerAtTours[i].sportSer.sportSerName + "</li>";
    }
    tabSerTourInfoHTML += "</ul>";
    tabSerTourInfoHTML += "</div>";
    tabSerTourInfoHTML += "<div class=\"col\">";
    tabSerTourInfoHTML += "<h6><img src=\"https://png.icons8.com/ios/100/000000/business.png\" class=\"img-thumbnail\" width=\"32px\" height=\"32px\">Бизнес-услуги</h6>";
    tabSerTourInfoHTML += "<ul>";
    for (let i = 0; i < businessSerAtTours.length; i++) {
        tabSerTourInfoHTML += "<li>" + businessSerAtTours[i].businessSer.businessSerName + "</li>";
    }
    tabSerTourInfoHTML += "</ul>";
    tabSerTourInfoHTML += "</div>";
    tabSerTourInfoHTML += "</div>";

    let roomFacilitiesAtTours = [];
    let foodTypeAtTours = [];
    tabSerTourInfoHTML += "<div class=\"row\">";
    tabSerTourInfoHTML += "<div class=\"col\">";
    tabSerTourInfoHTML += "<h6><img src=\"https://png.icons8.com/ios/100/000000/safe.png\" class=\"img-thumbnail\" width=\"32px\" height=\"32px\">Удобства в номере</h6>";
    tabSerTourInfoHTML += "<ul>";
    for (let i = 0; i < roomFacilitiesAtTours.length; i++) {
        tabSerTourInfoHTML += "<li>" + roomFacilitiesAtTours[i].roomFacilities.roomFacilitiesName + "</li>";
    }
    tabSerTourInfoHTML += "</ul>";
    tabSerTourInfoHTML += "</div>";
    tabSerTourInfoHTML += "<div class=\"col\">";
    tabSerTourInfoHTML += "<h6><img src=\"https://png.icons8.com/metro/100/000000/food.png\" class=\"img-thumbnail\" width=\"32px\" height=\"32px\">Питание</h6>";
    tabSerTourInfoHTML += "<ul>";
    for (let i = 0; i < foodTypeAtTours.length; i++) {
        tabSerTourInfoHTML += "<li>" + foodTypeAtTours[i].foodType.foodTypeName + "</li>";
    }
    tabSerTourInfoHTML += "</ul>";
    tabSerTourInfoHTML += "</div>";
    tabSerTourInfoHTML += "</div>";

    let transportSerAtTours = [];
    let сleaningSerAtTours = [];
    tabSerTourInfoHTML += "<div class=\"row\">";
    tabSerTourInfoHTML += "<div class=\"col\">";
    tabSerTourInfoHTML += "<h6><img src=\"https://png.icons8.com/ios/100/000000/car.png\" class=\"img-thumbnail\" width=\"32px\" height=\"32px\">Транспорт</h6>";
    tabSerTourInfoHTML += "<ul>";
    for (let i = 0; i < transportSerAtTours.length; i++) {
        tabSerTourInfoHTML += "<li>" + transportSerAtTours[i].transportSer.transportSerName + "</li>";
    }
    tabSerTourInfoHTML += "</ul>";
    tabSerTourInfoHTML += "</div>";
    tabSerTourInfoHTML += "<div class=\"col\">";
    tabSerTourInfoHTML += "<h6><img src=\"https://png.icons8.com/ios/100/000000/machine-wash-hot.png\" class=\"img-thumbnail\" width=\"32px\" height=\"32px\">Услуги по очистке одежды</h6>";
    tabSerTourInfoHTML += "<ul>";
    for (let i = 0; i < сleaningSerAtTours.length; i++) {
        tabSerTourInfoHTML += "<li>" + сleaningSerAtTours[i].cleaningSer.cleaningSerName + "</li>";
    }
    tabSerTourInfoHTML += "</ul>";
    tabSerTourInfoHTML += "</div>";
    tabSerTourInfoHTML += "</div>";

    let entertaimentSerAtTours = [];
    let healthAndBeautySerAtTours = [];
    tabSerTourInfoHTML += "<div class=\"row\">";
    tabSerTourInfoHTML += "<div class=\"col\">";
    tabSerTourInfoHTML += "<h6><img src=\"https://png.icons8.com/ios/100/000000/billiards.png\" class=\"img-thumbnail\" width=\"32px\" height=\"32px\">Развлечения</h6>";
    tabSerTourInfoHTML += "<ul>";
    for (let i = 0; i < entertaimentSerAtTours.length; i++) {
        tabSerTourInfoHTML += "<li>" + entertaimentSerAtTours[i].entertaimentSer.entertaimentSerName + "</li>";
    }
    tabSerTourInfoHTML += "</ul>";
    tabSerTourInfoHTML += "</div>";
    tabSerTourInfoHTML += "<div class=\"col\">";
    tabSerTourInfoHTML += "<h6><img src=\"https://png.icons8.com/ios/100/000000/heart-health.png\" class=\"img-thumbnail\" width=\"32px\" height=\"32px\">Здоровье и красота</h6>";
    tabSerTourInfoHTML += "<ul>";
    for (let i = 0; i < healthAndBeautySerAtTours.length; i++) {
        tabSerTourInfoHTML += "<li>" + healthAndBeautySerAtTours[i].healthAndBeautySer.healthAndBeautySerName + "</li>";
    }
    tabSerTourInfoHTML += "</ul>";
    tabSerTourInfoHTML += "</div>";
    tabSerTourInfoHTML += "</div>";

    let restOnWaterSerAtTours = [];
    tabSerTourInfoHTML += "<div class=\"row\">";
    tabSerTourInfoHTML += "<div class=\"col\">";
    tabSerTourInfoHTML += "<h6><img src=\"https://png.icons8.com/ios/100/000000/sea-waves.png\" class=\"img-thumbnail\" width=\"32px\" height=\"32px\">Отдых на воде</h6>";
    tabSerTourInfoHTML += "<ul>";
    for (let i = 0; i < restOnWaterSerAtTours.length; i++) {
        tabSerTourInfoHTML += "<li>" + restOnWaterSerAtTours[i].restOnWaterSer.restOnWaterSerName + "</li>";
    }
    tabSerTourInfoHTML += "</ul>";
    tabSerTourInfoHTML += "</div>";
    tabSerTourInfoHTML += "<div class=\"col\">";
    tabSerTourInfoHTML += "</div>";
    tabSerTourInfoHTML += "</div>";
    document.getElementById("tabSerTourInfo").innerHTML = tabSerTourInfoHTML;
}

var NumberPerson = [
    "одноместный номер",
    "двухместный номер",
    "трехместный номер"
]

function NumberNights(arrivalDate, departureDate) {
    var value = departureDate.getDate() - arrivalDate.getDate();
    if (value == 1) {
        return value + " ночь"
    } else {
        if (value > 1 && value < 5) {
            return value + " ночи"
        } else {
            return value + " ночей"
        }
    }
}

function ArrivToDepartDate(arrivalDate, departureDate) {
    if (departureDate.getDate() <= arrivalDate.getDate()) {
        return "c " + arrivalDate.getDate() + " " + Months[arrivalDate.getMonth()] + " по " + departureDate.getDate() + " " + Months[departureDate.getMonth()];
    } else {
        return "c " + arrivalDate.getDate() + " по " + departureDate.getDate() + " " + Months[departureDate.getMonth()];
    }
}

function ratingСount(rating) {
    var count = 0.0;
    for (const i in rating) {
        count += rating[i].ratingValue;
    }
    count = count / rating.length;
    return count.toFixed(1);
}

var Months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
]

function LoadTour(tourID) {
    if (tourID != null) {
        let request = new XMLHttpRequest();
        request.open("GET", "/tours/" + tourID, false);
        request.send();
        let tour = JSON.parse(request.responseText);
        request.open("GET", "/touristDestinations/" + tour.touristDestinationId, false);
        request.send();
        let touristDestination = JSON.parse(request.responseText);
        request.open("GET", "/placeDestinations/" + touristDestination.placeDestinationId, false);
        request.send();
        let placeDestination = JSON.parse(request.responseText);
        touristDestination.placeDestination = placeDestination;
        request.open("GET", "/foodTypes/" + tour.foodTypeId, false);
        request.send();
        let foodType = JSON.parse(request.responseText);
        request.open("GET", "/roomTypes/" + tour.roomTypeId, false);
        request.send();
        let roomType = JSON.parse(request.responseText);
        tour.touristDestination = touristDestination
        tour.foodType = foodType
        tour.roomType = roomType
        var myObj = tour;
    } else {
        tourID = 1;
        let request = new XMLHttpRequest();
        request.open("GET", "/tours/" + tourID, false);
        request.send();
        let tour = JSON.parse(request.responseText);
        request.open("GET", "/touristDestinations/" + tour.touristDestinationId, false);
        request.send();
        let touristDestination = JSON.parse(request.responseText);
        request.open("GET", "/placeDestinations/" + touristDestination.placeDestinationId, false);
        request.send();
        let placeDestination = JSON.parse(request.responseText);
        touristDestination.placeDestination = placeDestination;
        request.open("GET", "/foodTypes/" + tour.foodTypeId, false);
        request.send();
        let foodType = JSON.parse(request.responseText);
        request.open("GET", "/roomTypes/" + tour.roomTypeId, false);
        request.send();
        let roomType = JSON.parse(request.responseText);
        tour.touristDestination = touristDestination
        tour.foodType = foodType
        tour.roomType = roomType
        var myObj = tour;
    }
    LoadTouristDestinations(myObj.touristDestinationId);
    document.getElementById("inputArrivalDate").value = myObj.tourArrivalDate;
    document.getElementById("inputDepartureDate").value = myObj.tourDepartureDate;
    document.getElementById("inputCost").value = myObj.tourCost;
    document.getElementById("inputNumberTransactions").value = myObj.tourNumberTransactions;
    LoadTransports(myObj.transportId);
    LoadTuorOperator(myObj.tourOperatorId);
    LoadFoodTypes(myObj.foodTypeId);
    LoadRoomTypes(myObj.roomTypeId);
    document.getElementById("inputNumberPersons").value = myObj.tourNumberPerson;
    ButtonEdit(tourID);
}

function DrawRating() {
    var ratingDivHTML = "";
    ratingDivHTML += "<h5>Рейтинг отеля не указан</h5>";
    ratingDivHTML += "<div class=\"progress\">";
    ratingDivHTML += "<div class=\"progress-bar progress-bar-striped bg-warning\" role=\"progressbar\" style=\"width: 100%\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>"
    ratingDivHTML += "</div>";
    document.getElementById("ratingDiv").innerHTML = ratingDivHTML;
}

var HotelAndCountryAndCityNameSearch = "";
var ArrivalDateSearch = "";
var NumberNightsSearch = "0";
var NumberPersonSearch = "0";
var PointDepartureSearch = "0";

function SearchTour() {
    HotelAndCountryAndCityNameSearch = document.getElementById("hotelAndCountryAndCityNameSearch").value;
    ArrivalDateSearch = document.getElementById("arrivalDateSearch").value;
    NumberNightsSearch = document.getElementById("numberNightsSearch").value;
    NumberPersonSearch = document.getElementById("numberPersonSearch").value;
    PointDepartureSearch = document.getElementById("pointDepartureSearch").value;

}
var x = "";

function DrawTour(myObj) {
    x += "<div class=\"row tour border-top\">";

    x += "<div class=\"col\">";
    x += "<img class=\"img-thumbnail\" src=\"" + "https://cdn.101hotels.ru/uploads/image/hotel/9595/569474.jpg" + "\" width=\"100%\" height=\"100%\">";
    x += "</div>";

    x += "<div class=\"col\">";
    x += "<h4>" + myObj.touristDestination.hotelName + "</h4>";
    if (myObj.touristDestination.numberStars != null) {
        for (var j = 0; j < myObj.touristDestination.numberStars; j++) {
            x += " <span class=\"icon star\"></span>";
        }
    }
    x += "<br>";
    x += "<img src=\"https://png.icons8.com/material/50/000000/worldwide-location.png\" width=\"18px\" height=\"18px\">";
    x += "<span class=\"sity\"> " + myObj.touristDestination.placeDestination.city + "</span>";
    x += "<h3 class=\"cost\">" + parseInt(myObj.tourCost * 62.0064) + " руб</h3>";
    x += "<br>";
    x += "<button type=\"button\" class=\"btn btn-outline-primary btn-block\" data-toggle=\"modal\" data-target=\"#tourInfoModal\" onclick=\"LoadTourInfo(\'" + myObj._id + "\');\">Просмотреть</button>";
    x += "</div>";

    x += "<div class=\"col tour_info\">";

    x += "<div class=\"align-middle d-flex flex-column bd-highlight mb-3\" style=\"height: 100%;\">";

    x += "<div class=\"p-2 bd-highlight\">";
    x += "<img src=\"https://png.icons8.com/android/50/000000/room.png\" width=\"18px\" height=\"18px\">";
    x += " Вид номера: <span>" + myObj.roomType.roomTypeName + "</span>";
    x += "</div>";
    x += "<div class=\"p-2 bd-highlight\">";
    x += "<img src=\"https://png.icons8.com/android/50/000000/restaurant.png\" width=\"18px\" height=\"18px\">";
    x += " Вид питания: <span>" + myObj.foodType.foodTypeName + "</span>";
    x += "</div>";

    x += "<div class=\"mt-auto p-2 bd-highlight ml-auto\">";
    if (RoleUser == "admin") {
        x += "<div class=\"dropdown\">";
        x += "<button class=\"btn btn-outline-primary dropdown-toggle\" type=\"button\" id=\"dropdownMenu2\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Действия</button>";
        x += "<div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu2\">";
        x += "<button class=\"dropdown-item\" type=\"button\" data-toggle=\"modal\" data-target=\"#exampleModal\" onclick=\"LoadTour(\'" + myObj._id + "\');\">Редактировать</button>";
        x += "<button class=\"dropdown-item\" type=\"button\" onclick=\"DeleteTour(" +
            myObj._id +
            ");\">Удалить</button>";
        x += "</div>";
        x += "</div>";
    }
    x += "</div>";

    x += "</div>";

    x += "</div>";

    x += "</div>";
}

function LoadTours() {
    var myObj, i = "";
    x = "";
    var request = new XMLHttpRequest();
    request.open("GET", "/all_tours/", false);
    request.send();

    myObj = JSON.parse(request.responseText);
    for (var iad = 0; iad < myObj.length; iad++) {
        let request = new XMLHttpRequest();
        request.open("GET", "/touristDestinations/" + myObj[iad].touristDestinationId, false);
        request.send();
        let touristDestination = JSON.parse(request.responseText);
        request.open("GET", "/foodTypes/" + myObj[iad].foodTypeId, false);
        request.send();
        let foodType = JSON.parse(request.responseText);
        request.open("GET", "/placeDestinations/" + touristDestination.placeDestinationId, false);
        request.send();
        let placeDestination = JSON.parse(request.responseText);
        touristDestination.placeDestination = placeDestination;
        request.open("GET", "/roomTypes/" + myObj[iad].roomTypeId, false);
        request.send();
        let roomType = JSON.parse(request.responseText);
        myObj[iad].touristDestination = touristDestination
        myObj[iad].foodType = foodType
        myObj[iad].roomType = roomType
    }
    x = "";
    if (HotelAndCountryAndCityNameSearch == "" && ArrivalDateSearch == "" && NumberNightsSearch == "0" && NumberPersonSearch == "0" && PointDepartureSearch == "0") {
        for (i in myObj) {
            DrawTour(myObj[i]);
        }
    } else {
        if (HotelAndCountryAndCityNameSearch == "") {
            for (i in myObj) {
                var arrivalDate = new Date(myObj[i].tourArrivalDate);
                var departureDate = new Date(myObj[i].tourDepartureDate);
                if (СomparingDates(myObj[i].tourArrivalDate) && NumberNightsSearch == NumberNights(arrivalDate, departureDate) && NumberPersonSearch == myObj[i].tourNumberPerson && PointDepartureSearch == myObj[i].pointDeparture) {
                    DrawTour(myObj[i]);
                }
            }
        }
        for (i in myObj) {
            var arrivalDate =
                new Date(myObj[i].tourArrivalDate);
            var
                epartureDate = new Date(myObj[i].tourDepartureDate);
            if ((HotelAndCountryAndCityNameSearch == myObj[i].touristDestination.hotelName || HotelAndCountryAndCityNameSearch == myObj[i].touristDestination.placeDestination.city || HotelAndCountryAndCityNameSearch == myObj[i].touristDestination.placeDestination.country) && СomparingDates(myObj[i].tourArrivalDate) && NumberNightsSearch == NumberNights(arrivalDate, departureDate) && NumberPersonSearch == myObj[i].tourNumberPerson && PointDepartureSearch == myObj[i].pointDeparture) {
                DrawTour(myObj[i]);
            }
        }
    }
    document.getElementById("blogsDiv").innerHTML = x;
    //LoadTour(null);
    if (RoleUser == "admin") {
        var html = "";
        html += "<button type=\"button\" class=\"btn btn-primary justify-content-end\" data-toggle=\"modal\" data-target=\"#exampleModal\" onclick=\"LoadTouristDestinations(null);LoadTuorOperator(null);LoadTransports(null);ButtonAdd();\">Добавить тур</button>";
        document.getElementById("addTourButton").innerHTML = html;
    } else {
        document.getElementById("addTourButton").innerHTML = "";
    }
}

function СomparingDates(otherDay) {
    var now = new Date()
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf()
    var other = otherDay.valueOf()
    if (other < today) {
        return false
    } else {
        return true
    }
}




function Login() {
    email = document.getElementById("EmailLogin").value;
    password = document.getElementById("PasswordLogin").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/Account/Login");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF8");
    document.getElementById("msgLogin").innerHTML = "";
    document.getElementById('formErrorLogin').innerHTML = "";
    xmlhttp.onload = function () {
        myObj = JSON.parse(this.responseText);
        if (myObj.error == undefined) {
            $('#loginModal').modal('hide');
            document.getElementById("msg").innerHTML = "";
            document.getElementById('formErrorLogin').innerHTML = "";
            document.getElementById('Email').innerHTML = "";
            GetCurrentUser();
        } else {
            document.getElementById('formErrorLogin').innerHTML = "";
            let html = "";
            html += ""
            html += "<div class=\"alert alert-danger\">";
            html += "<ul id=\"ulErrorLog\">";
            if (typeof myObj.error !== "undefined" && myObj.error.length > 0) {
                for (var i = 0; i < myObj.error.length; i++) {
                    html += "<li>" + myObj.error[i] + "</li>"
                }
            }
            html += "</ul>";
            html += "</div>"
            document.getElementById('formErrorLogin').innerHTML = html;
        }

        document.getElementById("msgLogin").innerHTML = myObj.message;
        document.getElementById("Password").value = "";
    };

    xmlhttp.send(JSON.stringify({
        email: email,
        password: password
    }));
    GetCurrentUser();
};

function Register() {
    email = document.getElementById("Email").value;
    password = document.getElementById("Password").value;
    passwordConfirm = document.getElementById("PasswordConfirm").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/account/Register");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF8");
    document.getElementById("msg").innerHTML = "";
    document.getElementById('formError').innerHTML = "";
    xmlhttp.onload = function () {
        myObj = JSON.parse(this.responseText);
        if (myObj.error == undefined) {
            $('#registerModal').modal('hide');
            document.getElementById("msg").innerHTML = "";
            document.getElementById('formError').innerHTML = "";
            document.getElementById('Email').innerHTML = "";
            GetCurrentUser();
        } else {
            document.getElementById('formError').innerHTML = "";
            let html = "";
            html += "<div class=\"alert alert-danger\">";
            html += "<ul id=\"ulErrorReg\">";
            if (myObj.error.length > 0) {
                for (var i = 0; i < myObj.error.length; i++) {
                    html += "<li>" + myObj.error[i] + "</li>"
                }
            }
            html += "</ul>";
            html += "</div>"
            document.getElementById('formError').innerHTML = html;
        }
        document.getElementById("msg").innerHTML = myObj.message;
        document.getElementById("Password").value = "";
        document.getElementById("PasswordConfirm").value = "";
    };
    // Запрос на сервер
    xmlhttp.send(JSON.stringify({
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    }));
};

function LoginOff() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "api/Account/LogOff", true);
    xmlhttp.onload = function () {
        GetCurrentUser();
    };
    xmlhttp.send();
}

function GetCurrentUser() {
    //var xmlhttp = new XMLHttpRequest();
    //xmlhttp.open("POST", "/api/Account/isAuthenticated", true);
    //xmlhttp.onload = function () {
    //AutenXmlHTTP = JSON.parse(xmlhttp.responseText);
    SetStatus(true, "Melnikov Maksim", "admin");
    LoadTours();
    //};
    //xmlhttp.send();
}
var NameUser = null;
var RoleUser = null;
function SetStatus(status, name, role) {
    if (status === false) {
        NameUser = null;
        RoleUser = null;
        UnLogMenu();
        UnLogDelsCard();
    }
    if (status === true) {
        NameUser = name;
        RoleUser = role;
        LogMenu(name);
        LogDelsCard(name);
    }
}
var SelectTour = "";

function LogDelsCard(name) {
    var DelsCardHTML = "";
    DelsCardHTML += "<div class=\"card-body\">";
    DelsCardHTML += "<form>";
    DelsCardHTML += "<div class=\"form-row\">";
    DelsCardHTML += "<div class=\"col-5\">";
    DelsCardHTML += "<label for=\"nameDelsInput\">Ваше имя*</label>";
    DelsCardHTML += "<input type=\"text\" class=\"form-control\" id=\"nameDelsInput\" required>";
    DelsCardHTML += "</div>";
    DelsCardHTML += "<div class=\"col\">";
    DelsCardHTML += "<label for=\"emailDelsInput\">Email*</label>";
    DelsCardHTML += "<input type=\"text\" class=\"form-control\" id=\"emailDelsInput\" value=\"" + name + "\" required>";
    DelsCardHTML += "</div>";
    DelsCardHTML += "<div class=\"col\">";
    DelsCardHTML += "<label for=\"phoneDelsInput\">Телефон*</label>";
    DelsCardHTML += "<input type=\"text\" class=\"form-control\" id=\"phoneDelsInput\" required>";
    DelsCardHTML += "</div>";
    DelsCardHTML += "</div>";
    DelsCardHTML += "<div class=\"form-group\">";
    DelsCardHTML += "<label for=\"commentDelsInput\">Ваш комментарий</label>";
    DelsCardHTML += "<textarea class=\"form-control\" id=\"commentDelsInput\" placeholder=\"Не более 500 символов\" rows=\"3\"></textarea>";
    DelsCardHTML += "</div>";
    DelsCardHTML += "<div class=\"row\">";
    DelsCardHTML += "<div class=\"col-5\">";
    DelsCardHTML += "<p style=\"font-weight:bold;\">";
    DelsCardHTML += "<img class=\"leftimg\" src=\"https://png.icons8.com/ios/100/000000/exclamation-mark.png\" width=\"40px\" height=\"40px\">Заявка не является бронированием. Менеджер уточнит наличие тура и свяжется с вами.</p>";
    DelsCardHTML += "</div>";
    DelsCardHTML += "<div class=\"d-flex col justify-content-end\">";
    DelsCardHTML += "<button id=\"buttomDelsEdit\" type=\"button\" class=\"btn btn-success\">Оставить заявку</button>";
    DelsCardHTML += "</div>";
    DelsCardHTML += "</div>";
    DelsCardHTML += "</form>";
    DelsCardHTML += "</div>";
    DelsCardHTML += "<div class=\"card-footer text-muted\">";
    DelsCardHTML += "<p class=\"small-text\">Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с <a href=\"\">политикой конфиденциальности</a>.</p>";
    DelsCardHTML += "</div>";
    document.getElementById("delsForm").innerHTML = DelsCardHTML;
    document.getElementById("buttomDelsEdit").onclick = function () {
        CreateDeal(name);
    }
}

function CreateDeal(name) {
    email = document.getElementById("inputArrivalDate").value;
    var now = new Date();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/Deals/");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        clientId: email,
        tourId: SelectTour,
        dealConclusionDate: now.toDateString(),
        dealDiscountRate: null,
        employeeId: null,
        conditionId: 1,
    }));
    LoadTours();
}

function CreateReting(touristDestinationsID) {
    ratingValue = document.getElementById("ratingSelect").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/Ratings/");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onload = function () {
        PostRatingMenu();
        DrawRating();
    }
    xmlhttp.send(JSON.stringify({
        userId: NameUser,
        touristDestinationsId: touristDestinationsID,
        ratingValue: ratingValue
    }));
}

function UnPostRatingMenu(touristDestinationsID) {
    var ratingButtomDivHTML = "";
    ratingButtomDivHTML += "<form>";
    ratingButtomDivHTML += "<div class=\"d-flex justify-content-end\">";
    ratingButtomDivHTML += "<div class=\"row\">";
    ratingButtomDivHTML += "<div class=\"col\">";
    ratingButtomDivHTML += "<select id=\"ratingSelect\" class=\"form-control form-control-sm\">";
    ratingButtomDivHTML += "<option value=\"1\">1</option>";
    ratingButtomDivHTML += "<option value=\"2\">2</option>";
    ratingButtomDivHTML += "<option value=\"3\">3</option>";
    ratingButtomDivHTML += "<option value=\"4\">4</option>";
    ratingButtomDivHTML += "<option value=\"5\">5</option>";
    ratingButtomDivHTML += "<option value=\"6\">6</option>";
    ratingButtomDivHTML += "<option value=\"7\">7</option>";
    ratingButtomDivHTML += "<option value=\"8\">8</option>";
    ratingButtomDivHTML += "<option value=\"9\">9</option>";
    ratingButtomDivHTML += "<option value=\"10\" selected>10</option>";
    ratingButtomDivHTML += "</select>";
    ratingButtomDivHTML += "</div>";
    ratingButtomDivHTML += "<div class=\"col\">";
    ratingButtomDivHTML += "<button id=\"ratingButtomSend\" type=\"button\" class=\"btn btn-warning btn-sm\">Оставить отзыв</button>";
    ratingButtomDivHTML += "</div>";
    ratingButtomDivHTML += "</div>";
    ratingButtomDivHTML += "</div>";
    ratingButtomDivHTML += "</form>";
    document.getElementById("ratingButtomDiv").innerHTML = ratingButtomDivHTML;
    document.getElementById("ratingButtomSend").onclick = function () {
        CreateReting(touristDestinationsID);
    }
}

function PostRatingMenu() {
    var ratingButtomDivHTML = "";
    ratingButtomDivHTML += "<div class=\"d-flex justify-content-end\">";
    ratingButtomDivHTML += "<h6 style=\"color:green\"><img src=\"https://png.icons8.com/metro/100/000000/checkmark.png\" width=\"23px\" height=\"23px\">Вы уже ставили свой отзыв</h6>";
    ratingButtomDivHTML += "</div>";
    document.getElementById("ratingButtomDiv").innerHTML = ratingButtomDivHTML;
}

function UnLogDelsCard() {
    var DelsCardHTML = "";
    DelsCardHTML += "<div class=\"d-flex justify-content-center card-dels\">";
    DelsCardHTML += "<h4 style=\"font-weight:bold;\">";
    DelsCardHTML += "<img class=\"leftimg\" src=\"https://png.icons8.com/ios/100/000000/high-priority.png\" width=\"40px\" height=\"40px\">Для оставления заявки требуеться регистрация.</h4>";
    DelsCardHTML += "</div>";
    document.getElementById("delsForm").innerHTML = DelsCardHTML;
}

function UnLogMenu() {
    var html = "";
    html += "<div class=\"d-flex flex-row bd-highlight\">";
    html += "<div class=\"p-2 bd-highlight\">";
    html += "<button type=\"button\" class=\"btn btn-block\" data-toggle=\"modal\" data-target=\"#registerModal\" style=\"background-color: #FFFF00;\"><img src=\"https://png.icons8.com/ultraviolet/50/000000/add-user-male.png\" weight=\"22px\" height=\"22px\">Зарегистрироваться</button>";
    html += "</div>";
    html += "<div class=\"p-2 bd-highlight\">";
    html +=
        "<button type=\"button\" class=\"btn btn-block\" data-toggle=\"modal\" data-target=\"#loginModal\" style=\"background-color: #FFFF00;\"><img src=\"https://png.icons8.com/ultraviolet/50/000000/enter-2.png\" weight=\"22px\" height=\"22px\">Войти</button>";
    html += "</div>";
    html += "</div>";
    document.getElementById("login").innerHTML = html;
    document.getElementById("registerBtn").addEventListener("click", Register);
    document.getElementById("loginBtn").addEventListener("click", Login);
}

function LogMenu(name) {
    var html = "";
    html += "<div class=\"btn-group\" role=\"group\">";
    html += "<button id=\"btnGroupDrop1\" type=\"button\" class=\"btn btn-light dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"  style=\"background-color: #FFFF00;\">";
    html += "<span class=\"navbar-toggler-icon\"></span>";
    html += "</button>";
    html += "<div class=\"dropdown-menu\" aria-labelledby=\"btnGroupDrop1\">";
    html += "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJeSURBVGhD7drfa45hHMfxx49N1NRSFKUm/8B25sDIgYgIpeYApZxJlJId4IScmTWhlFIK+dVaa0hrObMxP1KM4QglP/IjI7P3tzl6+lj3fT3Xve+l+dTrYPV0P5+7nntd3+u6SxEzDRtxEb14ittoQSP+iazHa/wewxVUI9nsxjBU+XIPcRdd2IbJSCIrkfUmlEuYAtdMxQuognnshWs2QBXL6x2q4JZbUMVCrIJLZuIXVKkQx+CSZVCFQnXCJfaAqkKhBuAS+ymoQqFewSXHoQqFcruRw1CFQj2ASzZDFQrl9rDPRcx/vwfhkoV4D1UqxBG4ZD9UoVB34JLYD/sgXLILqlCofrhkEVShUEfhEpvs7OegSuX1FfPhluX4AFUujx1wzwL8gCqYhdtPSuUmVMksGpBMQpcrfUgqtgnxEqrsWNYguayDKvs3tq+VbM5DlS73HXVINluhipdrR9I5AVW83HUkG3twf0IVVw5hNtwzHfaA25HBPYTu/z7GSazGuO7UL8Y5fIYqVgkb1NpgQ1thWQEbflSB2GyEvoCoC8l5uAr1hUX7hj2YhIpix2VvoL5kPF3GDATF9naHoC7s4RpyHwjNQYw5I7Z9yJVWqAt5+4QaZE6sEbYIS5A5lRxuFm0TMkddIBUT80Zibk7HthaZY7O0uog3G9xsrM4c29mws291MQ9PsAVBsTWWLdG/QF28aB9xFra8j/K+Si2acBrPUNTz8xYdaIaNCvbKVKGxgaoe9l7WTtjxwhnYsttm8Rvogb2vdR/P8ejP392wz5zCAWzHUszC/4ymVBoBFDNEae17I/kAAAAASUVORK5CYII=\" width=\"23px\" height=\"23px\">";
    html += "<span>" + name + "</span>";
    html += "<a class=\"dropdown-item\" href=\"#\">Мой аккаунт</a>";
    if (RoleUser == "admin") {
        html += "<a id=\"dealsListButton\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#DealsModal\">Все заявки</a>";
    } else {
        html += "<a id=\"dealsListButton\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#DealsModal\">Мои заявки</a>";
    }
    html += "<a id=\"login-off\"class=\"dropdown-item\" href=\"#\">Выйти</a>";
    html += "</div>";
    html += "</div>";
    document.getElementById("login").innerHTML = html;
    document.getElementById("login-off").addEventListener("click",
        LoginOff);
    document.getElementById("dealsListButton").addEventListener("click",
        DealsListDraw);
}

function DealsListDraw() {
    var deals = "";
    var request = new XMLHttpRequest();
    request.open("GET", "/api/Deals/", false);
    request.send();
    deals = JSON.parse(request.responseText);
    var dealsListDivHTML = "";
    for (const i in deals) {
        if (RoleUser == "admin") {
            dealsListDivHTML += "<div class=\"row\">";
            dealsListDivHTML += "<div class=\"col\">";
            dealsListDivHTML += deals[i].clientId;
            dealsListDivHTML += "</div>";
            dealsListDivHTML += "<div class=\"col\">";
            dealsListDivHTML += "<h6>" + deals[i].tour.touristDestination.hotelName + "</h6>";
            dealsListDivHTML += "</div>";
            dealsListDivHTML += "<div class=\"col\">";
            dealsListDivHTML += deals[i].tour.touristDestination.placeDestination.country + ", " + deals[i].tour.touristDestination.placeDestination.city;
            dealsListDivHTML += "</div>";
            dealsListDivHTML += "<div class=\"col\">";
            dealsListDivHTML += (deals[i].tour.tourCost * 62.0064) + " руб.";
            dealsListDivHTML += "</div>";
            dealsListDivHTML += "<div class=\"col\">";
            if (deals[i].condition.conditionName == "Обработка") {
                dealsListDivHTML += "<span class=\"badge badge-info\">" + deals[i].condition.conditionName + "</span>";
            }
            if (deals[i].condition.conditionName == "Одобрен") {
                dealsListDivHTML += "<span class=\"badge badge-success\">" + deals[i].condition.conditionName + "</span>";
            }
            dealsListDivHTML += "</div>";
            dealsListDivHTML += "</div>";
        } else {
            if (deals[i].clientId == NameUser) {
                dealsListDivHTML += "<div class=\"row\">";
                dealsListDivHTML += "<div class=\"col\">";
                dealsListDivHTML += "<h6>" + deals[i].tour.touristDestination.hotelName + "</h6>";
                dealsListDivHTML += "</div>";
                dealsListDivHTML += "<div class=\"col\">";
                dealsListDivHTML += deals[i].tour.touristDestination.placeDestination.country + ", " + deals[i].tour.touristDestination.placeDestination.city;
                dealsListDivHTML += "</div>";
                dealsListDivHTML += "<div class=\"col\">";
                dealsListDivHTML += (deals[i].tour.tourCost * 62.0064) + " руб.";
                dealsListDivHTML += "</div>";
                dealsListDivHTML += "<div class=\"col\">";
                if (deals[i].condition.conditionName == "Обработка") {
                    dealsListDivHTML += "<span class=\"badge badge-info\">" + deals[i].condition.conditionName + "</span>";
                }
                if (deals[i].condition.conditionName == "Одобрен") {
                    dealsListDivHTML += "<span class=\"badge badge-success\">" + deals[i].condition.conditionName + "</span>";
                }
                dealsListDivHTML += "</div>";
                dealsListDivHTML += "</div>";
            }
        }
    }
    if (dealsListDivHTML == "") {
        dealsListDivHTML += "<h5>Заявок нет</h5>"
    }
    document.getElementById("dealsListDiv").innerHTML = dealsListDivHTML;
}
window.setInterval(GetCurrentUser, 5000);