package com.gold.tmall.service.impl;

import com.gold.tmall.dao.SysUserMapper;
import com.gold.tmall.model.SysUser;
import com.gold.tmall.service.SysUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author zhang.fuqing
 * @date 2021-04-16 21:04:14
 */
@Service
public class SysUserServiceImpl implements SysUserService {

    @Resource
    private SysUserMapper sysUserMapper;

    @Override
    public SysUser selectByPrimaryKey(Long id) {
        return sysUserMapper.selectByPrimaryKey(id);
    }

    @Override
    public int insert(SysUser record) {
        return sysUserMapper.insert(record);
    }

    @Override
    public int deleteByPrimaryKey(Long id) {
        return sysUserMapper.deleteByPrimaryKey(id);
    }

    @Override
    public List<SysUser> findAll() {
        return sysUserMapper.findAll();
    }
}
