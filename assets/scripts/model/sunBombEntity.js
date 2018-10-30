var baseEntity = require("baseEntity");
cc.Class({
    extends: baseEntity,

    init:function(initPos, lastColor){
        this._super();

        this.sunBombParticle = cc.instantiate(cc.loader.getRes("prefabs/sun_bomb_particle"));
        this.sunBombParticle.parent = battle.layerManager.bgLayer;

        this.sunBombParticle.x = initPos.x;
        this.sunBombParticle.y = initPos.y;

        this.particleSystem = this.sunBombParticle.getComponent(cc.ParticleSystem);
        this.particleSystem.startColor = lastColor;
        this.particleSystem.endColor = lastColor;

        console.log("create sun bomb entity");
    },

    getEntityX:function(){
        return this.sunBombParticle.x;
    },

    getEntityY:function(){
        return this.sunBombParticle.y;
    },

    createBomb:function(){
        this.clear();
    },

    step:function(){
        
    },

    clear:function(){
        if(this.sunBombParticle){
            this.sunBombParticle.destroy();
            this.sunBombParticle = null;
        }
        this._super();
    }
})