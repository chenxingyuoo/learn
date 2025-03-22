package com.atguigu.spring6.tx.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    @Autowired
    private BookService bookService;

    @Transactional
    @Override
    public void checkout(Integer[] bookIds, Integer userId) {
        for (int i = 0; i < bookIds.length; i++) {
            bookService.buyBook(bookIds[i], userId);
        }
    }
}
