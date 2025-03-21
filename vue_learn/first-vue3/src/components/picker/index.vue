<template>
  <div>
    <!--背景-点击可关闭卡片-->
    <!-- <mark
      class="bgCard"
      v-if="showSeason"
      @click.stop="showSeason = false"
    ></mark> -->
    <!-- 显示输入框 -->
    <el-input
      placeholder="请选择季度"
      v-model="showValue"
      style="width:220px;"
      clearable
      readonly
      @clear="clearClick"
      @focus="focusClick"
    >
      <i slot="prefix" class="el-input__icon el-icon-date"></i>
    </el-input>
    <!-- 季度选择器卡片 -->
    <el-card class="box-card" v-if="showSeason">
      <div slot="header" class="clearfix" style="text-align:center;padding:0">
        <button
          type="button"
          aria-label="前一年"
          class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
          @click="prevSub"
        ></button>
        <span role="button" class="el-date-picker__header-label"
          >{{ year }}年</span
        >
        <button
          type="button"
          aria-label="后一年"
          @click="nextAdd"
          class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
        ></button>
      </div>
      <!-- 季度选择器 -->
      <div class="quarter-block">
        <div class="text-item">
          <el-button
            type="text"
            size="medium"
            :class="[
              'common-quarter',
              'quarter-one',
              quarterActive === '1' ? 'is-active' : ''
            ]"
            @click="selectQuarter('1')"
            >第一季度</el-button
          >
          <el-button
            type="text"
            size="medium"
            :class="[
              'common-quarter',
              'quarter-two',
              quarterActive === '2' ? 'is-active' : ''
            ]"
            @click="selectQuarter('2')"
            >第二季度</el-button
          >
        </div>
        <div class="text-item">
          <el-button
            type="text"
            size="medium"
            :class="[
              'common-quarter',
              'quarter-three',
              quarterActive === '3' ? 'is-active' : ''
            ]"
            @click="selectQuarter('3')"
            >第三季度</el-button
          >
          <el-button
            type="text"
            size="medium"
            :class="[
              'common-quarter',
              'quarter-four',
              quarterActive === '4' ? 'is-active' : ''
            ]"
            @click="selectQuarter('4')"
            >第四季度</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>
 
<script>
/**
 * @file:  View 组件 季节选择控件
 * @date: 2021-03-22
 * @description: UI组件  可选择季节
 */

export default {
  props: {},
  data() {
    return {
      showSeason: false,
      year: '2022', //默认当前年
      showValue: '', //页面上input的内容
      quarterActive: ''
    }
  },

  created() {
    let currentTime = new Date()
    let month = currentTime.getMonth() + 1
    let quarter = Math.trunc(month / 3)
    this.selectQuarter(quarter)
  },

  watch: {},

  methods: {
    // 上一年
    prevSub() {
      this.year = +this.year - 1
    },
    // 下一年
    nextAdd() {
      this.year = +this.year + 1
    },
    // 季度选择
    selectQuarter(quarter) {
      this.quarterActive = quarter
      const result = {
        date: `${this.year}-${quarter}`,
        year: this.year,
        quarter: quarter
      }
      //发送事件给父元素
      this.$emit('getQuarterValue', result)
      this.showSeason = false
      this.showValue = `${this.year}年${quarter}季度`
    },
    // 清除
    clearClick() {
      this.showValue = ''
      this.quarterActive = ''
      this.showSeason = false
      const result = { date: '', year: '', quarter: '' }
      this.$emit('getQuarterValue', result)
    },
    // 聚焦触发,若是年已存在，则不需要重新赋值
    focusClick() {
      if (!this.year) {
        this.year = new Date().getFullYear().toString()
      }
      this.showSeason = true
    }
  }
}
</script>
 
<style scoped>
.bgCard {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 999;
}
.box-card {
  width: 220px;
  padding: 0 3px 20px;
  margin-top: 10px;
  position: fixed;
  z-index: 9999;
}
.common-quarter {
  width: 40%;
  color: #606266;
}
.quarter-one,
.quarter-three {
  float: left;
}
.quarter-two,
.quarter-four {
  float: right;
}
.text-item {
  text-align: center;
}
.quarter-block {
  display: flex;
  flex-direction: column;
}
.is-active {
  color: #409eff !important;
  border: hidden;
  font-weight: 700;
}
</style>
