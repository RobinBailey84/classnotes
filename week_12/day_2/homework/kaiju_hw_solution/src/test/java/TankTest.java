import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

/**
 * Created by user on 26/11/2017.
 */
public class TankTest {

    Godzilla godzilla;
    Tank tank;

    @Before
    public void before() {
        godzilla = new Godzilla("Godzilla", 100, 30);
        tank = new Tank("Tank", 50, 10);
    }

    @Test
    public void hasName() {
        assertEquals("Tank", tank.getType());
    }

    @Test
    public void hasHealthValue(){
        assertEquals(50, tank.getHealthValue());
    }

    @Test
    public void hasAttackValue(){
        assertEquals(10, tank.getAttackValue());
    }

    @Test
    public void canAttackKaijuWithSmallArms(){
        tank.attackKaijuSmallArms(godzilla);
        assertEquals(90, godzilla.getHealthValue());
    }

    @Test
    public void canAttackKaijuWithBigGuns(){
        tank.attackKaijuBigGuns(godzilla);
        assertEquals(80, godzilla.getHealthValue());
    }
}
