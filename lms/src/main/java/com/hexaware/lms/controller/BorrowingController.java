package com.hexaware.lms.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.lms.exception.BookNotAvailableException;
import com.hexaware.lms.model.Book;
import com.hexaware.lms.model.Borrowing;
import com.hexaware.lms.model.Member;
import com.hexaware.lms.service.BookService;
import com.hexaware.lms.service.BorrowingService;
import com.hexaware.lms.service.MemberService;

@RestController
@RequestMapping("/api/borrowing")
public class BorrowingController {
	
	@Autowired
	private BorrowingService borrowingService;
	
	@Autowired
	private BookService bookService;
	
	@Autowired
	private MemberService memberService;
	
	@PostMapping("/{bId}/{mId}")
	public Borrowing borrowBook(@PathVariable int bId,@PathVariable int mId) {
		boolean isAvailable = bookService.findByIsAvailable(bId);
		if(isAvailable == true) {
			Borrowing borrowing = new Borrowing();
			Book book = bookService.getById(bId);
			Member member = memberService.getById(mId);
			borrowing.setBook(book);
			borrowing.setMember(member);
			borrowing.setBorrowingDate(LocalDate.now());
			borrowing.setDueDate(LocalDate.now().plusDays(15));
			borrowing.setFineAmount(0.0);
			
			borrowingService.addBorrow(borrowing);
			
			book.setAvailable(false);
			bookService.updateBook(book);
			
			return borrowing;
			
		}else {
			throw new BookNotAvailableException("Book is currently not available!!");
		}
		
		
	}

}
