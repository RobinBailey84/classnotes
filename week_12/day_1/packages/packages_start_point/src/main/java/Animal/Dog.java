package Animal;

public class Dog {

     String name;

    public Dog(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public void bark() {
        System.out.println("Bark!");
    }
}
