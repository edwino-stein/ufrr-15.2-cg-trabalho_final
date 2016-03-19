﻿#pragma strict

//Numero de colunas que a tela sera dividida
private var cols: int = 14;

//Comprimento e altura das colunas
private var colsWidth: float;
private var colsHeight: float;

//Contador de linhas sem plataforma criada
private var linesWithoutPlatform:int = 0;

//Indice de dificuldade atual
private var dificult:int = 0;

//Dimensoes da tela
private var view: Vector3;

//Altura atual
private var height: float;

//Definiça das 
var platform3: PlatformAdapter;
var platform2: PlatformAdapter;
var platform1: PlatformAdapter;
var branch0: GameObject;
var branch1: GameObject;
var branch2: GameObject;

//Folga de criaçao de plataformas
var heightClearance: float;

//Numero maximo de linhas sem nenhuma plataforma criada
var maxLinesWithoutPlatform:int;

function Start(){
	
	//Calcula as dimensoes da tela e das colunas
 	view = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, Screen.height, 0f));
	colsWidth = view.x/(cols/2);
	colsHeight = colsWidth;
	
	//Calcula a altura atual e converte a folga para coordenadas do espaço
	height = view.y;
	heightClearance = colsHeight*heightClearance;
	
	//Cria as primeiras plataformas
	for(height = 0; height < view.y + heightClearance; height += colsHeight){
		createPlatformLineLvl0(height);
	}
}

function Update () {
	
	//Cria uma nova linha de plataformas
	if(height <= (Camera.main.transform.position.y + view.y/2 + heightClearance)){
		createPlatforms();
	}
}


function createPlatforms(){
	
	//De acordo com a dificuldade, cria as linhas de plataformas
	switch(this.dificult){
	
		case 0:
		case 1:
		
			if(createPlatformLineLvl1(height) <= 0) linesWithoutPlatform++;
			else linesWithoutPlatform = 0;
			
			//Caso estrapole a altura maxima sem plataformas, cria uma aleatoriamente
			if(linesWithoutPlatform >= maxLinesWithoutPlatform)
				createOnePlatform(height, 0.5, 0.5);
			
			//Atualiza a altura da proxima linha de plataformas
			height += colsHeight;
			
		break;
		
		case 2:
		
			if(createPlatformLineLvl2(height) <= 0) linesWithoutPlatform++;
			else linesWithoutPlatform = 0;
			
			//Caso estrapole a altura maxima sem plataformas, cria uma aleatoriamente
			if(linesWithoutPlatform >= maxLinesWithoutPlatform)
				createOnePlatform(height, 0.3, 0.8);
			
			//Atualiza a altura da proxima linha de plataformas
			height += colsHeight;
		break;
		
		case 3:
		
			if(createPlatformLineLvl3(height) <= 0) linesWithoutPlatform++;
			else linesWithoutPlatform = 0;
			
			//Caso estrapole a altura maxima sem plataformas, cria uma aleatoriamente
			if(linesWithoutPlatform >= maxLinesWithoutPlatform)
				createOnePlatform(height, 0.2, 0.6);
			
			//Atualiza a altura da proxima linha de plataformas
			height += colsHeight;
			
		break;
		
		case 4:
		
			if(createPlatformLineLvl4(height) <= 0) linesWithoutPlatform++;
			else linesWithoutPlatform = 0;
			
			//Caso estrapole a altura maxima sem plataformas, cria uma aleatoriamente
			if(linesWithoutPlatform >= maxLinesWithoutPlatform)
				createOnePlatform(height, 0.1, 0.6);
			
			//Atualiza a altura da proxima linha de plataformas
			height += colsHeight;
			
		break;
		
		case 5:
		
			if(createPlatformLineLvl5(height) <= 0){
				linesWithoutPlatform++;
			}
			else{
				linesWithoutPlatform = 1;
				height += colsHeight;
			}
			
			//Caso estrapole a altura maxima sem plataformas, cria uma aleatoriamente
			if(linesWithoutPlatform >= maxLinesWithoutPlatform)
				createOnePlatform(height, 0, 0.6);
			
			//Atualiza a altura da proxima linha de plataformas
			height += colsHeight;
			
		break;
		
		case 6:
			
			if(linesWithoutPlatform < maxLinesWithoutPlatform - Mathf.Round(Random.Range(0f, 1f))){
				linesWithoutPlatform++;
			}
			else{
				createOnePlatformOnCenter(height, 0, 0.6);
				linesWithoutPlatform = 0;
			}
			
			//Atualiza a altura da proxima linha de plataformas
			height += colsHeight;
			
		break;
		
		case 7:
			
			if(linesWithoutPlatform < maxLinesWithoutPlatform - Mathf.Round(Random.Range(0f, 1f))){
				linesWithoutPlatform++;
			}
			else{
				createOnePlatformOnCenter(height, 0, 0.3);
				linesWithoutPlatform = 0;
			}
			
			//Atualiza a altura da proxima linha de plataformas
			height += colsHeight;
			
		break;
		
		default:
		
			if(linesWithoutPlatform < maxLinesWithoutPlatform){
				linesWithoutPlatform++;
			}
			else{
				createOnePlatformOnCenter(height, 0, 0);
				linesWithoutPlatform = 0;
			}
			
			//Atualiza a altura da proxima linha de plataformas
			height += colsHeight;
			
		break;
	}
	
}

