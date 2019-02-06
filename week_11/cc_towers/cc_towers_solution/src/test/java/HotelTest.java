import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

public class HotelTest {

    Hotel hotel;
    Bedroom singleRoom;
    Bedroom doubleRoom;
    ConferenceRoom conferenceRoom;
    DiningRoom diningRoom;
    Guest guest1;
    Guest guest2;
    Guest guest3;

    @Before
    public void setUp() {
        hotel = new Hotel();
        singleRoom = new Bedroom(1,1, "single", 25.50);
        doubleRoom = new Bedroom(2, 2, "double", 30.00);
        conferenceRoom = new ConferenceRoom(2, "Conference Room 1");
        diningRoom = new DiningRoom(2, "Family Dining");
        guest1 = new Guest();
        guest2 = new Guest();
        guest3 = new Guest();
        hotel.addBedroom(singleRoom);
        hotel.addBedroom(doubleRoom);
        hotel.addConferenceRoom(conferenceRoom);
        hotel.addDiningRoom(diningRoom);
    }

    @Test
    public void canFindABedroom() {
        Bedroom foundRoom = hotel.findBedroom(1);
        assertEquals(singleRoom, foundRoom);
    }

    @Test
    public void cantFindABedroom() {
        Bedroom nonExistantRoom = hotel.findBedroom(5);
        assertNull(nonExistantRoom);
    }

    @Test
    public void canFindADiningRoom() {
        DiningRoom foundRoom = hotel.findDiningroom("Family Dining");
        assertEquals(diningRoom, foundRoom);
    }

    @Test
    public void cantFindADiningRoom() {
        DiningRoom nonExistantDiningRoom = hotel.findDiningroom("McDonalds");
        assertNull(nonExistantDiningRoom);
    }

    @Test
    public void canFindAConferenceRoom() {
        ConferenceRoom foundRoom = hotel.findConferenceroom("Conference Room 1");
        assertEquals(conferenceRoom, foundRoom);
    }

    @Test
    public void cantFindAConferenceRoom() {
        ConferenceRoom nonExistantConferenceRoom = hotel.findConferenceroom("Fake Room");
        assertNull(nonExistantConferenceRoom);
    }

    @Test
    public void canCheckGuestsIntoBedroom() {
        ArrayList<Guest> guests = new ArrayList<Guest>();
        guests.add(guest1);
        hotel.checkGuestsIntoBedroom(1, guests);
        assertEquals(1, singleRoom.guestListSize());

    }

    @Test
    public void cantCheckGuestsIntoBedroom() {
        ArrayList<Guest> guests = new ArrayList<Guest>();
        guests.add(guest1);
        guests.add(guest2);
        hotel.checkGuestsIntoBedroom(1, guests);
        assertEquals(1, singleRoom.guestListSize());
    }

    @Test
    public void canCheckGuestsOutOfBedroom() {
        ArrayList<Guest> guests = new ArrayList<Guest>();
        guests.add(guest1);
        hotel.checkOutGuestsFromBedroom(1);
        assertEquals(0, singleRoom.guestListSize());
    }

    @Test
    public void canBookRoom() {
        Booking booking = hotel.bookRoom(singleRoom, 2);
        assertEquals(51, booking.getTotalBill(), 0.01);
    }

    @Test
    public void canFindVacantBedrooms() {
        ArrayList<Guest> guests = new ArrayList<Guest>();
        guests.add(guest1);
        hotel.checkGuestsIntoBedroom(1, guests);
        ArrayList<Bedroom> vacantRooms = hotel.findVacantBedrooms();
        assert(vacantRooms.contains(doubleRoom));
    }
}
