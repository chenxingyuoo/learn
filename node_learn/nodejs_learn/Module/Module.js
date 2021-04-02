/**
 * Created by mac on 15/12/29.
 */

function Module(id,parent){
   this.id = id;
   this.exports  = {};
   this.parent = parent;
   this.filename = null;
   this.loaded = false;
   this.children = [];
}

module.exports = Module;

