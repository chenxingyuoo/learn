var xlinkns = "http://www.w3.org/1999/xlink";
// makes SVG object <type>
function SVG(type){
   return document.createElementNS('http://www.w3.org/2000/svg', type);
}

function makeTree(depth, angle, gId) {
  
   var defs   	= document.getElementById("defs");
   var prevId 	= '';
   var id     	= '';

    for (var i = 1; i <= depth; i++){
    	prevId = (i-1) + '_' + gId;
    	id =     i + '_' + gId;

	    var g = SVG("g");
	    	g.setAttributeNS(null, "id", id);
	    	defs.appendChild(g);
	    
	    
	    var use1 = SVG("use");
	    	use1.setAttributeNS(xlinkns, "xlink:href", "#"+ prevId);
	    	use1.setAttributeNS(null, "transform", "translate(0, -1) rotate(-"+ angle +") scale(.7)");

	    var use2 = SVG("use");
	    	use2.setAttributeNS(xlinkns, "xlink:href", "#"+ prevId);
	    	use2.setAttributeNS(null, "transform","translate (0, -1) rotate(+"+ angle +") scale(.7)");

	    var use3 = SVG("use");
	    	use3.setAttributeNS(xlinkns, "xlink:href", "#stem");
	    
	    g.appendChild(use1);
	    g.appendChild(use2);
	    g.appendChild(use3);
	}
}

function growTree(depth, uId){
    var i = 0;
    var id = ''
    var intervalId = window.setInterval( function(){ 	
    	id = i == 0 ? i : i + '_' + uId
 		document.getElementById(uId).setAttributeNS(xlinkns, "xlink:href", "#"+id);
 	 	if (++i > depth) clearInterval(intervalId)
    }, 120);
}

function getIDs(angles){
	var IDs = []
	for (var i in angles)
		IDs.push(angles[i]+'deg')
	return IDs
}
$(document).ready(function() {
	var angles = [15, 25, 35];
	var IDs	   = getIDs(angles);
	var depth  = 9;

	for (var i in angles){
		makeTree(depth, angles[i], IDs[i]);
		growTree(depth, IDs[i]);
	}
});