package com.hexaware.lms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.lms.model.Member;
import com.hexaware.lms.service.MemberService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/member")

public class MemberController {

	@Autowired
	private MemberService memberService;

	// Add the Member
	@PostMapping("/add")
	public Member addMember(@RequestBody Member member) {
		return memberService.addMember(member);
	}

	// get all the member
	@GetMapping("/all")
	public List<Member> getAll() {
		return memberService.getAll();

	}

	// get member by the id
	@GetMapping("/{id}")
	public Member getById(@PathVariable int id) {
		return memberService.getById(id);
	}

	// delete the member by the id
	@DeleteMapping("/delete/{id}")
	public String deleteMember(@PathVariable int id) {
		return memberService.deleteMember(id);
	}

	// update the Member by id
	@PutMapping("/update/{id}")
	public Member updateMember(@PathVariable int id, @RequestBody Member member) {
		return memberService.updateMember(id, member);
	}
	
	// Member count endpoint
    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getMemberCount() {
        long count = memberService.getMemberCount();
        Map<String, Long> response = new HashMap<>();
        response.put("count", count);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/profile/{id}")
    public Member getProfileById(@PathVariable int id) {
        return memberService.getMemberProfileById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));
    }

}
