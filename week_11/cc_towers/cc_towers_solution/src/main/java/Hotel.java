import java.util.ArrayList;

public class Hotel {

    private ArrayList<Bedroom> bedrooms;
    private ArrayList<DiningRoom> diningRooms;
    private ArrayList<ConferenceRoom> conferenceRooms;

    public Hotel() {
        this.bedrooms = new ArrayList<Bedroom>();
        this.diningRooms = new ArrayList<DiningRoom>();
        this.conferenceRooms = new ArrayList<ConferenceRoom>();
    }

    public void addBedroom(Bedroom bedroom){
        this.bedrooms.add(bedroom);
    }

    public void addDiningRoom(DiningRoom diningRoom){
        this.diningRooms.add(diningRoom);
    }

    public void addConferenceRoom(ConferenceRoom conferenceRoom){
        this.conferenceRooms.add(conferenceRoom);
    }

    public Bedroom findBedroom(int roomNumber){
        Bedroom foundRoom = null;
        for (Bedroom bedroom : this.bedrooms){
            if (bedroom.getRoomNo() == roomNumber){
                foundRoom = bedroom;
            }
        }
        return foundRoom;
    }


    public void checkGuestsIntoBedroom(int roomNumber, ArrayList<Guest> guests){
        Bedroom bedroom = findBedroom(roomNumber);
        if (bedroom != null && bedroom.guestListSize() == 0){
            for (Guest guest: guests) {
                bedroom.checkInGuest(guest);
            }
        }
    }

    public void checkOutGuestsFromBedroom(int roomNumber){
        Bedroom bedroom = findBedroom(roomNumber);
        if(bedroom != null){
            bedroom.checkOutGuests();
        }

    }

    public DiningRoom findDiningroom(String name){
        DiningRoom foundRoom = null;
        for(DiningRoom diningRoom : this.diningRooms) {
            if (diningRoom.getName() == name) {
                foundRoom = diningRoom;
            }
        }
        return foundRoom;
    }

    public void checkGuestsIntoDiningRoom(String name, ArrayList<Guest> guests){
        DiningRoom diningRoom = findDiningroom(name);
        if(diningRoom != null){
            for(Guest guest : guests){
                diningRoom.checkInGuest(guest);
            }
        }
    }

    public void checkOutGuestsFromDiningRoom(String name){
        DiningRoom diningRoom = findDiningroom(name);
        if(diningRoom != null){
            diningRoom.checkOutGuests();
        }
    }

    public ConferenceRoom findConferenceroom(String name){
        ConferenceRoom foundRoom = null;
        for(ConferenceRoom conferenceRoom: this.conferenceRooms) {
            if (conferenceRoom.getName() == name) {
                foundRoom = conferenceRoom;
            }
        }
        return foundRoom;
    }

    public void checkGuestsIntoConference(String name, ArrayList<Guest> guests){
        ConferenceRoom conferenceRoom = findConferenceroom(name);
        if(conferenceRoom != null){
            for(Guest guest : guests){
                conferenceRoom.checkInGuest(guest);
            }
        }
    }

    public void checkOutGuestsFromConferenceRoom(String name){
        ConferenceRoom conferenceRoom = findConferenceroom(name);
        if(conferenceRoom!= null){
            conferenceRoom.checkOutGuests();
        }
    }

    public Booking bookRoom(Bedroom bedroom, int noNights){
        Booking booking = new Booking(noNights, bedroom);
        return booking;
    }

    public ArrayList<Bedroom> findVacantBedrooms(){
        ArrayList<Bedroom> vacantRooms = new ArrayList<Bedroom>();
        for (Bedroom bedroom : this.bedrooms){
            if(bedroom.guestListSize() == 0){
                vacantRooms.add(bedroom);
            }
        }
        return vacantRooms;
    }



}
