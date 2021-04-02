<template>
  <footer>
    <a href='/' target='_blank'>@copyright 123456</a>
  </footer>
</template>

<script>
  /* eslint-disable max-len */
  export default {
    beforeMount (){
//      this.$store.dispatch('fetFriendLink');
    }
  };
</script>

<style lang="scss">
  footer {
    text-align: center;
    clear: both;
    background-color: #FFF;
    padding: 20px 5%;
    color: #CCC;
  }

  .link {
    font-size: 14px;
    margin-bottom: 10px;
    a {
      color: #666;
      &:hover{
        color: red;
      }
    }
  }

  .friendLink{
    a{
      color: #5bc0de;
      &:hover{
        color: red;
      }
    }
  }


</style>
