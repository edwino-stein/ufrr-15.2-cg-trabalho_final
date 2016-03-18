#pragma strict

//Lista de sprites que sofreram o efeito
var backgrounds:Transform[];

//Indicie de ajuste do efeito
var smoothing:float = 1f;

//Lista das posições Z dos sprites que serão utilizadas na base de calculo
private var parallaxScales:float[];

//Ultima posição da camera
private var lastCameraPosition:Vector3;

function Start () {
	
	//Salva a posição inicial da camera
	this.lastCameraPosition = Camera.main.transform.position;
	
	//Guarda as posiçoes Z de cada sprite do background
	this.parallaxScales = new float[this.backgrounds.Length];
	for(var i:int = 0; i < this.backgrounds.Length; i++){
		this.parallaxScales[i] = this.backgrounds[i].position.z * (-1);
	}
	
}

function Update () {
	
	//Calcula a diferença da altura atual e da ultima posição da camera
	var diffCameraPosY:float = Camera.main.transform.position.y - this.lastCameraPosition.y;
	if(diffCameraPosY == 0) return;
	
	var parallax:float;
	var targetPos:Vector3;
	
	for(var i:int = 0; i < this.backgrounds.Length; i++){
	
		//Calcula a variação da posição para o efeito
		parallax = diffCameraPosY/(this.parallaxScales[i] * smoothing);
		
		//Incremente a posição do objeto
		this.backgrounds[i].position.y += parallax;	
	}
	
	//Guarda a posição atual da camera
	this.lastCameraPosition = Camera.main.transform.position;
}