var ocode,lcode,lcnt;
var i,j,k;
var cletter = [];	//치환문자 저장
var fcode = [];		//최종 파싱한 코드
var crule = [], ccnt = 0;	//치환문자의 명령어, 치환문자의 개수

function gobuttonClick(){
	ocode = document.getElementById("income").value;
	lcode = ocode.split("\n");
	lcnt = lcode.length;
	document.write(lcode+"<br>");
	document.write(lcnt+"<br>");
	parsing();
}

function parsing(){
	var rcode = [];
	for(i=0;i<1000;i++) rcode[i] = [];
	var zcnt=0;
	for(i=0;i<lcnt;i++){
		zcnt=0;
		document.write(i+"<br>");
		document.write(lcode[i].indexOf("=")+"<br>");
		if((lcode[i].indexOf("="))>=0){		//치환 문자열 판별
			var lhcode = lcode[i].replace(/\s/g,"");	//각 문자열을 정규표현식으로 변환(공백제거)
			//document.write(lhcode + "<br>");
			var chcode = lhcode.split("=");		// =를 기준으로 치환문자와 그 치환문자의 명령어를 구분
			cletter[ccnt] = chcode[0];
			crule[ccnt] = chcode[1];
			document.write(cletter+"<br>");
			document.write(crule+"<br>");
			document.write(crule[ccnt].length+"<br>");
			for(j=0;j<crule[ccnt].length;j++){
				if(crule[ccnt][j]=='s' || crule[ccnt][j]=='b' || crule[ccnt][j]=='u' || crule[ccnt][j]=='d' || crule[ccnt][j]=='L' || crule[ccnt][j]=='R'){
					//document.write(zcnt +"<br>");
					//rcode[ccnt][zcnt]=1;
//					document.write(rcode);
					rcode[ccnt][zcnt] = crule[ccnt][j];
					//document.write(rcode[ccnt][zcnt]);
					zcnt++;
				}
		//		document.write(rcode+"<br>");
			}
			//document.write(cletter+"	" + crule+"<br>");
			ccnt++;
		}
		
		else{
			var dcodelength = lcode[i].length;
			document.write(lcode[i][2]+"<br>");
			var dn = 0,mcode = [], mcnt = 0, flag=0;
			//var rcode = [], zcnt = 0;
			if(lcode[i][2]=="_"){		//do 명령문에서 반복을 하는지 판별
				document.write(dcodelength+"<br>");
				mcnt = 0;
				for(j=3;j<dcodelength;j++){		//반복수 dn에 저장
					document.write(j+"	"+lcode[i][j]+"<br>");
					if(lcode[i][j]==" " || flag==1){
						if(flag==0){
				
				flag=1;
							continue;
						}
						if(lcode[i][j]!=" "){
							mcode[mcnt] = lcode[i][j];
							mcnt++;
							/*if(lcode[i][j]=='s' || lcode[i][j]=='b' || lcode[i][j]=='u' || lcode[i][j]=='d' || lcode[i][j]=='L' || lcode[i][j]=='R'){
								rcode[zcnt] = lcode[i][j];
								zcnt++;
							}*/
						}
						document.write(mcode+"<br>");
					}
					else{
						dn = dn*10 + parseInt(lcode[i][j]);
					}
				}

				document.write(dn+"<br>");
				//document.write(mcode+"<br>");
				for(j=dn;j>0;j--){
					
					
					document.write(mcode+"<br>");
					for(k=0;k<ccnt;k++){
						document.write(cletter[k]+"	"+mcode.indexOf(cletter[k])+"	"+j+"<br>");
						if(mcode.indexOf(cletter[k])>=0){
							if(j==1){
								var mmcode = mcode.replace(new RegExp(cletter[k],'g'),rcode[k]);
								mcode = [];
								mcode = mmcode;

							}
							else{
								document.write(new RegExp(cletter[k],'g')+"	"+mcode+"<br>");
								var imsi = cletter[k];
								var imsi2 = crule[k];
								//document.write(imsi2);
								var mmcode = [];
								//mmcode[0]=1;
								//document.write(mmcode[0]);
								//var dfdfd=mcode;
								//mmcode = dfdfd.replace(/X/g,"");
								mmcode = mcode.replace(new RegExp(cletter[k],'g'),crule[k]);
								//document.write(mmcode);
								var df = [];
								df='X';
								var df2 = []; df2='sX';
								
								var dfdf = df.replace(/X/g,df2);
								document.write(dfdf);
								
								mcode = [];
								mcode = mmcode;
							}
							document.write(mcode+"<br>");
							
						}
					}

				}
				
				fcode = fcode + mcode;
				//document.write(fcode+"<br>");
			}
			else{
				mcnt = 0;
				var dnn=0;
				for(j=3;j<dcodelength;j++){
					if(lcode[i][j]!=" "){
						mcode[dnn] = lcode[i][j];
						dnn++;
					}
				}
				document.write(mcode+"<br>");
				var mmcode = [];
				for(j=0;j<ccnt;j++){
					if(mcode.indexOf(cletter[j])>=0){
						mmcode = mcode.replace(new RegExp(cletter[j],'g'),rcode[j]);

						mcode = mmcode;
					}
					mmcode = [];
				}
				document.write(mcode+"<br>");
				
				fcode = fcode + mcode;
				document.write(fcode+"<br>");
			}
		}
	}
	//document.getElementById("output").innerHTML = fcode;
}