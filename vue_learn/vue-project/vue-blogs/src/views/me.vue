<template>
  <div class="content">
    <p>电子邮箱:{{ me.email }}</p>
    <p>个人介绍:{{ me.introduction }}</p>
    <p>个性签名:{{ me.sign }}</p>
    <p>微博账号:
      <router-link :to="{ path: me.weibo }" target="_blank">
        {{ me.weibo }}
      </router-link>
    </p>
    <p>github:
      <router-link :to="{ path: me.github }" target="_blank">
        {{ me.github }}
      </router-link>
    </p>
  </div>
</template>

<script>
  import { mapActions , mapGetters } from 'vuex';
  export default {
    data() {
        return {};
    },
    computed: {
      ...mapGetters({
        me : 'getMe'
      })
    },
    methods: {
      ...mapActions(
        [
          'fetchMe'
        ])
    },
    created() {
      // 初始化hint
      this.fetchMe();
    },
  };
</script>

<style lang="scss" scoped>
  .content {
    padding: 10px;
  a{
    color: #5bc0de;
  }
  }
</style>
