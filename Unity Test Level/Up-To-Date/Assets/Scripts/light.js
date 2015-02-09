#pragma strict
public var player : GameObject;
public var beamDistance : float = 6;
private var direction : float = 1;
public var flashlightObject : Transform;
public var flashlightScript : Flashlight;


function Start () {
	flashlightScript = flashlightObject.GetComponent(Flashlight);
	
}

function Update () {
	if (flashlightScript.lightOn) {
		var playerPos : Vector3 = transform.position *0.989;
		var fwd = transform.TransformDirection (Vector3.forward);
		var hit : RaycastHit;
		
		
		if(player.rigidbody.velocity.x < 0){
			direction = -1;
			
		}else if(player.rigidbody.velocity.x > 0){
			direction = 1;
		}
		
		beamDistance = beamDistance * direction;
		
		//Debug.DrawRay (playerPos,Vector3(beamDistance+(0.2*direction),1.3,0.6),Color.red);
		//Debug.DrawRay (playerPos,Vector3(beamDistance+(0.1*direction),0.6,0.63),Color.red);
		//Debug.DrawRay (playerPos,Vector3(beamDistance,-0,0.66),Color.red);
		//Debug.DrawRay (playerPos,Vector3(beamDistance-(0.1*direction),-0.8,0.69),Color.red);
		//Debug.DrawRay (playerPos,Vector3(beamDistance-(0.2*direction),-1.5,0.72),Color.red);
		//Debug.DrawRay (playerPos,Vector3(beamDistance-(0.3*direction),-2.2,0.75),Color.red);
		//Debug.DrawRay (playerPos,Vector3(beamDistance-(0.4*direction),-3,0.8),Color.red);

		if (Physics.Raycast (playerPos,Vector3(beamDistance+(0.2*direction),1.3,0.6), hit) || Physics.Raycast (playerPos,Vector3(beamDistance+(0.1*direction),0.6,0.63), hit) || Physics.Raycast (playerPos,Vector3(beamDistance,-0,0.66), hit) || Physics.Raycast (playerPos,Vector3(beamDistance-(0.1*direction),-0.8,0.69), hit) || Physics.Raycast (playerPos,Vector3(beamDistance-(0.2*direction),-1.5,0.72), hit) || Physics.Raycast (playerPos,Vector3(beamDistance-(0.3*direction),-2.2,0.75), hit) || Physics.Raycast (playerPos,Vector3(beamDistance-(0.4*direction),-3,0.8), hit)){
			
			 if ( hit.transform.gameObject.tag == "enemy") {
			 Debug.DrawRay (playerPos,Vector3(beamDistance+(0.2*direction),1.3,0.6),Color.red);
			Debug.DrawRay (playerPos,Vector3(beamDistance+(0.1*direction),0.6,0.63),Color.red);
			Debug.DrawRay (playerPos,Vector3(beamDistance,-0,0.66),Color.red);
			Debug.DrawRay (playerPos,Vector3(beamDistance-(0.1*direction),-0.8,0.69),Color.red);
			Debug.DrawRay (playerPos,Vector3(beamDistance-(0.2*direction),-1.5,0.72),Color.red);
			Debug.DrawRay (playerPos,Vector3(beamDistance-(0.3*direction),-2.2,0.75),Color.red);
			Debug.DrawRay (playerPos,Vector3(beamDistance-(0.4*direction),-3,0.8),Color.red);
	             Debug.Log("Enemy Hit!");
	         }
		}
	}
}