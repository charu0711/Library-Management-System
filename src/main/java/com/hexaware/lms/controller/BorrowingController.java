package com.hexaware.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.lms.model.Borrowing;
import com.hexaware.lms.service.BorrowingService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/borrowing")

public class BorrowingController {

    @Autowired
    private BorrowingService borrowingService;

    @PostMapping("/borrow/{bookId}/{memberId}")
    public Borrowing borrowBook(@PathVariable int bookId, @PathVariable int memberId) {
        return borrowingService.borrowBook(bookId, memberId);
    }

    @PutMapping("/return/{bookId}/{borrowingId}")
    public double returnBook(@PathVariable int bookId, @PathVariable int borrowingId) {
        return borrowingService.returnBook(bookId, borrowingId);
    }

    @GetMapping("/getById/{id}")
    public Borrowing getById(@PathVariable int id) {
        return borrowingService.getById(id);
    }

    @GetMapping("/all")
    public List<Borrowing> getAll() {
        return borrowingService.getAll();
    }

    @GetMapping("/member/{memberId}")
    public List<Borrowing> getBorrowingByMemberId(@PathVariable int memberId) {
        return borrowingService.getBorrowingByMemberId(memberId);
    }

    @GetMapping("/book/{bookId}")
    public Borrowing getBorrowingByBookId(@PathVariable int bookId) {
        return borrowingService.getBorrowingByBookId(bookId);
    }

    @PostMapping("/assignReserve/{memberId}/{bookId}")
    public String assignReserve(@PathVariable int memberId, @PathVariable int bookId) {
        return borrowingService.assignReserve(memberId, bookId);
    }

    @GetMapping("/reservedBy/{memberId}")
    public List<Borrowing> getReservationsByReservedMember(@PathVariable int memberId) {
        return borrowingService.getReservationsByReservedMember(memberId);
    }
}