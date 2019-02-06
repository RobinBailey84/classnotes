import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class ConferenceRoomTest {

    ConferenceRoom conferenceRoom;
    Guest guest1;
    Guest guest2;
    Guest guest3;

    @Before
    public void setUp() {
        conferenceRoom = new ConferenceRoom(2, "Conference Room 1");
        guest1 = new Guest();
        guest2 = new Guest();
        guest3 = new Guest();
    }

    @Test
    public void guestListStartsAt0() {
        assertEquals(0, conferenceRoom.guestListSize());
    }

    @Test
    public void canCheckInGuest() {
        conferenceRoom.checkInGuest(guest1);
        assertEquals(1, conferenceRoom.guestListSize());
    }

    @Test
    public void cantCheckInGuest() {
        conferenceRoom.checkInGuest(guest1);
        conferenceRoom.checkInGuest(guest2);
        conferenceRoom.checkInGuest(guest3);
        assertEquals(2, conferenceRoom.guestListSize());
    }
}
