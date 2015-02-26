#pragma strict
public var player : GameObject;
public var beamDistance : float = 6;
private var direction : float = 1;
public var flashlightObject : Transform;
public var flashlightScript : Flashlight;
private var lightRight : boolean = true;

function Start () {
	flashlightScript = flashlightObject.GetComponent(Flashlight);
	turnLight();
}

function Update () {
	if (flashlightScript.lightOn) {
		var playerPos : Vector3 = transform.position *0.989;
		var fwd = transform.TransformDirection (Vector3.forward);
		var hit : RaycastHit;

		if (player.transform.rotation.eulerAngles.y <= 90){
		    lightRight = true;
		 } else {
		 	lightRight = false;
		 }

		turnLight();
		
		beamDistance = beamDistance * direction;
		
		//Debug.DrawRay (playerPos,Vector3(beamDistance+(0.2*direction),1.3,0.6),Color.red);
		//Debug.DrawRay (playerPos,Vector3(beamDistance+(0.1*direction),0.6,0.63),Color.red);
		//Debug.DrawRay (playerPos,Vector3(beamDistance,-0,0.66),Color.red);
		//Debug.DrawRay (playerPos,Vector3(beamDistance-(0.1*direction),-0.8,0.69),Color.red);
		//Debug.DrawRay (playerPos,Vector3(beamDistance-(0.2*direction),-1.5,0.72),Color.red);
		//Debug.DrawRay (playerPos,Vector3(beamDistance-(0.3*direction),-2.2,0.75),Color.red);
		//Debug.DrawRay (playerPos,Vector3(beamDistance-(0.4*direction),-3,0.8),Color.red);
		
		//Debug.DrawRay (transform.position,fwd*1000000);
		//
		var direction : Vector3 = transform.TransformDirection(Vector3(1.3, 1.3, 50)).normalized;
   		var distance : int = 20;
   		var jlpRay = Physics.Raycast(transform.position,direction, distance);
   		Debug.DrawRay(transform.position, Vector3.right * distance, Color.green);

		//if (Physics.Raycast (playerPos,Vector3(beamDistance+(0.2*direction),1.3,0.6), hit) || Physics.Raycast (playerPos,Vector3(beamDistance+(0.1*direction),0.6,0.63), hit) || Physics.Raycast (playerPos,Vector3(beamDistance,-0,0.66), hit) || Physics.Raycast (playerPos,Vector3(beamDistance-(0.1*direction),-0.8,0.69), hit) || Physics.Raycast (playerPos,Vector3(beamDistance-(0.2*direction),-1.5,0.72), hit) || Physics.Raycast (playerPos,Vector3(beamDistance-(0.3*direction),-2.2,0.75), hit) || Physics.Raycast (playerPos,Vector3(beamDistance-(0.4*direction),-3,0.8), hit)){
			//if (Physics.Raycast (playerPos,Vector3(beamDistance+(0.2*direction),1.3,0.6), hit) || Physics.Raycast (playerPos,Vector3(beamDistance+(0.1*direction),0.6,0.63), hit) || Physics.Raycast (playerPos,Vector3(beamDistance,-0,0.66), hit) || Physics.Raycast (playerPos,Vector3(beamDistance-(0.1*direction),-0.8,0.69), hit) || Physics.Raycast (playerPos,Vector3(beamDistance-(0.2*direction),-1.5,0.72), hit) || Physics.Raycast (playerPos,Vector3(beamDistance-(0.3*direction),-2.2,0.75), hit) || Physics.Raycast (playerPos,Vector3(beamDistance-(0.4*direction),-3,0.8), hit)){
			 //if ( hit.transform.gameObject.tag == "enemy") {
	        //     Debug.Log("Enemy Hit!");
	        // }
		//}
		//
		if (Physics.Raycast (transform.position, Vector3.right * distance, hit) ){
			 if ( hit.transform.gameObject.tag == "enemy") {
	             Debug.Log("Enemy Hit!");
	         }
		}
	}
}

function turnLight (){
	if (lightRight) {
		direction = 1;
	} else {
		direction = -1;
	}
	//Debug.Log(direction);
}