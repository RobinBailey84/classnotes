/**
 * Created by user on 26/11/2017.
 */
public class Godzilla extends Kaiju  {

    public Godzilla(String name, int healthValue, int attackValue){
        super(name, healthValue, attackValue);
    }

    public String roar(){
        return "Raaaaaaaarrrr!!!";
    }

    public String move(){
        return "Godzilla's mighty plates of meat cause untold damage to buildings & vehicles";
    }

}
