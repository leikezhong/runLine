cc.Class({
    extends: cc.Component,

    properties: {
        wxHead:cc.Sprite,
        wxName:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var self = this;
        cc.loader.load({url: battle.wxManager.userInfo.avatarUrl, type: 'jpg'},
            function (err, texture) {
                self.wxHead.spriteFrame = new cc.SpriteFrame(texture);
                self.wxHead.node.width = 60;
                self.wxHead.node.height = 60;
            }
        );
        this.wxName.string = battle.wxManager.userInfo.nickName;

        if(CC_WECHATGAME){
            wx.cloud.init({
                env: 'test-9bdb94'
            })

            const db = wx.cloud.database()
            db.collection('score').where({
                
            }).get({
                success(res) {
                    console.log(res.data)
                }
            })
        }
    },

    startShareFunc:function(){
        wx.updateShareMenu({
            withShareTicket: true,
            success:function(info){
                console.log("share success");
                console.log(info);
                wx.shareAppMessage({
                    title: "测试！！！！！",
                    imageUrl: canvas.toTempFilePathSync({
                        destWidth: 500,
                        destHeight: 400
                    }),
                    success: function (res) {
                        console.log('分享成功', res)
                        // 转发成功
                    },
                    fail: function (res) {
                        console.log('分享失败', res)
                        // 转发失败
                    }
                });
            }
        });
        
    }

    // update (dt) {},
});
