#pragma strict

private var isInArea : boolean = false;
public var enemy : GameObject;
public var spawnRate: float = 5 ;
function OnTriggerEnter(object : Collider){
	if(object.tag == "Player"){
		Debug.Log('Currently in area');
		isInArea = true;
		InvokeRepeating("spawnEnemy", 3, spawnRate);
	}
}
function OnTriggerExit(object : Collider){
	if(object.tag == "Player"){
		Debug.Log('Left Area');
		CancelInvoke('spawnEnemy');
		isInArea = false;
	}
}
function spawnEnemy(){
	Debug.Log('Spawn Baddie!');

}