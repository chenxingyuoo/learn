<template>
  <div class="hint" :class="{ 'hint-failure': hint.colorRed }">
    {{ hint.info }}
  </div>
</template>

<script>
//  import { getHint } from '../vuex/getters';

  export default {
    data() {
        return {};
    },
    beforeMount(){

    },
    computed: {
      hint () {
        return this.$store.getters.getHint
      }
    }

  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .hint {
    padding: 10px 0px;
    text-align: center;
    color: #468847;
    background-color: #DFF0D8;
  }

  .hint-failure {
    color: #B94A48;
    background-color: #F2DEDE;
  }
</style>
