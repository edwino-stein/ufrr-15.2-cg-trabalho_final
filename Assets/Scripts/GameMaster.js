#pragma strict

//Transform do personagem
var player: Transform;

//Transform das serras
var saws: Transform;

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

//Flag que indica quando as serras estaram proximas ao jogador
private var sawsNearToPlayer: boolean;

function Start(){
	playerMaxHeight = 0;
	sawsNearToPlayer = false;
	Screen.sleepTimeout = SleepTimeout.NeverSleep;
}

function Update () {
	
	//Atualiza o score sempre que jogador conseguir ultrapassar sua ultima altura maxima
	if(player.position.y > playerMaxHeight){
		playerMaxHeight = player.position.y;
		score = playerMaxHeight * scoreMult;
	}
	
	//Atualiza a posiçao da camera em relaçao ao personagem
	if(player.transform.position.y + cameraPosition > Camera.main.transform.position.y)
		Camera.main.transform.position.y = player.transform.position.y + cameraPosition;
	else if(player.transform.position.y - cameraPosition < Camera.main.transform.position.y)
		Camera.main.transform.position.y = player.transform.position.y - cameraPosition;
	
	//Atualiza a dificuldade
	this.updateDificult();
	
	//Detecta se as serras estão proximas ao jogador
	this.detectSawNearPlayer();
}

function OnGUI(){
	//Define a GUI
	GUI.skin = this.GuiSkin;
	GUI.Label(new Rect(Screen.width/2 - 25, 5, 500, 500), "" + this.score);
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
		this.saws.SendMessage("setDificult", dificult);
		this.gameObject.SendMessage("setDificult", dificult);
	}
}

/**
 * Funçao que detecta se as serras estão proximas ou dentro da tela e do jogador
 */
function detectSawNearPlayer(){
	
	//Verifica se as serras estão dentro ou proximas da tela
	var near:boolean = this.saws.position.y >= Camera.main.ScreenToWorldPoint(new Vector3(0, 0, 0)).y - 1;
	
	//Informa o controlador das serras apenas se a flag mudar
	if(this.sawsNearToPlayer != near){
		this.sawsNearToPlayer = near;
		this.saws.SendMessage("setNearToPlayer", near);
	}
}

/**
 * Handle que alerta sobre a morte do personagem
 */
function playerDied(){
	Debug.Log("E morreu 2");
	
	//(Temporario)Espera 3 segundos e reinicia a cena
	yield WaitForSeconds(3);
	Application.LoadLevel(Application.loadedLevel);
}