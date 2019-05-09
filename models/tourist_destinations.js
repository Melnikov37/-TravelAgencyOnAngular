export class TouristDestinations {
    constructor(hotelName, numberStars, placeDestinationId, hotelSite, hotelPhone, hotelFax, hotelEmail, numberOfRooms, distanceToAirport, descriptionHotel) {
        this.hotelName = hotelName;
        this.numberStars = numberStars;
        this.placeDestinationId = placeDestinationId;
        this.hotelSite = hotelSite;
        this.hotelPhone = hotelPhone;
        this.hotelFax = hotelFax;
        this.hotelEmail = hotelEmail;
        this.numberOfRooms = numberOfRooms;
        this.distanceToAirport = distanceToAirport;
        this.descriptionHotel = descriptionHotel;
    }

    setPlaceDestination(placeDestination) {
        this.placeDestination = placeDestination;
    }
}