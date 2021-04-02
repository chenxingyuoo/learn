/**
 * Created on 2017/10/12.
 */

'use strict';


const actions = {
  oneAction () {
    console.log('oneAction');
  },
  twoAction () {
    console.log('twoAction');
  }
};

//工厂函数
const StateFactory = (() => {
  class State {
    constructor(){

    }
    dataChange(){
      throw Error(' 必须重写 dataChange 方法');
    }
  }

  return (param) => {
    const F = function (){

    };

    F.prototype = new State();

    for (let i in param) {
      F.prototype[i] = param[i];
    }
    return F;
  }
})();

const OneState = StateFactory({
  dateChange(){
    console.log('OneState dateChange');
  }
});
const TwoState = StateFactory({
  dateChange(){
    console.log('TwoState dateChange');
  }
});

class DateTest {
  constructor(){
    this.oneState = new OneState(this);
    this.twoState = new TwoState(this);
    this.currState = this.oneState;
  }

  one(){
    actions.oneAction();
    this.currState = this.oneState;

    this.change();
  }

  two(){
    actions.twoAction();
    this.currState = this.twoState;

    this.change();
  }

  change(){
    this.currState.dateChange();
  }
}

let dateTest = new DateTest();

window.dateTestAction = (state) => {
  dateTest[state] && dateTest[state]();
};
