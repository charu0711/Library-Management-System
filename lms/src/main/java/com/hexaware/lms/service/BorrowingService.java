package com.hexaware.lms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.lms.model.Borrowing;
import com.hexaware.lms.repository.BorrowingRepository;
@Service
public class BorrowingService {
	
	@Autowired
    private BorrowingRepository borrowingRepository;


	public Borrowing addBorrow(Borrowing borrowing) {
		return borrowingRepository.save(borrowing);
		
	}

	
}
