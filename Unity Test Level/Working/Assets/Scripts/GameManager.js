#pragma strict

private var target : GameObject;
private var player : GameObject;
private var playerString : String = "Player";

function Start() {
	target = GameObject.Find("PlayerSpawn");
	player = GameObject.Find("Player");
	var character : GameObject = Instantiate(Resources.Load("Player")) as GameObject;
	character.transform.parent = target.transform;
	character.transform.localPosition = new Vector3(0,0,0);
}
	