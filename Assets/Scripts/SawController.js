#pragma strict

//Velocidade de rotaçao
var spinVelocity:float;

function Update () {
	//Gira a serra
	this.transform.Rotate(0, 0, Time.deltaTime*spinVelocity);
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