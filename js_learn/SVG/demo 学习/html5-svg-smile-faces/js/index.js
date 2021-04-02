//Colors from : http://flatuicolors.com/


function changeFond(){
	var couleurFond;
	var numFond = Math.floor((Math.random() * 10) + 1); 
	switch (numFond) {
		case 1:
		    couleurFond = "#16a085";
		    break;
		case 2:
		    couleurFond = "#27ae60";
		    break;
		case 3:
		    couleurFond = "#2980b9";
		    break;
		case 4:
		    couleurFond = "#8e44ad";
		    break;
		case 5:
		    couleurFond = "#2c3e50";
		    break;
		case 6:
		    couleurFond = "#f39c12";
		    break;
		case 7:
		    couleurFond = "#d35400";
		    break;
		case 8:
		    couleurFond = "#c0392b";
		    break;
		case 9:
		    couleurFond = "#bdc3c7";
		    break;
		case 10:
		    couleurFond = "#7f8c8d";
		    break;           
		} 
		document.body.style.background = couleurFond;
}

function changeCouleur(){
	var tabNum=[];
	while (tabNum.length<4){
			var numSlime = Math.floor((Math.random() * 10) + 1); 
				if (tabNum.indexOf(numSlime) == -1){ 
				tabNum.push(numSlime);
			}
		}

	for (var i = 0; i < 4; i++) {
    	var couleurSlime;
		var corpsSlime = document.getElementsByClassName("corps");
		
		switch (tabNum[i]) {
			case 1:
			    couleurSlime = "#1abc9c";
			    break;
			case 2:
			    couleurSlime = "#2ecc71";
			    break;
			case 3:
			    couleurSlime = "#3498db";
			    break;
			case 4:
			    couleurSlime = "#9b59b6";
			    break;
			case 5:
			    couleurSlime = "#34495e";
			    break;
			case 6:
			    couleurSlime = "#f1c40f";
			    break;
			case 7:
			    couleurSlime = "#e67e22";
			    break;
			case 8:
			    couleurSlime = "#e74c3c";
			    break;
			case 9:
			    couleurSlime = "#ecf0f1";
			    break;
			case 10:
			    couleurSlime = "#95a5a6";
			    break;           
			} 		
		corpsSlime[i].style.fill = couleurSlime;
		}
}
changeFond();
changeCouleur();