/**
 * Funçao com o mesmo objeto de createOnePlatform, porem com maior possibilidade
 * de criar as plataformas mais ao centro.
 */

function createOnePlatformOnCenter(y:float, p3:float, p2:float){
	
	var platform: PlatformAdapter = null;
	var position: Vector3;
	var random:float;
	var i:int;
	
	random = Random.Range(0f, 1f);
	if(random < p3) platform = this.platform3;
	else if(random > p3 && random < p2) platform = this.platform2;
	else platform = this.platform1;
	
	if(random <= 0.2f){
		i = Mathf.Round(Random.Range(1f, 4f));
	}
	else if(random > 0.2f && random <= 0.6f){
		i = Mathf.Round(Random.Range(5f, 10f));
	}
	else{
		i = Mathf.Round(Random.Range(11f, cols));
	}
	
	position = new Vector3(platform.getPivotX(getPositionByCol(i)), y, 0f);
	drawBranch(Instantiate(platform.transform, position, platform.transform.rotation));
		
	return 1;
}

/**
 * Cria uma plataforma aleatoriamente na linha Y.
 * p3 e p2 sao a problabilidade de criaçao para as plataformas de tamanho 3 e 2 respectivamente.
 * Em ultimo caso, uma plataforma de tamanho 1 e criada
 */
function createOnePlatform(y:float, p3:float, p2:float){
	
	var platform: PlatformAdapter = null;
	var position: Vector3;
	var random:float;
	
	random = Random.Range(0f, 1f);
	if(random < p3) platform = this.platform3;
	else if(random > p3 && random < p2) platform = this.platform2;
	else platform = this.platform1;
	
	var i:int = Mathf.Round(Random.Range(1f, cols));

	position = new Vector3(platform.getPivotX(getPositionByCol(i)), y, 0f);
	drawBranch(Instantiate(platform.transform, position, platform.transform.rotation));
		
	return 1;
}

/**
 * Cria linhas de plataforma de dificulade 4 na altura Y.
 */
function createPlatformLineLvl5(y: float){
	
	var platform: PlatformAdapter = null;
	var position: Vector3;
	var lastCol: int = 0;
	var count: int = 0;
	
	for(var i:int = 1; i <= cols; i++){
		
		//Escolhe o tamanho da plataforma
		if(platform == null){
			platform = Random.Range(0f, 1f) <= 0.6f ? this.platform2 : this.platform1;
		}
		
		//Requesitos para a criaçao da plataforma
		if(i + platform.max > cols) break; 				//Nao estrapolar o tamanho maximo da tela
		if(i - platform.min - lastCol <= 3) continue;	//Nao ficar grudada ou encima de da ultima plataforma
		if(Random.Range(0f, 1f) >= 0.05f) continue;		//Chance de criaçao da plataforma naquela coluna
		
		//Calcula a posiçao da plataforma na linha e cria um clone de seu prefab
		position = new Vector3(platform.getPivotX(getPositionByCol(i)), y, 0f);
		drawBranch(Instantiate(platform.transform, position, platform.transform.rotation));
		
		//Atualiza a posiçao da ultima plataforma e incrmenta o contador
		lastCol = i + platform.max;
		count++;
		
		//Reseta o sorteio de tamanho de plataformas
		platform = null;
	}
	
	//Retorna o numero de plataformas criadas
	return count;
}

/**
 * Cria linhas de plataforma de dificulade 4 na altura Y.
 */
