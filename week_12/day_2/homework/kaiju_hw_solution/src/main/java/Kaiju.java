/**
 * Created by user on 26/11/2017.
 */
public abstract class Kaiju implements IDamage{

    private String name;
    private int healthValue;
    private int attackValue;

    public Kaiju(String name, int healthValue, int attackValue){
        this.name = name;
        this.healthValue = healthValue;
        this.attackValue = attackValue;
    }

    public String getName() {
        return name;
    }

    public int getHealthValue() {
        return healthValue;
    }

    public int getAttackValue() {
        return attackValue;
    }

    public void attackVehicle(Vehicle vehicle){
        vehicle.takeDamage(attackValue);
    }

    public void damageBuilding(Building building){
        building.takeDamage(40);
    }

    public void takeDamage(int attack){
        this.healthValue -= attack;
    }

    public abstract String roar();

    public abstract String move();


}
