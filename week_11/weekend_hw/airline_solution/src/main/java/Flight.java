import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

public class Flight {
    private List<Passenger> passengerList;
    private Plane plane;
    private String flightNumber;
    private AirportCode departureAirport;
    private AirportCode destination;
    private Date departureTime;
    private ArrayList<Integer> remainingSeatNumbers;

    public Flight(List<Passenger> passengerList, Plane plane, String flightNumber, AirportCode departureAirport, AirportCode destination, Date departureTime) {
        this.passengerList = passengerList;
        this.plane = plane;
        this.flightNumber = flightNumber;
        this.departureAirport = departureAirport;
        this.destination = destination;
        this.departureTime = departureTime;
        this.remainingSeatNumbers = generateRemainingSeatNumbers();
    }

    private ArrayList<Integer> generateRemainingSeatNumbers() {
        ArrayList<Integer> result = new ArrayList<>();
        for (int i = 0; i < capacity(); i++){
            result.add(i);
        }
        return result;
    }

    public List<Passenger> getPassengerList() {
        return new ArrayList<>(passengerList);
    }

    public Plane getPlane() {
        return plane;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public AirportCode getDepartureAirport() {
        return departureAirport;
    }

    public AirportCode getDestination() {
        return destination;
    }

    public Date getDepartureTime() {
        return departureTime;
    }

    public int capacity() {
        return plane.capacity();
    }

    public int passengerCount() {
        return passengerList.size();
    }

    public void updatePassengerDetails(Passenger passenger){
        Random random = new Random();
        int randomIndex = random.nextInt(this.remainingSeatNumbers.size());
        int seatNumber = this.remainingSeatNumbers.remove(randomIndex);
        passenger.setFlight(this);
        passenger.setSeatNumber(seatNumber);
    }

    public void addPassenger(Passenger passenger){
        this.passengerList.add(passenger);
    }

    public void bookPassenger(Passenger passenger) {
        if (!isAtCapacity()){
            updatePassengerDetails(passenger);
            addPassenger(passenger);
        }
    }

    public int remainingSeats() {
        return this.capacity() - this.passengerCount();
    }

    public boolean isAtCapacity() {
        return this.capacity() == this.passengerCount();
    }

    public void replacePassenger(int index, Passenger passenger){
        this.passengerList.set(index, passenger);
    }
}