function createPlatformLineLvl4(y: float){
	
	var platform: PlatformAdapter = null;
	var random:float;
	var position: Vector3;
	var lastCol: int = 0;
	var count: int = 0;
	
	for(var i:int = 1; i <= cols; i++){
		
		//Escolhe o tamanho da plataforma
		if(platform == null){
			random = Random.Range(0f, 1f);
			if(random <= 0.1f) platform = this.platform3;
			else if(random > 0.1f && random <= 0.4f) platform = this.platform1;
			else platform = this.platform2;		
		}
		
		//Requesitos para a criaçao da plataforma
		if(i + platform.max > cols) break; 				//Nao estrapolar o tamanho maximo da tela
		if(i - platform.min - lastCol <= 3) continue;	//Nao ficar grudada ou encima de da ultima plataforma
		if(Random.Range(0f, 1f) >= 0.06f) continue;		//Chance de criaçao da plataforma naquela coluna
		
		//Calcula a posiçao da plataforma na linha e cria um clone de seu prefab
		position = new Vector3(platform.getPivotX(getPositionByCol(i)), y, 0f);
		drawBranch(Instantiate(platform.transform, position, platform.transform.rotation));
		
		//Atualiza a posiçao da ultima plataforma e incrmenta o contador
		lastCol = i + platform.max;
		count++;
		
		//Reseta o sorteio de tamanho de plataformas
		platform = null;
	}
	
	//Retorna o numero de plataformas criadas
	return count;
}

/**
 * Cria linhas de plataforma de dificulade 3 na altura Y.
 */
function createPlatformLineLvl3(y: float){
	
	var platform: PlatformAdapter = null;
	var random:float;
	var position: Vector3;
	var lastCol: int = 0;
	var count: int = 0;
	
	for(var i:int = 1; i <= cols; i++){
		
		//Escolhe o tamanho da plataforma
		if(platform == null){
			random = Random.Range(0f, 1f);
			if(random <= 0.1f) platform = this.platform3;
			else if(random > 0.1f && random <= 0.2f) platform = this.platform1;
			else platform = this.platform2;		
		}
		
		//Requesitos para a criaçao da plataforma
		if(i + platform.max > cols) break; 				//Nao estrapolar o tamanho maximo da tela
		if(i - platform.min - lastCol <= 2) continue;	//Nao ficar grudada ou encima de da ultima plataforma
		if(Random.Range(0f, 1f) >= 0.08f) continue;		//Chance de criaçao da plataforma naquela coluna
		
		//Calcula a posiçao da plataforma na linha e cria um clone de seu prefab
		position = new Vector3(platform.getPivotX(getPositionByCol(i)), y, 0f);
		drawBranch(Instantiate(platform.transform, position, platform.transform.rotation)); 
		
		//Atualiza a posiçao da ultima plataforma e incrmenta o contador
		lastCol = i + platform.max;
		count++;
		
		//Reseta o sorteio de tamanho de plataformas
		platform = null;
	}
	
	//Retorna o numero de plataformas criadas
	return count;
}


/**
 * Cria linhas de plataforma de dificulade 2 na altura Y.
 */
function createPlatformLineLvl2(y: float){
	
	var platform: PlatformAdapter = null;
	var position: Vector3;
	var lastCol: int = 0;
	var count: int = 0;
	
	for(var i:int = 1; i <= cols; i++){
		
		//Escolhe o tamanho da plataforma
		if(platform == null){
			platform = Random.Range(0f, 1f) <= 0.3f ? this.platform3 : this.platform2;			
		}
		
		//Requesitos para a criaçao da plataforma
		if(i + platform.max > cols) break;				//Nao estrapolar o tamanho maximo da tela
		if(i - platform.min - lastCol <= 1) continue;	//Nao ficar grudada ou encima de da ultima plataforma
		if(Random.Range(0f, 1f) >= 0.1f) continue;		//Chance de criaçao da plataforma naquela coluna
		
		//Calcula a posiçao da plataforma na linha e cria um clone de seu prefab
		position = new Vector3(platform.getPivotX(getPositionByCol(i)), y, 0f);
		drawBranch(Instantiate(platform.transform, position, platform.transform.rotation));
		
		//Atualiza a posiçao da ultima plataforma e incrmenta o contador
		lastCol = i + platform.max;
		count++;
		
		//Reseta o sorteio de tamanho de plataformas
		platform = null;
	}
	
	//Retorna o numero de plataformas criadas
	return count;
}

/**
 * Cria linhas de plataforma de dificulade 1 na altura Y.
 */
function createPlatformLineLvl1(y: float){
	
	var platform: PlatformAdapter = null;
	var position: Vector3;
	var lastCol: int = 0;
	var count: int = 0;
	
	for(var i:int = 1; i <= cols; i++){
		
		//Escolhe o tamanho da plataforma
		if(platform == null){
			platform = Random.Range(0f, 1f) <= 0.5f ? this.platform3 : this.platform2;			
		}
		
		//Requesitos para a criaçao da plataforma
		if(i + platform.max > cols) break;				//Nao estrapolar o tamanho maximo da tela
		if(i - platform.min - lastCol <= 1) continue;	//Nao ficar grudada ou encima de da ultima plataforma
		if(Random.Range(0f, 1f) >= 0.2f) continue;		//Chance de criaçao da plataforma naquela coluna
		
		//Calcula a posiçao da plataforma na linha e cria um clone de seu prefab
		position = new Vector3(platform.getPivotX(getPositionByCol(i)), y, 0f);
		drawBranch(Instantiate(platform.transform, position, platform.transform.rotation));
        
		//Atualiza a posiçao da ultima plataforma e incrmenta o contador
		lastCol = i + platform.max;
		count++;
		
		//Reseta o sorteio de tamanho de plataformas
		platform = null;
	}
	
	//Retorna o numero de plataformas criadas
	return count;
}


