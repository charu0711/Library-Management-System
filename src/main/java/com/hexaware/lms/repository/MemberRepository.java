package com.hexaware.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.lms.model.Member;

public interface MemberRepository extends JpaRepository<Member, Integer> {

	

}
