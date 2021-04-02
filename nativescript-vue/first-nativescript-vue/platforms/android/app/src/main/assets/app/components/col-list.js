module.exports = {
  props:['movies'],
  template: `
    <stack-layout>
      <stack-layout class="col-list-wrapper" v-for="item in movies" orientation="horizontal"
      @tap="handleTap(item.id)">
        <image class="col-list-image" :src="item.images.small" />
        <stack-layout>
          <label style="font-size: 20; font-weight: bold" :text="item.title" />
          <label>{{item.year}}/{{item.genres[0]}},{{item.genres[1]}}</label>
          <label v-if="item.casts.length">{{item.casts[0].name}}/{{item.casts[1].name}}</label>
        </stack-layout>
      </stack-layout>
    </stack-layout>
  `,
  methods: {
    handleTap (id) {
      this.$router.push({name: 'detail', params: {id}})
    }
  }
};
