package com.hexaware.lms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.lms.exception.InvalidIDException;
import com.hexaware.lms.model.Borrowing;
import com.hexaware.lms.repository.BorrowingRepository;
@Service
public class BorrowingService {
	
	@Autowired
    private BorrowingRepository borrowingRepository;


	public Borrowing addBorrow(Borrowing borrowing) {
		return borrowingRepository.save(borrowing);
		
	}


	public void returnBook(int id) {
		 borrowingRepository.deleteById(id);
	}


	public List<Borrowing> getAll() {
		return borrowingRepository.findAll();
	}


	public Borrowing getById(int id) {
		Optional<Borrowing> optional = borrowingRepository.findById(id);
		if(optional.isEmpty()) {
			throw new InvalidIDException("Borrowing id is Invalid"+id);
		}
		return optional.get();
}


	public List<Borrowing> getBorrowingByMemberId(int memberId) {
		return borrowingRepository.findByMemberId(memberId);
	}


	public List<Borrowing> getBorrowingByBookId(int bookId) {
		return borrowingRepository.findByBookId(bookId);
	}

	
}
