package com.hexaware.lms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.lms.exception.InvalidIDException;
import com.hexaware.lms.model.Member;
import com.hexaware.lms.repository.MemberRepository;

@Service
public class MemberService {
	
	@Autowired
	private MemberRepository memberRepository;

	public Member addMember(Member member) {
		return memberRepository.save(member);
		
	}

	public List<Member> getAll() {
		return memberRepository.findAll();
	}

	public Member getById(int id) {
		Optional<Member> optional = memberRepository.findById(id);
		if(optional.isEmpty()) {
			throw new InvalidIDException("Member id is Invalid"+id);
		}
		return optional.get() ;
	
	}

	public void deleteMember(int id) {
		memberRepository.deleteById(id);
	}

}
