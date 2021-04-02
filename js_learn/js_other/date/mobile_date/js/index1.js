/**
 * Created by chenxingyu on 2017/1/19.
 */
// 返回对象的类型
var type = function (obj) {
    var type;
    if (obj == null) {
        type = String(obj);
    } else {
        type = {}.toString.call(obj).toLowerCase();
        type = type.substring(8, type.length - 1);
    }
    return type || "object";
};

var defaults = {
    currYear: -1,              // 当前年
    currMonth: -1,             // 当前月，0-11
    afterDrawCld: null,        // 画日历之后调用函数
    dbClickDay: null,           // 双击某一天执行事件
    clickDay: null,             // 单击某一天执行事件
    callFunc: null              // 调用函数
};


function Almanac(options) {
    this.options = options || {};
    this.selection = {
        currYear: -1,
        currMonth: -1,

        minYear: 1901,
        maxYear: 2100,

        tmpYear: -1,
        tmpMonth: -1,
    }
}

//日历初始化
Almanac.prototype.init = function init(){
    debugger;
    //合并配置对象
    this.setConfig();

    this.options.currYear = this.today.tY();    // 当前年
    this.options.currMonth = this.today.tM();   // 当前月

    //生成html
    this.drawOutline(this.options);

    //初始化顶部的工具栏
    this.initControlBar();

    //初始化selection对象
    this.selectionInit();

    //渲染日历
    this.drawCld(this.options.currYear, this.options.currMonth, this.options.afterDrawCld);

    //回调函数
    if (this.options.callFunc) {
        this.options.callFunc();
    }

    //绑定事件
    this.bindEvent();
};

//合并配置对象
Almanac.prototype.setConfig = function setConfig() {
    this.options = $.extend(defaults, this.options); // 扩展options选项
};


Almanac.prototype.bindEvent = function bindEvent(){
    var $doc = $(document);

    // 返回今天
    $doc.on('click','#today-btn', this.setToday.bind(this));

    //上一月
    $doc.on('click','#prevMonth', this.goPrevMonth.bind(this));

    //下一月
    $doc.on('click','#nextMonth', this.goNextMonth.bind(this));

    //月份列表改变 ， 去某一月
    $doc.on('change','.month-list',function (event){
        var month = Number(event.currentTarget.value) - 1;
        this.goMonth(month);
    }.bind(this));

    //上一年
    $doc.on('click','#prevYear', this.goPrevYear.bind(this));

    //下一年
    $doc.on('click','#prevYear', this.goNextYear.bind(this));

    //新年列表改变 , 去某一年
    $doc.on('change','.year-list',function (event){
        var year = Number(event.currentTarget.value);
        this.goYear(year);
    }.bind(this));



    // $(".today-btn").unbind('click').bind('click', function() {
    //     DateSelection.goToday();
    // });
};

//初始化selection对象
Almanac.prototype.selectionInit = function selectionInit(year, month){
    if (year === undefined || month === undefined) {
        year = this.options.currYear;
        month = this.options.currMonth;
    }

    this.setYear( year);
    this.setMonth( month);
};

//设置年
Almanac.prototype.setYear = function setYear(year){
    if (this.selection.tmpYear == -1 && this.selection.currYear != -1) {
        this.selection.tmpYear = this.selection.currYear;
    }
    this.selection.currYear = year;
};

//设置月
Almanac.prototype.setMonth = function setMonth(month){
    if (this.selection.tmpMonth == -1 && this.selection.currMonth != -1) {
        this.selection.tmpMonth = this.selection.currMonth;
    }
    this.selection.currMonth = month;
};

//今天处理函数
Almanac.prototype.setToday = function today() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();

    if (this.selection.currYear != year || this.selection.currMonth != month) {
        if (this.selection.tmpYear == year && this.selection.tmpMonth == month) {
            this.rollback();
        } else {
            this.init(year, month);
            this.commit();
        }
    }
};

//上一月处理函数
Almanac.prototype.prevMonth = function prevMonth(){
    debugger;
    var month = this.selection.currMonth - 1;
    if (month === -1) {
        var year = this.selection.currYear - 1;
        if (year >= this.selection.minYear) {
            month = 11;
            this.setYear(year);
        } else {
            month = 0;
        }
    }
    this.setMonth(month);
};

//下一页处理函数
Almanac.prototype.nextMonth = function nextMonth(){
    var month = this.selection.currMonth + 1;
    if (month == 12) {
        var year = this.selection.currYear + 1;
        if (year <= this.selection.maxYear) {
            month = 0;
            this.setYear(year);
        } else {
            month = 11;
        }
    }
    this.setMonth(month);
};

//上一年处理函数
Almanac.prototype.prevYear = function prevYear(){
    var year = this.selection.currYear - 1;
    if (year >= this.selection.minYear) {
        this.setYear(year);
    }
};

//下一年处理函数
Almanac.prototype.nextYear = function nextYear(){
    var year = this.selection.currYear + 1;
    if (year <= this.selection.maxYear) {
        this.setYear(year);
    }
};


