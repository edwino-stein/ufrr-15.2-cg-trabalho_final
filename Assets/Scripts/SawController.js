#pragma strict

//Velocidade base
var speedBase:float = 0.01;

//Indice de aceleração
var acceleration:float = 0.5;

//Velocidade maxima quando as serras estiverem proximas do jogador
var maxSpeedNearToPlayer:float = 0.033;

//Velocidade maxima calculada com base na dificuldade
var maxSpeedByDificult:float = 0.05;

//Velocidade atual
private var speed:float;

//Flag que indica quando as serras estaram proximas ao jogador
private var nearToPlayer:boolean = false;

//Indice de dificuldade atual
private var dificult:int;

//Velocidade atual calculada com base na dificuldade
private var speedByDificult:float;


function Start(){
	this.speed = this.speedBase;
}

function Update () {
	
	if(this.nearToPlayer && this.speed >= this.maxSpeedNearToPlayer){
		//Desaceleraça as serras estiverem proximas ao jogador 
		this.speed = this.maxSpeedNearToPlayer;
	}
	else{
		//Define a velocidade calculada com base na dificuldade
		this.speed = this.speedByDificult;
	}

	this.transform.position.y += this.speed;
}


function OnTriggerEnter2D(col : Collider2D) {

	//Detecta quando o jogador toca na serra
	if(col.tag == "Player"){
		//Desativa qualquer colisao do jogador
		col.isTrigger = true;
		
		//Informa ao GameMaster a morte do jogador
		GameObject.Find("GM").SendMessage("playerDied");
	}
}

function OnTriggerExit2D(col : Collider2D){

	//Detecta quando o jogador sai da area de colisao da serra
	if(col.tag == "Player"){
		//Informa a morte ao controlador do jogador
		col.transform.SendMessage("playerDied");
	}
}

/**
 * Handle de atualizaçao da dificuldade
 */
function setDificult(dificult:int){
	this.dificult = dificult;
	
	this.speedByDificult = speedBase + acceleration*((dificult*1.0f)/100);
	
	//Limita a velocidade
	if(this.speedByDificult > this.maxSpeedByDificult){
		this.speedByDificult = this.maxSpeedByDificult;
	}
}

/**
 * Handle de atualizaçao da proximidade com o jogador
 */
function setNearToPlayer(nearToPlayer:boolean){
	this.nearToPlayer = nearToPlayer;
}
