package com.hexaware.lms.controller;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin({"http://localhost:5173"})
public class BorrowingController {

	@Autowired
	private BorrowingService borrowingService;

	@Autowired
	private BookService bookService;

	@Autowired
	private MemberService memberService;
	
	//Add the Borrowings with the Member id and the Book id 
	@PostMapping("borrow/{bookId}/{memberId}")
	public Borrowing borrowBook(@PathVariable int bookId, @PathVariable int memberId) {
		Borrowing borrowing = new Borrowing();
		Book book = bookService.getById(bookId);
		Member member = memberService.getById(memberId);		
		borrowing.setBook(book);
		borrowing.setMember(member);
		borrowing.setBorrowingDate(LocalDate.now().minusDays(20));
		borrowing.setDueDate(LocalDate.now().minusDays(10));
		borrowing.setFineAmount(0.0);

		borrowingService.addBorrow(borrowing);

		book.setAvailable(false);
		bookService.updateBook(book);

		return borrowing;

	}

	// return the book and make the book to available = true
	@PutMapping("return/{bookId}/{id}")
	public double returnBook(@PathVariable int bookId, @PathVariable int id) {
		Book book = bookService.getById(bookId);
		book.setAvailable(true);
		bookService.updateBook(book);
		
		Borrowing borrowing = borrowingService.getById(id);
		borrowing.setReturnDate(LocalDate.now());
		LocalDate dueDate = borrowing.getDueDate();
        LocalDate returnDate = borrowing.getReturnDate();

        if (returnDate.isAfter(dueDate)) {
        	//chronoUnits its used to calculate the difference b/w two dates
            long lateDays = ChronoUnit.DAYS.between(dueDate, returnDate);
            borrowing.setFineAmount(lateDays * 5.0); // rupees : 5 fine per day
        } else {
            borrowing.setFineAmount(0.0);
        }
		borrowingService.returnBook(borrowing);
		
		System.out.println("Fine: " + borrowing.getFineAmount());
		return borrowing.getFineAmount();
		
	}
	
		//get the borrowings by the id
	@GetMapping("getById/{id}")
	public Borrowing getById(@PathVariable int id) {
		return borrowingService.getById(id);
	}
	
	//get all borrowing
	@GetMapping("/all")
	public List<Borrowing> getAll(){
		return borrowingService.getAll();
	}
	
	//get the borrowings by member id
	@GetMapping("member/{memberId}")
	public List<Borrowing> getBorrowingByMemberId(@PathVariable int memberId) {
		return borrowingService.getBorrowingByMemberId(memberId);
	}
	
	//get the borrowings by book id
	@GetMapping("book/{bookId}")
	public Borrowing getBorrowingByBookId(@PathVariable int bookId){
		return borrowingService.getBorrowingByBookId(bookId);
	}
	
	@PostMapping("/assignReserve/{memberId}/{bookId}")
	public String assignReserve(@PathVariable int memberId,@PathVariable int bookId) {
		return borrowingService.assignReserve(memberId,bookId);
	}
	
	@GetMapping("/allocateReserve")
	public void allocateReserve()
	{
		borrowingService.allocateReserve();
	}
}
