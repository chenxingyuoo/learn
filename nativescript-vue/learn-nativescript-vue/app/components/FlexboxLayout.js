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
      <StackLayout>
        <FlexboxLayout backgroundColor="#3c495e">
          <Label text="first" width="70" backgroundColor="#43b883"/>
          <Label text="second" width="70" backgroundColor="#1c6b48"/>
          <Label text="third" width="70" backgroundColor="#289062"/>
        </FlexboxLayout>
        
        <FlexboxLayout flexDirection="column" backgroundColor="#3c495e">
          <Label text="first" height="70" backgroundColor="#43b883"/>
          <Label text="second" height="70" backgroundColor="#1c6b48"/>
          <Label text="third" height="70" backgroundColor="#289062"/>
        </FlexboxLayout>
        
        <FlexboxLayout alignItems="flex-start" backgroundColor="#3c495e">
          <Label text="first" width="70" height="70" backgroundColor="#43b883"/>
          <Label text="second" width="70" height="70" backgroundColor="#1c6b48"/>
          <Label text="third" width="70" height="70" backgroundColor="#289062"/>
        </FlexboxLayout>
        
        <FlexboxLayout alignItems="flex-start" backgroundColor="#3c495e">
          <Label text="first" order="2" width="70" height="70" backgroundColor="#43b883"/>
          <Label text="second" order="3" width="70" height="70" backgroundColor="#1c6b48"/>
          <Label text="third" order="1" width="70" height="70" backgroundColor="#289062"/>
        </FlexboxLayout>
        
        <FlexboxLayout flexWrap="wrap" backgroundColor="#3c495e">
          <Label text="first" width="30%" backgroundColor="#43b883"/>
          <Label text="second" width="30%" backgroundColor="#1c6b48"/>
          <Label text="third" width="30%" backgroundColor="#289062"/>
          <Label text="fourth" width="30%" backgroundColor="#289062"/>
        </FlexboxLayout>
        
        <FlexboxLayout flexDirection="column-reverse"
               justifyContent="space-around" backgroundColor="#3c495e">
          <Label text="first" height="70" backgroundColor="#43b883"/>
          <Label text="second" alignSelf="center" width="70" height="70" backgroundColor="#1c6b48"/>
          <Label text="third\\nflex-end" alignSelf="flex-end" width="70" height="70" backgroundColor="#289062"/>
          <Label text="fourth" height="70" backgroundColor="#289062"/>
        </FlexboxLayout>
        
         <FlexboxLayout backgroundColor="#3c495e">
          <Label text="first" flexGrow="1"  backgroundColor="#43b883"/>
          <Label text="second" flexGrow="1"  backgroundColor="#1c6b48"/>
          <Label text="third" flexGrow="1"  backgroundColor="#289062"/>
        </FlexboxLayout>
      </StackLayout>
  `,
  components: {

  },
};