package com.hexaware.lms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.lms.model.Librarian;
import com.hexaware.lms.repository.LibrarianRepository;

@Service
public class LibrarianService {
	
	@Autowired
	private LibrarianRepository librarianRepository;

	public void addLibrarian(Librarian librarian) {
		librarianRepository.save(librarian);
		
	}

}
