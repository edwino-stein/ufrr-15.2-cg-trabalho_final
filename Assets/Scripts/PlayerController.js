#pragma strict

//Teclas de controle do personagem
var moveRight: KeyCode;
var moveLeft: KeyCode;

//Velocidade constante do pulo
var jumpVelocity: float;

//Aceleraçao da movimentaçao horizontal
var acceleration: float;

//Velocidade horizontal maxima
var maxVelocity: float;

//Limite de força aplicada ao objeto
var forceLimit: float;

//Força base aplicada ao objeto
var forceBase: float;

//Sprites do jogador
var fallingSprite: Sprite;
var jumpingSprite: Sprite;

//Render de sprites do objeto
private var spriteRenderer: SpriteRenderer;

//RigidBody do objeto
private var rigidBody : Rigidbody2D;

//Velocidade horizontal atual do personagem
private var speed: float;

//Flag que indica se o personagem esta caindo ou nao
private var isFalling: boolean;

function Start(){
	
	//Inicializa as caracteristicas do objeto
	rigidBody = GetComponent.<Rigidbody2D>();
	spriteRenderer = GetComponent.<SpriteRenderer>();
	speed = 0;
	isFalling = true;
	rigidBody.AddForce(new Vector2(0, jumpVelocity));
}

function Update () {
	
	//Verifica se o personagem esta caindo ou subindo
	if(rigidBody.velocity.y <= 0){
		isFalling = true;
		spriteRenderer.sprite = fallingSprite;
	}
	else{
		isFalling = false;
		spriteRenderer.sprite = jumpingSprite;
	}
	
	//Calcula a força que sera utilizada
	var force = forceBase * speed;
	
	//Verifica a interaçao do jogador
	if(Input.GetKey(moveRight)){
	
		//Aplica a força horizontal para a direta
		rigidBody.AddForce(new Vector2(force > forceLimit ? forceLimit : force, 0));
		speed += acceleration;
		
		//Atualiza a direçao do sprite do personagem
		this.transform.localScale.x = Mathf.Abs(this.transform.localScale.x)*(-1);
	}
	else if(Input.GetKey(moveLeft)){
		
		//Aplica a força horizontal para a esquerda
		rigidBody.AddForce(new Vector2((force > forceLimit ? forceLimit : force) * (-1), 0));
		speed += acceleration;
		
		//Atualiza a direçao do sprite do personagem
		this.transform.localScale.x = Mathf.Abs(this.transform.localScale.x);
	}
	else{
		speed = 0;
	}
	
	//Limita a velocidade horizontal do personagem
	if(Mathf.Abs(rigidBody.velocity.x) >= maxVelocity)
		rigidBody.velocity.x = rigidBody.velocity.x > 0 ? maxVelocity : (-1)*maxVelocity;
}

/**
 * Handle que alerta sobre a morte do personagem
 */
function playerDied(){
	Debug.Log("E morreu");
	this.rigidBody.constraints = RigidbodyConstraints2D.FreezePositionY | RigidbodyConstraints2D.FreezePositionX;
}

/**
 * Callback de colisoes do objeto
 */
function OnCollisionEnter2D(col : Collision2D) {
	
	//Verifica se a colisao foi com uma plataforma
	if(col.collider.tag == "Platform"){
		//Verifica se a colisão foi apenas na parte de cima do objeto
		var verticalCollison: boolean = Mathf.Abs(col.contacts[0].normal.y) < 0.02;
		
		//Controla a velocidade do pulo
		if(!verticalCollison && isFalling) rigidBody.velocity.y = jumpVelocity;
	}
}