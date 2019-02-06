import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class BedroomTest {

    Bedroom bedroom;
    Guest guest1;
    Guest guest2;
    Guest guest3;


    @Before
    public void setUp() {
        bedroom = new Bedroom(1, 2, "double", 55.00);
        guest1 = new Guest();
        guest2 = new Guest();
        guest3 = new Guest();
    }

    @Test
    public void guestListStartsAt0() {
        assertEquals(0, bedroom.guestListSize());
    }

    @Test
    public void canCheckInGuest() {
        bedroom.checkInGuest(guest1);
        assertEquals(1, bedroom.guestListSize());
    }

    @Test
    public void cantCheckInGuest() {
        bedroom.checkInGuest(guest1);
        bedroom.checkInGuest(guest2);
        bedroom.checkInGuest(guest3);
        assertEquals(2, bedroom.guestListSize());
    }
}
