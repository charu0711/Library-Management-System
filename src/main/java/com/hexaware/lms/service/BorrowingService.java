package com.hexaware.lms.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.lms.exception.InvalidIDException;
import com.hexaware.lms.model.Book;
import com.hexaware.lms.model.Borrowing;
import com.hexaware.lms.model.Member;
import com.hexaware.lms.repository.BookRepository;
import com.hexaware.lms.repository.BorrowingRepository;
import com.hexaware.lms.repository.MemberRepository;

@Service
public class BorrowingService {

	@Autowired
	private BorrowingRepository borrowingRepository;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private BookRepository bookRepository;

	public Borrowing borrowBook(int bookId, int memberId) {
		Optional<Book> bookOpt = bookRepository.findById(bookId);
		Optional<Member> memberOpt = memberRepository.findById(memberId);

		if (bookOpt.isEmpty() || memberOpt.isEmpty()) {
			throw new InvalidIDException("Book ID or Member ID is invalid.");
		}

		Book book = bookOpt.get();
		if (!book.isAvailable()) {
			throw new InvalidIDException("Book is currently not available! Go and reserve the book.");
		}

		Member member = memberOpt.get();

		Borrowing borrowing = new Borrowing();
		borrowing.setBook(book);
		borrowing.setMember(member);
		borrowing.setBorrowingDate(LocalDate.now().plusDays(20));
		borrowing.setDueDate(LocalDate.now().minusDays(10));
		borrowing.setFineAmount(0.0);

		book.setAvailable(false);
		bookRepository.save(book);

		Borrowing saved = borrowingRepository.save(borrowing);
		System.out.println("New borrowing created: " + saved.getId() + " for member " + memberId + " and book " + bookId);
		return saved;
	}

	public double returnBook(int bookId, int borrowingId) {
		Optional<Book> optionalBook = bookRepository.findById(bookId);
		Optional<Borrowing> optionalBorrowing = borrowingRepository.findById(borrowingId);

		if (optionalBook.isEmpty() || optionalBorrowing.isEmpty()) {
			throw new InvalidIDException("Invalid Book ID or Borrowing ID.");
		}

		Book book = optionalBook.get();
		book.setAvailable(true);
		bookRepository.save(book);

		Borrowing borrowing = optionalBorrowing.get();
		LocalDate returnDate = LocalDate.now();
		borrowing.setReturnDate(returnDate);

		LocalDate dueDate = borrowing.getDueDate();
		if (returnDate.isAfter(dueDate)) {
			long lateDays = ChronoUnit.DAYS.between(dueDate, returnDate);
			borrowing.setFineAmount(lateDays * 5.0);
		} else {
			borrowing.setFineAmount(0.0);
		}

		borrowingRepository.save(borrowing);

		// After return, allocate reservation if any
		allocateReserveForBook(book);

		return borrowing.getFineAmount();
	}

	public void allocateReserveForBook(Book book) {
		List<Borrowing> reservations = borrowingRepository
				.findByBookIdAndReservedTrueOrderByReservationDateAsc(book.getId());
		if (reservations != null && !reservations.isEmpty()) {
			Borrowing reservation = reservations.get(0);
			reservation.setMember(reservation.getReservedMember());
			reservation.setReserved(false);
			reservation.setReservedMember(null);
			reservation.setReservationDate(null);
			reservation.setBorrowingDate(LocalDate.now());
			reservation.setDueDate(LocalDate.now().plusDays(15));
			reservation.setReturnDate(null);
			reservation.setFineAmount(0.0);

			book.setAvailable(false);
			bookRepository.save(book);

			borrowingRepository.save(reservation);
		}
	}

	public String assignReserve(int memberId, int bookId) {
		Borrowing borrowing = borrowingRepository.findByBookId(bookId);
		if (borrowing == null) {
			throw new InvalidIDException("Book is not currently borrowed.");
		}

		Optional<Member> optional = memberRepository.findById(memberId);
		if (optional.isEmpty()) {
			throw new InvalidIDException("Invalid Member ID.");
		}

		borrowing.setReserved(true);
		borrowing.setReservationDate(LocalDate.now());
		borrowing.setReservedMember(optional.get());

		borrowingRepository.save(borrowing);
		return "The book is reserved successfully.";
	}

	public Borrowing getById(int id) {
		Optional<Borrowing> optionalBorrowing = borrowingRepository.findById(id);
		if (optionalBorrowing.isEmpty()) {
			throw new InvalidIDException("Borrowing id is invalid: " + id);
		}
		return optionalBorrowing.get();
	}

	public List<Borrowing> getAll() {
		return borrowingRepository.findAll();
	}

	public List<Borrowing> getBorrowingByMemberId(int memberId) {
		return borrowingRepository.findByMemberId(memberId);
	}

	public Borrowing getBorrowingByBookId(int bookId) {
		return borrowingRepository.findByBookId(bookId);
	}

	public List<Borrowing> getReservationsByReservedMember(int memberId) {
		return borrowingRepository.findByReservedMemberId(memberId);
	}
}