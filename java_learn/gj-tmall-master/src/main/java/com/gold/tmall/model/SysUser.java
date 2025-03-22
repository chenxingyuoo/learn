package com.gold.tmall.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
import java.util.Objects;

/**
 * @author zhang.fuqing
 * @date 2021-04-16 21:03:14
 */
@ApiModel(description = "系统用户")
public class SysUser {

    /**
     * 编号
     * 【强制】表必备三字段：id, create_time, update_time。
     * 说明：其中 id 必为主键，类型为 bigint unsigned、单表时自增、步长为 1。create_time, update_time 的类型均为 datetime 类型。
     */
    @ApiModelProperty(value = "用户主键", name = "id", required = true, example = "1")
    private Integer id;

    /**
     * 用户名
     */
    @ApiModelProperty(value = "用户名", name = "name", example = "刘备")
    private String name;

    /**
     * 昵称
     */
    @ApiModelProperty(value = "昵称", name = "nickName", example = "刘备")
    private String nickName;

    /**
     * 头像
     */
    @ApiModelProperty(value = "头像", name = "avatar")
    private String avatar;

    /**
     * 密码
     */
    @ApiModelProperty(value = "密码", name = "password")
    private String password;

    /**
     * 加密盐
     */
    @ApiModelProperty(value = "加密盐", name = "salt")
    private String salt;

    /**
     * 邮箱
     */
    @ApiModelProperty(value = "邮箱", name = "email", example = "liubei@163.com")
    private String email;

    /**
     * 手机号
     */
    @ApiModelProperty(value = "手机号", name = "mobile", example = "12345678910")
    private String mobile;

    /**
     * 状态  0：禁用   1：正常
     */
    @ApiModelProperty(value = "状态，0：禁用、1：正常", name = "status", example = "1")
    private Integer status;

    /**
     * 机构ID
     */
    @ApiModelProperty(value = "机构编码", name = "deptId")
    private Integer deptId;

    /**
     * 创建人
     */
    @ApiModelProperty(value = "创建人", name = "createBy", example = "admin")
    private String createBy;

    /**
     * 创建时间
     * 【强制】表必备三字段：id, create_time, update_time。
     * 说明：其中 id 必为主键，类型为 bigint unsigned、单表时自增、步长为 1。create_time, update_time 的类型均为 datetime 类型。
     */
    @ApiModelProperty(value = "创建时间", name = "createTime", example = "2021-04-24 11:24:24")
    private Date createTime;

    /**
     * 更新人
     */
    @ApiModelProperty(value = "更新人", name = "lastUpdateBy", example = "admin")
    private String lastUpdateBy;

    /**
     * 更新时间
     * 【强制】表必备三字段：id, create_time, update_time。
     * 说明：其中 id 必为主键，类型为 bigint unsigned、单表时自增、步长为 1。create_time, update_time 的类型均为 datetime 类型。
     */
    @ApiModelProperty(value = "更新时间", name = "lastUpdateTime", example = "2021-04-24 11:24:24")
    private Date lastUpdateTime;

    /**
     * 是否删除  1 表示删除，0 表示未删除。
     * （阿里巴巴开发手册）
     * 【强制】POJO 类中布尔类型变量都不要加 is 前缀，否则部分框架解析会引起序列化错误。
     * 说明：在本文 MySQL 规约中的建表约定第一条，表达是与否的值采用 is_xxx 的命名方式，
     * 所以，需要在<resultMap>设置从 is_xxx 到 xxx 的映射关系。
     *
     * 反例：定义为基本数据类型 Boolean isDeleted 的属性，它的方法也是 isDeleted()，RPC 框架在反向解析的时候，
     * “误以为”对应的属性名称是 deleted，导致属性获取不到，进而抛出异常。
     */
    @ApiModelProperty(value = "是否删除：1 表示删除，0 表示未删除。", name = "delFlag", example = "0")
    private Integer delFlag;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getDeptId() {
        return deptId;
    }

    public void setDeptId(Integer deptId) {
        this.deptId = deptId;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getLastUpdateBy() {
        return lastUpdateBy;
    }

    public void setLastUpdateBy(String lastUpdateBy) {
        this.lastUpdateBy = lastUpdateBy;
    }

    public Date getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime(Date lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    public Integer getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Integer delFlag) {
        this.delFlag = delFlag;
    }

    @Override
    public String toString() {
        return "SysUser{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", nickName='" + nickName + '\'' +
                ", avatar='" + avatar + '\'' +
                ", password='" + password + '\'' +
                ", salt='" + salt + '\'' +
                ", email='" + email + '\'' +
                ", mobile='" + mobile + '\'' +
                ", status=" + status +
                ", deptId=" + deptId +
                ", createBy='" + createBy + '\'' +
                ", createTime=" + createTime +
                ", lastUpdateBy='" + lastUpdateBy + '\'' +
                ", lastUpdateTime=" + lastUpdateTime +
                ", delFlag=" + delFlag +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SysUser sysUser = (SysUser) o;

        if (!Objects.equals(id, sysUser.id)) {
            return false;
        }
        if (!Objects.equals(name, sysUser.name)) {
            return false;
        }
        if (!Objects.equals(nickName, sysUser.nickName)) {
            return false;
        }
        if (!Objects.equals(avatar, sysUser.avatar)) {
            return false;
        }
        if (!Objects.equals(password, sysUser.password)) {
            return false;
        }
        if (!Objects.equals(salt, sysUser.salt)) {
            return false;
        }
        if (!Objects.equals(email, sysUser.email)) {
            return false;
        }
        if (!Objects.equals(mobile, sysUser.mobile)) {
            return false;
        }
        if (!Objects.equals(status, sysUser.status)) {
            return false;
        }
        if (!Objects.equals(deptId, sysUser.deptId)) {
            return false;
        }
        if (!Objects.equals(createBy, sysUser.createBy)) {
            return false;
        }
        if (!Objects.equals(createTime, sysUser.createTime)) {
            return false;
        }
        if (!Objects.equals(lastUpdateBy, sysUser.lastUpdateBy)) {
            return false;
        }
        if (!Objects.equals(lastUpdateTime, sysUser.lastUpdateTime)) {
            return false;
        }
        return Objects.equals(delFlag, sysUser.delFlag);
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (nickName != null ? nickName.hashCode() : 0);
        result = 31 * result + (avatar != null ? avatar.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (salt != null ? salt.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (mobile != null ? mobile.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (deptId != null ? deptId.hashCode() : 0);
        result = 31 * result + (createBy != null ? createBy.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + (lastUpdateBy != null ? lastUpdateBy.hashCode() : 0);
        result = 31 * result + (lastUpdateTime != null ? lastUpdateTime.hashCode() : 0);
        result = 31 * result + (delFlag != null ? delFlag.hashCode() : 0);
        return result;
    }
}
