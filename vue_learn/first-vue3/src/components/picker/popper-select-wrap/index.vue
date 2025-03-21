<template>
  <div
    ref="reference"
    :class="[
      'el-cascader',
      realSize && `el-cascader--${realSize}`,
      { 'is-disabled': isDisabled },
    ]"
    v-clickoutside="() => toggleDropDownVisible(false)"
    @mouseenter="inputHover = true"
    @mouseleave="inputHover = false"
    @click="() => toggleDropDownVisible(readonly ? undefined : true)"
    @keydown="handleKeyDown"
  >
    <el-input
      ref="input"
      v-model="presentText"
      :size="realSize"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="isDisabled"
      :validate-event="false"
      :class="{ 'is-focus': dropDownVisible }"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
    >
      <template slot="suffix">
        <i
          v-if="clearBtnVisible"
          key="clear"
          class="el-input__icon el-icon-circle-close"
          @click.stop="handleClear"
        ></i>
        <i
          v-else
          key="arrow-down"
          :class="[
            'el-input__icon',
            'el-icon-arrow-down',
            dropDownVisible && 'is-reverse',
          ]"
          @click.stop="toggleDropDownVisible()"
        ></i>
      </template>
    </el-input>

    <transition name="el-zoom-in-top" @after-leave="handleDropdownLeave">
      <div
        v-show="dropDownVisible"
        ref="popper"
        :class="['el-popper', 'el-cascader__dropdown', popperClass]"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import Popper from "element-ui/src/utils/vue-popper";
import Clickoutside from "element-ui/src/utils/clickoutside";
import Emitter from "element-ui/src/mixins/emitter";
import Locale from "element-ui/src/mixins/locale";
import Migrating from "element-ui/src/mixins/migrating";
import AriaUtils from "element-ui/src/utils/aria-utils";
import { isEqual, isEmpty, kebabCase } from "element-ui/src/utils/util";
import { isUndefined } from "element-ui/src/utils/types";
import { isDef } from "element-ui/src/utils/shared";
import { debounce } from "lodash/function";

const { keys: KeyCode } = AriaUtils;
const MigratingProps = {
  expandTrigger: {
    newProp: "expandTrigger",
    type: String,
  },
  changeOnSelect: {
    newProp: "checkStrictly",
    type: Boolean,
  },
  hoverThreshold: {
    newProp: "hoverThreshold",
    type: Number,
  },
};

const PopperMixin = {
  props: {
    placement: {
      type: String,
      default: "bottom-start",
    },
    appendToBody: Popper.props.appendToBody,
    visibleArrow: {
      type: Boolean,
      default: true,
    },
    arrowOffset: Popper.props.arrowOffset,
    offset: Popper.props.offset,
    boundariesPadding: Popper.props.boundariesPadding,
    popperOptions: Popper.props.popperOptions,
  },
  methods: Popper.methods,
  data: Popper.data,
  beforeDestroy: Popper.beforeDestroy,
};

const InputSizeMap = {
  medium: 36,
  small: 32,
  mini: 28,
};

