#pragma strict

private var moveY : float;
public var speed : float = 2;
public var amplitude : float = 0.1;
public var rotationSpeed : float = 1;
function Start () {
	moveY = transform.position.y;
}
         
function Update () {
	transform.position.y = moveY+amplitude*Mathf.Sin(speed*Time.time);
	transform.Rotate(.5,rotationSpeed,0);
}
