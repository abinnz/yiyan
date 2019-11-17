const type = require('./type.js');

//首页页面
const getIndexPage = () => {
    let pages = getCurrentPages();
    if (pages.length === 0) {
        return null;
    } else {
        return pages[0];
    }
};

//获取当前页面实例
const getCurrentPage = () => {
    let pages = getCurrentPages();
    if (pages.length === 0) {
        return null;
    } else {
        return pages[pages.length - 1];
    }
}

//开启加载
const openLoading = () => {
    let page = getCurrentPage();
    page.setData({
        isLoading: true
    });
};

//关闭加载
const closeLoading = () => {
    let page = getCurrentPage();
    page.setData({
        isLoading: false
    });
};

//是否有下一页
const hasNextPageByParam = (pageIndex, totalPages) => {
    if (pageIndex === 0) {
        return true;
    } else if ((pageIndex + 1) <= totalPages) {
        return true;
    } else {
        return false;
    }
};

//是否有下一页
const hasNextPage = (pageInfo) => {
    if (hasNextPageByParam(pageInfo.pageIndex, pageInfo.totalPages)) {
        updateListEmpty(false);
        openLoading();
        return true;
    } else {
        updateListEmpty(pageInfo);
        closeLoading();
        return false;
    }
};

//更新列表是否为空
const updateListEmpty = (obj) => {
    const page = getCurrentPage();
    if (type.isBoolean(obj)) {
        page.setData({
            isListEmpty: obj
        });
        return;
    }
    if (obj.items.length === 0) {
        page.setData({
            isListEmpty: true
        });
    } else {
        page.setData({
            isListEmpty: false
        });
    }
};

//获取Session请求头
const getSessionHeader = (requestObj) => {
    const app = getApp();
    if (app.globalData.sessionId === null) {
        console.error('sessionId为null');
    }
    return {
        'Cookie': 'JSESSIONID=' + app.globalData.sessionId
    }
};

//判断响应是否正常
const isSuccess = (res) => {
    if (res.data.code === 'success') {
        console.log('请求成功：', res.data);
        return true;
    } else {
        console.error('请求失败：', res.data.message);
        return false;
    }
};

//重置分页内容数据
const getResetPageInfo = () => {
    const pageInfo = {};
    pageInfo.pageIndex = 0;
    pageInfo.pageSize = 0;
    pageInfo.totalItems = 0;
    pageInfo.totalPages = 0,
    pageInfo.items = []
    return pageInfo;
};

//获取用户地里位置信息
const getWxUserLocation = (obj) => {
    //获取地理位置
    wx.getLocation({
        type: 'gcj02', //国测局坐标
        success: function (res) {
            if (type.isNotNull(obj.success)) {
                obj.success(res);
            }
        },
        fail: function () {
            if (type.isNotNull(obj.fail)) {
                obj.fail();
            } else {
                wx.openSetting({});
                closeLoading();
            }
        },
        complete: function () {
            if (type.isNotNull(obj.complete)) {
                obj.complete();
            }
        }
    });
};

//获取提醒对象
const getToast = () => {
    const { $Toast } = require('../iview/base/index');
    return $Toast;
}

//消息提醒
const toast = (obj) => {
    const $Toast = getToast();
    $Toast(obj);
};

//成功消息提醒
const toastSuccess = (content) => {
    toast({
        content: content,
        type: 'success'
    });
};

//错误消息提醒
const toastError = (content) => {
    toast({
        content: content,
        type: 'error'
    });
};

//打开消息对话框
const openMsgModal = () => {
    let page = getCurrentPage();
    page.setData({
        isShowMsgModal: true
    });
};

//关闭消息对话框
const closeMsgModal = () => {
    let page = getCurrentPage();
    page.setData({
        isShowMsgModal: false
    });
};

module.exports = {
    getIndexPage: getIndexPage,
    getCurrentPage: getCurrentPage,
    openLoading: openLoading,
    closeLoading: closeLoading,
    hasNextPageByParam: hasNextPageByParam,
    hasNextPage: hasNextPage,
    updateListEmpty: updateListEmpty,
    getSessionHeader: getSessionHeader,
    isSuccess: isSuccess,
    getResetPageInfo: getResetPageInfo,
    getWxUserLocation: getWxUserLocation,
    getToast: getToast,
    toast: toast,
    toastSuccess: toastSuccess,
    toastError: toastError,
    openMsgModal: openMsgModal,
    closeMsgModal: closeMsgModal
}