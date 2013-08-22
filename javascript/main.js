// JavaScript source code

var canvas = document.getElementById('juegoAtari');
var ctx = canvas.getContext('2d');
var fondo;


var Pipes = [];
var PipesNO =[];
var hazards = [];
var inicio = {x:25,y:250,width:1,height:1};

var R = ["add","sub","mul"];
var I = ["sw","lw"];
var T = ["$zero","$v0","$v1","$a0","$a1","$a2","$a3","$t0","$t1","$t2","$t3","$t4","$t5","$t6","$t7","$s0","$s1",
"$s2","$s3","$s4","$s5","$s6","$s7","$t8","$t9","$k0","$k1","$gp","$sp","$fp","$ra"];

function loadMedia(){
	fondo = new Image();
	fondo.src='fondos/aa.jpg';
	fondo.onload = function(){
	 var intervalo = window.setInterval(frameLoop,5000/55);}
	 
	IM = new Image();
	IM.src='fondos/IM.jpg';
	IM.onload = function(){
	 var intervalo = window.setInterval(frameLoop,5000/55);}
	 
	DM= new Image();
	DM.src='fondos/DM.jpg';
	DM.onload = function(){
	 var intervalo = window.setInterval(frameLoop,5000/55);}

	REG= new Image();
	REG.src='fondos/REG.jpg';
	REG.onload = function(){
	 var intervalo = window.setInterval(frameLoop,5000/55);}
	 
	ALU = new Image();
	ALU.src='fondos/ALU.jpg';
	ALU.onload = function(){
	 var intervalo = window.setInterval(frameLoop,5000/55);}
	 
	NO = new Image();
	NO.src='fondos/NO.jpg';
	NO.onload = function(){
	 var intervalo = window.setInterval(frameLoop,5000/55);}

}

function drawBackground() {
    ctx.drawImage(fondo,20,40);
}

function simular(){
	for(var i in Pipes){
		var pipe = Pipes[i];
		pipe.x +=0.4;
		pipe.y +=0.5;
	}
	
	for(var i in PipesNO){
		var pipeno = PipesNO[i];
		pipeno.x +=0.4;
		pipeno.y +=0.5;
	}
	
	for(var j in hazards){
		var hazard = hazards[j];
		hazard.x1 +=0.4;
		hazard.y1 +=0.5;
		hazard.x2 +=0.4;
		hazard.y2 +=0.5;
	}

	
	Pipes = Pipes.filter(function(pipe){
		return pipe.x < 900;
	});
    Pipes = Pipes.filter(function (pipe) {
        return pipe.y < 423;
	});
	
    hazards = hazards.filter(function (hazard) {
    return hazard.y1 <433;
	});
	
	PipesNO = PipesNO.filter(function (pipeno) {
    return pipeno.y <423;
	});
	
}	
	function addHazard(xini,yini,xfin,yfin){
		hazards.push({
		x1:xini,
		y1:yini,
		x2:yfin,
		y2:xfin																						
		});	
}


function lineaDePipe(n){
	for(i=0 ; i<n;  i++){
	Pipes.push({
	x:inicio.x - i*70,
	y:inicio.y -145-70*i,
	width: 50,
	height: 50
	});	
	}}
	
	
function LineaNO(n){
	for(i=1 ; i<=n;  i++){
	Pipes.push({
	x:inicio.x - i*70,
	y:inicio.y -145-70*i,
	width: 50,
	height: 50
	});	
	
	if(i==n)
	{PipesNO.push({
	x:inicio.x - i*70,
	y:inicio.y -145-70*i,
	width: 50,
	height: 50
	});
;}}

}
function dibujarHazards() {	
	ctx.save();
    for (var i in hazards) { 
    	hazard = hazards[i]
	    ctx.strokeStyle = "rgb(200,0,0)";
	    ctx.lineWidth = 12;
	    //Inicio de camino
	    ctx.beginPath();
	    ctx.lineTo(hazard.x1,hazard.y1);
	    ctx.lineTo(hazard.x2,hazard.y2);
	    	    //Trazar linea
	    ctx.stroke();
}
}


