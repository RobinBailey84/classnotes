import db.DBHelper;
import db.DBPirate;
import db.DBRaid;
import db.DBShip;
import models.*;

import java.util.List;

public class Runner {

    public static void main(String[] args) {

        Ship pearl = new Ship("The Black Pearl");
        DBHelper.save(pearl);

        Ship dutchman = new Ship("The Flying Dutchman");
        DBHelper.save(dutchman);

        Captain captain1 = new Captain("Jack", "Sparrow", 32, Weapon.CUTLASS, 100, pearl);
        DBHelper.save(captain1);
        Captain captain2 = new Captain("Davey", "Jones", 154, Weapon.CUTLASS, 39, dutchman);
        DBHelper.save(captain2);

        Raid raid1 = new Raid("Tortuga", 200);
        DBHelper.save(raid1);

        Gunner gunner = new Gunner("Joshua", "Gibbs", 56, Weapon.CANNON, pearl, 100);
        DBHelper.save(gunner);

        DeckHand deckHand = new DeckHand("Edward", "Norrington", 34, Weapon.CUTLASS, pearl);
        DBHelper.save(deckHand);

        List<Pirate> pirates = DBHelper.getAll(Pirate.class);

        List<Gunner> gunners = DBHelper.getAll(Gunner.class);
        List<DeckHand> deckhands = DBHelper.getAll(DeckHand.class);

        Gunner foundGunner = DBHelper.find(Gunner.class, gunner.getId());

        DeckHand foundDeckHand = DBHelper.find(DeckHand.class, deckHand.getId());

        DBPirate.addPirateToRaid(gunner, raid1);
        DBPirate.addPirateToRaid(deckHand, raid1);

        List<Pirate> raidPirates = DBRaid.getRaidPirates(raid1);
        }
}
