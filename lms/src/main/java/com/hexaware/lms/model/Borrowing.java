package com.hexaware.lms.model;

import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "borrowings")
public class Borrowing {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private LocalDate borrowingDate;
	
	private LocalDate dueDate;
	
	private LocalDate returnDate;
	
	private Double fineAmount;
	
	@ManyToOne
	private Member member; //Many borrowings to one member
	
	@ManyToOne
	private Book book;  // Many borrowings to one book --  A book can be borrowed many times

	public Borrowing() {
		super();
	}

	public Borrowing(int id, LocalDate borrowingDate, LocalDate dueDate, LocalDate returnDate, Double fineAmount,
			Member member, Book book) {
		super();
		this.id = id;
		this.borrowingDate = borrowingDate;
		this.dueDate = dueDate;
		this.returnDate = returnDate;
		this.fineAmount = fineAmount;
		this.member = member;
		this.book = book;
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

	@Override
	public int hashCode() {
		return Objects.hash(book, borrowingDate, dueDate, fineAmount, id, member, returnDate);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Borrowing other = (Borrowing) obj;
		return Objects.equals(book, other.book) && Objects.equals(borrowingDate, other.borrowingDate)
				&& Objects.equals(dueDate, other.dueDate) && Objects.equals(fineAmount, other.fineAmount)
				&& id == other.id && Objects.equals(member, other.member)
				&& Objects.equals(returnDate, other.returnDate);
	}
	
	
		
}
