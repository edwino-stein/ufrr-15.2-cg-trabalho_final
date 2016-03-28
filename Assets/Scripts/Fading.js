#pragma strict

var fadeTexture:Texture;
var fadeSpeed:float= 0.8f;

private var drawDepth:int = -1000;
private var alpha:float = 1f;

//-1 para fadeout ou 1 para fadein
private var fadeDir:int = -1;

function OnGUI(){
	
	//Calcula o alpha da textura escura
	this.alpha = Mathf.Clamp01(this.alpha + (this.fadeDir * this.fadeSpeed * Time.deltaTime));
	
	//Redefine o alpha da GUI
	GUI.color = new Color(GUI.color.r, GUI.color.g, GUI.color.b, this.alpha);
	
	//Força ser o elemento mais a frente da GUI
	GUI.depth = this.drawDepth;
	
	//Desenha a textura escura
	GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), this.fadeTexture);
}

function beginFade(direction:int):float{
	this.fadeDir = direction;
	return this.fadeSpeed;
}

//Quando a cena carregar, automaticamente faz um fadeout
function OnLevelWasLoaded(){
	this.beginFade(-1);
}