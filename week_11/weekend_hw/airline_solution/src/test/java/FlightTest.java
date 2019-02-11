import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import static org.junit.Assert.assertEquals;

public class FlightTest {
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
    public void hasPassengerCollection() {
        assertEquals(new ArrayList<Passenger>(), flight.getPassengerList());
    }

    @Test
    public void hasEmptyPassengerCollection() {
        assertEquals(0, flight.passengerCount());
    }

    @Test
    public void hasPlane() {
        assertEquals(plane, flight.getPlane());
    }

    @Test
    public void hasFlightNumber() {
        assertEquals("FR756", flight.getFlightNumber());
    }

    @Test
    public void hasDepartureAirport() {
        assertEquals(AirportCode.GLA, flight.getDepartureAirport());
    }

    @Test
    public void hasDestination() {
        assertEquals(AirportCode.EDI, flight.getDestination());
    }

    @Test
    public void hasDepartureTime() {
        Date date = new GregorianCalendar(2018, Calendar.OCTOBER, 12).getTime();
        assertEquals(date, flight.getDepartureTime());
    }

    @Test
    public void shouldStartWithCapacityRemainingSeats() {
        assertEquals(400, flight.remainingSeats());
    }

    @Test
    public void canAddPassengerToFlight() {
        Passenger passenger = new Passenger("Kane", 2);
        flight.bookPassenger(passenger);
        assertEquals(1, flight.passengerCount());
    }

    @Test
    public void shouldReduceCapacityWhenPassengerBooked() {
        Passenger passenger = new Passenger("Kane", 2);
        flight.bookPassenger(passenger);
        assertEquals(399, flight.remainingSeats());
    }

    @Test
    public void shouldNotAddPassengerIfFlightAtCapacity() {
        Passenger passenger = new Passenger("Kane", 2);
        for (int i = 0; i < 1000; i++) {
            flight.bookPassenger(passenger);
        }

        assertEquals(400, flight.passengerCount());
    }
}
