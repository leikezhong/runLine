// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        mainLayer:cc.Node,
        uiLayer:cc.Node,
    },

    start:function(){
        cc.director.preloadScene("rankingScene", function () {
            cc.log("Next scene preloaded");
        });
    },

    onLoad:function(){
        battle.resourceManager.loadBaseResource(this.loadComplete.bind(this));
    },

    loadComplete:function(){
        battle.layerManager.initAllLayer(this);
        battle.enterFrameManager.initEnterFrame();
        battle.collisionManager.initCollision();
        battle.battleManager.initBattle();
    },


    update:function(dt){
        battle.battleManager.step();
        battle.entityManager.step();
    }
});
