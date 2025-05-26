package com.hexaware.lms.exception;

public class BookNotAvailableException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    private String message;

    public BookNotAvailableException(String message) {
        super();
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
