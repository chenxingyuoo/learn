package com.gold.tmall.dao;

import java.util.List;

import com.gold.tmall.model.SysUser;

/**
 * @author zhang.fuqing
 * @date 2021-04-16 21:03:14
 */
public interface SysUserMapper {

    /**
     * 根据用户主键删除用户信息
     * @param id 用户主键
     * @return 删除数量
     */
    int deleteByPrimaryKey(Long id);

    /**
     * 插入用户信息
     * @param record 用户信息
     * @return 插入条数
     */
    int insert(SysUser record);

    /**
     * 选择非空字段插入用户信息
     * @param record 用户信息
     * @return 插入条数
     */
    int insertSelective(SysUser record);

    /**
     * 根据用户主键查询用户信息
     * @param id 用户主键
     * @return 用户信息
     */
    SysUser selectByPrimaryKey(Long id);

    /**
     * 根据用户主键更新用户非空信息
     * @param record 被更新用户非空信息
     * @return 更新条数
     */
    int updateByPrimaryKeySelective(SysUser record);

    /**
     * 根据用户主键更新用户信息
     * @param record 被更新信息
     * @return 更新条数
     */
    int updateByPrimaryKey(SysUser record);

    /**
     * 查询全部用户信息
     * @return 用户信息列表
     */
    List<SysUser> findAll();
}
