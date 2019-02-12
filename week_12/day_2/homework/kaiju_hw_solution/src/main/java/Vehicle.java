/**
 * Created by user on 26/11/2017.
 */
public abstract class Vehicle implements IDamage {

    private String type;
    private int healthValue;
    private int attackValue;

    public Vehicle(String type, int healthValue, int attackValue){
        this.type = type;
        this.healthValue = healthValue;
        this.attackValue = attackValue;

    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getHealthValue() {
        return healthValue;
    }

    public void setHealthValue(int healthValue) {
        this.healthValue = healthValue;
    }

    public int getAttackValue() {
        return attackValue;
    }

    public void setAttackValue(int attackValue) {
        this.attackValue = attackValue;
    }

    public void takeDamage(int attack){
        this.healthValue -= attack;
    }

    public void attackKaijuSmallArms(Kaiju kaiju){
        kaiju.takeDamage(this.attackValue);
    }

    public void attackKaijuBigGuns(Kaiju kaiju){
        kaiju.takeDamage(this.attackValue * 2);
    }
}
