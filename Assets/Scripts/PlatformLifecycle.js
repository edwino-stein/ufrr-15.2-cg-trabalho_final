#pragma strict

function OnTriggerEnter2D(col : Collider2D) {
	//Destroi a plataforma quando ela colide com uma serra
	if(col.tag == 'Saw'){
		GameObject.Destroy(gameObject);
	}
}