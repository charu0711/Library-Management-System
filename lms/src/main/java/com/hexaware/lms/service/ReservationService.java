package com.hexaware.lms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.lms.exception.InvalidIDException;
import com.hexaware.lms.model.Reservation;
import com.hexaware.lms.repository.ReservationRepository;

@Service
public class ReservationService {

	@Autowired
	private ReservationRepository reservationRepository;

	public Reservation addReservation(Reservation reservation) {
		return reservationRepository.save(reservation);

	}

	public List<Reservation> getAll() {
		return reservationRepository.findAll();
	}

	public Reservation getById(int id) {
		Optional<Reservation> optional = reservationRepository.findById(id);
		if (optional.isEmpty()) {
			throw new InvalidIDException("Reservation id is Invalid" + id);
		}
		return optional.get();
	}

}
