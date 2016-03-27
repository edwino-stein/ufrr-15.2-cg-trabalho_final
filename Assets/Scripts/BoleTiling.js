#pragma strict

//Prefab do tronco
var sprite:Transform;

//Altura do sprite
private var spriteHeight:float;

//Posiçao do proximo tronco
private var top: float;

//Altura da camera
private var cameraHeight:float;

function Start () {
	this.cameraHeight = (Camera.main.orthographicSize * 2) + 1;
	this.spriteHeight = this.sprite.GetComponent.<SpriteRenderer>().sprite.bounds.size.y;
	this.top = this.sprite.position.y + this.spriteHeight;
}

function Update () {
	
	//Cria um novo tronco
	if(Camera.main.transform.position.y + this.cameraHeight >= this.top){
		
		Instantiate(
			this.sprite,
			new Vector3(
				this.sprite.position.x,
				this.top,
				this.sprite.position.z
			),
			this.sprite.rotation
		);
		
		this.top += this.spriteHeight;
	}
}