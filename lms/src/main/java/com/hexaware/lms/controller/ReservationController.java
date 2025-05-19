package com.hexaware.lms.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.lms.model.Book;
import com.hexaware.lms.model.Member;
import com.hexaware.lms.model.Reservation;
import com.hexaware.lms.service.BookService;
import com.hexaware.lms.service.MemberService;
import com.hexaware.lms.service.ReservationService;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

	@Autowired
	private ReservationService reservationService;

	@Autowired
	private BookService bookService;

	@Autowired
	private MemberService memberService;

	// reserve the book by the book id and member id and make the available of the
	// book is false
	@PostMapping("/{bId}/{mId}")
	public Reservation reserveBook(@PathVariable int bId, @PathVariable int mId) {
		Reservation reservation = new Reservation();
		Book book = bookService.getById(bId);
		Member member = memberService.getById(mId);
		reservation.setBook(book);
		reservation.setMember(member);
		reservation.setReservationDate(LocalDate.now());

		reservationService.addReservation(reservation);

		book.setAvailable(false);
		bookService.updateBook(book);

		return reservation;

	}
	
	//get the reservation by the id
	@GetMapping("/{id}")
	public Reservation getById(@PathVariable int id) {
		return reservationService.getById(id);
	}

	// get all the reservation
	@GetMapping("/all")
	public List<Reservation> getAll() {
		return reservationService.getAll();
	}

}
