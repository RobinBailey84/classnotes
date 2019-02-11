import java.util.List;

public class FlightManager {
    public static int baggageWeight(Flight flight, int weightPerBag){
        int total = 0;
        for (Passenger passenger : flight.getPassengerList()){
            total += passenger.getNumberOfBags();
        }
        return total * weightPerBag;
    }

    public static int remainingBaggageWeight(Flight flight) {
        int reservedForBaggageAmount = flight.getPlane().totalWeight() / 2;
        return reservedForBaggageAmount - baggageWeight(flight, baggageWeightPerPerson(flight));
    }

    public static int baggageWeightPerPerson(Flight flight){
        return flight.getPlane().totalWeight() / flight.capacity();
    }

    public static void sortBySeatNumber(Flight flight) {
        for (int i = 0; i < flight.passengerCount(); i++){
            boolean isSorted = true;
            for (int j = 1; j < flight.passengerCount(); j++){
                int prevPassengerSeatNumber = flight.getPassengerList().get(j - 1).getSeatNumber();
                int passengerSeatNumber = flight.getPassengerList().get(j).getSeatNumber();
                if (prevPassengerSeatNumber > passengerSeatNumber) {
                    Passenger temp = flight.getPassengerList().get(j - 1);
                    flight.replacePassenger(j - 1, flight.getPassengerList().get(j));
                    flight.replacePassenger(j, temp);
                    isSorted = false;
                }
            }
            if (isSorted) break;
        }
    }

    public static Passenger sortAndFindBySeatNumber(Flight flight, int seatNumberToFind) {
        sortBySeatNumber(flight);
        return findBySeatNumber(flight.getPassengerList(), seatNumberToFind);
    }

    public static Passenger findBySeatNumber(List<Passenger> passengers, int seatNumberToFind){
        int middleIndex = passengers.size() / 2;
        int passengerSeatNumber = passengers.get(middleIndex).getSeatNumber();
        if (passengerSeatNumber == seatNumberToFind){
            Passenger passenger = passengers.get(middleIndex);
            return passenger;
        }
        if (seatNumberToFind < passengerSeatNumber){
            List<Passenger> newList = passengers.subList(0, middleIndex);
            return findBySeatNumber(newList, seatNumberToFind);
        }
        if (seatNumberToFind > passengerSeatNumber){
            List<Passenger> newList = passengers.subList(middleIndex, passengers.size());
            return findBySeatNumber(newList, seatNumberToFind);
        }
        return null;
    }
}
