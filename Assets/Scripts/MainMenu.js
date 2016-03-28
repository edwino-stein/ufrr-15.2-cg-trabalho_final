#pragma strict

function Start () {

}

function Update () {
	if(Input.GetKeyUp(KeyCode.Escape)){
		QuitGame();
	}
}

function StartGame() {
	this.loadMainScene();
}

function loadMainScene(){
	//faz o fadeout
	var fadetime:float = GameObject.Find("MenuControl").GetComponent.<Fading>().beginFade(1);
	yield WaitForSeconds(fadetime);
	
	Application.LoadLevel("Main");
}

function QuitGame() {
	Application.Quit();
}