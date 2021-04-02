<template>
  <div>i am {{ articleId }}</div>
</template>

<script>
    export default {
      data() {
          return {};
      },
      created() {
        this.articleId = this.$route.params.id;
      },
    };
</script>

<style>

</style>
