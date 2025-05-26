package com.hexaware.lms.model;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "borrowings")
public class Borrowing {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(nullable = false)
	private LocalDate borrowingDate;

	private LocalDate dueDate;
	private LocalDate returnDate;
	private Double fineAmount;

	@Column(name = "reserved")
	private boolean reserved = false;

	private LocalDate reservationDate;

	@ManyToOne
	private Member member;

	@OneToOne
	private Book book;

	@ManyToOne
	private Member reservedMember;

	

	public Borrowing() {
	}

	public Borrowing(int id, LocalDate borrowingDate, LocalDate dueDate, LocalDate returnDate, Double fineAmount,
			boolean reserved, LocalDate reservationDate, Member member, Book book, Member reservedMember) {
		this.id = id;
		this.borrowingDate = borrowingDate;
		this.dueDate = dueDate;
		this.returnDate = returnDate;
		this.fineAmount = fineAmount;
		this.reserved = reserved;
		this.reservationDate = reservationDate;
		this.member = member;
		this.book = book;
		this.reservedMember = reservedMember;
	}



	public boolean isReserved() {
		return reserved;
	}

	public void setReserved(boolean reserved) {
		this.reserved = reserved;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDate getBorrowingDate() {
		return borrowingDate;
	}

	public void setBorrowingDate(LocalDate borrowingDate) {
		this.borrowingDate = borrowingDate;
	}

	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}

	public LocalDate getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(LocalDate returnDate) {
		this.returnDate = returnDate;
	}

	public Double getFineAmount() {
		return fineAmount;
	}

	public void setFineAmount(Double fineAmount) {
		this.fineAmount = fineAmount;
	}

	public LocalDate getReservationDate() {
		return reservationDate;
	}

	public void setReservationDate(LocalDate reservationDate) {
		this.reservationDate = reservationDate;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public Member getReservedMember() {
		return reservedMember;
	}

	public void setReservedMember(Member reservedMember) {
		this.reservedMember = reservedMember;
	}
}