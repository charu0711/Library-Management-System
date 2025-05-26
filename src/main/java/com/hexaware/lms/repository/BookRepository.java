package com.hexaware.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.lms.model.Book;

public interface BookRepository extends JpaRepository<Book, Integer>{


}
