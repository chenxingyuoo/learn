package com.neo.model;

import java.io.Serializable;
import java.util.UUID;

/**
 * Created by summer on 2017/5/5.
 */
public class User implements Serializable {
        private static final long serialVersionUID = -3258839839160856613L;
        private UUID id;
        private String userName;
        private String passWord;

        public UUID getId() {
                return id;
        }

        public void setId(UUID id) {
                this.id = id;
        }

        public String getUserName() {
                return userName;
        }

        public void setUserName(String userName) {
                this.userName = userName;
        }

        public String getPassWord() {
                return passWord;
        }

        public void setPassWord(String passWord) {
                this.passWord = passWord;
        }

        @Override
        public String toString() {
                return "UserEntity{" +
                        "id=" + id +
                        ", userName='" + userName + '\'' +
                        ", passWord='" + passWord + '\'' +
                        '}';
        }
}
