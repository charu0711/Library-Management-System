package com.hexaware.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.lms.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer>{

}
