import org.junit.Before;
import org.junit.Test;

import static com.sun.xml.internal.ws.dump.LoggingDumpTube.Position.Before;
import static org.junit.Assert.assertEquals;

/**
 * Created by user on 26/11/2017.
 */
public class GodzillaTest {

    Godzilla godzilla;
    Tank tank;

    @Before
    public void before() {
        godzilla = new Godzilla("Godzilla", 100, 30);
        tank = new Tank("Tank", 50, 10);
    }

    @Test
    public void hasName() {
        assertEquals("Godzilla", godzilla.getName());
    }

    @Test
    public void hasHealthValue(){
        assertEquals(100, godzilla.getHealthValue());
    }

    @Test
    public void hasAttackValue(){
        assertEquals(30, godzilla.getAttackValue());
    }

    @Test
    public void canRoar(){
        assertEquals("Raaaaaaaarrrr!!!", godzilla.roar());
    }

    @Test
    public void canAttackVehicle(){
        godzilla.attackVehicle(tank);
        assertEquals(20, tank.getHealthValue());
    }

    @Test
    public void canMove(){
        assertEquals("Godzilla's mighty plates of meat cause untold damage to buildings & vehicles", godzilla.move());
    }


}
