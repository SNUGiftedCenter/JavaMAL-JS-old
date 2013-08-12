
  var width = 600;  
  var height = 600; // canvas size
  window.onload = init; // �������� �ε�Ǹ� init() �Լ��� ȣ����

function degToRad(deg){ // ���� �������� �ٲٴ� �Լ�
    return deg *(Math.PI/180);
} 

function Position(x, y, angle) { // �ź����� ���� ������ ���� �������Լ�
  this.x = x;
  this.y = y;
  this.angle = angle;
}

function lSystem (ctx) { // Lsystem �������Լ�

	this.line_length = 100;
	this.angle = parseInt(document.getElementById("angleTextInput").value);
	this.code="";
	this.ctx = ctx;
	this.x = 0;
	this.y = 0;
	this.direction = 90+parseInt(document.getElementById("startAngleInput").value); //���� x�� ������ 0���� �ǵ��� 90 �����ֱ�
    this.stack = new Array();

    this.parseTheRule = function(){  // ���� �м��ϰ� �ڵ带 ����� �Լ�
    var letter=[];
	var rule=[][][];
	var textInput = document.getElementById("axiomTextInput");
	var axiom = textInput.value; // �ʱ⹮�ڿ�
	var textInput = document.getElementById("ruleTextInput");
	var t=textInput.value.replace(/\s/g,""); // �꿡 ���� ���� (����ǥ������ �����.)
	var array_date1 = t.split("/"); // , �� �������� ���� �и��Ͽ� �迭�� ����
	var numOfRules = array_date1.length; // ���� ���� ����

	var rulesOfPro=[];

	for (i=0;i< numOfRules ;i++ ) // �� ���� ���ڿ� �� ���ڸ� �ٲ� ��Ģ���� �� �迭�� ������ ����
    {
	var array_data2 = array_date1[i].split("=");
	letter[i]= array_data2[0];
//	rule[i]= array_data2[1];
	var com = array_data2[1].math(/,/g);
	rule[i]= array_data2[1].split(",");
	//rulesOfPro[i]= array_data2[1].length;
	rulesOfPro[i] = com.length+1;
	
	}

	var textInput = document.getElementById("genTextInput");
	var gen = Number(textInput.value); //�ܰ� �Է¹���
	var nowCode = axiom; // �ʱ� ���ڿ��� ����
	var nextCode = ""; // �ڵ带 �����س��� �� ����

 for(var j=0 ; j< gen; j++){ // ������� �ڵ� ����
    nextCode="";
    for(var i=0 ; i< nowCode.length; i++){
		var c = nowCode.charAt(i);
		var count=0;
		for(var k=0 ; k< numOfRules; k++){
		if( c == letter[k] ){
//		 nextCode = nextCode + rule[k];
//		 nextCode = nextCode + rule[k][(int)(Math.floor(Math.random() * rulesOfPro[k])) ];	// ����ڰ� �Է��� �� �� �����ϰ� ���� ����
		 var ran = Math.floor(Math.random() * rulesOfPro[k]);
		 nextCode = nextCode + rule[k][ran];
		} else {
		  count=count+1;
		}
		if(count == numOfRules){   // ��� ���� Ȯ���غôµ� ��Ī�� �ϳ��� ������ �״�� �������ִ� �κ�
		 nextCode = nextCode + c;
		 }
	  }
    }
	nowCode = nextCode;
 } 
  document.f.outcome.value = nowCode;
 this.code = nowCode;
}


   this.calc = function(){ // ũ�� ��� �Լ�
    var x_min=0;
	var x_max=0;
	var y_min=0;
	var y_max=0;

     for( var i=0; i< this.code.length; i++)  // �ڵ带 �ѱ��ھ� �����鼭 ���ڸ� �ؼ�
	 {
       
		c= this.code.charAt(i);

		switch(c){
		
			case 'F':
			case 'G':
			case 'H':
 					this.x += Math.sin(degToRad(this.direction))*this.line_length;
					this.y += Math.cos(degToRad(this.direction))*this.line_length;
					if (this.x> x_max)    // x,y ��ǥ�� �ִ�, �ּҸ� �����ϴ� �κ�
					{
						x_max = this.x;
					}
					else if (this.x < x_min)
					{
						x_min = this.x;
					}

					if (this.y> y_max)
					{
						y_max = this.y;
					}
					else if (this.y < y_min)
					{
						y_min = this.y;
					}
					break;
		    
			case '+':
			case '>':
					this.direction -= this.angle;
					break;
			case '-':
			case '<':
					this.direction += this.angle;
					break;
			case '[':
					this.stack.push(new Position(this.x, this.y, this.direction)); //���� ���¸� �迭�� ����
					break;
			case ']':
					p = this.stack.pop();
					this.x = p.x;
					this.y = p.y;
					this.direction = p.angle;
					break;
			default:
					break;
		}
	}
   
         var ratioWidth = width/(x_max-x_min);    // canvas ���ο� �׸��� ���� ����
		 var ratioHeight = height/(y_max-y_min);  // canvas ���ο� �׸��� ���� ����
		 if (ratioWidth > ratioHeight) // ū ������ ���Ͽ� ���� ������ ����
		 {
		  var ratio = ratioHeight;
		 }
		 else{
		  var ratio = ratioWidth;
		 }
		 
//		 ratio = Math.floor( ratio * 10000)/10000;		 
//		 this.line_length= Math.floor(this.line_length * ratio);
		 this.line_length= this.line_length * ratio ; // �׸��� canvas �ȿ� �� �������� ���� ���̿� ������ ������
		 this.x = (width/2 - (ratio*(x_min+x_max)/2));  // �׸��� ���߾ӿ� �� �� �ֵ��� �ʱ� ���� ��ġ�� �������
		 this.y = (height/2 - (ratio*(y_min+y_max)/2));
		 this.direction = 90+parseInt(document.getElementById("startAngleInput").value); // ����� �������Ƿ� ������ ������� ��������.
  }

//   this.redcol = parseInt(document.getElementById("RedTextInput").value);
//	 this.grecol = parseInt(document.getElementById("GreenTextInput").value);
//	 this.blucol = parseInt(document.getElementById("BlueTextInput").value);

     var R = parseInt(document.getElementById("RedTextInput").value);
	 var G = parseInt(document.getElementById("GreenTextInput").value);
	 var B = parseInt(document.getElementById("BlueTextInput").value);

     this.draw = function(){ // �׸��� �Լ�
	 this.ctx.fillStyle="rgb(255,255,255)";
	 this.ctx.fillRect(0,0, width, height); // �������ä���� �����
	 this.ctx.strokeStyle="rgb(255,0,221)";
	 this.ctx.strokeRect(0, 0, width, height); // �׵θ��� ��ȫ���� ���ֱ�
//	 this.ctx.strokeStyle="rgb(40,130,114)"; //���� ����
 	 this.ctx.strokeStyle="rgb("+R+","+G+","+B+")"; //���� ����
     for( var i=0; i< this.code.length; i++)
	 {
       
		c= this.code.charAt(i);

		switch(c){
		
			case 'F':
			case 'G':
			case 'H':
					this.ctx.beginPath();
	             	this.ctx.moveTo(this.x, this.y);  //�̵�
 					this.x += Math.sin(degToRad(this.direction))*this.line_length;
					this.y += Math.cos(degToRad(this.direction))*this.line_length;
					this.ctx.lineTo(this.x , this.y); // �׸���
					this.ctx.closePath();
					this.ctx.stroke();
					break;
		    
			case '+':
			case '>':
					this.direction -= this.angle;
					break;
			case '-':
			case '<':
					this.direction += this.angle;
					break;
			case '[':
					this.stack.push(new Position(this.x, this.y, this.direction));
					break;
			case ']':
					p = this.stack.pop();
					this.x = p.x;
					this.y = p.y;
					this.direction = p.angle;
					break;
			default:
					break;
		}
	}
  }


}

  function handleButtonClick(){ // Run ��ư�� Ŭ���Ͽ��� �� �����ϴ� �Լ�

  canvas = document.getElementById("canvas");  // canvas
  ctx = canvas.getContext("2d");
  var lsys = new lSystem(ctx);
  lsys.parseTheRule();
  lsys.calc();
  lsys.draw();

  }

 function angleButtonClick(){ // �������� �������� ���� ���� �׸��� �ٽ���.
  canvas = document.getElementById("canvas");  // canvas
  ctx = canvas.getContext("2d");
  var lsys = new lSystem(ctx);
  lsys.code = document.getElementById("outcome").value
  lsys.calc();
  lsys.draw();
 }
 
 function resetButtonClick(){//���¹�ư Ŭ���� �ʱⰪ���� ������.
  document.getElementById("axiomTextInput").value ="F"  // �ʱⰪ ����
  document.getElementById("ruleTextInput").value ="F=G[+F][-F]GF/ G=GG"
  document.getElementById("startAngleInput").value ="90"
  document.getElementById("angleTextInput").value = "45"
  document.getElementById("genTextInput").value ="4" 

  document.getElementById("RedTextInput").value ="102"
  document.getElementById("GreenTextInput").value ="51"
  document.getElementById("BlueTextInput").value ="0"

  canvas = document.getElementById("canvas");  // canvas
  ctx = canvas.getContext("2d");
  var lsys = new lSystem(ctx);
  lsys.parseTheRule();
  lsys.calc();
  lsys.draw();
 }

  function init(){ // ������ �ε�� �θ� �Լ�

  document.getElementById("addButton").onclick = handleButtonClick;
  document.getElementById("resetButton").onclick = resetButtonClick;

  document.getElementById("genTextInput").onchange = handleButtonClick;
  document.getElementById("axiomTextInput").onchange = handleButtonClick;
  document.getElementById("ruleTextInput").onchange = handleButtonClick;

  document.getElementById("startAngleInput").onchange = angleButtonClick;
  document.getElementById("angleTextInput").onchange = angleButtonClick;

  document.getElementById("RedTextInput").onchange = angleButtonClick;
  document.getElementById("GreenTextInput").onchange = angleButtonClick;
  document.getElementById("BlueTextInput").onchange = angleButtonClick;

  
  document.getElementById("axiomTextInput").value ="F"  // �ʱⰪ ����
  document.getElementById("ruleTextInput").value ="F=G[+F][-F]GF/ G=GG"
  document.getElementById("startAngleInput").value ="90"
  document.getElementById("angleTextInput").value = "45"
  document.getElementById("genTextInput").value ="4" 

  document.getElementById("RedTextInput").value ="102"
  document.getElementById("GreenTextInput").value ="51"
  document.getElementById("BlueTextInput").value ="0"
  handleButtonClick();

  }