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
    },

    // update (dt) {},
});
