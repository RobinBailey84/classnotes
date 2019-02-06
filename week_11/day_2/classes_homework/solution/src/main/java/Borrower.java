import java.util.ArrayList;

public class Borrower {
    private String name;
    private ArrayList<Book> books;

    public Borrower(String name) {
        this.name = name;
        this.books = new ArrayList<Book>();
    }

    public String getName() {
        return name;
    }

    public int bookCount() {
        return this.books.size();
    }

    public void addBook(Book book) {
        this.books.add(book);
    }

    public void borrow(Library library, String title) {
        Book foundBook = library.findAndRemoveBook(title);
        addBook(foundBook);
    }
}
