/**
 * Created on 2018/4/24.
 */

'use strict';

module.exports = {
  template: `
      <!--<StackLayout backgroundColor="#3c495e">
        <Label text="first" height="70" backgroundColor="#43b883"/>
        <Label text="second" height="70" backgroundColor="#289062"/>
        <Label text="third" height="70" backgroundColor="#1c6b48"/>
      </StackLayout>-->
      
      <!--<StackLayout orientation="horizontal" backgroundColor="#3c495e">
        <Label text="first" width="70" backgroundColor="#43b883"/>
        <Label text="second" width="70" backgroundColor="#289062"/>
        <Label text="third" width="70" backgroundColor="#1c6b48"/>
      </StackLayout>-->
      
      <!--<StackLayout backgroundColor="#3c495e">
        <Label text="left" horizontalAlignment="left"
               width="33%" height="70" backgroundColor="#43b883"/>
        <Label text="center" horizontalAlignment="center"
               width="33%" height="70" backgroundColor="#289062"/>
        <Label text="right" horizontalAlignment="right"
               width="33%" height="70" backgroundColor="#1c6b48"/>
        <Label text="stretch" horizontalAlignment="stretch"
               height="70" backgroundColor="#43b883"/>
      </StackLayout>-->
      
       <StackLayout orientation="horizontal" backgroundColor="#3c495e">
        <Label text="top" verticalAlignment="top"
               width="70" height="33%" backgroundColor="#43b883"/>
        <Label text="center" verticalAlignment="center"
               width="70" height="33%" backgroundColor="#289062"/>
        <Label text="bottom" verticalAlignment="bottom"
               width="70" height="33%" backgroundColor="#1c6b48"/>
        <Label text="stretch" verticalAlignment="stretch"
               width="70" backgroundColor="#43b883"/>
      </StackLayout>
  `
};