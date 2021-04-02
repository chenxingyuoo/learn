/**
 * Created on 2018/4/24.
 */

'use strict';

module.exports = {
  data() {
    return {
    };
  },
  template: `
      <!--<DockLayout stretchLastChild="false" backgroundColor="#3c495e">
        <Label text="left" dock="left" width="40" backgroundColor="#43b883"/>
        <Label text="top" dock="top" height="40" backgroundColor="#289062"/>
        <Label text="right" dock="right" width="40" backgroundColor="#43b883"/>
        <Label text="bottom" dock="bottom" height="40" backgroundColor="#289062"/>
      </DockLayout>-->
      
      <!--<DockLayout stretchLastChild="true" backgroundColor="#3c495e">
        <Label text="left" dock="left" width="40" backgroundColor="#43b883"/>
        <Label text="top" dock="top" height="40" backgroundColor="#289062"/>
        <Label text="right" dock="right" width="40" backgroundColor="#43b883"/>
        <Label text="bottom" dock="bottom" backgroundColor="#1c6b48"/>
      </DockLayout>-->
      
      <DockLayout stretchLastChild="true" backgroundColor="#3c495e">
        <Label text="left 1" dock="left" width="40" backgroundColor="#43b883"/>
        <Label text="left 2" dock="left" width="40" backgroundColor="#289062"/>
        <Label text="left 3" dock="left" width="40" backgroundColor="#1c6b48"/>
        <Label text="last child" backgroundColor="#43b883"/>
      </DockLayout>
  `,
  components: {

  },
};