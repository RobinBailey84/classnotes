public class Printer {
    private int paper;
    private int initialPaperCount;
    private int tonerVolume;

    public Printer(int paper, int tonerVolume) {
        this.paper = paper;
        this.initialPaperCount = paper;
        this.tonerVolume = tonerVolume;
    }

    public void print(int pages, int copies){
        int totalPages = pages * copies;

        if (paper > totalPages){
            paper -= totalPages;
            tonerVolume -= totalPages;
        }
    }

    public void refill(){
        this.paper = initialPaperCount;
    }
}
