package com.hexaware.lms.config;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hexaware.lms.exception.BookNotAvailableException;
import com.hexaware.lms.exception.InvalidIDException;


@RestControllerAdvice
public class GlobalExceptionHandlerConfig {
	
	Logger logger = LoggerFactory.getLogger("GlobalExceptionHandlerConfig");

	 @ExceptionHandler(InvalidIDException.class)
	 public ErrorResponse invalidIDExceptionHandler(InvalidIDException e) {
		 logger.error("Invalid Id given"+e.getMessage());
		 return ErrorResponse.create
				 			(e, 
				 			HttpStatusCode.valueOf(400), 
				 			e.getMessage()); 
	 }
	 
	 @ExceptionHandler(BookNotAvailableException.class)
	 public ErrorResponse bookNotAvailableExceptionHandler(BookNotAvailableException e) {
		 logger.error("Invalid Username given"+e.getMessage());
		 return ErrorResponse.create
				 			(e, 
				 			HttpStatusCode.valueOf(400), 
				 			e.getMessage()); 
	 }
	 
	 @ExceptionHandler(RuntimeException.class)
	 public ErrorResponse invalidImageExceptionHandler(RuntimeException e) {
		 logger.error("Invalid Image given"+e.getMessage());
		 return ErrorResponse.create
				 			(e, 
				 			HttpStatusCode.valueOf(400), 
				 			e.getMessage()); 
	 }
	 
	 @ExceptionHandler(IOException.class)
	 public ErrorResponse invalidIOExceptionHandler(IOException e) {
		 return ErrorResponse.create
				 			(e, 
				 			HttpStatusCode.valueOf(400), 
				 			e.getMessage()); 
	 }
	 
	 @ExceptionHandler(Exception.class)
	 public ErrorResponse exceptionHandler(Exception e) {
		 return ErrorResponse.create
				 			(e, 
				 			HttpStatusCode.valueOf(400), 
				 			e.getMessage()); 
	 }
}