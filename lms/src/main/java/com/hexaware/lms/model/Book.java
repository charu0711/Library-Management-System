package com.hexaware.lms.model;

import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "books")
public class Book {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false)
	private String author;
	
	private String genre;  //Science Fiction,Fantasy,Biography 
	
	@Column(nullable = false,unique = true)
	private String isbn;
	
	private boolean isAvailable = true; 
	
	private LocalDate publishedDate;
	
	@ManyToOne   //findByLibrarianId
	private Librarian librarian;  //one librarian can add many books
	
	

	public Book() {
		super();
	}

	
	
	public Book(int id, String title, String author, String genre, String isbn, boolean isAvailable,
			LocalDate publishedDate, Librarian librarian) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.isbn = isbn;
		this.isAvailable = isAvailable;
		this.publishedDate = publishedDate;
		this.librarian = librarian;
	}



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public boolean isAvailable() {
		return isAvailable;
	}

	public void setAvailable(boolean isAvailable) {
		this.isAvailable = isAvailable;
	}

	public LocalDate getPublishedDate() {
		return publishedDate;
	}

	public void setPublishedDate(LocalDate publishedDate) {
		this.publishedDate = publishedDate;
	}

	public Librarian getLibrarian() {
		return librarian;
	}

	public void setLibrarian(Librarian librarian) {
		this.librarian = librarian;
	}



	@Override
	public int hashCode() {
		return Objects.hash(author, genre, id, isAvailable, isbn, librarian, publishedDate, title);
	}



	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Book other = (Book) obj;
		return Objects.equals(author, other.author) && Objects.equals(genre, other.genre) && id == other.id
				&& isAvailable == other.isAvailable && Objects.equals(isbn, other.isbn)
				&& Objects.equals(librarian, other.librarian) && Objects.equals(publishedDate, other.publishedDate)
				&& Objects.equals(title, other.title);
	}



	
	
	
}
