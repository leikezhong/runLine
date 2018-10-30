var baseEntity = require("baseEntity");
var sunBombEntity = require("sunBombEntity");
cc.Class({
    extends: baseEntity,

    init:function(initPos){
        this._super();
        this.initPos = initPos;
        this.itemCount = 0;

        this.sunParticle = cc.instantiate(cc.loader.getRes("prefabs/sun_particle"));
        battle.layerManager.enemyLayer.addChild(this.sunParticle);

        this.sunParticle.x = initPos.x;
        this.sunParticle.y = initPos.y;

        this.lastColor = new cc.Color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), 255);

        this.particleSystem = this.sunParticle.getComponent(cc.ParticleSystem);
        this.particleSystem.startColor = this.lastColor;
        this.particleSystem.endColor = this.lastColor;

        this.sunParticle.getComponent("sunParticle").host = this;

        this.moveType = Math.floor(Math.random() * 4);
        this.moveCount = 0;
        this.nowMoveInterval = battle.battleManager.mainMoveInterval;

        console.log("create sun entity");

    },

    getEntityX:function(){
        return this.sunParticle.x;
    },

    getEntityY:function(){
        return this.sunParticle.y;
    },

    createBomb:function(){
        var bomb = new sunBombEntity();
        bomb.init(cc.p(this.getEntityX(), this.getEntityY()), this.lastColor);
        this.clear();
    },

    step:function(){
        this.moveStep();
    },

    moveStep:function(){
        this.moveCount++;
        if(this.sunParticle){
            switch(this.moveType){
                case 0:
                this.sunParticle.y -= this.nowMoveInterval;
                break;
                case 1:
                this.itemCount++;
                var hudu = (Math.PI / 180) * this.itemCount * 3;
                this.sunParticle.x = this.initPos.x - Math.sin(hudu) * 200;
                this.sunParticle.y = this.initPos.y - Math.cos(hudu) * 30 * this.nowMoveInterval - this.nowMoveInterval * this.moveCount * .09;
                break;
                case 2:
                this.itemCount++;
                var hudu = (Math.PI / 180) * this.itemCount * 3;
                this.sunParticle.x = this.initPos.x + Math.sin(hudu) * 200;
                this.sunParticle.y = this.initPos.y - Math.cos(hudu) * 30 * this.nowMoveInterval - this.nowMoveInterval * this.moveCount * .09;
                break;
                case 3:
                this.itemCount++;
                var hudu = (Math.PI / 180) * this.itemCount * 3;
                this.sunParticle.x = this.initPos.x + Math.sin(hudu) * 200;
                this.sunParticle.y = this.initPos.y - this.nowMoveInterval * this.moveCount * .8;
                break;
            }
            if(this.sunParticle.y < -1280){
                this.clear();
            }
        }
    },

    clear:function(){
        if(this.sunParticle){
            this.sunParticle.destroy();
            this.sunParticle = null;
        }
        this._super();
    }
})