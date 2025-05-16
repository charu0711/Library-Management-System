package com.hexaware.lms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.lms.model.Book;
import com.hexaware.lms.repository.BookRepository;

@Service
public class BookService {
	
	@Autowired
	private BookRepository bookRepository;

	public void addBook(Book book) {
		
		bookRepository.save(book);
	}

}
