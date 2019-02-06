import java.util.ArrayList;

public class Library {
    private ArrayList<Book> books;
    private int capacity;

    public Library(int capacity) {
        this.capacity = capacity;
        this.books = new ArrayList<Book>();
    }

    public int bookCount() {
        return this.books.size();
    }

    public void addBook(Book book) {
        if (!isFull()){
            this.books.add(book);
        }
    }

    public boolean isFull() {
        return this.books.size() >= capacity;
    }

    public Book findAndRemoveBook(String title) {
//        loop through the collection of books
//        return the book if the title matches the one we're looking for

        for(Book book : this.books){
            if (book.getTitle().equals(title)){
                int index = this.books.indexOf(book);
                return this.books.remove(index);
            }
        }

        return null;
    }

    public ArrayList<Book> findByGenre(String genre) {
        ArrayList<Book> foundBooks = new ArrayList<Book>();

        for (Book book : this.books){
            if (book.getGenre().equals(genre)){
               foundBooks.add(book);
            }
        }

        return foundBooks;
    }
}
