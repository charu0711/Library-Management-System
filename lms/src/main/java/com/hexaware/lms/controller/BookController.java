package com.hexaware.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.lms.model.Book;
import com.hexaware.lms.service.BookService;

@RestController  //combination of the Controller + ResponseBody
@RequestMapping("/api/book")
public class BookController {
	
	@Autowired
	private BookService bookService;
	
	//Add Books
	@PostMapping("/add/{lId}")
	public Book addBook(@RequestBody Book book,@PathVariable int lId) {
		return bookService.addBook(book,lId);
	}
	
	
	//get all the books 
	@GetMapping("/all")
	public List<Book> getAll(){
		return bookService.getAll();
	}
	
	
	//get the book by id
	@GetMapping("/{id}")
	public Book getById(@PathVariable int id) {
		return bookService.getById(id);
	}
	
	
	//delete the book by id
	@DeleteMapping("/delete/{id}")
	public void deleteBook(@PathVariable int id) {
		bookService.deleteBook(id);
	}
	
	
}
