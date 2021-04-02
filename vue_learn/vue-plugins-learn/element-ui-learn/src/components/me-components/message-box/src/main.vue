<template>
  <transition name="modal">
    <div class="modal-mask" v-show="visible">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            {{ title }}
          </div>

          <div class="modal-body">
            <slot><p>{{ message }}</p></slot>
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="handleAction('cancel')" v-show="showCancelButton">
              取消
            </button>
            <button
              class="modal-default-button"
              @click="handleAction('confirm')"
              ref="confirm"
              v-show="showConfirmButton">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { addClass, removeClass } from '../../../src/utils/dom';
//    import { t } from '../../../src/locale';
    export default {
        name : 'modal',
        data() {
          return {
            uid: 1,
            title: undefined,
            message: '',
            type: '',
            customClass: '',
            showInput: false,
            inputValue: null,
            inputPlaceholder: '',
            inputPattern: null,
            inputValidator: null,
            inputErrorMessage: '',
            showConfirmButton: true,
            showCancelButton: false,
            action: '',
            confirmButtonText: '',
            cancelButtonText: '',
            confirmButtonLoading: false,
            cancelButtonLoading: false,
            confirmButtonClass: '',
            confirmButtonDisabled: false,
            cancelButtonClass: '',
            editorErrorMessage: null,
            callback: null,

            visible : null
          };
        },
        components: {},
        computed: {},
        beforeMount(){

        },
        mounted(){
            debugger;
            console.log('mylog', this);
        },
        methods: {
          getSafeClose() {
              debugger;
            const currentId = this.uid;
            return () => {
              this.$nextTick(() => {
                  debugger;
                if (currentId === this.uid) {
                  this.doClose();
                }
              });
            };
          },
          doClose() {
            debugger;
            if (!this.visible) {
              return;
            }
            this.visible = false;
            this._closing = true;

            this.onClose && this.onClose();

            if (this.lockScroll) {
              setTimeout(() => {
                debugger;
                if (this.modal && this.bodyOverflow !== 'hidden') {
                  document.body.style.overflow = this.bodyOverflow;
                  document.body.style.paddingRight = this.bodyPaddingRight;
                }
                this.bodyOverflow = null;
                this.bodyPaddingRight = null;
              }, 200);
            }
            this.opened = false;

//            if (!this.transition) {
//              this.doAfterClose();
//            }

            if (this.action){
              this.callback(this.action, this);
            }
          },
          handleAction(action){
            debugger;
            this.action = action;
            if (typeof this.beforeClose === 'function') {
              this.close = this.getSafeClose();
              this.beforeClose(action, this, this.close);
            } else {
              this.doClose();
            }
          }
//          close() {
//            this.visible = false;
//            this.$emit('close');
//          }
        },
      watch : {
        visible(val) {
            debugger;
          if (val){
            this.uid++;
          }
          if (this.$type === 'alert' || this.$type === 'confirm') {
            this.$nextTick(() => {
              this.$refs.confirm.focus();
            });
          }
          if (this.$type !== 'prompt'){
            return;
          }
          if (val) {
            setTimeout(() => {
              if (this.$refs.input && this.$refs.input.$el) {
                this.$refs.input.$el.querySelector('input').focus();
              }
            }, 500);
          } else {
            this.editorErrorMessage = '';
            removeClass(this.$refs.input.$el.querySelector('input'), 'invalid');
          }
        }
      }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    /*float: right;*/
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
