<template>
    <div class="content">
        <div class="panel">

            <div class="panel-header">
                <router-link v-for="(item, index) in topicTabs" :to="{name : item.ename}" :key="item.ename"
                             :class="item.ename === currentTab ? 'active' : ''">{{ item.name }}
                </router-link>
            </div>

            <nav class="pagination">
                <router-link class="pre" :to="'/' + type + '/' + (page - 1)" v-if="page > 1">上一页</router-link>
                <span>第 {{ page }} 页</span>
                <router-link class="next" :to="'/' + type + '/' + (page + 1)">下一页</router-link>
            </nav>

            <spinner :show="loading"></spinner>

            <!--传数据到子组件-->
            <transition :name="transition" >
                <ul class="news-list" :key="displayedPage" v-if="displayedPage > 0">
                    <item v-for="item in topicLists" :key="item.id" :item='item'></item>
                </ul>
            </transition>


        </div>

    </div>
</template>

<script>
    import Spinner from '../components/Spinner.vue'
    import Item from '../components/Item.vue'

    import {mapGetters, mapActions} from 'vuex';

    let isInitialRender = true;

    export default {
        data() {
            const data = {
                loading: false,
                transition: 'slide-up',
                displayedPage: isInitialRender ? Number(this.$store.state.route.params.page) || 1 : -1,
                displayedItems: isInitialRender ? this.$store.getters.getTopicLists : []
            };

            isInitialRender = false;

            return data;
        },
        props: {
            type: String
        },
        components: {
            Item,
            Spinner
        },
        computed: {
            page () {
                return Number(this.$store.state.route.params.page) || 1
            },
            ...mapGetters({
                topicTabs : 'getTopicTabs',
                topicLists: 'getTopicLists'
            }),

            currentTab (){
                return this.$store.state.route.name;
            },
        },

        beforeMount(){
            this.loadItems(this.page)
        },

        watch: {
            page (to, from) {
                this.loadItems(to, from)
            }
        },

        methods: {
            ...mapActions([
                'initHint',
                'showHint',
                'fetchTopicLists'
            ]),

            loadItems(to = this.page, from = -1){
                const topicListObject = {
                    topicTab: this.type,
                    currentPage: this.page
                };

                this.loading = true;

                // 获取文章列表
                this.fetchTopicLists(topicListObject)
                    .then(() => {
                        // loading隐藏
                        this.loading = false;

                        this.displayedPage = to;

                        //动画切换
                        this.transition = from === -1
                            ? null
                            : to > from ? 'slide-left' : 'slide-right'
                    })
                    .catch((e) => console.log(e));



            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .panel
        min-height: 1px
        max-width 800px;
        margin: 0 auto;


    .news-list
        width 100%
        transition all .5s cubic-bezier(.55, 0, .1, 1)
        background-color #fff
        margin-top : 160px
        margin-bottom 20px
        box-shadow 0 0 5px #aaa
        .news-item
            padding: 10px;
            overflow: hidden;
            &:hover {
                background-color: #E1E1E1;
            }
        .news-item img
            width: 30px;
            height: 30px;
            border-radius: 3px;

    .slide-left-enter, .slide-right-leave-active
        opacity 0
        transform translate(30px, 0)

    .slide-left-leave-active, .slide-right-enter
        opacity 0
        transform translate(-30px, 0)

    .item-move, .item-enter-active, .item-leave-active
        transition all .5s cubic-bezier(.55, 0, .1, 1)

    .item-enter
        opacity 0
        transform translate(30px, 0)

    .item-leave-active
        position absolute
        opacity 0
        transform translate(30px, 0)

    .pagination {
        overflow: hidden;
        /*padding: 10px;*/
        font-size: 10px;
        margin: 0 auto;
        background-color: #fff;
        /*text-align: center;*/
        padding: 15px 30px;
        position: fixed;
        text-align: center;
        top: 95px;
        left: 0;
        right: 0;
        z-index: 998;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1)
        a {
            border: 1px solid #DDD;
            padding: 5px;
            border-radius: 3px;
            cursor: pointer;
            margin: 0 1em;
            color #333;
            &:hover {
                background-color: #F5F5F5;
            }
        }
    }
</style>
