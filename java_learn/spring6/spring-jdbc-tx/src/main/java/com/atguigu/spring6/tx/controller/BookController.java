package com.atguigu.spring6.tx.controller;

import com.atguigu.spring6.tx.service.BookService;
import com.atguigu.spring6.tx.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class BookController {
//    @Autowired
//    private BookService bookService;
//
//    public void buyBook(Integer bookId, Integer userId) {
//
//        bookService.buyBook(bookId, userId);
//    }

    @Autowired
    private CheckoutService checkoutService;

    public void checkout(Integer[] bookIds, Integer userId) {
        checkoutService.checkout(bookIds, userId);
    }
}
