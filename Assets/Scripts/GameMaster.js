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

private final var PREF_SCORE: String = "HiScore";

//Score atual
private var score: int;

//Score recorde
private var hiScore:int;

//Indice de dificuldade atual
private var dificult: int = 0;

//Alta maxima alcançada pelo jogador
private var playerMaxHeight: float;

//Flag que indica quando as serras estaram proximas ao jogador
private var sawsNearToPlayer: boolean;

private var isPaused: boolean;

function Start(){
	playerMaxHeight = 0;
	sawsNearToPlayer = false;
	Screen.sleepTimeout = SleepTimeout.NeverSleep;
	getHiScore();
}

function Update () {
	//Detecta pause
	if(Input.GetKeyUp(KeyCode.Escape)) {
		isPaused = !isPaused;
		if(isPaused)
			Time.timeScale = 0;
		else
			Time.timeScale = 1;
	}
	
	//Atualiza o score sempre que jogador conseguir ultrapassar sua ultima altura maxima
	if(player.position.y > playerMaxHeight){
		playerMaxHeight = player.position.y;
		score = playerMaxHeight * scoreMult;
		if(score > hiScore)
			setHiScore(score);
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
	var scoreStyle: GUIStyle = GUIStyle(GUI.skin.label);
	scoreStyle.fontSize = 0.025 * Screen.height;
	scoreStyle.alignment = TextAnchor.MiddleCenter;

	GUI.Label(new Rect(0, 0, Screen.width, 0.05 * Screen.height), "" + this.score, scoreStyle);
	
	var hiStyle: GUIStyle = GUIStyle(GUI.skin.label);
	hiStyle.fontSize = 0.020 * Screen.height;
	hiStyle.alignment = TextAnchor.MiddleLeft;
	GUI.Label(new Rect(0.05 * Screen.width, 0, Screen.width, 0.05 * Screen.height), "Recorde: " + this.hiScore, hiStyle);
}

function getHiScore(){
	if (!PlayerPrefs.HasKey(this.PREF_SCORE))
		setHiScore(0);
	this.hiScore = PlayerPrefs.GetInt(this.PREF_SCORE, 0);
}

function setHiScore(score: int){
	this.hiScore = score;
	PlayerPrefs.SetInt(this.PREF_SCORE, score);
	PlayerPrefs.Save();
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
	
	//Espera 1 segundo e faz um fadeout
	yield WaitForSeconds(1);
	GameObject.Find("GM").GetComponent.<Fading>().beginFade(1);
	
	//(Temporario)Espera 2 segundos e reinicia a cena
	yield WaitForSeconds(2);
	Application.LoadLevel(Application.loadedLevel);
}