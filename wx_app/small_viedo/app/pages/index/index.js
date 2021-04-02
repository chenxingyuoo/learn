Page({
    // 前往视频列表
    gotoVideo() {
        wx.navigateTo({ url: '../video/video' });
    },

    data: {
        animationData: {}
    },
    onShow: function(){
        debugger;
        var animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
        })

        this.animation = animation

        animation.scale(2,2).rotate(45).step()

        this.setData({
            animationData:animation.export()
        })

        setTimeout(function() {
            animation.translate(30).step()
            this.setData({
                animationData:animation.export()
            })
        }.bind(this), 1000)
    },
    onReady: function(e) {
        var context = wx.createContext()
        context.rect(5, 5, 25, 15)
        context.stroke()
        context.scale(2, 2) //再放大2倍
        context.rect(5, 5, 25, 15)
        context.stroke()
        context.scale(2, 2) //再放大2倍
        context.rect(5, 5, 25, 15)
        context.stroke()
        wx.drawCanvas({
            canvasId: 1,
            actions: context.getActions()
        })
    },
    rotateAndScale: function () {
        // 旋转同时放大
        this.animation.rotate(45).scale(2, 2).step()
        this.setData({
            animationData: this.animation.export()
        })
    },
    rotateThenScale: function () {
        // 先旋转后放大
        this.animation.rotate(45).step()
        this.animation.scale(2, 2).step()
        this.setData({
            animationData: this.animation.export()
        })
    },
    rotateAndScaleThenTranslate: function () {
        // 先旋转同时放大，然后平移
        this.animation.rotate(45).scale(2, 2).step()
        this.animation.translate(100, 100).step({ duration: 1000 })
        this.setData({
            animationData: this.animation.export()
        })
    }

});
