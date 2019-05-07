export class Tours {
    constructor(tourArrivalDate, tourDepartureDate, tourCost, tourNumberTransactions, touristDestinationId, tourOperatorId, transportId, tourNumberPersons, foodTypeId, roomTypeId, pointDeparture) {
        this.tourArrivalDate = tourArrivalDate;
        this.tourDepartureDate = tourDepartureDate;
        this.tourCost = tourCost;
        this.tourNumberTransactions = tourNumberTransactions;
        this.touristDestinationId = touristDestinationId;
        this.tourOperatorId = tourOperatorId;
        this.transportId = transportId;
        this.tourNumberPersons = tourNumberPersons;
        this.foodTypeId = foodTypeId;
        this.roomTypeId = roomTypeId;
        this.pointDeparture = pointDeparture;
    }

    setTouristDestination(touristDestination) {
        this.touristDestination = touristDestination;
    }
    setFoodType(foodType) {
        this.foodType = foodType;
    }
    setRoomType(roomType) {
        this.roomType = roomType;
    }
}