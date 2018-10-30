cc.Class({
    extends:cc.Class,

    init:function(){
        this.entityId = battle.entityManager.getEntityId();
        this.addToEntityStatus = 0;

        battle.entityManager.addEntity(this);
    },

    step:function(){
        
    },

    clear:function(){
        battle.entityManager.removeEntity(this);
    }
});
