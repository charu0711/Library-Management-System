package com.hexaware.lms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.lms.model.Book;
import com.hexaware.lms.service.BookService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController  
@RequestMapping("/api/book")

public class BookController {
	
	@Autowired
	private BookService bookService;
	
	//Add Books
	@PostMapping("/add/{librarianId}")
	public Book addBook(@RequestBody Book book,@PathVariable int librarianId) {
		return bookService.addBook(book,librarianId);
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
	public String deleteBook(@PathVariable int id) {
		return bookService.deleteBook(id);
	}
	
	//update the book by id
	@PutMapping("/update/{id}")
	public Book editBook(@PathVariable int id, @RequestBody Book book) {
		return bookService.editBook(id, book);
	}
		
	// Book count endpoint
    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getBookCount() {
        long count = bookService.getBookCount();
        Map<String, Long> response = new HashMap<>();
        response.put("count", count);
        return ResponseEntity.ok(response);
    }

    // Recent books endpoint
    @GetMapping("/recent")
    public ResponseEntity<List<Book>> getRecentBooks(@RequestParam(defaultValue = "5") int limit) {
        List<Book> recentBooks = bookService.getRecentBooks(limit);
        return ResponseEntity.ok(recentBooks);
    }
}
