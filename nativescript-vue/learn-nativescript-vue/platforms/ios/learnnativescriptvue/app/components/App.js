const AbsoluteLayout = require('./AbsoluteLayout');
const DockLayout = require('./DockLayout');
const FlexboxLayout = require('./FlexboxLayout');
const GridLayout = require('./GridLayout');
const StackLayout = require('./StackLayout');
const WrapLayout = require('./WrapLayout');

module.exports = {
  data() {
    return {
      surprise: false,
    };
  },
  template: `
    <Page class="page">
      <!--<absolute-layout></absolute-layout>-->
      <!--<dock-layout></dock-layout>-->
      <!--<flexbox-layout></flexbox-layout>-->
      <!--<grid-layout></grid-layout>-->
      <!--<stack-layout></stack-layout>-->
      <wrap-layout></wrap-layout>
    </Page>
  `,
  components: {
    AbsoluteLayout,
    DockLayout,
    FlexboxLayout,
    GridLayout,
    StackLayout,
    WrapLayout
  },
};
