#pragma strict

function Start () {

}

function Update () {
	if(Input.GetKeyUp(KeyCode.Escape)){
		QuitGame();
	}
}

function StartGame() {
	Application.LoadLevel("Main");
}

function QuitGame() {
	Application.Quit();
}