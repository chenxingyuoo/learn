/**
 * 操作编辑器选区、插入html字符串
 * Created on 22/12/2017.
 */

'use strict';

class YEditor{
  constructor(container, options){
    this.container = null;
    this.selections = null;
    this.init(container, options);
  }

  init (container, options) {
    this.container = container;

    this.initSelections();
  }

  //初始化Selections对象
  initSelections(){
    let selectedRange;
    this.selections = {
      //获取当前选区
      getCurrentRange: () => {
        //获取当前range
        if(window.getSelection) {
          //使用 window.getSelection() 方法获取鼠标划取部分的起始位置和结束位置
          let sel = window.getSelection();
          if(sel.rangeCount > 0){
            //通过selection对象的getRangeAt方法来获取selection对象的某个Range对象
            return sel.getRangeAt(0);
          }
        } else if(document.selection) {
          let sel = document.selection;
          return sel.createRange();
        }
        return null;
      },
      //保存选区
      saveSelection: () => {
        selectedRange = this.selections.getCurrentRange();
      },
      //重置为上个range
      restoreSelection: () => {
        if(!selectedRange) {
          return;
        }

        let selection = window.getSelection ? window.getSelection() : document.selection.createRange();
        try {
          selection.removeAllRanges();
        } catch(ex) {
          document.body.createTextRange().select();
          document.selection.empty();
        }
        selection.addRange(selectedRange);
      }
    };
  }

  //编辑器命令
  execCommand(command, param){
    this.selections.restoreSelection();
    this.container.focus();
    if(!arguments[1]) {
      param = null;
    }
    document.execCommand(command, false, param);
  }

  /**
   * 光标位置插入html
   * 参数1 string 要插入的内容
   **/
  pasteHtmlAtCaret(html, selectPastedContent) {
    //恢复光标
    this.selections.restoreSelection();

    if (window.getSelection) {
      let sel = window.getSelection();
      let range = sel.getRangeAt(0);
      let frag, node, lastNode;

      if (range.createContextualFragment) {
        frag = range.createContextualFragment(html);
      } else {
        let el = document.createElement('div');
        el.innerHTML = html;
        frag = document.createDocumentFragment();

        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
      }

      let lastChild = frag.lastChild;

      range.insertNode(frag);
      range.setStartAfter(lastChild);
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (document.selection && document.selection.type !== 'Control') {
      let originalRange = document.selection.createRange();
      originalRange.pasteHTML(html);
      originalRange.select();
    }

    //保存光标
    this.selections.saveSelection();
  }
}
