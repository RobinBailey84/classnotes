import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import static org.junit.Assert.assertEquals;

public class FlightManagerTest {
    private Flight flight;
    private Plane plane;

    @Before
    public void setUp() {
        plane = new Plane(PlaneType.BOEING747);
        Date date = new GregorianCalendar(2018, Calendar.OCTOBER, 12).getTime();
        flight = new Flight(new ArrayList<>(), plane, "FR756", AirportCode.GLA,
                            AirportCode.EDI, date);
    }

    @Test
    public void shouldStartWithEmptyBaggageWeight() {
        assertEquals(0, FlightManager.baggageWeight(flight, 30));
    }

    @Test
    public void shouldIncreaseBaggageWeightAsPassengersAdded() {
        flight.bookPassenger(new Passenger("Ally", 1));
        flight.bookPassenger(new Passenger("Bell", 2));
        flight.bookPassenger(new Passenger("Louise", 3));
        assertEquals(180, FlightManager.baggageWeight(flight, 30));
    }

    @Test
    public void shouldStartWithHalfPlaneWeightReservedForBaggage() {
        assertEquals(5000, FlightManager.remainingBaggageWeight(flight));
    }

    @Test
    public void shouldDecreaseBaggageWeightRemainingAsPassengersAddedToFlight() {
        flight.bookPassenger(new Passenger("Pat", 1));
        flight.bookPassenger(new Passenger("Pete", 2));
        flight.bookPassenger(new Passenger("Pim", 3));
        assertEquals(4820, FlightManager.remainingBaggageWeight(flight));
    }

    @Test
    public void shouldBeAbleToFindBaggageWeightPerPerson() {
        assertEquals(25, FlightManager.baggageWeightPerPerson(flight));
    }

    @Test
    public void canSortPassengersOfFlightBySeatNumber() {
        // add a bunch of passengers (arrange)
        for (int i = 0; i < 400; i++){
            Passenger passenger = new Passenger("Paul", 1);
            flight.bookPassenger(passenger);
        }

        // sort the passengers (act)
        FlightManager.sortBySeatNumber(flight);

        // check all the passengers are ordered by seat number (assert)
        boolean isSorted = true;
        int top = flight.passengerCount();
        for (int i = 0; i < top - 1; i++){
            int seatNumber = flight.getPassengerList().get(i).getSeatNumber();
            int nextSeatNumber = flight.getPassengerList().get(i + 1).getSeatNumber();
            if (seatNumber > nextSeatNumber) {
                isSorted = false;
            }
        }

        // (assert)
        assertEquals(true, isSorted);
    }

    @Test
    public void canSearchForPassengerBySeatNumber() {
        // add a bunch of passengers (arrange)
        for (int i = 0; i < 399; i++){
            Passenger passenger = new Passenger("Terry", 1);
            flight.bookPassenger(passenger);
        }
        // add a passenger with a non random seat number
        Passenger passengerToFind = new Passenger("Bingo", 1);
        passengerToFind.setSeatNumber(400);
        flight.addPassenger(passengerToFind);

        // sort and find (act)
        Passenger result = FlightManager.sortAndFindBySeatNumber(flight, 400);

        // (assert)
        assertEquals(passengerToFind, result);
    }
}
