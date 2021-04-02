<template>
  <ul class="me-pager" @click="onPagerClick">
    <li>上一页</li>
    <li
      :class="{ active: currentPage === 1 }"
      v-if="pageCount > 0"
      class="number">1</li>
    <li
      class="el-icon more btn-quickprev"
      :class="[quickprevIconClass]"
      v-if="showPrevMore"
      @mouseenter="quickprevIconClass = 'el-icon-d-arrow-left'"
      @mouseleave="quickprevIconClass = 'el-icon-more'">
      <<
    </li>
    <li v-for="pager in pagers" :class="{ active: currentPage === pager }" class="number">
      {{ pager }}
    </li>
    <li
      class="el-icon more btn-quicknext"
      :class="[quicknextIconClass]"
      v-if="showNextMore"
      @mouseenter="quicknextIconClass = 'el-icon-d-arrow-right'"
      @mouseleave="quicknextIconClass = 'el-icon-more'">
      >>
    </li>

    <li>下一页</li>
    <!--<li-->
    <!--:class="{ active: currentPage === 1 }"-->
    <!--v-if="pageCount > 0"-->
    <!--class="number">1-->
    <!--</li>-->
    <!--<li-->
    <!--class="el-icon more btn-quickprev"-->
    <!--:class="[quickprevIconClass]"-->
    <!--v-if="showPrevMore"-->
    <!--@mouseenter="quickprevIconClass = 'el-icon-d-arrow-left'"-->
    <!--@mouseleave="quickprevIconClass = 'el-icon-more'">-->
    <!--</li>-->
    <!--<li-->
    <!--v-for="pager in pagers"-->
    <!--:class="{ active: currentPage === pager }"-->
    <!--class="number">{{ pager }}-->
    <!--</li>-->
    <!--<li-->
    <!--class="el-icon more btn-quicknext"-->
    <!--:class="[quicknextIconClass]"-->
    <!--v-if="showNextMore"-->
    <!--@mouseenter="quicknextIconClass = 'el-icon-d-arrow-right'"-->
    <!--@mouseleave="quicknextIconClass = 'el-icon-more'">-->
    <!--</li>-->
    <!--<li-->
    <!--:class="{ active: currentPage === pageCount }"-->
    <!--class="number"-->
    <!--v-if="pageCount > 1">{{ pageCount }}-->
    <!--</li>-->
  </ul>
</template>

<script>
  export default {
    name: 'ElPager',

    props: {
      currentPage: Number,
      pageSize: {
        type: Number,
        default: 10
      },
      pageCount: Number
    },

    watch: {
      showPrevMore(val) {
        if (!val) {
          this.quickprevIconClass = 'el-icon-more';
        }
      },

      showNextMore(val) {
        if (!val) {
          this.quicknextIconClass = 'el-icon-more';
        }
      }
    },

    methods: {
      onPagerClick(event) {
          debugger;
        const target = event.target;
        if (target.tagName === 'UL') {
          return;
        }

        let newPage = Number(event.target.textContent);
        const pageCount = this.pageCount;
        const currentPage = this.currentPage;

        if (target.className.indexOf('more') !== -1) {
          if (target.className.indexOf('quickprev') !== -1) {
            newPage = currentPage - 5;
          } else if (target.className.indexOf('quicknext') !== -1) {
            newPage = currentPage + 5;
          }
        }

        /* istanbul ignore if */
        if (!isNaN(newPage)) {
          if (newPage < 1) {
            newPage = 1;
          }

          if (newPage > pageCount) {
            newPage = pageCount;
          }
        }

        this.currentPage = newPage;

        if (newPage !== currentPage) {
          this.$emit('change', newPage);
        }
      }
    },

    computed: {
      pagers() {
          debugger;
        const pagerCount = 7;

        const currentPage = Number(this.currentPage);
        const pageCount = Number(this.pageCount);

        let showPrevMore = false;
        let showNextMore = false;

        if (pageCount > pagerCount) {
          if (currentPage > pagerCount - 2) {
            showPrevMore = true;
          }

          if (currentPage < pageCount - 2) {
            showNextMore = true;
          }
        }

        const array = [];

        if (showPrevMore && !showNextMore) {
          const startPage = pageCount - (pagerCount - 2);
          for (let i = startPage; i < pageCount; i++) {
            array.push(i);
          }
        } else if (!showPrevMore && showNextMore) {
          for (let i = 2; i < pagerCount; i++) {
            array.push(i);
          }
        } else if (showPrevMore && showNextMore) {
          const offset = Math.floor(pagerCount / 2) - 1;
          for (let i = currentPage - offset; i <= currentPage + offset; i++) {
            array.push(i);
          }
        } else {
          for (let i = 2; i < pageCount; i++) {
            array.push(i);
          }
        }

        this.showPrevMore = showPrevMore;
        this.showNextMore = showNextMore;

        return array;
      }
    },

    data() {
      return {
        current: null,
        showPrevMore: false,
        showNextMore: false,
        quicknextIconClass: 'el-icon-more',
        quickprevIconClass: 'el-icon-more'
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .me-pager{
    list-style-type: none;
    li{
      border: 1px solid #ddd;
      float: left;
      margin: 0 8px;
      padding: 0 8px;
      min-height: 24px;
      cursor: pointer;
      &.active{
        background-color: #50bfff;
        color: #fff;
      }
    }
  }
</style>
