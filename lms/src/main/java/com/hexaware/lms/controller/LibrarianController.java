package com.hexaware.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.lms.model.Librarian;
import com.hexaware.lms.service.LibrarianService;

@RestController
@RequestMapping("/api/librarian")
public class LibrarianController {
	
	@Autowired
	private LibrarianService librarianService;
	
	//Add the Librarian
	@PostMapping("/add")
	public void addLibrarian(@RequestBody Librarian librarian) {
		librarianService.addLibrarian(librarian);
	}
	
	//get all borrowings
	
	
	//get all members
	
	//get all reservation
	
	
	
	

}
