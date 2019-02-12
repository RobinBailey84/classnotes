/**
 * Created by user on 26/11/2017.
 */
public class MechaStreisand extends Kaiju {

    public MechaStreisand(String name, int healthValue, int attackValue){
        super(name, healthValue, attackValue);
    }

    public String roar(){
        return "Bar-Bura! Bar-Bura!";
    }

    public String move(){
        return "Mecha Streisand stomps all in her path ";
    }
}
