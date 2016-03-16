#pragma strict

//Espaço de folga
var clearance:float;

function OnTriggerEnter2D(col : Collider2D) {

	//Se o jogador sair por um lado faz com que apareça no outro lado
	if(col.tag == "Player"){
		col.transform.position.x = col.transform.position.x*(-1) + (col.transform.position.x > 0 ? clearance : (-1)*clearance);
	}
}