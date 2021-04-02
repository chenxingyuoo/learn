/**
 * Created on 2018/4/19.
 */

'use strict';

const SegmentedBarItem = require('tns-core-modules/ui/segmented-bar').SegmentedBarItem

module.exports = {
  data: function(){
    return {
      recipe: []
    }
  },
  created() {
    var id = this.$route.params.id
    this.fetchOneRecipe(id)
    var firstItem = new SegmentedBarItem();
    var secondItem = new SegmentedBarItem();
    var thirdItem = new SegmentedBarItem();
    firstItem.title = "Ingredients";
    secondItem.title = "Tools";
    thirdItem.title = "Procedure";
    this.recipeSteps = [ firstItem, secondItem, thirdItem ];
  },
  template: `
    <stack-layout>
        <img :src="recipe.image" height="25%" stretch="aspectFill">            
        <stack-layout class="innerCard">
               
            <segmented-bar class="bar" bordercolor="#8AC215" :items="recipeSteps" selectedbackgroundcolor="#8AC215" #sb="" selectedindex="0" @selectedindexchange="changeTab(sb)"></segmented-bar>
            <stack-layout verticalalignment="top">
                <scroll-view height="75%" verticalalignment="top">
                    
                </scroll-view>
                <stack-layout height="25%" verticalalignment="center">
                </stack-layout>
            </stack-layout>
        </stack-layout>
    </stack-layout>
    `,
  methods: {
    fetchOneRecipe(id){
      // console.log('this.$http', this.$http);
      this.$http.getJSON(`https://quicknoms-91e39.firebaseio.com/Recipes.json?orderBy="$key"&equalTo="${id}"`).then((res) => {
        this.recipe = res;
        for( var key in res) {
          this.recipe.name = res[key].Name
          this.recipe.image = res[key].Image
          this.recipe.notes = res[key].Notes
          this.recipe.procedure = res[key].Method
        }
        console.log(JSON.stringify(this.recipe))
      }).catch((err) => {
        console.log('err..' + err)
      })
    },
    changeTab(id){
      switch (id) {
        case 0:
          this.procedure = this.ingredients;
          break;
        case 1:
          this.procedure = this.tools;
          break;
        case 2:
          this.procedure = this.method;
          break;
      }
    }
  }
};