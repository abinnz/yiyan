//index.js
//获取应用实例
const app = getApp();
const load = require('../../utils/load.js');
const config = require('../../config/config.js');
const type = require('../../utils/type.js');

Page({
    data: {
        //内容动画
        contentAnimation: {},
        timerTop: "",
        timerBottom: "",
        content: config.text.homeLoading,
        //当前元素
        currentEle: null,
        //鸡汤请求列表
        checkenSoupList: [],
        //历史纪录
        historyList: [],
        isLoading: true
    },

    onLoad: function (query) {
        const _this = this;
        console.log('index页面加载...');
        console.log('index页面参数：', query);
        this.flushTimer();
        load.closeLoading();
        this.loadChickenSoupPageInfo(function() {
            _this.contentStepInto();
        });
    },
    
    onReady: function () {
        console.log('index页面已准备');
    },

    onShow: function () {
        this.flushTimer();
    },

    //分享
    onShareAppMessage: function (res) {
        console.log("share");
        return {
            title: this.data.content,
            path: '/pages/index/index'
        };
    },

    //加载分页数据
    loadChickenSoupPageInfo: function (success) {
        const _this = this;
        const checkenSoupList = this.data.checkenSoupList;
        if (this.data.isLoading) {
            return;
        }
        load.openLoading();
        const requestUrl = config.api.getChickenSoupList;
        wx.request({
            url: requestUrl,
            success: function (res) {
                if (load.isSuccess(res)) {
                    const data = res.data.data;
                    _this.setData({
                        checkenSoupList: checkenSoupList.concat(data)
                    });
                    if (type.isNotNull(success)) {
                        success();
                    }
                } else {
                    wx.showToast({
                        title: '加载失败！',
                        icon: 'none',
                        duration: 2000
                    });
                }
            },
            complete: function () {
                load.closeLoading();
            }
        });
    },

    goBack: function () {
        if (this.data.isLoading) {
            return;
        }
        load.openLoading();
        this.contentStepBack();
        load.closeLoading();
        console.log("goBack");
    },

    goNext: function () {
        if (this.data.isLoading) {
            return;
        }
        load.openLoading();
        this.contentStepInto();
        load.closeLoading();
        console.log("goNext");
    },

    //内容退回
    contentStepBack: function () {
        const checkenSoupList = this.data.checkenSoupList;
        const historyList = this.data.historyList;
        if (historyList.length == 0) {
            wx.showToast({
                title: '没有鸡汤啦！',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        const ele = historyList.pop();
        if (type.isNotNull(this.data.currentEle)) {
            checkenSoupList.push(this.data.currentEle);
        }
        this.setData({
            checkenSoupList: checkenSoupList,
            historyList: historyList,
            currentEle: ele
        });
        this.playAnimation(-1000, ele.content);
    },

    //内容步入
    contentStepInto: function () {
        const checkenSoupList = this.data.checkenSoupList;
        const historyList = this.data.historyList;
        if (checkenSoupList.length == 0) {
            load.closeLoading();
            this.playAnimation(1000, config.text.homeLoading);
            this.loadChickenSoupPageInfo(this.contentStepInto);
            return;
        }
        //跳过超过指定长度的鸡汤文
        let ele;
        do {
            ele = checkenSoupList.pop();
        } while(type.isNotNull(ele) && ele.content.length > config.limit.chickenSouplength);
        if (type.isNull(ele)) {
            this.contentStepInto();
            return;
        }
        if (type.isNotNull(this.data.currentEle)) {
            historyList.push(this.data.currentEle);
        }
        this.setData({
            checkenSoupList: checkenSoupList,
            historyList: historyList,
            currentEle: ele
        });
        this.playAnimation(1000, ele.content);
    },

    //播放过渡动画
    playAnimation: function (distance, content) {
        const _this = this;
        var animation = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease'
        });
        animation.translateX(distance).step()
            .opacity(0).translateX(-distance).step({duration: 20})
            .opacity(1).translateX(0).step();
        this.setData({
            contentAnimation: animation.export()
        });
        setTimeout(function() {
            _this.setData({
                content: content
            })
        }, 400);
    },

    //刷新时间
    flushTimer: function () {
        const date = new Date();
        this.setData({
            timerTop: date.getFullYear() + " " 
                + config.localDate.shortMonthList[date.getMonth()] + " " 
                + config.localDate.weekdayList[date.getDay()],
            timerBottom: date.getDate()
        });
    }
    
});