#pragma strict

private var moveY : float;
private var speed : float;
private var amplitude : float;
private var rotationSpeed : float;
function Start () {
	if (gameObject.tag == "battery") {
		speed = 2;
		amplitude = 0.1;
		rotationSpeed = 1;
	}
	moveY = transform.position.y;
}
         
function Update () {
	transform.position.y = moveY+amplitude*Mathf.Sin(speed*Time.time);
	transform.Rotate(.5,rotationSpeed,0);
}
