import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;

public class LibraryTest {
    Library library;
    Book book;

    @Before
    public void setUp() throws Exception {
        library = new Library(3);
        book = new Book("Sue Perkins", "Spectacles", "Biography");
    }

    @Test
    public void startsWithNoBooks() {
        assertEquals(0, library.bookCount());
    }

    @Test
    public void canAddBookToLibrary() {
        library.addBook(book);
        assertEquals(1, library.bookCount());
    }

    @Test
    public void canCheckIfStockIsNotFull() {
        assertEquals(false, library.isFull());
    }

    @Test
    public void cantAddMoreBooksThanCapacity() {
        library.addBook(book);
        library.addBook(book);
        library.addBook(book);
        library.addBook(book);
        library.addBook(book);
        assertEquals(3, library.bookCount());
    }

    @Test
    public void canFindBookByTitle() {
        library.addBook(book);
        Book foundBook = library.findAndRemoveBook("Spectacles");
        assertEquals(book, foundBook);
        assertEquals(0, library.bookCount());
    }

    @Test
    public void canFindBooksByGenre() {
        library.addBook(book);
        library.addBook(book);
        library.addBook(book);
        ArrayList<Book> foundBooks = library.findByGenre("Biography");
        assertEquals(3, foundBooks.size());
    }
}
