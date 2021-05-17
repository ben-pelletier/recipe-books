import Vue from 'vue'

Vue.prototype.cutOff = (val, cut) => {
    let newTitle = val
    if(val.length > cut){
        newTitle = val.substring(0,cut) + ".."
    }
    return newTitle
}

