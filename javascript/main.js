// JavaScript source code

var canvas = document.getElementById('juegoAtari');
var ctx = canvas.getContext('2d');
var fondo;
var teclado={};
var disparosEnemigos=[];
var disparos = [];
var enemigos = [];
var nave = {x:25,y:550,width:1,height:1};
var juego = { estado : 'iniciando'};

function loadMedia(){
	fondo = new Image();
	fondo.src='fondos/aa.jpg';
	fondo.onload = function(){
	 var intervalo = window.setInterval(frameLoop,1000/55);}
	 
	IM = new Image();
	IM.src='fondos/IM.jpg';
	IM.onload = function(){
	 var intervalo = window.setInterval(frameLoop,1000/55);}
	 
	DM= new Image();
	DM.src='fondos/DM.jpg';
	DM.onload = function(){
	 var intervalo = window.setInterval(frameLoop,1000/55);}

	REG= new Image();
	REG.src='fondos/REG.jpg';
	REG.onload = function(){
	 var intervalo = window.setInterval(frameLoop,1000/55);}
	 
	ALU = new Image();
	ALU.src='fondos/ALU.jpg';
	ALU.onload = function(){
	 var intervalo = window.setInterval(frameLoop,1000/55);}

}

function drawBackground() {
    ctx.drawImage(fondo,20,40);
}

function simular(){
	for(var i in disparos){
		var disparo = disparos[i];
		disparo.x +=0.3;
		disparo.y -=0.3;
	}
	disparos = disparos.filter(function(disparo){
		return disparo.x < 940;
	});
    disparos = disparos.filter(function (disparo) {
        return disparo.y > 70;
	});
}

function tiro(){
	disparos.push({
	x:nave.x +10,
	y:nave.y -15,
	width: 50,
	height: 50
	});	
}

function dibujarDisparos() {
    ctx.save();
    for (var i in disparos) {
        var disparo = disparos[i];
        ctx.drawImage(IM,disparo.x,disparo.y-30);
		ctx.drawImage(REG,disparo.x+70,disparo.y-30);
		ctx.drawImage(ALU,disparo.x+140,disparo.y-30);
		ctx.drawImage(DM,disparo.x+210,disparo.y-30);
		ctx.drawImage(REG,disparo.x+280,disparo.y-30);			
	}
	ctx.restore();
}

function agregarEventosTeclado() {
	 agregarEvento(document,'keydown',function(e){
	 teclado[e.keyCode]=true;
	 });
	 agregarEvento(document,'keyup',function(e){
	 teclado[e.keyCode]=false;
	 });
	 function agregarEvento(elemento, nombreEvento, funcion) {
	     if (elemento.addEventListener) {
	         //todos menos explorer
             elemento.addEventListener(nombreEvento,funcion,false);
	}
	else if(elemento.attachEvent){
	//Internet explorer
	elemento.attachEvent(nombreEvento,funcion);
	}
	}
}

function moverNave() {
    if (teclado[38]) {
        nave.y -= 6;
        if (nave.y < 80)
            nave.y = 60;
    }
    if (teclado[32]) {
        var limite = 420;
        nave.y += 10;
        if (nave.y > limite)
            nave.y = limite;
    }
    if (teclado[32]) {
        if (!teclado.tiro) {
            tiro();
            teclado.tiro = true;
        }
    }
    else
        teclado.tiro = false;
}

function dibujarNave(){
	ctx.save();
	ctx.fillStyle ='black';
	ctx.fillRect(nave.x, nave.y, nave.width, nave.height);
	ctx.restore();
}

function frameLoop(){
	moverNave();
	simular();
	drawBackground();
	dibujarDisparos();
	dibujarNave();
}

agregarEventosTeclado();

loadMedia();