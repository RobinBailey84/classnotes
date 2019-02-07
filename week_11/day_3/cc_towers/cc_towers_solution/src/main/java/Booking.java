public class Booking {

    private int noNights;
    private Bedroom bedroom;

    public Booking(int noNights, Bedroom bedroom) {
        this.noNights = noNights;
        this.bedroom = bedroom;
    }

    public int getNoNights() {
        return noNights;
    }

    public Bedroom getBedroom() {
        return bedroom;
    }

    public double getTotalBill(){
        return this.noNights * this.bedroom.getNightlyRate();
    }
}


