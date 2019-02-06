import java.util.ArrayList;

public class DiningRoom {

    private int capacity;
    private String name;
    private ArrayList<Guest> guests;

    public DiningRoom(int capacity, String name) {
        this.capacity = capacity;
        this.name = name;
        this.guests = new ArrayList<Guest>();
    }

    public int getCapacity() {
        return capacity;
    }

    public String getName() {
        return name;
    }

    public int guestListSize(){
        return this.guests.size();
    }

    public void checkInGuest(Guest guest){
        if(this.guestListSize() < this.capacity){
            this.guests.add(guest);
        }
    }

    public void checkOutGuests(){
        if(this.guestListSize() > 0){
            this.guests.clear();
        }
    }
}
