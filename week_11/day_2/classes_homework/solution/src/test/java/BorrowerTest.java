import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class BorrowerTest  {
    Borrower borrower;
    Book book;
    Library library;

    @Before
    public void setUp() throws Exception {
        borrower = new Borrower("Declan");
        book = new Book("Sue Perkins", "Spectacles", "Biography");
        library = new Library(5);
        library.addBook(book);
    }

    @Test
    public void hasName() {
        assertEquals("Declan", borrower.getName());
    }

    @Test
    public void hasEmptyCollectionOfBooks() {
        assertEquals(0, borrower.bookCount());
    }

    @Test
    public void canAddBookToCollection() {
        borrower.addBook(book);
        assertEquals(1, borrower.bookCount());
    }

    @Test
    public void canBorrowBookFromLibrary() {
        borrower.borrow(library, "Spectacles");
        assertEquals(1, borrower.bookCount());
        assertEquals(0, library.bookCount());
    }
}
