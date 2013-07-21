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
	 var intervalo = window.setInterval(frameLoop,1000/55);
	}
}
function drawBackground(){
	ctx.drawImage(fondo,20,40);
}

function simular(){
	for(var i in disparos){
		var disparo = disparos[i];
		disparo.x +=1;
		disparo.y -=1;
	}
	disparos = disparos.filter(function(disparo){
		return disparo.x < 940;
	});
	
		disparos = disparos.filter(function(disparo){
		return disparo.y > 40;
	});
}

function tiro(){
	for(var i=0;i<5;i++){
	disparos.push({
	x:nave.x + 100*i,
	y:nave.y -10,
	width: 50,
	height: 50
	});
	
}}
function dibujarDisparos(){
	ctx.save();
	ctx.fillStyle = 'black';
	for (var i in disparos){
		var disparo = disparos[i];
		ctx.fillRect(disparo.x,disparo.y,disparo.width,disparo.height);
	}
	ctx.restore();
}
function agregarEventosTeclado(){

	 agregarEvento(document,'keydown',function(e){
	 teclado[e.keyCode]=true;
	 });
	 
	 agregarEvento(document,'keyup',function(e){
	 teclado[e.keyCode]=false;
	 });
 
	function agregarEvento(elemento,nombreEvento,funcion){
	if(elemento.addEventListener){
	//todos menos explorer
	elemento.addEventListener(nombreEvento,funcion,false);
	}
	else if(elemento.attachEvent){
	//Internet explorer
	elemento.attachEvent(nombreEvento,funcion);
	}
	}
}
function moverNave(){
if(teclado[38]){
nave.y -= 6;
if(nave.y <80) nave.y = 60;
}

if(teclado[32]){
var limite=420;
nave.y += 10;
if(nave.y > limite) nave.y=limite;
}
if (teclado[32]){
if (!teclado.tiro){
tiro();
teclado.tiro=true;
}
}
else teclado.tiro = false;
}

//function actualizaEnemigos(){

//function moverDisparosEnemigos(){


//function dibujarDisparosEnemigos(){

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