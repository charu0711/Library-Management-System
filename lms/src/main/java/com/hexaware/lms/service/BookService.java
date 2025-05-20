package com.hexaware.lms.service;

import com.hexaware.lms.repository.LibrarianRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.lms.exception.InvalidIDException;
import com.hexaware.lms.model.Book;
import com.hexaware.lms.model.Librarian;
import com.hexaware.lms.repository.BookRepository;

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
	public void deleteBook(int id) {
		bookRepository.deleteById(id);

	}

}