//selection 回到刚开始的状态
Almanac.prototype.rollback = function rollback(){
    if (this.selection.tmpYear != -1) {
        this.setYear(this.selection.tmpYear);
    }
    if (this.selection.tmpMonth != -1) {
        this.setMonth(this.selection.tmpMonth);
    }
    this.selection.tmpYear = -1;
    this.selection.tmpMonth = -1;
};

//提交更改
Almanac.prototype.commit = function commit() {
    debugger;
    if (this.selection.tmpYear != -1 || this.selection.tmpMonth != -1) {
        // 如果发生了变化
        if (this.selection.currYear !== this.selection.tmpYear || this.selection.currMonth !== this.selection.tmpMonth) {

            // 执行某操作
            this.changeView();

            this.freshControlBar();
        }

        this.selection.tmpYear = -1;
        this.selection.tmpMonth = -1;
    }
};

/**
 * 清除日历数据
 */
Almanac.prototype.clear = function clear() {
    for (var i = 0; i < 42; i++) {
        $("#SD" + i).html('');    // 清除阳历
        $("#LD" + i).html('');    // 清除农历
        // 清除相关class
        var gd = $("#GD" + i);
        if (gd.hasClass('weekend')){
            gd.removeAttr('data-solor class').addClass('weekend');
        }else{
            gd.removeAttr('data-solor class');
        }
    }
};

/**
 * 重新画日历
 * @return {[type]} [description]
 */
Almanac.prototype.changeView = function changeView() {
    debugger;
    this.options.currYear = this.selection.currYear;
    this.options.currMonth = this.selection.currMonth;
    this.clear();
    this.drawCld(this.options.currYear, this.options.currMonth, this.options.afterDrawCld);
};


/**
 * 刷新工具栏
 */
Almanac.prototype.freshControlBar = function freshControlBar(){
    debugger;
    // 设置当前选中的年
    var $year_list = $('.year-list');
    $year_list.find('option:selected').prop('selected',false);
    $year_list.find('option[value="' + this.options.currYear + '"]').prop('selected',true);

    // 设置当前选中的月
    var $month_list = $('.month-list');
    var month = this.options.currMonth + 1;      // 实际月
    $month_list.find('option:selected').prop('selected',false);
    $month_list.find('option[value="' + month + '"]').prop('selected',true);
};


//去到今天
Almanac.prototype.goToday = function goToday() {
    this.today();
};

//去到某一年
Almanac.prototype.goYear = function goYear(year){
    this.setYear(year);
    this.commit();
};

//去到某一月
Almanac.prototype.goMonth = function (month){
    this.setMonth(month);
    this.commit();
};

//去上一年
Almanac.prototype.goPrevYear = function goPrevYear() {
    this.prevYear();
    this.commit();
};

//去上一年
Almanac.prototype.goNextYear = function goNextYear() {
    this.nextYear();
    this.commit();
};

//去上一月
Almanac.prototype.goPrevMonth = function goPrevMonth(){
    this.prevMonth();
    this.commit();
};

//去下一月
Almanac.prototype.goNextMonth = function goNextMonth(){
    this.nextMonth();
    this.commit();
};




/**
 * 生成html 画表格轮廓
 * @return null
 */
Almanac.prototype.drawOutline = function drawOutline(opts) {
    opts = opts || {};
    var self = this;
    var gNum;
    var $datesHead = $('.dates-head');
    var $datesBody = $(".dates-body");


    for (var i = 0; i < 6; i++) {   // 6行
        for (var j = 0; j < 7; j++) {
            // debugger;
            gNum = i * 7 + j;
            var className = "";

            if ($('li[data-id="' + (j - 1 >= 0 ? j - 1 : 6) + '"]', $datesHead).hasClass('weekend')) {
                className = "weekend";
            }

            // 如果该单元格已经存在，则不需要重画
            var $li = $('li[data-id="' + gNum + '"]', $datesBody);
            var hasLi = $li.size() > 0;

            if (!hasLi) {
                // 周日 周六
                // if (j == 0 || j == 6) className = "weekend";
                $li = $('<li/>').attr({
                    'id': 'GD' + gNum,
                    'data-id': gNum,
                    'class': className
                });

                $li.append('<div class="layer"></div>' +
                    '<span class="border"></span>' +
                    '<span id="SD' + gNum + '" class="solar"></span>' +
                    '<span id="LD' + gNum + '" class="lunar"></span>');
            }

            // 重新绑定事件
            // $li.hover(function () {          // 鼠标滑过事件
            //     // self.showAlmanacDetail(this);
            // }).unbind('click').bind('click', function (event) {   // 单击事件
            //     opts.clickDay ? opts.clickDay(this) : '';
            //
            // }).unbind('dblclick').bind('dblclick', function (event) {   // 双击事件
            //     opts.dbClickDay ? opts.dbClickDay(this) : '';
            // });

            if (!hasLi) {
                $datesBody.append($li)
            }
        }
    }
};


