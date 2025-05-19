package com.hexaware.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.lms.model.Member;
import com.hexaware.lms.service.MemberService;

@RestController
@RequestMapping("/api/member")
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	//Add the Member
	@PostMapping("/add")
	public Member addMember(@RequestBody Member member) {
		return memberService.addMember(member);
	}
	
	//get all the member
	@GetMapping("/all")
	public List<Member> getAll() {
		return memberService.getAll();
		
	}
	
	//get member by the id
	@GetMapping("/{id}")
	public Member getById(@PathVariable int id) {
		return memberService.getById(id);
	}
	
	
	//delete the member by the id
	@DeleteMapping("/delete/{id}")
	public void deleteMember(@PathVariable int id) {
		memberService.deleteMember(id);
	}
}
