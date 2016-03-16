#pragma strict

var heightClearance: float = 0;

function Update () {
	//Pega a coordenada da parte de baixo da tela
	var screenBottom:float = Camera.main.ScreenToWorldPoint(new Vector3(0, 0, 0)).y;
	
	//Destroi a plataforma se ela sair da tela
	if(transform.position.y + heightClearance <= screenBottom)
		GameObject.DestroyImmediate(gameObject);
}