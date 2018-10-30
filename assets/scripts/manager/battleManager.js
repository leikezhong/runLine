var starEntity = require("starEntity");
var sunEntity = require("sunEntity");
cc.Class({
    init:function () {
        // console.log("---init battleManager---");
        this.createSunCount = 0;
    },

    initBattle:function(){
        this.mainStar = new starEntity();
        this.mainStar.init(cc.p(0, -300));

        battle.layerManager.mainLayer.on(cc.Node.EventType.TOUCH_START, this.btnPress, this);
        battle.layerManager.mainLayer.on(cc.Node.EventType.TOUCH_MOVE, this.btnMove, this);
        battle.layerManager.mainLayer.on(cc.Node.EventType.TOUCH_END, this.btnRelease, this);
        battle.layerManager.mainLayer.on(cc.Node.EventType.TOUCH_CANCEL, this.btnRelease, this);

        this.startX = 0;
        this.startY = 0;
        this.intervalX = 0;
        this.intervalY = 0;

        this.mainCount = 0;
        this.mainMoveInterval = 5;
    },


    btnPress:function(event){
        if(event.getLocation()){
            this.startX = event.getLocation().x;
        }
    },

    btnMove:function(event){
        if(event.getLocation()){
            this.intervalX = event.getLocation().x - this.startX;
            this.startX = event.getLocation().x;
            this.mainStar.setEntityX(this.mainStar.getEntityX() + this.intervalX);
        }

        if(this.mainStar.getEntityX() < -360){
            this.mainStar.setEntityX(-360);
        }else if(this.mainStar.getEntityX() > 360){
            this.mainStar.setEntityX(360);
        }
        if(this.mainStar.getEntityY() < -640){
            this.mainStar.setEntityY(-640);
        }else if(this.mainStar.getEntityY() > 640){
            this.mainStar.setEntityY(640);
        }
    },

    btnRelease:function(event){
        
    },

    step:function(){
        this.mainStep();
        this.createSunStep();
    },

    mainStep:function(){
        this.mainCount++;
        if(this.mainCount % 600 == 0){
            if(this.mainMoveInterval < 15){
                this.mainMoveInterval++;
            }
        }
    },

    createSunStep:function(){
        this.createSunCount++;
        if(this.createSunCount % 90 == 0){
            var sun = new sunEntity();
            sun.init(cc.p(-320 + 640 * Math.random(), 640));
        }
    }
})