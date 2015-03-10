#pragma strict

private var seconds: int = 0;
public var deathTime : int = 2;

function Start () {

}

function Update () {

}

function OnTriggerEnter(hit : Collider) {	
	if (hit.tag == "lightbeam"){
		//count to X seconds
		//if object leaves trigger{
			//reset seconds
		//}
		//Destroy(gameObject);
		InvokeRepeating("EnemyHit", 1, 1); 
	}
}

function OnTriggerExit(hit : Collider) {	
	if (hit.tag == "lightbeam"){
		CancelInvoke("EnemyHit");
		seconds = 0;
	}
}

function EnemyHit () {
	seconds += 1;
	Debug.Log(seconds);
	if (seconds >= deathTime) {
		Destroy(gameObject);
	}
}