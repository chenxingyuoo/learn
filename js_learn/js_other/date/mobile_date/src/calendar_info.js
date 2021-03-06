/**
 * Created by chenxingyu on 2017/1/19.
 */
const dateInfo = {
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
    //中文月份
    chineseMonth : ['' , '一', '二' , '三' , '四', '五', '六', '七', '八', '九', '十' ,'十一' , '十二'],
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
        // "0102*大年初二",
        // "0103*大年初三",
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
        "1223  小年",
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
        "1144  感恩节"
    ],
    yFtv : [

    ]
};

module.exports = dateInfo;