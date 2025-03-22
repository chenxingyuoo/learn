package com.atguigu.spring6.tx.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class BookDaoImpl implements BookDao{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Integer getBookPriceByBookId(Integer bookId) {
        String sql = "select price from t_book where book_id=?";

        Integer price = jdbcTemplate.queryForObject(sql, Integer.class, bookId);

        return price;
    }

    @Override
    public void updateStock(Integer bookId) {
        String sql = "update t_book set stock=stock-1 where book_id=?";

        int update = jdbcTemplate.update(sql, bookId);

        System.out.println("update:" + update);
    }

    @Override
    public void updateUserBalance(Integer userId, Integer price) {
        String sql = "update t_user set balance=balance-? where user_id=?";

        int update = jdbcTemplate.update(sql, price, userId);
    }
}