/**
 * 初始化顶部的工具栏
 */
Almanac.prototype.initControlBar = function initControlBar() {
    var i;
    // 设置选中的年为当前的年
    var tY = this.today.tY();
    var htmlYear = '';
    for (i = 1901; i <= 2100; i++) {
        if (i == tY)
            htmlYear = htmlYear + '<option value="' + i + '" selected="selected">' + i + '年</option>';
        else {
            htmlYear = htmlYear + '<option value="' + i + '">' + i + '年</option>';
        }
    }

    // 设置月的选项
    var tM = this.today.tM() + 1;
    var htmlMonth = "";
    for (i = 1; i <= 12; i++) {
        if (i == tM)
            htmlMonth += '<option value="' + i + '" selected="selected">' + i + '月</option>';
        else {
            htmlMonth += '<option value="' + i + '">' + i + '月</option>';
        }
    }

    //渲染
    $(".year-list").html(htmlYear);
    $(".month-list").html(htmlMonth);
};


/**
 * 返回本月的所有数据
 * @param  int y 年
 * @param  int m 月
 * @return object 每一天的数据列表
 */
Almanac.prototype.calendar = function calendar(y, m) {

    var sDObj, lDObj, lY, lM, lD = 1, lL, lX = 0, tmp1, tmp2, lM2, lY2, lD2, tmp3, dayglus, bsg, xs, xs1, fs, fs1, cs, cs1
    var cY, cM, cD; //年柱,月柱,日柱
    var lDPOS = new Array(3);
    var n = 0;
    var firstLM = 0;
    var _this = {};    // 日历对象

    sDObj = new Date(y, m, 1, 0, 0, 0, 0);    //当月一日日期

    _this.length = this.solarDays(y, m);      //公历当月天数
    _this.firstWeek = sDObj.getDay();    //公历当月1日星期几

    //年柱 1900年立春后为庚子年(60进制36)
    var cyNum;
    if (m < 2) {
        cyNum = y - 1900 + 36 - 1;
    } else {
        cyNum = y - 1900 + 36;
    }
    cY = this.cyclical(cyNum);

    var term2 = this.sTerm(y, 2);            //立春日期

    //月柱 1900年1月小寒以前为 丙子月(60进制12)
    var firstNode = this.sTerm(y, m * 2);     //返回当月「节」为几日开始
    cM = this.cyclical((y - 1900) * 12 + m + 12);

    lM2 = (y - 1900) * 12 + m + 12;

    //当月一日与 1900/1/1 相差天数
    //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
    var dayCyclical = Date.UTC(y, m, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;

    for (var i = 0; i < _this.length; i++) {
        // debugger;
        if (lD > lX) {
            sDObj = new Date(y, m, i + 1);      //当月一日日期
            lDObj = this.lunar(sDObj);          //农历对象
            lY = lDObj.year;                    //农历年
            lM = lDObj.month;                   //农历月
            lD = lDObj.day;                     //农历日
            lL = lDObj.isLeap;                  //农历是否闰月
            lX = lL ? this.leapDays(lY) : this.monthDays(lY, lM); //农历当月最后一天

            if (n == 0) {
                firstLM = lM;
            }

            lDPOS[n++] = i - lD + 1;
        }


        //依节气调整二月分的年柱, 以立春为界
        if (m == 1 && (i + 1) == term2) {
            cY = this.cyclical(y - 1900 + 36);
            lY2 = (y - 1900 + 36);
        }
        //依节气月柱, 以「节」为界
        if ((i + 1) == firstNode) {
            cM = this.cyclical((y - 1900) * 12 + m + 13);
            lM2 = (y - 1900) * 12 + m + 13;
        }

        //日柱
        cD = this.cyclical(dayCyclical + i);
        lD2 = (dayCyclical + i);


        //获取日历属性
        _this[i] = this.calElement(y, m + 1, i + 1, dateInfo.nStr1[(i + _this.firstWeek) % 7], lY, lM, lD++, lL,
            cY, cM, cD);

        // 获取黄历的禁忌
        _this[i].sgz5 = this.calConv2(lY2 % 12, lM2 % 12, (lD2) % 12, lY2 % 10, (lD2) % 10, lM, lD - 1, m + 1, cs1);
        _this[i].sgz3 = this.cyclical6(lM2 % 12, (lD2) % 12);

    }

    // debugger;
    //节气
    tmp1 = this.sTerm(y, m * 2) - 1;
    tmp2 = this.sTerm(y, m * 2 + 1) - 1;
    // 二十四节气表
    _this[tmp1].solarTerms = dateInfo.solarTerm[m * 2];
    _this[tmp2].solarTerms = dateInfo.solarTerm[m * 2 + 1];
    if (m == 3) _this[tmp1].color = 'red'; //清明颜色

    //国历节日
    for (i in dateInfo.sFtv) {
        if (type(dateInfo.sFtv[i]) == 'string' && dateInfo.sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
            if (Number(RegExp.$1) == (m + 1)) {
                _this[Number(RegExp.$2) - 1].solarFestival += RegExp.$4 + '  ';
                if (RegExp.$3 == '*') {
                    _this[Number(RegExp.$2) - 1].color = 'red';
                }
            }
    }

    //农历节日
    for (i in dateInfo.lFtv) {
        if (type(dateInfo.lFtv[i]) == 'string' && dateInfo.lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
            tmp1 = Number(RegExp.$1) - firstLM;
            if (tmp1 == -11) {
                tmp1 = 1;
            }
            if (tmp1 >= 0 && tmp1 < n) {
                tmp2 = lDPOS[tmp1] + Number(RegExp.$2) - 1;
                if (tmp2 >= 0 && tmp2 < _this.length) {
                    _this[tmp2].lunarFestival += RegExp.$4 + '  ';
                    if (RegExp.$3 == '*') {
                        _this[tmp2].color = 'red';
                    }
                }
            }
        }
    }

    //黑色星期五
    if ((_this.firstWeek + 12) % 7 == 5) {
        _this[12].solarFestival += '黑色星期五';
    }

    //今日
    if (y == this.today.tY() && m == this.today.tM()) {
        _this[this.today.tD() - 1].isToday = true;
    }

    return _this;
};

/**
 * 画每月的日历
 * @param  int year 年
 * @param  int month 月
 * @param  function funct 操作完后执行的函数
 * @return null
 */
Almanac.prototype.drawCld = function drawCld(year, month, funct) {
    var i;
    var sD;
    var s;
    var cld = this.calendar(year, month);
    this.cld = cld;

    for (i = 0; i < 42; i++) {
        // debugger;
        var sObj = $("#SD" + i);    // 阳历
        var lObj = $("#LD" + i);    // 阴历
        var eDay = $("#GD" + i);   // 行 Li

        sD = i - cld.firstWeek;

        if (sD > -1 && sD < cld.length) {  //日期内
            sObj.text(sD + 1);
            eDay.attr({
                'data-solor': sD + 1,   // 设置阳历日
                'data-month': month + 1,   // 设置阳历月
                'data-year': year    // 设置阳历年
            });

            // console.log(cld[sD]);

            if (cld[sD].isToday) {      // 今日
                eDay.addClass("today");         //今日颜色
                // this.showAlmanacDetail(eDay);   // 显示右侧黄历
            }

            if (cld[sD].lDay == 1) {  //显示农历月
                lObj.html('<b>' + (cld[sD].isLeap ? '闰' : '') + cld[sD].lMonth + '月' + (this.monthDays(cld[sD].lYear, cld[sD].lMonth) == 29 ? '小' : '大') + '</b>');
            } else {
                lObj.text(this.cDay(cld[sD].lDay));
            }

            s = cld[sD].lunarFestival;


            //农历节日
            if (s.length > 0) {

                if (s.length > 8) {
                    s = s.substr(0, 5) + '...';
                }
                eDay.addClass('lunar-style');
            }

            //国历节日
            else {
                s = cld[sD].solarFestival;
                if (s.length > 0) {
                    if (s.length > 8) {
                        s = s.substr(0, 5) + '...';
                    }
                    s == '黑色星期五' ? eDay.addClass('black-style') : eDay.addClass('solar-style');
                }
                //廿四节气
                else {
                    s = cld[sD].solarTerms;
                    if (s.length > 0)  eDay.addClass('lunar-style');
                    // if (s.length > 0)  s = s.fontcolor('limegreen');
                }
            }

            if (cld[sD].solarTerms == '清明') {
                s = '清明节'.fontcolor('red');
            }
            if (cld[sD].solarTerms == '芒种') {
                s = '芒种'.fontcolor('red');
            }
            if (cld[sD].solarTerms == '夏至') {
                s = '夏至'.fontcolor('red');
            }
            if (cld[sD].solarTerms == '冬至') {
                s = '冬至'.fontcolor('red');
            }

            if (s.length > 0) {
                lObj.html(s);
            }

        }

    }
};


/**
 * 今日
 */
Almanac.prototype.today = {
    date: new Date(),
    tY: function tY() {
        return this.date.getFullYear()
    },
    tM: function tM() {
        return this.date.getMonth()
    },
    tD: function tD() {
        return this.date.getDate()
    }
};


/**
 * 返回农历 y年的总天数
 * @param  int y 年
 * @return int
 */
Almanac.prototype.lYearDays = function lYearDays(y) {
    var i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {
        sum = sum + ((dateInfo.lunarInfo[y - 1900] & i) ? 1 : 0);
    }
    return sum + this.leapDays(y);
};

/**
 * 返回农历 y年闰月的天数
 * @param  int y 年
 * @return int
 */
Almanac.prototype.leapDays = function leapDays(y) {
    if (this.leapMonth(y)) {
        return (dateInfo.lunarInfo[y - 1899] & 0xf) == 0xf ? 30 : 29;
    }
    else {
        return 0;
    }
};

/**
 * 返回农历 y年闰哪个月 1-12 , 没闰返回 0
 * @param  int y 年
 * @return int
 */

Almanac.prototype.leapMonth = function leapMonth(y) {
    var lm = dateInfo.lunarInfo[y - 1900] & 0xf;
    return lm == 0xf ? 0 : lm;
};

/**
 * 农历 y年m月的总天数
 * @param  int y 年
 * @param  imt m 月
 * @return int y年m月的总天数
 */
Almanac.prototype.monthDays = function monthDays(y, m) {
    return (dateInfo.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29;
};

/**
 * 算出农历, 传入日期控件, 返回农历日期控件
 * 该控件属性有 .year .month .day .isLeap
 */
Almanac.prototype.lunar = function lunar(objDate) {
    var i, leap = 0, temp = 0, _this = {};
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;


    for (i = 1900; i < 2100 && offset > 0; i++) {
        temp = this.lYearDays(i);
        offset = offset - temp;
    }

    if (offset < 0) {
        offset = offset + temp;
        i = i - 1;
    }

    _this.year = i;

    leap = this.leapMonth(i); //闰哪个月
    _this.isLeap = false;

    for (i = 1; i < 13 && offset > 0; i++) {
        //闰月
        if (leap > 0 && i == (leap + 1) && _this.isLeap == false) {
            i = i - 1;
            _this.isLeap = true;
            temp = this.leapDays(_this.year);
        }
        else {
            temp = this.monthDays(_this.year, i);
        }

        //解除闰月
        if (_this.isLeap == true && i == (leap + 1)) {
            _this.isLeap = false;
        }

        offset = offset - temp;
    }

    if (offset == 0 && leap > 0 && i == leap + 1)
        if (_this.isLeap) {
            _this.isLeap = false;
        }
        else {
            _this.isLeap = true;
            i = i - 1;
        }

    if (offset < 0) {
        offset = offset + temp;
        i = i - 1;
    }

    _this.month = i;
    _this.day = offset + 1;
    return _this;
};



/**
 * 将日期格式化中文日期
 * @param  int m 月
 * @return string
 */
Almanac.prototype.cDay = function cDay(d) {
    var s;
    switch (d) {
        case  10:
            s = '初十';
            break;
        case  20:
            s = '二十';
            break;
        case  30:
            s = '三十';
            break;
        default  :
            s = dateInfo.nStr2[Math.floor(d / 10)];
            s += dateInfo.nStr1[d % 10];
    }
    return s;
};


/**
 * 返回公历 y年某m+1月的天数
 */
Almanac.prototype.solarDays = function solarDays(y, m) {
    if (m == 1) {
        return ((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28;
    } else {
        return dateInfo.solarMonth[m];
    }
};

/**
 * 传入 offset 返回干支, 0=甲子
 */
Almanac.prototype.cyclical = function cyclical(num) {
    return dateInfo.gan[num % 10] + dateInfo.zhi[num % 12];
};


/**
 * 日历属性
 *
 * @param  int sYear  公元年4位数字
 * @param  int sMonth 公元月数字
 * @param  int sDay   公元日数字
 * @param  string  week   星期, 1个中文
 * @param  int  lYear  公元年4位数字
 * @param  int  lMonth 农历月数字
 * @param  int  lDay   农历日数字
 * @param  bool isLeap 是否为农历闰月
 * @param  string  cYear  年柱, 2个中文
 * @param  string  cMonth 月柱, 2个中文
 * @param  string  cDay   日柱, 2个中文
 * @return object
 */

Almanac.prototype.calElement = function calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, cYear, cMonth, cDay) {
    return {
        isToday: false,
        //公历
        sYear: sYear,        //公元年4位数字
        sMonth: sMonth,      //公元月数字
        sDay: sDay,          //公元日数字
        week: week,          //星期, 1个中文
        //农历
        lYear: lYear,        //公元年4位数字
        lMonth: lMonth,      //农历月数字
        lDay: lDay,          //农历日数字
        isLeap: isLeap,      //是否为农历闰月?
        //八字
        cYear: cYear,        //年柱, 2个中文
        cMonth: cMonth,      //月柱, 2个中文
        cDay: cDay,          //日柱, 2个中文

        color: '',

        lunarFestival: '',   //农历节日
        solarFestival: '',   //公历节日
        solarTerms: ''       //节气
    }
};

/**
 * 某年的第n个节气为几日(从0小寒起算)
 * @param  int y 年
 * @param  int n 月
 * @return date
 */
Almanac.prototype.sTerm = function sTerm(y, n) {
    var offDate = new Date(( 31556925974.7 * (y - 1900) + dateInfo.sTermInfo[n] * 60000  ) + Date.UTC(1900, 0, 6, 2, 5));
    return offDate.getUTCDate(); // 返回月中的一天
};

/**
 * 返回阴历 (y年,m+1月)
 */
Almanac.prototype.cyclical6 = function cyclical6(num, num2) {
    if (num == 0) {
        return dateInfo.jcName0[num2];
    }
    if (num == 1) {
        return dateInfo.jcName1[num2];
    }
    if (num == 2) {
        return dateInfo.jcName2[num2];
    }
    if (num == 3) {
        return dateInfo.jcName3[num2];
    }
    if (num == 4) {
        return dateInfo.jcName4[num2];
    }
    if (num == 5) {
        return dateInfo.jcName5[num2];
    }
    if (num == 6) {
        return dateInfo.jcName6[num2];
    }
    if (num == 7) {
        return dateInfo.jcName7[num2];
    }
    if (num == 8) {
        return dateInfo.jcName8[num2];
    }
    if (num == 9) {
        return dateInfo.jcName9[num2];
    }
    if (num == 10) {
        return dateInfo.jcName10[num2];
    }
    if (num == 11) {
        return dateInfo.jcName11[num2];
    }
};


/*黄历禁忌*/
Almanac.prototype.calConv2 = function calConv2(yy, mm, dd, y, d, m, dt, nm, nd) {
    var dy = d + '' + dd;
    if ((yy == 0 && dd == 6) || (yy == 6 && dd == 0) || (yy == 1 && dd == 7) || (yy == 7 && dd == 1) || (yy == 2 && dd == 8) || (yy == 8 && dd == 2) || (yy == 3 && dd == 9) || (yy == 9 && dd == 3) || (yy == 4 && dd == 10) || (yy == 10 && dd == 4) || (yy == 5 && dd == 11) || (yy == 11 && dd == 5)) {
        return {'ban': ['日值岁破', '大事不宜']};
    }
    else if ((mm == 0 && dd == 6) || (mm == 6 && dd == 0) || (mm == 1 && dd == 7) || (mm == 7 && dd == 1) || (mm == 2 && dd == 8) || (mm == 8 && dd == 2) || (mm == 3 && dd == 9) || (mm == 9 && dd == 3) || (mm == 4 && dd == 10) || (mm == 10 && dd == 4) || (mm == 5 && dd == 11) || (mm == 11 && dd == 5)) {
        return {'ban': ['日值月破', '大事不宜']};
    }
    else if ((y == 0 && dy == '911') || (y == 1 && dy == '55') || (y == 2 && dy == '111') || (y == 3 && dy == '75') || (y == 4 && dy == '311') || (y == 5 && dy == '95') || (y == 6 && dy == '511') || (y == 7 && dy == '15') || (y == 8 && dy == '711') || (y == 9 && dy == '35')) {
        return {'ban': ['日值上朔', '大事不宜']};
    }
    else if ((m == 1 && dt == 13) || (m == 2 && dt == 11) || (m == 3 && dt == 9) || (m == 4 && dt == 7) || (m == 5 && dt == 5) || (m == 6 && dt == 3) || (m == 7 && dt == 1) || (m == 7 && dt == 29) || (m == 8 && dt == 27) || (m == 9 && dt == 25) || (m == 10 && dt == 23) || (m == 11 && dt == 21) || (m == 12 && dt == 19)) {
        return {'ban': ['日值杨公十三忌', '大事不宜']};
    }
    else {
        return 0;
    }
};




var dateInfo = {
    // 农历1900-2100的润大小信息表
    lunarInfo: [
        0x4bd8, 0x4ae0, 0xa570, 0x54d5, 0xd260, 0xd950, 0x5554, 0x56af, 0x9ad0, 0x55d2,
        0x4ae0, 0xa5b6, 0xa4d0, 0xd250, 0xd255, 0xb54f, 0xd6a0, 0xada2, 0x95b0, 0x4977,
        0x497f, 0xa4b0, 0xb4b5, 0x6a50, 0x6d40, 0xab54, 0x2b6f, 0x9570, 0x52f2, 0x4970,
        0x6566, 0xd4a0, 0xea50, 0x6a95, 0x5adf, 0x2b60, 0x86e3, 0x92ef, 0xc8d7, 0xc95f,
        0xd4a0, 0xd8a6, 0xb55f, 0x56a0, 0xa5b4, 0x25df, 0x92d0, 0xd2b2, 0xa950, 0xb557,
        0x6ca0, 0xb550, 0x5355, 0x4daf, 0xa5b0, 0x4573, 0x52bf, 0xa9a8, 0xe950, 0x6aa0,
        0xaea6, 0xab50, 0x4b60, 0xaae4, 0xa570, 0x5260, 0xf263, 0xd950, 0x5b57, 0x56a0,
        0x96d0, 0x4dd5, 0x4ad0, 0xa4d0, 0xd4d4, 0xd250, 0xd558, 0xb540, 0xb6a0, 0x95a6,
        0x95bf, 0x49b0, 0xa974, 0xa4b0, 0xb27a, 0x6a50, 0x6d40, 0xaf46, 0xab60, 0x9570,
        0x4af5, 0x4970, 0x64b0, 0x74a3, 0xea50, 0x6b58, 0x5ac0, 0xab60, 0x96d5, 0x92e0,
        0xc960, 0xd954, 0xd4a0, 0xda50, 0x7552, 0x56a0, 0xabb7, 0x25d0, 0x92d0, 0xcab5,
        0xa950, 0xb4a0, 0xbaa4, 0xad50, 0x55d9, 0x4ba0, 0xa5b0, 0x5176, 0x52bf, 0xa930,
        0x7954, 0x6aa0, 0xad50, 0x5b52, 0x4b60, 0xa6e6, 0xa4e0, 0xd260, 0xea65, 0xd530,
        0x5aa0, 0x76a3, 0x96d0, 0x4afb, 0x4ad0, 0xa4d0, 0xd0b6, 0xd25f, 0xd520, 0xdd45,
        0xb5a0, 0x56d0, 0x55b2, 0x49b0, 0xa577, 0xa4b0, 0xaa50, 0xb255, 0x6d2f, 0xada0,
        0x4b63, 0x937f, 0x49f8, 0x4970, 0x64b0, 0x68a6, 0xea5f, 0x6b20, 0xa6c4, 0xaaef,
        0x92e0, 0xd2e3, 0xc960, 0xd557, 0xd4a0, 0xda50, 0x5d55, 0x56a0, 0xa6d0, 0x55d4,
        0x52d0, 0xa9b8, 0xa950, 0xb4a0, 0xb6a6, 0xad50, 0x55a0, 0xaba4, 0xa5b0, 0x52b0,
        0xb273, 0x6930, 0x7337, 0x6aa0, 0xad50, 0x4b55, 0x4b6f, 0xa570, 0x54e4, 0xd260,
        0xe968, 0xd520, 0xdaa0, 0x6aa6, 0x56df, 0x4ae0, 0xa9d4, 0xa4d0, 0xd150, 0xf252,
        0xd520],

    // 公历每个月份的天数普通表
    solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    // 天干
    gan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
    // 地支
    zhi: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
    // 生肖
    animals: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
    // 二十四节气
    solarTerm: ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏",
        "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分",
        "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
    sTermInfo: [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551,
        218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447,
        419210, 440795, 462224, 483532, 504758],
    nStr1: ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
    nStr2: ['初', '十', '廿', '卅', ' '],

    jcName0: ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'],
    jcName1: ['闭', '建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开'],
    jcName2: ['开', '闭', '建', '除', '满', '平', '定', '执', '破', '危', '成', '收'],
    jcName3: ['收', '开', '闭', '建', '除', '满', '平', '定', '执', '破', '危', '成'],
    jcName4: ['成', '收', '开', '闭', '建', '除', '满', '平', '定', '执', '破', '危'],
    jcName5: ['危', '成', '收', '开', '闭', '建', '除', '满', '平', '定', '执', '破'],
    jcName6: ['破', '危', '成', '收', '开', '闭', '建', '除', '满', '平', '定', '执'],
    jcName7: ['执', '破', '危', '成', '收', '开', '闭', '建', '除', '满', '平', '定'],
    jcName8: ['定', '执', '破', '危', '成', '收', '开', '闭', '建', '除', '满', '平'],
    jcName9: ['平', '定', '执', '破', '危', '成', '收', '开', '闭', '建', '除', '满'],
    jcName10: ['满', '平', '定', '执', '破', '危', '成', '收', '开', '闭', '建', '除'],
    jcName11: ['除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭', '建'],

    jcr: function (d) {
        var jcrjx;
        if (d == '建') jcrjx = {'suited': ['出行', '上任', '会友', '上书', '见工'], 'tapu': ['动土', '开仓', '嫁娶', '纳采']};
        if (d == '除') jcrjx = {'suited': ['除服', '疗病', '出行', '拆卸', '入宅'], 'tapu': ['求官', '上任', '开张', '搬家', '探病']};
        if (d == '满') jcrjx = {'suited': ['祈福', '祭祀', '结亲', '开市', '交易'], 'tapu': ['服药', '求医', '栽种', '动土', '迁移']};
        if (d == '平') jcrjx = {'suited': ['祭祀', '修填', '涂泥', '余事勿取'], 'tapu': ['移徙', '入宅', '嫁娶', '开市', '安葬']};
        if (d == '定') jcrjx = {'suited': ['易', '立券', '会友', '签约', '纳畜'], 'tapu': ['种植', '置业', '卖田', '掘井', '造船']};
        if (d == '执') jcrjx = {'suited': ['祈福', '祭祀', '求子', '结婚', '立约'], 'tapu': ['开市', '交易', '搬家', '远行']};
        if (d == '破') jcrjx = {'suited': ['求医', '赴考', '祭祀', '余事勿取'], 'tapu': ['动土', '出行', '移徙', '开市', '修造']};
        if (d == '危') jcrjx = {'suited': ['经营', '交易', '求官', '纳畜', '动土'], 'tapu': ['登高', '行船', '安床', '入宅', '博彩']};
        if (d == '成') jcrjx = {'suited': ['祈福', '入学', '开市', '求医', '成服'], 'tapu': ['词讼', '安门', '移徙']};
        if (d == '收') jcrjx = {'suited': ['祭祀', '求财', '签约', '嫁娶', '订盟'], 'tapu': ['开市', '安床', '安葬', '入宅', '破土']};
        if (d == '开') jcrjx = {'suited': ['疗病', '结婚', '交易', '入仓', '求职'], 'tapu': ['安葬', '动土', '针灸']};
        if (d == '闭') jcrjx = {'suited': ['祭祀', '交易', '收财', '安葬'], 'tapu': ['宴会', '安床', '出行', '嫁娶', '移徙']};
        return jcrjx;
    },

    //国历节日  *表示放假日
    sFtv: [
        "0101*元旦",
        "0106  中国13亿人口日",
        "0110  中国110宣传日",

        "0202  世界湿地日",
        "0204  世界抗癌症日",
        "0210  世界气象日",
        "0214  情人节",
        "0221  国际母语日",
        "0207  国际声援南非日",

        "0303  全国爱耳日",
        "0308  妇女节",
        "0312  植树节 孙中山逝世纪念日",
        "0315  消费者权益保护日",
        "0321  世界森林日",
        "0322  世界水日",
        "0323  世界气象日",
        "0324  世界防治结核病日",

        "0401  愚人节",
        "0407  世界卫生日",
        "0422  世界地球日",

        "0501*国际劳动节",
        "0504  中国青年节",
        "0505  全国碘缺乏病日",
        "0508  世界红十字日",
        "0512  国际护士节",
        "0515  国际家庭日",
        "0517  世界电信日",
        "0518  国际博物馆日",
        "0519  中国汶川地震哀悼日 全国助残日",
        "0520  全国学生营养日",
        "0522  国际生物多样性日",
        "0523  国际牛奶日",
        "0531  世界无烟日",

        "0601  国际儿童节",
        "0605  世界环境日",
        "0606  全国爱眼日",
        "0617  防治荒漠化和干旱日",
        "0623  国际奥林匹克日",
        "0625  全国土地日",
        "0626  国际反毒品日",

        "0701  建党节 香港回归纪念日",
        "0707  抗日战争纪念日",
        "0711  世界人口日",

        "0801  八一建军节",
        "0815  日本正式宣布无条件投降日",

        "0908  国际扫盲日",
        "0909  毛泽东逝世纪念日",
        "0910  教师节",
        "0916  国际臭氧层保护日",
        "0917  国际和平日",
        "0918  九·一八事变纪念日",
        "0920  国际爱牙日",
        "0927  世界旅游日",
        "0928  孔子诞辰",

        "1001*国庆节 国际音乐节 国际老人节",
        "1002  国际减轻自然灾害日",
        "1004  世界动物日",
        "1007  国际住房日",
        "1008  世界视觉日 全国高血压日",
        "1009  世界邮政日",
        "1010  辛亥革命纪念日 世界精神卫生日",
        "1015  国际盲人节",
        "1016  世界粮食节",
        "1017  世界消除贫困日",
        "1022  世界传统医药日",
        "1024  联合国日",
        "1025  人类天花绝迹日",
        "1026  足球诞生日",
        "1031  万圣节",

        "1107  十月社会主义革命纪念日",
        "1108  中国记者日",
        "1109  消防宣传日",
        "1110  世界青年节",
        "1112  孙中山诞辰",
        "1114  世界糖尿病日",
        "1117  国际大学生节",

        "1201  世界艾滋病日",
        "1203  世界残疾人日",
        "1209  世界足球日",
        "1210  世界人权日",
        "1212  西安事变纪念日",
        "1213  南京大屠杀",
        "1220  澳门回归纪念日",
        "1221  国际篮球日",
        "1224  平安夜",
        "1225  圣诞节 世界强化免疫日",
        "1226  毛泽东诞辰"],
    //农历节日  *表示放假日
    lFtv: [
        "0101*春节",
        "0102*大年初二",
        "0103*大年初三",
        "0105  路神生日",
        "0115  元宵节",
        "0202  龙抬头",
        "0219  观世音圣诞",
        "0404  寒食节",
        "0408  佛诞节 ",
        "0505*端午节",
        "0606  天贶节 姑姑节",
        "0624  彝族火把节",
        "0707  七夕情人节",
        "0714  鬼节(南方)",
        "0715  盂兰节",
        "0730  地藏节",
        "0815*中秋节",
        "0909  重阳节",
        "1001  祭祖节",
        "1117  阿弥陀佛圣诞",
        "1208  腊八节 释迦如来成道日",
        "1223  过小年",
        "0100*除夕"],
    //某月的第几个星期几; 5,6,7,8 表示到数第 1,2,3,4 个星期几
    wFtv: [
        "0110  黑人节",
        "0150  世界麻风日",
        "0121  日本成人节",
        "0520  母亲节",
        "0530  全国助残日",
        "0630  父亲节",
        "0716  合作节",
        "0730  被奴役国家周",
        "0932  国际和平日",
        "0940  国际聋人节 世界儿童日",
        "1011  国际住房日",
        "1144  感恩节"]
};