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

	
	//posting the books through the Librarian and passing the librarian id in the pathVariable
	public Book addBook(Book book, int lId) {
		
		Optional<Librarian> optional = librarianRepository.findById(lId);
		if (optional.isEmpty()) {
			throw new InvalidIDException("Librarian Id is Invalid");
		}

		book.setLibrarian(optional.get());

		return bookRepository.save(book);
	}
	
	//get all the book 
	public List<Book> getAll() {
		return bookRepository.findAll();
	}
	
	//getting the books by the id
	public Book getById(int id) {
		
		Optional<Book> optional = bookRepository.findById(id);
		if(optional.isEmpty()) {
			throw new InvalidIDException("Book id is Invalid");
		}
		return optional.get() ;
	}
	
	//checking the book is available by the id
	public boolean findByIsAvailable(int bId) {
		Optional<Book> optional = bookRepository.findById(bId);
		if(optional.isEmpty()) {
			throw new InvalidIDException("Book id is Invalid"+bId);
		}
		
		return optional.get().isAvailable();
	}

	//update the book
	public Book updateBook(Book book) {
		return bookRepository.save(book);
		
	}

}
