const config = require('../config/config.js');
const type = require('./type.js');

//格式化时间
const formatTime = (obj) => {
    let date;
    if (type.isNumber(obj)) {
        date = new Date(obj);
    } else {
        date = obj;
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

//格式时间
const formatMsgTime = (obj) => {
    let date;
    if (type.isNumber(obj)) {
        date = new Date(obj);
    } else {
        date = obj;
    }
    //现在日期
    const now = new Date();
    const nowYear = now.getFullYear();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (nowYear === year) {
        return [month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':');
    } else {
        return formatTime(obj);
    }
};


//是否为起始时间
const isEmptyTime = value => {
    if (value === -30609820800000) {
        return true;
    } else {
        return false;
    }
};

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
};

//根据value获取对应的key
const findArrayKeyByValue = (array, value) => {
    for (var i = 0; i < array.length; i++) {
        if (array[i].value === value) {
            return array[i].key;
        }
    }
    return -1;
};

//根据key获取对应的value
const findArrayValueByKey = (array, key) => {
    for (var i = 0; i < array.length; i++) {
        if (array[i].key === key) {
            return array[i].value;
        }
    }
    return '未知';
};

//在字典查找字段的值
const findFieldValueInDict = (field, key) => {
    console.log('当前查找字典：', field, key);
    if (config.dict[field] === undefined) {
        return '未知';
    } else {
        const fieldDict = config.dict[field];
        for (var i = 0; i < fieldDict.length; i++) {
            if (fieldDict[i].key === key) {
                return fieldDict[i].value;
            }
        }
        return '未知';
    }
};

//格式化车站 距离描述
const formatPointField = (value) => {
    if (value === undefined || value === -1 || value === '') {
        return '未知';
    } else {
        if (typeof value === 'number') {
            return value + '米';
        } else if (typeof value === 'string') {
            return value;
        } else {
            return '未知'
        }
    }
};

//根据首页选择tab获取选择对象
const getSelectedObjByType = (type) => {
    const obj = {};
    obj.isSelectedNearby = type === 'nearby' ? true : false,
    obj.isSelectedCity = type === 'city' ? true : false,
    obj.isSelectedLike = type === 'like' ? true : false
    return obj;
};

//获取格式化地址信息
const getFormatAddress = (obj) => {
    let townName = '';
    if (type.isNotNull(obj.townName)) {
        townName = obj.townName;
    }
    if (obj.cityName === obj.adName) {
        return obj.cityName + townName + obj.address;
    } else {
        return obj.cityName + obj.adName + townName + obj.address;
    }
};

//获取格式化距离
const getFormatDistance = (distance) => {
    if (distance < 1000) {
        return parseInt(distance) + '米';
    } else {
        return (distance / 1000).toFixed(1) + '公里';
    }
};

//用户是否能够审核
const isEnableReview = () => {
    const app = getApp();
    const roleType = type.isNull(app.globalData.user) ? null : app.globalData.user.roleType;
    if (type.isNotNull(roleType) && roleType === config.dict.roleType.admin) {
        return true;
    } else {
        return false;
    }
};

//格式化评论
const formatCommentItem = (item) => {
    item.userAvatarUrl = item.userAvatarUrl === '' ? config.comment.avatarUrl : item.userAvatarUrl;
    item.formatCreateTime = formatMsgTime(item.createTime);
    if (!type.isNull(item.replyList)) {
        for (let i = 0; i < item.replyList.length; i++) {
            const it = item.replyList[i];
            formatCommentItem(it);
        } 
    }
    return item;
};

//判断用户授权获取信息是否成功
const hasUserInfo = (detail) => {
    //getUserInfo:ok
    if (type.isNull(detail.userInfo) 
        || detail.errMsg !== 'getUserInfo:ok') {
        return false;
    } else {
        return true
    }
};

module.exports = {
    formatTime: formatTime,
    isEmptyTime: isEmptyTime,
    formatNumber: formatNumber,
    findArrayKeyByValue: findArrayKeyByValue,
    findArrayValueByKey: findArrayValueByKey,
    findFieldValueInDict: findFieldValueInDict,
    formatPointField: formatPointField,
    formatMsgTime: formatMsgTime,
    getSelectedObjByType: getSelectedObjByType,
    getFormatAddress: getFormatAddress,
    getFormatDistance: getFormatDistance,
    isEnableReview: isEnableReview,
    formatCommentItem: formatCommentItem,
    hasUserInfo: hasUserInfo
};