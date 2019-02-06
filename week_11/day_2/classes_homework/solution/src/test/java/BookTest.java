import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;


public class BookTest {
    Book book;

    @Before
    public void setUp(){
        book = new Book("Sue Perkins", "Spectacles", "Biography");
    }

    @Test
    public void hasAuthor() {
        assertEquals("Sue Perkins", book.getAuthor());
    }

    @Test
    public void hasTitle() {
        assertEquals("Spectacles", book.getTitle());
    }

    @Test
    public void hasGenre() {
        assertEquals("Biography", book.getGenre());
    }
}
