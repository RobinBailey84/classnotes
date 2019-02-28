package models;


public class Gunner {

    private int ammo;

    public Gunner() {
    }


    public int getAmmo() {
        return ammo;
    }

    public void setAmmo(int ammo) {
        this.ammo = ammo;
    }

    public void fireCannon(){
        this.ammo = this.ammo -1;
    }
}
