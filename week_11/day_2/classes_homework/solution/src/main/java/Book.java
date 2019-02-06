public class Book {
    private String author;
    private String title;
    private String genre;

    public Book(String author, String title, String genre) {
        this.author = author;
        this.title = title;
        this.genre = genre;
    }

    public String getAuthor() {
        return author;
    }

    public String getTitle() {
        return title;
    }

    public String getGenre() {
        return genre;
    }
}
