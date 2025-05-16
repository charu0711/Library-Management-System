package com.hexaware.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.lms.model.Book;
import com.hexaware.lms.service.BookService;

@RestController  //combination of the Controller + Response Body
@RequestMapping("/api/book")
public class BookController {
	
	@Autowired
	private BookService bookService;
	
	//Add Books
	@GetMapping("/add")
	public void addBook(@RequestBody Book book) {
		bookService.addBook(book);
	}

}
