import Animal.Air.Bird;
import Animal.Dog;
import Human.Trainer;

public class Runner {

    public static void main(String[] args) {
        Bird bird = new Bird();
        Trainer trainer = new Trainer();
        Dog dog = new Dog("Gary");
        trainer.teach(dog, "Fido");

        System.out.println(dog.getName());
    }
}
