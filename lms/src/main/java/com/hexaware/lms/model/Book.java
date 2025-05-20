package com.hexaware.lms.model;

import java.time.LocalDate;

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
	
	@Column(nullable = false,length = 40)
	private String title;
	
	@Column(nullable = false,length = 20)
	private String author;
	
	@Column(nullable = false,length = 20)
	private String genre;  //Science Fiction,Fantasy,Biography 
	
	@Column(nullable = false,length = 12,unique = true)
	private String isbn;
	
	private boolean isAvailable = true; 
	
	@Column(nullable = false)
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

	
}
