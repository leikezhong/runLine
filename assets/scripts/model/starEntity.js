var baseEntity = require("baseEntity");
cc.Class({
    extends: baseEntity,

    init:function(initPos){
        this._super();

        this.starParticle = cc.instantiate(cc.loader.getRes("prefabs/star_particle"));
        this.starParticle.parent = battle.layerManager.bgLayer;

        this.starParticle.x = initPos.x;
        this.starParticle.y = initPos.y;

        this.particleSystem = this.starParticle.getComponent(cc.ParticleSystem);

        this.startEmissionRate = 10;
        this.startParticleCount = 20;
        this.startGravity = cc.p(0, -300);

        this.particleSystem.emissionRate = this.startEmissionRate;
        this.particleSystem.particleCount = this.startParticleCount;
        this.particleSystem.gravity = this.startGravity;

        this.startSize = 40;
        this.startColor = new cc.Color(255,255,255,255);//白
        this.startColorVar = new cc.Color(0,0,0,255);//黑
        this.endColorVar = new cc.Color(0,0,0,255);//黑

        // this.endColor = cc.Color(255,255,255,255);//白

        // this.startColor = cc.Color(0,0,0,255);//黑
        // this.startColorVar = cc.Color(255,255,255,255);//白
        // this.endColorVar = cc.Color(255,255,255,255);//白
        // this.endColor = cc.Color(255,255,255,255);//白

        this.starParticle.getComponent("starParticle").host = this;

        console.log("create star entity");
    },

    getEntityX:function(){
        return this.starParticle.x;
    },

    getEntityY:function(){
        return this.starParticle.y;
    },

    setEntityX:function(xPos){
        this.starParticle.x = xPos;
    },

    setEntityY:function(yPos){
        this.starParticle.y = yPos;
    },

    addParameter:function(other){
        console.log("add parameter")
        this.startEmissionRate++;
        this.startParticleCount += 2;
        this.startGravity.y -= 10;

        if(this.startColor.getR() > 0){
            this.startColor.setR(this.startColor.getR() - 5);
            this.startColor.setG(this.startColor.getG() - 5);
            this.startColor.setB(this.startColor.getB() - 5);
        }
        if(this.startColorVar.getR() < 255){
            this.startColorVar.setR(this.startColorVar.getR() + 5);
            this.startColorVar.setG(this.startColorVar.getG() + 5);
            this.startColorVar.setB(this.startColorVar.getB() + 5);
        }
        if(this.endColorVar.getR() < 255){
            this.endColorVar.setR(this.endColorVar.getR() + 5);
            this.endColorVar.setG(this.endColorVar.getG() + 5);
            this.endColorVar.setB(this.endColorVar.getB() + 5);
        }
        if(this.startSize < 70){
            this.startSize += 0.5;
        }
        
        this.particleSystem.startSize = this.startSize;
        this.particleSystem.startColor = this.startColor;
        this.particleSystem.startColorVal = this.startColorVal;
        this.particleSystem.endColorVar = this.endColorVar;
        this.particleSystem.emissionRate = this.startEmissionRate;
        this.particleSystem.particleCount = this.startParticleCount;
        this.particleSystem.gravity = this.startGravity;
    },

    step:function(){
        this.moveStep();
    },

    moveStep:function(){
        
    },

    clear:function(){
        if(this.starParticle){
            this.starParticle.destroy();
            this.starParticle = null;
        }
        this._super();
    }
})