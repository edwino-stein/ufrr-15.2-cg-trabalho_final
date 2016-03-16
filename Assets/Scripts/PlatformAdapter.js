#pragma strict

/**
 *	Classe de definiçao e configuraçao das plataformas
 */
public class PlatformAdapter {

	//Prefab da plataforma
    public var transform : Transform;
    
    //Tamanho em colunas da plataforma
    public var size: int;
    
    //Quantidade de colunas do centro para a esquerda
    public var min: int;
    
    //Quantidade de colunas do centro para a direita
    public var max: int;
    
    //Valor de correçao do pivo do transform da plataforma
    public var relativePivot:float;
    
    //Calcula posiçao X de a cordo com o pivo relativo
    public function getPivotX(x:float){
    	return x + relativePivot;
    }
}