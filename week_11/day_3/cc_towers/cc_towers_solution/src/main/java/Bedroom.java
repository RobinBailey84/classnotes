import java.util.ArrayList;

public class Bedroom {

    private int roomNo;
    private int capacity;
    private String type;
    private double nightlyRate;
    private ArrayList<Guest> guests;

    public Bedroom(int roomNo, int capacity, String type, double nightlyRate) {
        this.roomNo = roomNo;
        this.capacity = capacity;
        this.type = type;
        this.nightlyRate = nightlyRate;
        this.guests = new ArrayList<Guest>();
    }

    public int getRoomNo() {
        return roomNo;
    }

    public int getCapacity() {
        return capacity;
    }

    public String getType() {
        return type;
    }

    public int guestListSize(){
        return this.guests.size();
    }

    public double getNightlyRate() {
        return nightlyRate;
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
