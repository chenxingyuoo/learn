package com.gold.tmall.controller;

import com.gold.tmall.model.SysUser;
import com.gold.tmall.service.SysUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author zhang.fuqing
 * @date 2021-04-16 20:59:14
 */
@Api(tags = "用户控制器")
@RestController
public class SysUserController {

    @Resource
    private SysUserService sysUserService;

    @ApiOperation(value="获取所有用户信息", notes="获取所有用户信息列表")
    @GetMapping(value="/api/user")
    public List<SysUser> findAll() {
        return sysUserService.findAll();
    }

    @ApiOperation(value="获取用户信息", notes="根据用户主键获取用户信息")
    @ApiImplicitParam(name = "id", value = "用户主键", required = true, dataType = "Long")
    @GetMapping(value="/api/user/{id}")
    public SysUser getUser(@PathVariable Long id) {
        return sysUserService.selectByPrimaryKey(id);
    }
}
