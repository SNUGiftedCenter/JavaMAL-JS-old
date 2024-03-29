/*	Copyright (c) Jaeyeun Yoon 2013
	Apache Licence 2.0 */
var parseCommand = function(command){
	var cx = 0, cy = 0, cz = 0, cd = 0;
	var turn = function(direction){
		if(direction =='left'){
			if(cd == 0){
				cd = 4;
			}
			cd--;
		}
		else if( direction == 'right'){
			if( cd == 3){
				cd = -1;
			}
			cd++;
		}
	}
	var move = function(direction){
		var amount;
		if( direction == 'straight' || direction == 'up'){
			amount = 1;
		}
		else if (direction == 'back' || direction == 'down'){
			amount = -1;
		}
		if( direction == 'straight' || direction == 'back'){
			switch(cd){
			case 0:
				cy+=amount;
				break;
			case 1:
				cx+=amount;
				break;
			case 2:
				cy-=amount;
				break;
			case 3:
				cx-=amount;
				break;
			}
		} else {
			cz+=amount;
		}
	}	
	for( var i = 0; i < command.length; i++){
		var currentCommand = command.charAt(i);
		if(currentCommand == 's'){
			if(i != 0 ){
				move('straight');
			}
			drawCube(cx,cy,cz);
		}
		else if( currentCommand == 'b'){
			move('back');
			drawCube(cx,cy,cz);
		}
		else if( currentCommand == 'u'){
			move('up');
			drawCube(cx,cy,cz);
		}
		else if( currentCommand == 'd'){
			move('down');
			drawCube(cx,cy,cz);
		}
		else if( currentCommand == 'L'){
			turn('left');
		}
		else if( currentCommand == 'R'){
			turn('right');
		}
	}
}

var vertices;
var faces;

var drawCube = function(x, y, z){
	var v = new Array();
	v[0] = addPoint(x+0.5,y+0.5,z);
	v[1] = addPoint(x+0.5,y-0.5,z);
	v[2] = addPoint(x-0.5,y+0.5,z);
	v[3] = addPoint(x-0.5,y-0.5,z);
	v[4] = addPoint(x+0.5,y+0.5,z+1);
	v[5] = addPoint(x+0.5,y-0.5,z+1);
	v[6] = addPoint(x-0.5,y+0.5,z+1);
	v[7] = addPoint(x-0.5,y-0.5,z+1);
	addSixFaces(v);
}

var addPoint = function(x,y,z) {
	for( var i = 0; i < vertices.length; i++){
		if(vertices[i][0] == x && vertices[i][1] == y && vertices[i][2] == z){
			return i+1;
		}
	}
	var newID = vertices.length;
	vertices[newID]=new Array();
	vertices[newID][0]=x;
	vertices[newID][1]=y;
	vertices[newID][2]=z;
	return newID+1;
}

var addSixFaces = function (v) {
	addFace(v[2],v[0],v[1],v[3]);
	addFace(v[3],v[7],v[5],v[1]);
	addFace(v[2],v[6],v[7],v[3]);
	addFace(v[0],v[4],v[6],v[2]);
	addFace(v[1],v[5],v[4],v[0]);
	addFace(v[6],v[4],v[5],v[7]);
}

var addFace = function (v1,v2,v3,v4){
	for( var i = 0; i < faces.length; i++){
		if( faces[i][0]==v1 && faces[i][1]==v2 && faces[i][2]==v3 && faces[i][0]==v4 ){
			return null;
		}
	}
	var newID = faces.length;
	faces[newID]=new Array();
	faces[newID][0]=v1;
	faces[newID][1]=v2;
	faces[newID][2]=v3;
	faces[newID][3]=v4;
}

var print = function (){
	document.getElementById('content').innerHTML = "";
	for(var i = 0; i < vertices.length; i++){
		document.getElementById('content').innerHTML += "v " + vertices[i][0] + " " + vertices[i][1] + " " + vertices[i][2] + "<br />";
	}
	document.getElementById('content').innerHTML += "<br />";
	for(var i = 0; i < faces.length; i++){
		document.getElementById('content').innerHTML += "f " + faces[i][0] + " " + faces[i][1] + " " + faces[i][2] + " " +faces[i][3]+ "<br />";
	}
}
