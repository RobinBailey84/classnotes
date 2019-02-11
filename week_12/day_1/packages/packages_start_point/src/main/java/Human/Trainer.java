package Human;


import Animal.Dog;


public class Trainer {
    public void teach(Dog dog, String newName) {
        dog.setName(newName);
        dog.bark();
    }
}
