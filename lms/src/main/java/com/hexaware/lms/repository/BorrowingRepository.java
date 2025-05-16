package com.hexaware.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hexaware.lms.model.Borrowing;

public interface BorrowingRepository extends JpaRepository<Borrowing, Integer> {

}
