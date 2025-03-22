package com.atguigu.spring6.tx.service;

import com.atguigu.spring6.tx.dao.BookDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Transactional
@Service
public class BookServiceImpl implements BookService{

    @Autowired
    private BookDao bookDao;

    @Override
    public void buyBook(Integer bookId, Integer userId) {
//        try {
//            TimeUnit.SECONDS.sleep(5);
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        }
        //根据图书id查询图书价格
        Integer price = bookDao.getBookPriceByBookId(bookId);

        System.out.println("price:" + price);

        //更新图书表库存量 -1
        bookDao.updateStock(bookId);

        bookDao.updateUserBalance(userId, price);
    }
}