/**
 * Cria linhas de plataforma de dificulade 0 na altura Y.
 */
function createPlatformLineLvl0(y: float){
	
	//Define a altura da area segura do jogador
	var playerSafeZone:boolean = y >= 3.5 && y <= 5.8;
	
	var platform: PlatformAdapter;
	var position: Vector3;
	var lastCol: int = 0;
	var count: int = 0;
	
	//Define a plataforma de tamanho 3
	platform = this.platform3;
	
	for(var i:int = 1; i <= cols; i++){
		
		//Não cria nenhuma plataforma na area segura do jogador
		if(playerSafeZone && i + platform.max >= 5 && i <= 10){
			lastCol = 10;
	 		continue;
		}
		
		//Requesitos para a criaçao da plataforma
		if(i + platform.max > cols) break;				//Nao estrapolar o tamanho maximo da tela
		if(i - platform.min - lastCol <= 1) continue;	//Nao ficar grudada ou encima de da ultima plataforma
		if(Random.Range(0f, 1f) >= 0.25f) continue;		//Chance de criaçao da plataforma naquela coluna
		
		//Atualiza a posiçao da ultima plataforma e incrmenta o contador
		position = new Vector3(platform.getPivotX(getPositionByCol(i)), y, 0f);
		drawBranch(Instantiate(platform.transform, position, platform.transform.rotation));
		
		//Atualiza a posiçao da ultima plataforma e incrmenta o contador
		lastCol = i + platform.max;
		count++;
	}
	
	//Retorna o numero de plataformas criadas
	return count;
}

function drawBranch(platform: Transform){
	if (platform.position.x > -0.8f && platform.position.x < 0.8f)
		return;

	var b1Width: float;
	var j: float;
	
	var z: float = this.branch0.transform.position.z;
	
	var position: Vector3 = platform.position;
	var y: float = position.y - 0.3f;
    var lastBranch: GameObject = Instantiate(this.branch2, new Vector3(position.x, y, z), platform.rotation);
    
    var width: float = lastBranch.GetComponent(Renderer).bounds.extents.x;
    var x: float = lastBranch.transform.position.x;
    
	if (platform.position.x >= 0.8f) {
	    b1Width = this.branch1.GetComponent(Renderer).bounds.extents.x;

	    for(j = x - width - b1Width; j >= 0.8f; j = j - b1Width*2) {
	        lastBranch = Instantiate(this.branch1, new Vector3(j, y, z), platform.rotation);
	    }
	    width = this.branch0.GetComponent(Renderer).bounds.extents.x;
	    x = lastBranch.transform.position.x - lastBranch.GetComponent(Renderer).bounds.extents.x - width;
	    Instantiate(this.branch0, new Vector3(x, y, z), platform.rotation);
	}

	else if (platform.position.x <= -0.8f) {
		// Inverte o primeiro branch
		var scale: Vector3 = lastBranch.transform.localScale;
	    lastBranch.transform.localScale = Vector3(-scale.x, scale.y, scale.z);
	    	    
	    b1Width = this.branch1.GetComponent(Renderer).bounds.extents.x;

	    for(j = x + width + b1Width; j <= -0.8f; j = j + b1Width*2) {
	        lastBranch = Instantiate(this.branch1, new Vector3(j, y, z), platform.rotation);
	        // Inverte os galhos do meio
			scale = lastBranch.transform.localScale;
		    lastBranch.transform.localScale = Vector3(-scale.x, scale.y, scale.z);
	    }
	    
	    width = this.branch0.GetComponent(Renderer).bounds.extents.x;
	    x = lastBranch.transform.position.x + lastBranch.GetComponent(Renderer).bounds.extents.x + width;
	    lastBranch = Instantiate(this.branch0, new Vector3(x, y, z), platform.rotation);
	    // Inverte a raiz do galho
		scale = lastBranch.transform.localScale;
	    lastBranch.transform.localScale = Vector3(-scale.x, scale.y, scale.z);
	}
}

/**
 * Calcula a posiçao X da coluna
 */
function getPositionByCol(col:int){
	col = col - (cols/2);	
	return colsWidth*col - colsWidth/2;
}

/**
 * Handle de atualizaçao da dificuldade
 */
function setDificult(dificult:int){
	this.dificult = dificult;
}
