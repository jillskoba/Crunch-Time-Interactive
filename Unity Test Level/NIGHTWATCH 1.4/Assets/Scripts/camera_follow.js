#pragma strict

private var target : GameObject;
public var cameraX : int = 2;
public var cameraY : int = 1;
public var cameraZ : int = -10;

function Start () {
	target = GameObject.Find("Player");
}

function Update () {
	transform.position.x = target.transform.position.x+cameraX;
	transform.position.y = target.transform.position.y+cameraY;
	transform.position.z = target.transform.position.z+cameraZ;
}