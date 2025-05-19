package com.hexaware.lms.controller;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
	//Add the Borrowings with the Member id and the Book id 
	@PostMapping("/{bId}/{mId}")
	public Borrowing borrowBook(@PathVariable int bId, @PathVariable int mId) {
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

	}

	// return the book and make the book to available = true
	@PutMapping("/{bId}/{id}")
	public double returnBook(@PathVariable int bId, @PathVariable int id) {
		Book book = bookService.getById(bId);
		book.setAvailable(true);
		Borrowing borrowing = new Borrowing();
		borrowing.setReturnDate(LocalDate.now());
		
		LocalDate dueDate = borrowing.getDueDate();
        LocalDate returnDate = borrowing.getReturnDate();

        if (returnDate.isAfter(dueDate)) {
            long lateDays = ChronoUnit.DAYS.between(dueDate, returnDate);
            borrowing.setFineAmount(lateDays * 5.0); // ₹5 fine per day
        } else {
            borrowing.setFineAmount(0.0);
        }
		borrowingService.returnBook(id);
		return borrowing.getFineAmount();
		
	}
	
	
	//get the borrowings by the id
	@GetMapping("{id}")
	public Borrowing getById(@PathVariable int id) {
		return borrowingService.getById(id);
	}
	
	//get all borrowing
	@GetMapping("/all")
	public List<Borrowing> getAll(){
		return borrowingService.getAll();
	}
}
