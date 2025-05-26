package com.hexaware.lms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hexaware.lms.exception.InvalidIDException;
import com.hexaware.lms.model.Book;
import com.hexaware.lms.model.Librarian;
import com.hexaware.lms.repository.BookRepository;
import com.hexaware.lms.repository.LibrarianRepository;

@Service
public class BookService {

	@Autowired
	private LibrarianRepository librarianRepository;

	@Autowired
	private BookRepository bookRepository;

	// posting the books through the Librarian and passing the librarian id in the
	// pathVariable
	public Book addBook(Book book, int librarianId) {

		Optional<Librarian> optional = librarianRepository.findById(librarianId);
		if (optional.isEmpty()) {
			throw new InvalidIDException("Librarian Id is Invalid");
		}

		book.setLibrarian(optional.get());

		return bookRepository.save(book);
	}

	// get all the book
	public List<Book> getAll() {
		return bookRepository.findAll();
	}

	// getting the books by the id
	public Book getById(int id) {

		Optional<Book> optional = bookRepository.findById(id);
		if (optional.isEmpty()) {
			throw new InvalidIDException("Book id is Invalid");
		}
		return optional.get();
	}

	
	// update the book
	public Book updateBook(Book book) {
		return bookRepository.save(book);

	}

	//delete the book 
	public String deleteBook(int id) {
	    bookRepository.deleteById(id); 
	    return "Book Deleted Successfully!!";
	}

	public Book editBook(int id, Book book){
		
		Optional<Book> optional = bookRepository.findById(id);
		if(optional.isEmpty()) {
			throw new InvalidIDException("Invalid Book id to Update"+id);
		}
		Book book1 = optional.get();
		book1.setTitle(book.getTitle());
		book1.setGenre(book.getGenre());
		return bookRepository.save(book1);

	}
	
	public long getBookCount() {
        return bookRepository.count();
    }

    public List<Book> getRecentBooks(int limit) {
        Pageable pageable = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "publishedDate", "id"));
        return bookRepository.findAll(pageable).getContent();
    }
 
	

	
}
