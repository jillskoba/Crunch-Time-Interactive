#pragma strict

public var moveY : float;
public var speed : float = 2;
public var amplitude : float = 0.1;
public var YrotationSpeed : float = 1;
public var ZrotationSpeed : float = 0;
function Start () {
	moveY = transform.position.y;
}
         
function Update () {
	transform.position.y = moveY+amplitude*Mathf.Sin(speed*Time.time);
	transform.Rotate(0,YrotationSpeed,ZrotationSpeed);
}
