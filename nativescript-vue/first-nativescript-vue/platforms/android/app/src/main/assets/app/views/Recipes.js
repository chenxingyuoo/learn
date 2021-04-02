/**
 * Created on 2018/4/19.
 */

'use strict';

module.exports = {
  data: function(){
    return {
      recipes: []
    }
  },
  created() {
    this.fetchRecipes()
  },
  template: `
            <scroll-view class="green">
                <wrap-layout horizontalalignment="center">      
                    <stack-layout style="margin-left: 10" class="card" width="45%" v-for="(recipe, i) in recipes" key="i">
                        <stack-layout horizontalalignment="center" @tap="$router.push({ name:'recipe',params: {id: recipe.id} })">
                            <img :src="recipe.image">          
                            {{ recipe.name }}
                        </stack-layout>
                    </stack-layout>           
                </wrap-layout>
            </scroll-view>
    `
  ,
  methods: {

    fetchRecipes() {
      this.$http.getJSON(`../api/list.json`).then((res) => {
        console.log('res', res);
        for( var key in res) {
          this.recipes.unshift({id : key, name: res[key].Name, image: res[key].Image})
        }
      }).catch((err) => {
        console.log('err..' + err)
      })
    }
  }
};