export default {
  name: "popper-select-wrap",

  directives: { Clickoutside },

  mixins: [PopperMixin, Emitter, Locale, Migrating],

  inject: {
    elForm: {
      default: "",
    },
    elFormItem: {
      default: "",
    },
  },

  components: {},

  props: {
    value: {},
    visible: Boolean,
    props: Object,
    size: String,
    placeholder: {
      type: String,
      default: "",
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    filterMethod: Function,
    debounce: {
      type: Number,
      default: 300,
    },
    beforeFilter: {
      type: Function,
      default: () => () => {},
    },
    popperClass: String,
    defaultText: {
      type: String,
      default: "",
    },
    suffixText: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      checkedValue: this.value,
      inputHover: false,
      inputValue: null,
      presentText: null,
      filtering: false,
      inputInitialHeight: 0,
      pressDeleteCount: 0,
    };
  },

  computed: {
    dropDownVisible: {
      get() {
        return this.visible;
      },
      set(v) {
        this.$emit("update:visible", v);
      },
    },
    realSize() {
      const _elFormItemSize = (this.elFormItem || {}).elFormItemSize;
      return this.size || _elFormItemSize || (this.$ELEMENT || {}).size;
    },
    tagSize() {
      return ["small", "mini"].indexOf(this.realSize) > -1 ? "mini" : "small";
    },
    isDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    config() {
      const config = this.props || {};
      const { $attrs } = this;

      Object.keys(MigratingProps).forEach((oldProp) => {
        const { newProp, type } = MigratingProps[oldProp];
        let oldValue = $attrs[oldProp] || $attrs[kebabCase(oldProp)];
        if (isDef(oldProp) && !isDef(config[newProp])) {
          if (type === Boolean && oldValue === "") {
            oldValue = true;
          }
          config[newProp] = oldValue;
        }
      });

      return config;
    },
    leafOnly() {
      return !this.config.checkStrictly;
    },
    readonly() {
      return !this.filterable;
    },
    clearBtnVisible() {
      if (
        !this.clearable ||
        this.isDisabled ||
        this.filtering ||
        !this.inputHover
      ) {
        return false;
      }

      return !!this.presentText && this.presentText !== this.defaultText;
    },
  },

  watch: {
    disabled() {
      this.computePresentContent();
    },
    value(val) {
      if (!isEqual(val, this.checkedValue)) {
        if (!val) {
          this.presentText = this.defaultText ? this.defaultText : null;
        } else {
          this.checkedValue = val;
        }
        this.computePresentContent();
      }
    },
    presentText(val) {
      this.inputValue = val;
    },
    filtering(val) {
      this.$nextTick(this.updatePopper);
    },
    defaultText() {
      this.presentText = this.defaultText ? this.defaultText : null;
    },
  },

  mounted() {
    const { input } = this.$refs;
    if (input && input.$el) {
      this.inputInitialHeight =
        input.$el.offsetHeight || InputSizeMap[this.realSize] || 40;
    }

    if (!isEmpty(this.value)) {
      this.computePresentContent();
    }

    this.filterHandler = debounce(function() {
      const { inputValue } = this;

      if (!inputValue) {
        this.filtering = false;
        return;
      }

      const before = this.beforeFilter(inputValue);
      if (before && before.then) {
        before.then(this.getSuggestions);
      } else if (before !== false) {
        this.getSuggestions();
      } else {
        this.filtering = false;
      }
    }, this.debounce);

    this.presentText = this.defaultText ? this.defaultText : null;
  },

  beforeDestroy() {},

  methods: {
    getMigratingConfig() {
      return {
        props: {
          "expand-trigger":
            "expand-trigger is removed, use `props.expandTrigger` instead.",
          "change-on-select":
            "change-on-select is removed, use `props.checkStrictly` instead.",
          "hover-threshold":
            "hover-threshold is removed, use `props.hoverThreshold` instead",
        },
        events: {
          "active-item-change":
            "active-item-change is renamed to expand-change",
        },
      };
    },
    toggleDropDownVisible(visible) {
      if (this.isDisabled) return;

      const { value, dropDownVisible } = this;
      const { input } = this.$refs;
      visible = isDef(visible) ? visible : !dropDownVisible;
      if (visible !== dropDownVisible) {
        this.dropDownVisible = visible;
        if (visible) {
          this.$nextTick(() => {
            this.updatePopper();
          });
        } else {
          let val = this.checkedValue;
          if (!isEqual(val, value) || isUndefined(value)) {
            this.$emit("input", val);
            this.$emit("change", val);
            this.dispatch("ElFormItem", "el.form.change", [val]);
          }
        }
        input.$refs.input.setAttribute("aria-expanded", visible);
        this.$emit("visible-change", visible);
      }
    },
    handleDropdownLeave() {
      this.filtering = false;
      this.inputValue = this.presentText;
    },
    handleKeyDown(event) {
      switch (event.keyCode) {
        case KeyCode.enter:
          this.toggleDropDownVisible();
          break;
        case KeyCode.down:
          this.toggleDropDownVisible(true);
          event.preventDefault();
          break;
        case KeyCode.esc:
        case KeyCode.tab:
          this.toggleDropDownVisible(false);
          break;
      }
    },
    handleFocus(e) {
      this.$emit("focus", e);
    },
    handleBlur(e) {
      this.$emit("blur", e);
    },
    handleInput(val, event) {
      !this.dropDownVisible && this.toggleDropDownVisible(true);

      if (event && event.isComposing) return;
      if (val) {
        this.filterHandler();
      } else {
        this.filtering = false;
      }
    },
    handleClear() {
      const { dropDownVisible } = this;
      this.presentText = this.defaultText;
      if (!dropDownVisible) {
        let val = "";
        this.$emit("input", val);
        this.$emit("change", val);
        this.dispatch("ElFormItem", "el.form.change", [val]);
      }
    },
    computePresentContent() {
      this.$nextTick(() => {
        this.computePresentText();
      });
    },
    computePresentText() {
      const { checkedValue } = this;
      if (!isEmpty(checkedValue)) {
        this.presentText = `${checkedValue}-${this.suffixText}`;
        return;
      }
      this.presentText = null;
    },
    getSuggestions() {
      this.filtering = true;
      this.$nextTick(this.updatePopper);
    },
    sliderChange(val) {
      const { value, dropDownVisible } = this;
      if (!isEqual(val, value) || isUndefined(value)) {
        this.computePresentContent();
        if (dropDownVisible) {
          this.toggleDropDownVisible(false);
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.el-cascader {
  /deep/.el-input {
    .el-icon-arrow-down {
      color: #fafafa;
    }
    .el-input__inner {
      text-overflow: inherit;
    }
  }
}
</style>
