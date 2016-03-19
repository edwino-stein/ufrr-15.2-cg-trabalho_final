#pragma strict

function OnTriggerExit2D(col : Collider2D) {
	//Destroi a plataforma quando ela colide com a máquina
	if(col.tag == 'Saw'){
		GameObject.Destroy(gameObject);
	}
}