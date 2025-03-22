package com.gold.tmall.service;

import java.util.List;

import com.gold.tmall.model.SysUser;

/**
 * @author zhang.fuqing
 * @date 2021-04-16 21:03:14
 */
public interface SysUserService {

    /**
     * 查找所有用户
     * @return
     */
    List<SysUser> findAll();

    /**
     * 根据用户主键查询用户信息
     * @param id 用户主键
     * @return 用户信息
     */
    SysUser selectByPrimaryKey(Long id);

    /**
     * 插入用户信息
     * @param record 用户信息
     * @return 插入条数
     */
    int insert(SysUser record);

    /**
     * 根据用户主键删除用户信息
     * @param id 用户主键
     * @return 删除数量
     */
    int deleteByPrimaryKey(Long id);

}
