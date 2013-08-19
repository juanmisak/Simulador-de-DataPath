// JavaScript source code

var canvas = document.getElementById('juegoAtari');
var ctx = canvas.getContext('2d');
var fondo;


var disparos = [];
var nave = {x:25,y:550,width:1,height:1};

var R = ["add","sub","mul"];
var I = ["sw","lw"];


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

}

function drawBackground() {
    ctx.drawImage(fondo,20,40);
}

function simular(){
	for(var i in disparos){
		var disparo = disparos[i];
		disparo.x +=0.4;
		disparo.y -=0.5;

	}

	
	disparos = disparos.filter(function(disparo){
		return disparo.x < 900;
	});
    disparos = disparos.filter(function (disparo) {
        return disparo.y > 70;
	});
	
}

function tiro(n){
	for(i=0 ; i<n;  i++){
	disparos.push({
	x:nave.x - i*70,
	y:nave.y -145+70*i,
	width: 50,
	height: 50
	});	
}
}
function dibujarDisparos() {
    ctx.save();
    
    for (var i in disparos) {
        var disparo = disparos[i];
        ctx.drawImage(REG,disparo.x,disparo.y-30);
		ctx.drawImage(DM,disparo.x+70,disparo.y-30);
		ctx.drawImage(ALU,disparo.x+140,disparo.y-30);
		ctx.drawImage(REG,disparo.x+210,disparo.y-30);
		ctx.drawImage(IM,disparo.x+280,disparo.y-30);			
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
	
	
	e = document.getElementById("etapas");
	s = e.options[e.selectedIndex].value;
	if(s==2)
	hazard(n);
	if(s==3)
	nop(n);
	
	
	
for(i=0;i<n;i++){
	bandera = true;
	s=document.getElementById("instruccion"+i);
	for(j=0;j<R.length;j++)	
		if(s.value.toLowerCase() == R[j])
		bandera = false
	if(bandera){
		dialog("¿"+ s.value+"? ¡Esa NO es una instrucción MIPS!  ");
		return null;
	}
	tiro(n);
}
}

function pause() {
	alert("¡Se ha pausado la simulación! Para continuar presione Aceptar");
	
}

function stop() {
	disparos = null;
	alert("¡Se ha parado la simulación!");
	
}

function nop(n) {
	cont =0;
	for(j=0;j<n;j++){
	if(n!=9){
	s=document.getElementById("registroDestino"+j);
	d=document.getElementById("registro"+(j+1)+""+1);
	d2=document.getElementById("registro"+(j+1)+""+2);
	//alert(" "+s.value+" "+ d.value +" " +d2.value);
	if(s.value == d.value || s.value == d2.value)
	cont++;
	
	}}
	alert("Se van a resolver "+cont +" hazard(s)!!!");
	
	
}	
function hazard(n) {
	cont =0;
	for(j=0;j<n;j++){
	if(n!=9){
	s=document.getElementById("registroDestino"+j);
	d=document.getElementById("registro"+(j+1)+""+1);
	d2=document.getElementById("registro"+(j+1)+""+2);
	//alert(" "+s.value+" "+ d.value +" " +d2.value);
	if(s.value == d.value || s.value == d2.value)
	cont++;
	
	}}
	alert("Hay "+cont +" hazard(s)!!!");
}


function frameLoop(){

	simular();
	drawBackground();
	dibujarDisparos();
	
	}

loadMedia();
		