#pragma strict

//Transform do personagem
var player: Transform;

//Posiçao relativa da camera ao personagem
var cameraPosition: float;

//Indice de multiplicaçao do score
var scoreMult: float;

//Tabela de limites de dificuldade
var dificultTable: int[];

//Skin da GUI
var GuiSkin: GUISkin;

//Score atual
private var score: int;

//Indice de dificuldade atual
private var dificult: int = 0;

//Alta maxima alcançada pelo jogador
private var playerMaxHeight: float;

function Start(){
	playerMaxHeight = 0;
}

function Update () {
	
	//Atualiza o score sempre que jogador conseguir ultrapassar sua ultima altura maxima
	if(player.position.y > playerMaxHeight){
		playerMaxHeight = player.position.y;
		score = playerMaxHeight * scoreMult;
	}
	
	//Atualiza a posiçao da camera em relaçao ao personagem
	if(playerMaxHeight + cameraPosition > transform.position.y)
		Camera.main.transform.position.y = playerMaxHeight + cameraPosition;
	
	//Atualiza a dificuldade
	this.updateDificult();
}

function OnGUI(){
	//Define a GUI
	GUI.skin = this.GuiSkin;
	GUI.Label(new Rect(Screen.width/2, 5, 100, 100), "" + this.score);
}

/**
 * Funçao que define a dificuldade com base no score do jogador
 */
function updateDificult(){
	
	//Se o indice atual estrapolar a tabela, apenas mantem a dificuldade atual
	if(dificultTable.Length <= dificult) return;
	
	//Se o score alcançou o limite da dificuldade, define a proxima da tabela
	if(score >= dificultTable[dificult]){
		dificult++;
		Debug.Log("Dificuldade: "+dificult);
		this.gameObject.SendMessage("setDificult", dificult);
	}
}

/**
 * Handle que alerta sobre a morte do personagem
 */
function playerDied(){
	Debug.Log("E morreu 2");
}