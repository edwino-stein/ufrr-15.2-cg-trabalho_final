#pragma strict

public var button: UI.Button;
public var play: Sprite;
public var pause: Sprite;
public var pauseMask: GameObject;

private var btnimage: UI.Image;
private var isPaused : boolean = false;

function Start () {
	btnimage = button.image;
}

function Update () {
	//Detecta pause
	if(Input.GetKeyUp(KeyCode.Escape)) {
		togglePause();
	}
}
	
function pauseGame(){
	isPaused = true;
	Time.timeScale = 0;
	btnimage.sprite = play;
	pauseMask.SetActive(true);
}

function unpauseGame(){
	isPaused = false;
	Time.timeScale = 1;
	btnimage.sprite = pause;
	pauseMask.SetActive(false);
}

function togglePause(){
	if(isPaused)
		unpauseGame();
	else
		pauseGame();
}