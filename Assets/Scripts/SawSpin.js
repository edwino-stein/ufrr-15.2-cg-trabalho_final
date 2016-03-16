#pragma strict

//Velocidade de rotaçao
var spinVelocity:float;

function Update () {
	//Gira a serra
	this.transform.Rotate(0, 0, Time.deltaTime*spinVelocity);
}