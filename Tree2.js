
  var width = 600;  
  var height = 600; // canvas size
  window.onload = init; // 페이지가 로드되면 init() 함수를 호출함

function degToRad(deg){ // 도를 라디안으로 바꾸는 함수
    return deg *(Math.PI/180);
} 

function Position(x, y, angle) { // 거북이의 상태 저장을 위한 생성자함수
  this.x = x;
  this.y = y;
  this.angle = angle;
}

function lSystem (ctx) { // Lsystem 생성자함수

	this.line_length = 100;
	this.angle = parseInt(document.getElementById("angleTextInput").value);
	this.code="";
	this.ctx = ctx;
	this.x = 0;
	this.y = 0;
	this.direction = 90+parseInt(document.getElementById("startAngleInput").value); //양의 x축 방향이 0도가 되도록 90 더해주기
    this.stack = new Array();

    this.parseTheRule = function(){  // 룰을 분석하고 코드를 만드는 함수
    var letter=[];
	var rule=[][][];
	var textInput = document.getElementById("axiomTextInput");
	var axiom = textInput.value; // 초기문자열
	var textInput = document.getElementById("ruleTextInput");
	var t=textInput.value.replace(/\s/g,""); // 룰에 공백 제거 (정규표현식을 사용함.)
	var array_date1 = t.split("/"); // , 를 기준으로 룰을 분리하여 배열에 저장
	var numOfRules = array_date1.length; // 룰의 개수 저장

	var rulesOfPro=[];

	for (i=0;i< numOfRules ;i++ ) // 각 룰을 문자와 그 문자를 바꿀 규칙으로 각 배열에 나눠서 저장
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
	var gen = Number(textInput.value); //단계 입력받음
	var nowCode = axiom; // 초기 문자열로 시작
	var nextCode = ""; // 코드를 저장해나갈 빈 변수

 for(var j=0 ; j< gen; j++){ // 여기부터 코드 생성
    nextCode="";
    for(var i=0 ; i< nowCode.length; i++){
		var c = nowCode.charAt(i);
		var count=0;
		for(var k=0 ; k< numOfRules; k++){
		if( c == letter[k] ){
//		 nextCode = nextCode + rule[k];
//		 nextCode = nextCode + rule[k][(int)(Math.floor(Math.random() * rulesOfPro[k])) ];	// 사용자가 입력한 룰 중 랜덤하게 룰을 선택
		 var ran = Math.floor(Math.random() * rulesOfPro[k]);
		 nextCode = nextCode + rule[k][ran];
		} else {
		  count=count+1;
		}
		if(count == numOfRules){   // 모든 룰을 확인해봤는데 매칭이 하나도 없으면 그대로 유지해주는 부분
		 nextCode = nextCode + c;
		 }
	  }
    }
	nowCode = nextCode;
 } 
  document.f.outcome.value = nowCode;
 this.code = nowCode;
}


   this.calc = function(){ // 크기 계산 함수
    var x_min=0;
	var x_max=0;
	var y_min=0;
	var y_max=0;

     for( var i=0; i< this.code.length; i++)  // 코드를 한글자씩 읽으면서 문자를 해석
	 {
       
		c= this.code.charAt(i);

		switch(c){
		
			case 'F':
			case 'G':
			case 'H':
 					this.x += Math.sin(degToRad(this.direction))*this.line_length;
					this.y += Math.cos(degToRad(this.direction))*this.line_length;
					if (this.x> x_max)    // x,y 좌표의 최대, 최소를 저장하는 부분
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
					this.stack.push(new Position(this.x, this.y, this.direction)); //현재 상태를 배열에 저장
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
   
         var ratioWidth = width/(x_max-x_min);    // canvas 가로와 그림의 가로 비율
		 var ratioHeight = height/(y_max-y_min);  // canvas 세로와 그림의 세로 비율
		 if (ratioWidth > ratioHeight) // 큰 비율을 구하여 최종 비율로 선정
		 {
		  var ratio = ratioHeight;
		 }
		 else{
		  var ratio = ratioWidth;
		 }
		 
//		 ratio = Math.floor( ratio * 10000)/10000;		 
//		 this.line_length= Math.floor(this.line_length * ratio);
		 this.line_length= this.line_length * ratio ; // 그림이 canvas 안에 딱 들어오도록 단위 길이에 비율을 곱해줌
		 this.x = (width/2 - (ratio*(x_min+x_max)/2));  // 그림이 정중앙에 올 수 있도록 초기 시작 위치를 계산해줌
		 this.y = (height/2 - (ratio*(y_min+y_max)/2));
		 this.direction = 90+parseInt(document.getElementById("startAngleInput").value); // 계산이 끝났으므로 각도를 원래대로 돌려놓음.
  }

//   this.redcol = parseInt(document.getElementById("RedTextInput").value);
//	 this.grecol = parseInt(document.getElementById("GreenTextInput").value);
//	 this.blucol = parseInt(document.getElementById("BlueTextInput").value);

     var R = parseInt(document.getElementById("RedTextInput").value);
	 var G = parseInt(document.getElementById("GreenTextInput").value);
	 var B = parseInt(document.getElementById("BlueTextInput").value);

     this.draw = function(){ // 그리기 함수
	 this.ctx.fillStyle="rgb(255,255,255)";
	 this.ctx.fillRect(0,0, width, height); // 흰색으로채워서 지우기
	 this.ctx.strokeStyle="rgb(255,0,221)";
	 this.ctx.strokeRect(0, 0, width, height); // 테두리를 분홍으로 쳐주기
//	 this.ctx.strokeStyle="rgb(40,130,114)"; //선색 지정
 	 this.ctx.strokeStyle="rgb("+R+","+G+","+B+")"; //선색 지정
     for( var i=0; i< this.code.length; i++)
	 {
       
		c= this.code.charAt(i);

		switch(c){
		
			case 'F':
			case 'G':
			case 'H':
					this.ctx.beginPath();
	             	this.ctx.moveTo(this.x, this.y);  //이동
 					this.x += Math.sin(degToRad(this.direction))*this.line_length;
					this.y += Math.cos(degToRad(this.direction))*this.line_length;
					this.ctx.lineTo(this.x , this.y); // 그리기
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

  function handleButtonClick(){ // Run 버튼을 클릭하였을 때 실행하는 함수

  canvas = document.getElementById("canvas");  // canvas
  ctx = canvas.getContext("2d");
  var lsys = new lSystem(ctx);
  lsys.parseTheRule();
  lsys.calc();
  lsys.draw();

  }

 function angleButtonClick(){ // 각도쪽을 변경했을 때는 계산과 그림만 다시함.
  canvas = document.getElementById("canvas");  // canvas
  ctx = canvas.getContext("2d");
  var lsys = new lSystem(ctx);
  lsys.code = document.getElementById("outcome").value
  lsys.calc();
  lsys.draw();
 }
 
 function resetButtonClick(){//리셋버튼 클릭시 초기값으로 리셋함.
  document.getElementById("axiomTextInput").value ="F"  // 초기값 설정
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

  function init(){ // 페이지 로드시 부를 함수

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

  
  document.getElementById("axiomTextInput").value ="F"  // 초기값 설정
  document.getElementById("ruleTextInput").value ="F=G[+F][-F]GF/ G=GG"
  document.getElementById("startAngleInput").value ="90"
  document.getElementById("angleTextInput").value = "45"
  document.getElementById("genTextInput").value ="4" 

  document.getElementById("RedTextInput").value ="102"
  document.getElementById("GreenTextInput").value ="51"
  document.getElementById("BlueTextInput").value ="0"
  handleButtonClick();

  }