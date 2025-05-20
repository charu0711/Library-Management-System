package com.hexaware.lms.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.lms.exception.InvalidIDException;
import com.hexaware.lms.model.Borrowing;
import com.hexaware.lms.model.Member;
import com.hexaware.lms.repository.BorrowingRepository;
import com.hexaware.lms.repository.MemberRepository;

@Service
public class BorrowingService {

	@Autowired
	private BorrowingRepository borrowingRepository;

	@Autowired
	private MemberRepository memberRepository;

	public Borrowing addBorrow(Borrowing borrowing) {
		return borrowingRepository.save(borrowing);

	}

	public List<Borrowing> getAll() {
		return borrowingRepository.findAll();
	}

	public Borrowing getById(int id) {
		Optional<Borrowing> optional = borrowingRepository.findById(id);
		if (optional.isEmpty()) {
			throw new InvalidIDException("Borrowing id is Invalid" + id);
		}
		return optional.get();
	}

	public List<Borrowing> getBorrowingByMemberId(int memberId) {
		return borrowingRepository.findByMemberId(memberId);
	}

	public Borrowing getBorrowingByBookId(int bookId) {
		return borrowingRepository.findByBookId(bookId);
	}

	public void returnBook(Borrowing borrowing) {
		borrowingRepository.save(borrowing);

	}

	public String assignReserve(int memberId, int bookId) {

		Borrowing borrowing = borrowingRepository.findByBookId(bookId);

			borrowing.setReserved(true);
			borrowing.setReservationDate(LocalDate.now());
			Optional<Member> optional = memberRepository.findById(memberId);
			borrowing.setReservedMember(optional.get());
			borrowingRepository.save(borrowing);
			return "The book is Reserved Successfully";
		

	}
	
	public void allocateReserve()
	{
		List<Borrowing> borrowings = borrowingRepository.findAll();

        for (Borrowing borrowing : borrowings) {
            if (borrowing.getReturnDate() != null &&
                borrowing.isReserved() &&
                borrowing.getReservedMember() != null) {

                // Move reservation to current borrowing
                borrowing.setMember(borrowing.getReservedMember());
                borrowing.setReservedMember(null);
                borrowing.setReserved(false);
                borrowing.setBorrowingDate(LocalDate.now());
                borrowing.setDueDate(LocalDate.now().plusDays(15));
                borrowing.setReturnDate(null);  // Reset return date
                borrowing.setFineAmount(0.0);   // Clear fine
            }
        }

         borrowingRepository.saveAll(borrowings); // Save all modified borrowings
    
	}


}
