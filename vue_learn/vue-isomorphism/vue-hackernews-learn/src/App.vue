<template>
    <div id="app">

        <c-header></c-header>

        <div class="main">
            <router-view class="main-wrapper"></router-view>
        </div>

        <c-footer></c-footer>
        <c-back></c-back>
    </div>
</template>

<script>
    import cHeader from './components/Header.vue'
    import cFooter from './components/Footer.vue'
    import cBack from './components/backTop.vue'

    export default {
        name: 'app',
        components: {
            cHeader,
            cFooter,
            cBack
        },

        watch : {
//            currentTab (){
//                //显示hint
//                this.$store.dispatch('showHint');
//            }
        },
        beforeMount() {
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    * {
        padding: 0;
        margin: 0;
    }

    html, #app {
        height: 100%;
    }

    body {
        height: 100%;
        font: 16px 'Microsoft YaHei' sans-serif;
        background-color: #E1E1E1;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        list-style: none;
    }

    a {
        color: #CCC;
        text-decoration: none;
    }

    img {
        vertical-align: middle;
        max-width: 100%;
    }

    .main {
        overflow: hidden;
        padding: 0 5%;
        min-height: 100%;
    }

    .bounce-enter-active {
        animation: bounce-in 2s ease;
    }

    .bounce-leave-active {
        animation: bounce-out 2s ease;
    }

    @keyframes bounce-out {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-100%);
        }
    }

    @keyframes bounce-in {
        0% {
            opacity: 0;
            transform: translateY(100%);
        }
        100% {
            transform: translateY(0%);
            opacity: 1;
        }
    }

    .fade-transition {
        transition: all .5s ease-in-out;
    }

    .fade-enter-active {
        opacity: 0;
        transition: all .5s ease;
    }

    .fade-leave-active {
        opacity: 0;
        transition: all .5s ease-in-out;
    }

    .panel-header {
        font-size: .9em;
        background-color: #F6F6F6;
        /*padding: 10px;*/
        border-radius: 3px 3px 0 0;
        padding: 15px 5%;
        position: fixed;
        /* text-align: center; */
        top: 45px;
        left: 0;
        right: 0;
        z-index: 998;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1)
        a {
            color: #80BD01;
            padding: 3px 4px;
            margin: 0 10px;
            border-radius: 3px;
            cursor: pointer;
            &:hover {
                color: #005580;
            }
        }

        .active {
            background-color: #80BD01;
            color: #FFF;

            &:hover {
                background-color: #80BD01;
                color: #FFF;
            }
        }
    }

</style>
