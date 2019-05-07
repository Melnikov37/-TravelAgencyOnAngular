export class TouristDestinations {
    constructor(hostelName, numberStars, placeDestinationId, hotelSite, hotelPhone, hotelFax, hotelEmail, numberOfRooms, distanceToAirport, descriptionHotel) {
        this.hostelName = hostelName;
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