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

	public String deleteMember(int id) {
		memberRepository.deleteById(id);
		return "Member Deleted Successfully!";
	}

	public Member updateMember(int id, Member member) {
		
		Optional<Member> optional = memberRepository.findById(id);
		if(optional.isEmpty()) {
			throw new InvalidIDException("Invalid Member id to Update"+id);
		}
		Member member1 = optional.get();
		member1.setEmail(member.getEmail());
		member1.setPhoneNumber(member.getPhoneNumber());
		member1.setAddress(member.getAddress());
		return memberRepository.save(member1);

	}
		
	public long getMemberCount() {
        return memberRepository.count();
    }
	
	public Optional<Member> getMemberProfileById(int id) {
        return memberRepository.findById(id);
    }
	

}
