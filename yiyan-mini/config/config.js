//prd dev
const isDev = true;
const devCtx = 'https://hm.jiucaiqq.com/test';
const prdCtx = 'https://jiucaiqq.com/yiyan';
//请求服务主机地址
const ctx = isDev ? devCtx : prdCtx;

const text = {
    chickenSoup: '一言鸡汤',
    homeLoading: '等过最长的鸡汤路就是加载中...'
};

//api接口
const api = {
    //微信登陆
    getChickenSoupList: ctx + '/cs/list'
};

//页面通讯事件
const event = {

};

const limit = {
    //鸡汤文字长度
    chickenSouplength: 75
};

const localDate = {
    weekdayList: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    shortMonthList: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] 
};

module.exports = {
    ctx: ctx,
    text: text,
    api: api,
    event: event,
    localDate: localDate,
    limit: limit
};