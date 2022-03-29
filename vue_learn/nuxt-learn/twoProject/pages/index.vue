<!--
 * @Description: 这是***页面
 * @Date: 2018-10-26 14:00:17
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
-->
<template>
  <div class="container">
    <h1>User Agent</h1>
    <p>{{ userAgent }}</p>
    <p>
      <nuxt-link to="/posts">Blog</nuxt-link>
    </p>

    <el-button @click="increment">{{ counter }}</el-button>

    <el-card
      shadow="hover"
      v-for="(post, index) in posts"
      :key="index"
      style="margin-bottom: 10px"
    >
      <nuxt-link :to="{ path: '/posts/id', query: { id: post.id } }">{{
        post.title
      }}</nuxt-link>
    </el-card>

    <button @click="increment">{{ counter }}</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  async asyncData({ req }) {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    return {
      posts: data,
      userAgent: req
        ? req.headers["user-agent"]
        : typeof navigator !== "undefined"
        ? navigator.userAgent
        : "No user agent (generated)"
    };
  },
  computed: mapState(["counter"]),

  data() {
    return {};
  },

  beforeMount() {
    setTimeout(() => {
      this.increment();
    }, 3000);
  },
  methods: {
    increment() {
      this.$store.commit("increment");
    }
  }
};
</script>

<style scoped>
.container {
  width: 70%;
  margin: auto;
  text-align: center;
  padding-top: 100px;
}

p {
  font-size: 20px;
}

a {
  color: #41b883;
}
</style>
