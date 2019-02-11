import java.util.List;

public class Plane {
    private PlaneType planeType;

    Plane(PlaneType planeType) {
        this.planeType = planeType;
    }

    public PlaneType getPlaneType() {
        return planeType;
    }

    public int capacity(){
        return this.planeType.getCapacity();
    }

    public int totalWeight(){
        return this.planeType.getTotalWeight();
    }
}
