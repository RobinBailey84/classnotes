import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class DiningRoomTest {

    DiningRoom diningRoom;
    Guest guest1;
    Guest guest2;
    Guest guest3;

    @Before
    public void setUp() {
        diningRoom = new DiningRoom(2, "Family Dining");
        guest1 = new Guest();
        guest2 = new Guest();
        guest3 = new Guest();
    }

    @Test
    public void guestListStartsAt0() {
        assertEquals(0, diningRoom.guestListSize());
    }

    @Test
    public void canCheckInGuest() {
        diningRoom.checkInGuest(guest1);
        assertEquals(1, diningRoom.guestListSize());
    }

    @Test
    public void cantCheckInGuest() {
        diningRoom.checkInGuest(guest1);
        diningRoom.checkInGuest(guest2);
        diningRoom.checkInGuest(guest3);
        assertEquals(2, diningRoom.guestListSize());
    }
}
