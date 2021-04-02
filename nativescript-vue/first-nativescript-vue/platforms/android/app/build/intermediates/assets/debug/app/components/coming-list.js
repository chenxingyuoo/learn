
module.exports = {
  props: ['subjects'],
  template: `
  <scroll-view orientation="horizontal" class="coming-list-wrapper">
    <stack-layout orientation="horizontal">
      <stack-layout v-for="item in subjects" class="coming-item"
      @tap="handleTap(item.id)">
        <image :src="item.images.small" class="coming-image" />
        <label :text="item.title" class="coming-Font"></label>
      </stack-layout>
    </stack-layout>
  </scroll-view>
  `,
  methods: {
    handleTap (id) {
      this.$router.push({name: 'detail', params: {id}})
    }
  }
};