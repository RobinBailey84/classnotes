import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import static org.junit.Assert.assertEquals;

public class PassengerTest {
    private Passenger passenger;

    @Before
    public void setUp() {
        passenger = new Passenger("Kane",  2);
    }

    @Test
    public void hasName() {
        assertEquals("Kane", passenger.getName());
    }

    @Test
    public void hasNumberOfBags() {
        assertEquals(2, passenger.getNumberOfBags());
    }

    @Test
    public void canSetFlight() {
        Plane plane = new Plane(PlaneType.BOEING747);
        Date date = new GregorianCalendar(2018, Calendar.OCTOBER, 12).getTime();
        Flight flight = new Flight(
                new ArrayList<>(),
                plane,
                "FR756",
                AirportCode.GLA,
                AirportCode.EDI,
                date
        );

        passenger.setFlight(flight);
        assertEquals(flight, passenger.getFlight());
    }
}
