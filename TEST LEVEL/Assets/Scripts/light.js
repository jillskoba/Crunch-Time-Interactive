#pragma strict
public var player : GameObject;
private var direction : int;
public var beamDistance : float = 6;
public var flashlightObject : Transform;
public var flashlightScript : Flashlight;


function Start () {
	flashlightScript = flashlightObject.GetComponent(Flashlight);
	direction = beamDistance;
}

function Update () {
	if (flashlightScript.lightOn) {
	var frontPlayer : Vector3 = transform.position;
	var middlePlayer : Vector3 = transform.position;
	var backPlayer : Vector3 = transform.position;
	
	if(player.rigidbody.velocity.x < 0){
		direction = -(beamDistance);
	}else if(player.rigidbody.velocity.x > 0){
		direction = beamDistance;
	}
	
	//Debug.DrawRay (frontPlayer,Vector3(direction,0.72,0),Color.red);
	//Debug.DrawRay (middlePlayer,Vector3(direction,-1.5,0),Color.red);
	//Debug.DrawRay (backPlayer,Vector3(direction,-4.2,0),Color.red);
	}
}