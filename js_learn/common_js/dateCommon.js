

  /**
   * 获取指定的日期 ， 向前 、 向后 、今天
   * @param num         天数
   * @param joinStr     分隔的字符串 ，默认为 '-'
   * @returns {string}
   */
  const getSpecifyDate = (num, joinStr) => {
  	joinStr = joinStr || '-';

  	let dateArr = [];
    let date = new Date();
    let dateTime = date.getTime();

    let newDate = new Date(dateTime - 3600 * 24 * 1000 * num);

    let newDateYear = newDate.getFullYear();
    let newDateMonth = newDate.getMonth() + 1;
    let newDateDay = newDate.getDate();

    newDateMonth = newDateMonth < 10 ? '0' + newDateMonth : newDateMonth;
    newDateDay = newDateDay < 10 ? '0' + newDateDay : newDateDay;
    
    dateArr.push(newDateYear, newDateMonth, newDateDay);

    return dateArr.join(joinStr);
  };

  /**
   * 获取今天之前的日期
   * @param beforeNum  今天之前的天数
   * @param joinStr     分隔的字符串 ，默认为 '-'
   * @returns {string}
   */
  const getBeforeDate = (beforeNum, joinStr) => {
    beforeNum = parseInt(beforeNum);

    if (typeof beforeNum !== 'number') {
      throw Error('请确保 beforeNum 为数字');
    }

    if (beforeNum < 1) {
      throw Error('beforeNum 必须大于等于 1');
    }

    //获取日期
    return getSpecifyDate(beforeNum, joinStr);
  };


  /**
   * 获取今天之后的日期
   * @param afterNum    今天之后的天数
   * @param joinStr     分隔的字符串 ，默认为 '-'
   * @returns {string}
   */
  const getAfterDate = (afterNum, joinStr) => {

    afterNum = parseInt(afterNum);

    if (typeof afterNum !== 'number') {
      throw Error('请确保 afterNum 为数字');
    }

    if (afterNum < 1) {
      throw Error('afterNum 必须大于等于 1');
    }

    //设置负数
    afterNum = -afterNum;

    //获取日期
    return getSpecifyDate(afterNum, joinStr);
  };

  /**
   * 获取今天的日期
   * @param joinStr     分隔的字符串 ，默认为 '-'
   * @returns {string}
   */
  const getTodayDate = (joinStr) => {
    return getSpecifyDate(0, joinStr);
  };
  
  //获取两个日期的间隔天数
  const getIntervalDateNum = (startDate, endDate) => {
     return (new Date(endDate).getTime() - new Date(startDate).getTime()) / 3600 / 24 / 1000;
  };


  console.log('mylog', getBeforeDate(-2), getAfterDate(2));
