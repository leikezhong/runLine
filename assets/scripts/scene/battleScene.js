cc.Class({
    extends: cc.Component,

    properties: {
        mainLayer:cc.Node,
        uiLayer:cc.Node,
    },

    start:function(){
        cc.director.preloadScene("rankingScene", function () {
            cc.log("rankingScene preloaded");
        });
    },

    onLoad:function(){
        setTimeout(() => {
            cc.director.loadScene("rankingScene");
        }, 10000);
        return;
        battle.resourceManager.loadBaseResource(this.loadComplete.bind(this));
    },

    loadComplete:function(){
        battle.layerManager.initAllLayer(this);
        battle.enterFrameManager.initEnterFrame();
        battle.collisionManager.initCollision();
        battle.battleManager.initBattle();
    },

    update:function(dt){
        return;
        battle.battleManager.step();
        battle.entityManager.step();
    }
});
