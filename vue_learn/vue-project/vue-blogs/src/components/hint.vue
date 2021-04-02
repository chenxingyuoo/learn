<template>
  <div class="hint" :class="{ 'hint-failure': hint.colorRed }">
    {{ hint.info }}
  </div>
</template>

<script>
	export default {
       created() {
       	 this.hint =  this.$store.getters.getHint
       }
	}
</script>

<style lang="scss">
  .hint {
    padding: 10px 0px;
    text-align: center;
    color: #468847;
    background-color: #f7f7f7;
  }

  .hint-failure {
    color: #B94A48;
    background-color: #F2DEDE;
  }
</style>
