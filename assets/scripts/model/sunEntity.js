var baseEntity = require("baseEntity");
var sunBombEntity = require("sunBombEntity");
cc.Class({
    extends: baseEntity,

    init:function(initPos){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.SUN;
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

        this.moveType = 0;
        this.moveCount = 0;
        this.nowMoveInterval = battle.battleManager.mainMoveInterval;

        // console.log("create sun entity");

    },

    getFromPool:function(initPos){
        this.baseFrame = 0;
        this.isInPool = false;
        this.initPos = initPos;
        this.itemCount = 0;
        this.moveType = battle.battleManager.getSunMoveType();
        this.moveCount = 0;
        this.nowMoveInterval = battle.battleManager.mainMoveInterval;
        if(this.sunParticle && this.particleSystem){
            this.sunParticle.x = this.initPos.x;
            this.sunParticle.y = this.initPos.y;
            this.sunParticle.active = true;
            this.lastColor = new cc.Color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), 255);
            this.particleSystem.startColor = this.lastColor;
            this.particleSystem.endColor = this.lastColor;
            this.particleSystem.resetSystem();
        }
        battle.entityManager.addEntity(this);
    },

    putInPool:function(){
        this.baseFrame = 0;
        this.isInPool = true;
        if(this.particleSystem && this.sunParticle){
            this.sunParticle.active = false;
            this.particleSystem.stopSystem();
        }
        battle.entityManager.removeEntity(this);
    },

    getEntityX:function(){
        return this.sunParticle.x;
    },

    getEntityY:function(){
        return this.sunParticle.y;
    },

    createBomb:function(){
        var bomb = battle.poolManager.getFromPool(gameConst.ENTITY_TYPE.SUN_BOMB);
        if(bomb){
            bomb.getFromPool(cc.p(this.getEntityX(), this.getEntityY()), this.lastColor);
        }else{
            bomb = new sunBombEntity();
            bomb.init(cc.p(this.getEntityX(), this.getEntityY()), this.lastColor);
        }
        battle.poolManager.putInPool(this);
    },

    step:function(){
        if(this.isInPool)   return;
        this._super();
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
                battle.poolManager.putInPool(this);
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