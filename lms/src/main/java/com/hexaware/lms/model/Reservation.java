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
@Table(name = "reservations")
public class Reservation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private LocalDate  reservationDate;
	
	
	@ManyToOne   //A book can be reserved many times
	private Book book;
	
	@ManyToOne   //Many Reservation belongs to the one Member 
	private Member member;

	public Reservation() {
		super();
	}

	public Reservation(int id, LocalDate reservationDate, String reservationStatus, Book book, Member member) {
		super();
		this.id = id;
		this.reservationDate = reservationDate;
		this.book = book;
		this.member = member;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDate getReservationDate() {
		return reservationDate;
	}

	public void setReservationDate(LocalDate reservationDate) {
		this.reservationDate = reservationDate;
	}


	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	@Override
	public int hashCode() {
		return Objects.hash(book, id, member, reservationDate);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Reservation other = (Reservation) obj;
		return Objects.equals(book, other.book) && id == other.id && Objects.equals(member, other.member)
				&& Objects.equals(reservationDate, other.reservationDate);
	}
	
	
	
}
