	var incom="do ss";
  
	var i,j,k;
	var dic=1;

	var nx=0.5, ny=0.5, nz=0,flag=0;

	var v = incom.split(" ");
	var dp = new Array();
	for(i=0;i<200;i++) dp[i]=new Array();

	var p = new Array();
	for(i=0;i<1000;i++){
		p[i]=new Array();
		for(j=0;j<1000;j++){
			p[i][j]=new Array();
		}
	}
	var flag=0,cnt=0;
	var str;

	function os(){
		nx+=1;
		if(p[500+nx+0.5][500+ny-0.5][500+nz]!=1){	p[500+nx+0.5][500+ny-0.5][500+nz]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny-0.5;	dp[cnt][3]=nz;	cnt++;}
		if(p[500+nx+0.5][500+ny+0.5][500+nz]!=1){	p[500+nx+0.5][500+ny+0.5][500+nz]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny+0.5;	dp[cnt][3]=nz;	cnt++;}
		if(p[500+nx+0.5][500+ny-0.5][500+nz+1]!=1){	p[500+nx+0.5][500+ny-0.5][500+nz+1]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny-0.5;	dp[cnt][3]=nz+1;	cnt++;}
		if(p[500+nx+0.5][500+ny+0.5][500+nz+1]!=1){	p[500+nx+0.5][500+ny+0.5][500+nz+1]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny+0.5;	dp[cnt][3]=nz+1;	cnt++;}
	}
	
	function ol(){
		ny+=1;
		if(p[500+nx-0.5][500+ny+0.5][500+nz]!=1){	p[500+nx-0.5][500+ny+0.5][500+nz]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx-0.5;	dp[cnt][2]=ny+0.5;	dp[cnt][3]=nz;	cnt++;}
		if(p[500+nx+0.5][500+ny+0.5][500+nz]!=1){	p[500+nx+0.5][500+ny+0.5][500+nz]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny+0.5;	dp[cnt][3]=nz;	cnt++;}
		if(p[500+nx-0.5][500+ny+0.5][500+nz+1]!=1){	p[500+nx-0.5][500+ny+0.5][500+nz+1]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx-0.5;	dp[cnt][2]=ny+0.5;	dp[cnt][3]=nz+1;	cnt++;}
		if(p[500+nx+0.5][500+ny+0.5][500+nz+1]!=1){	p[500+nx+0.5][500+ny+0.5][500+nz+1]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny+0.5;	dp[cnt][3]=nz+1;	cnt++;}
	}

	function or(){
		ny-=1;
		if(p[500+nx-0.5][500+ny-0.5][500+nz]!=1){	p[500+nx-0.5][500+ny-0.5][500+nz]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx-0.5;	dp[cnt][2]=ny-0.5;	dp[cnt][3]=nz;	cnt++;}
		if(p[500+nx+0.5][500+ny-0.5][500+nz]!=1){	p[500+nx+0.5][500+ny-0.5][500+nz]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny-0.5;	dp[cnt][3]=nz;	cnt++;}
		if(p[500+nx-0.5][500+ny-0.5][500+nz+1]!=1){	p[500+nx-0.5][500+ny-0.5][500+nz+1]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx-0.5;	dp[cnt][2]=ny-0.5;	dp[cnt][3]=nz+1;	cnt++;}
		if(p[500+nx+0.5][500+ny-0.5][500+nz+1]!=1){	p[500+nx+0.5][500+ny-0.5][500+nz+1]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny-0.5;	dp[cnt][3]=nz+1;	cnt++;}
	}
	
	function ou(){
		nz+=1;
		if(p[500+nx-0.5][500+ny+0.5][500+nz+1]!=1){	p[500+nx-0.5][500+ny+0.5][500+nz+1]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx-0.5;	dp[cnt][2]=ny+0.5;	dp[cnt][3]=nz+1;	cnt++;}
		if(p[500+nx+0.5][500+ny+0.5][500+nz+1]!=1){	p[500+nx+0.5][500+ny+0.5][500+nz+1]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny+0.5;	dp[cnt][3]=nz+1;	cnt++;}
		if(p[500+nx-0.5][500+ny-0.5][500+nz+1]!=1){	p[500+nx-0.5][500+ny-0.5][500+nz+1]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx-0.5;	dp[cnt][2]=ny-0.5;	dp[cnt][3]=nz+1;	cnt++;}
		if(p[500+nx+0.5][500+ny-0.5][500+nz+1]!=1){	p[500+nx+0.5][500+ny-0.5][500+nz+1]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny-0.5;	dp[cnt][3]=nz+1;	cnt++;}
	}
	
	function od(){
		nz-=1;
		if(p[500+nx-0.5][500+ny+0.5][500+nz]!=1){	p[500+nx-0.5][500+ny+0.5][500+nz]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx-0.5;	dp[cnt][2]=ny+0.5;	dp[cnt][3]=nz;	cnt++;}
		if(p[500+nx+0.5][500+ny+0.5][500+nz]!=1){	p[500+nx+0.5][500+ny+0.5][500+nz]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny+0.5;	dp[cnt][3]=nz;	cnt++;}
		if(p[500+nx-0.5][500+ny-0.5][500+nz]!=1){	p[500+nx-0.5][500+ny-0.5][500+nz]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx-0.5;	dp[cnt][2]=ny-0.5;	dp[cnt][3]=nz;	cnt++;}
		if(p[500+nx+0.5][500+ny-0.5][500+nz]!=1){	p[500+nx+0.5][500+ny-0.5][500+nz]=1;	dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny-0.5;	dp[cnt][3]=nz;	cnt++;}
	}
	
	if(v[0]=="do"){
		for(i=0;i<v[1].length;i++){
			if(flag==0){
				p[500+nx-0.5][500+ny-0.5][500+nz]=1;
				p[500+nx+0.5][500+ny-0.5][500+nz]=1;
				p[500+nx-0.5][500+ny+0.5][500+nz]=1;
				p[500+nx+0.5][500+ny+0.5][500+nz]=1;
				p[500+nx-0.5][500+ny-0.5][500+nz+1]=1;
				p[500+nx+0.5][500+ny-0.5][500+nz+1]=1;
				p[500+nx-0.5][500+ny+0.5][500+nz+1]=1;
				p[500+nx+0.5][500+ny+0.5][500+nz+1]=1;
				
				dp[cnt][0]=cnt+1;	dp[cnt][1]=nx-0.5;	dp[cnt][2]=ny-0.5;	dp[cnt][3]=nz;	cnt++;
				dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny-0.5;	dp[cnt][3]=nz;	cnt++;
				dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny+0.5;	dp[cnt][3]=nz;	cnt++;
				dp[cnt][0]=cnt+1;	dp[cnt][1]=nx-0.5;	dp[cnt][2]=ny+0.5;	dp[cnt][3]=nz;	cnt++;
				dp[cnt][0]=cnt+1;	dp[cnt][1]=nx-0.5;	dp[cnt][2]=ny-0.5;	dp[cnt][3]=nz+1;	cnt++;
				dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny-0.5;	dp[cnt][3]=nz+1;	cnt++;
				dp[cnt][0]=cnt+1;	dp[cnt][1]=nx+0.5;	dp[cnt][2]=ny+0.5;	dp[cnt][3]=nz+1;	cnt++;
				dp[cnt][0]=cnt+1;	dp[cnt][1]=nx-0.5;	dp[cnt][2]=ny+0.5;	dp[cnt][3]=nz+1;	cnt++;
				
	
				flag=1;
			}
			else if(v[1][i]=="s") os();
			else if(v[1][i]=="r") or();
			else if(v[1][i]=="l") ol();
			else if(v[1][i]=="u") ou();
			else if(v[1][i]=="d") od();
		}
	}
	
	
		for(i=0;i<cnt;i++){
			document.write(dp[i][0] + "	" + dp[i][1] + " " + dp[i][2] + " " + dp[i][3] + "<br>");
		}
		document.write(cnt);
	