function dibujarNO() {
    ctx.save();
    
    for (var i in PipesNO) {
        var pipe = PipesNO[i];
        ctx.drawImage(NO,pipe.x,pipe.y-30);
		ctx.drawImage(NO,pipe.x+70,pipe.y-30);
		ctx.drawImage(NO,pipe.x+140,pipe.y-30);
		ctx.drawImage(NO,pipe.x+210,pipe.y-30);
		ctx.drawImage(NO,pipe.x+280,pipe.y-30);			
	}
	ctx.restore();
}

function dibujarPipes() {
    ctx.save();
    
    for (var i in Pipes) {
        var pipe = Pipes[i];
        ctx.drawImage(REG,pipe.x,pipe.y-30);
		ctx.drawImage(DM,pipe.x+70,pipe.y-30);
		ctx.drawImage(ALU,pipe.x+140,pipe.y-30);
		ctx.drawImage(REG,pipe.x+210,pipe.y-30);
		ctx.drawImage(IM,pipe.x+280,pipe.y-30);			
	}
	ctx.restore();
}


function play() {
	n=0;
	for(i=0;i<10;i++){
	s=document.getElementById("instruccion"+i);	
	if(s.value != "")
	n++;
	if (n==0){
	alert("Aún no has ingresado ninguna instrucción MIPS");
	return null;}
	}
	
	for(i=0;i<n;i++){
	bandera = true;
	s=document.getElementById("instruccion"+i);
	for(j=0;j<R.length;j++)	{
		if(s.value.toLowerCase() == R[j])
		bandera = false;
	if(bandera){
		alert("¿"+ s.value+"? ¡Eso NO es codigo MIPS!  ");
		return null;
	}}
	
		rd=document.getElementById("registroDestino"+i);
		r1=document.getElementById("registro"+i+"1");
		r2=document.getElementById("registro"+i+"2");
	bandera = false;
	for(h=0;h<T.length;h++)	{
		if((rd.value.toLowerCase() == T[h] )&&(r1.value.toLowerCase() == T[h] )&&( r2.value.toLowerCase() == T[h]))
		bandera = true; 
	if(!bandera){
		alert("¿"+ rd.value+", "+r1.value+", "+ r2.value+"? ¡Uno de ellos NO es un registro MIPS!  ");
		return null;
	}}

	lineaDePipe(n);
}
	e = document.getElementById("etapas");
	s = e.options[e.selectedIndex].value;
	if(s==2)
	verHazard(n);
	if(s==3)
	
	nop(n);
}

function pause() {
	alert("¡Se ha pausado la simulación! Para continuar presione Aceptar");
	
}

function stop() {
	Pipes = null;
	alert("¡Se ha capturado la simulación!");
	
}

function nop(n) {
	cont =0;
	for(j=0;j<n;j++){
	if(n!=9){
	s=document.getElementById("registroDestino"+j);
	d=document.getElementById("registro"+(j+1)+""+1);
	d2=document.getElementById("registro"+(j+1)+""+2);
	
	if(s.value == d.value || s.value == d2.value){
	LineaNO(j);
	cont++;}
	
	}}
	alert("Se van a resolver "+cont +" hazard(s)!!!");
	
}	
function verHazard() {

	cont =0;
	for(j=0;j<n;j++){
	if(n!=9){
	s=document.getElementById("registroDestino"+j);
	d=document.getElementById("registro"+(j+1)+""+1);
	d2=document.getElementById("registro"+(j+1)+""+2);
	
	if(s.value == d.value || s.value == d2.value){
		dd=70;
	addHazard(50-j*dd,
			125-j*dd,//x1
			30-j*dd,
			210-j*dd); //x2
	cont++;}
	}}

	alert("Hay "+cont +" hazard(s)!!!");
	
}



function frameLoop(){

	simular();
	drawBackground();
	dibujarPipes();
	dibujarHazards();
	dibujarNO();
	
}

loadMedia();
		