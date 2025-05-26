package com.hexaware.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hexaware.lms.model.Borrowing;

public interface BorrowingRepository extends JpaRepository<Borrowing, Integer> {

	List<Borrowing> findByMemberId(int memberId);

	Borrowing findByBookId(int bookId);

	List<Borrowing> findByReservedMemberId(int memberId);

	List<Borrowing> findByBookIdAndReservedTrueOrderByReservationDateAsc(int bookId);

}
