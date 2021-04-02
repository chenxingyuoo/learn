<template>
  <div class="index">
    <a @click="showMessageBox">showMessageBox</a>

    <pagination :currentPage="1" :pageCount="29" ></pagination>
  </div>
</template>

<script>
  import pagination from '../components/me-components/pagination/src/main.vue';
  export default {
    data() {
      return {};
    },
    components: {
      pagination
    },
    computed: {},
    beforeMount(){

    },
    mounted(){

    },
    methods: {
      showMessageBox(){
        this.$confirm('hello!', '提示',{

        }).then(() => {
          alert('删除成功');
        }).catch(() => {
          alert('取消删除');
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
