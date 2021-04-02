module.exports = {
  props: {
    cinemas: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  template: `
    <stack-layout v-if="cinemas.length > 0">
      <stack-layout v-for="item in cinemas" class="cinema-item">
        <flexbox-layout justifyContent="space-between" alignItems="flex-end" style="margin-bottom: 10">
          <label style="font-size: 20; color: #000" :text="item.name" />
          <flexbox-layout alignItems="flex-end" style="width: 100; margin-right: 10">
            <label style="color: red; font-size: 18" :text="item.price" />
            <label style="color: red; font-size: 12; margin-left: 6" text="元/起" />
          </flexbox-layout>
        </flexbox-layout>
        <label :text="item.site" />
        <stack-layout orientation="horizontal" style="margin-top: 10">
          <label style="height: 24; width: 24; background-color: #ffa500; border-radius: 4;
           color: #fff; line-height: 24; text-align: center" text="座" />
          <label style="height: 24; width: 24; border-radius: 4; border-width: 1; border-color: #87cefa;
           color: #87cefa; line-height: 24; text-align: center; margin-left: 10" text="惠" />
        </stack-layout>
      </stack-layout>
    </stack-layout>
    <stack-layout v-else>
      <loading />
    </stack-layout>
  `
};