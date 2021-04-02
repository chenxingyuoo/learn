<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <!--<ul>-->
    <!--<li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>-->
    <!--<li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>-->
    <!--<li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>-->
    <!--<li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>-->
    <!--<br>-->
    <!--<li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>-->
    <!--</ul>-->
    <!--<h2>Ecosystem</h2>-->
    <!--<ul>-->
    <!--<li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>-->
    <!--<li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>-->
    <!--<li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>-->
    <!--<li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>-->
    <!--</ul>-->

    <div class="mint-ui">
      <picker :slots="slots" @change="onValuesChange" rotate-effect :visible-item-count="3">
        <!-- Toolbar items -->
        <button>confirm</button>
        <button>cancel</button>
      </picker>
    </div>

  </div>
</template>

<script>

  import Vue from 'vue';

  import Picker from '../components/me-picker';

//    import Picker from '../components/mint-picker';

  Vue.component('picker', Picker);


  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        slots: [
          {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06','2015-07', '2015-08', '2015-09', '2015-10', '2015-11', '2015-12'],
            className: 'slot1',
            textAlign: 'right'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06','2015-07', '2015-08', '2015-09', '2015-10', '2015-11', '2015-12'],
            className: 'slot3',
            textAlign: 'left'
          }
        ]
      }
    },
    methods: {
      onValuesChange(picker, values) {
        if (values[0] > values[1]) {

          picker.setSlotValue(1, values[0]);

        }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
