import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

/**
 * Created by user on 26/11/2017.
 */
public class BuildingTest {

    Godzilla godzilla;
    Building skyScraper;

    @Before
    public void before() {
        godzilla = new Godzilla("Godzilla", 100, 30);
        skyScraper = new Building(100);
    }

    @Test
    public void hasStructutalIntegrity() {
        assertEquals(100, skyScraper.getStructuralIntegrity());
    }

    @Test
    public void canSustainDamage(){
        godzilla.damageBuilding(skyScraper);
        assertEquals(60, skyScraper.getStructuralIntegrity());
    }
}
