#pragma strict

var distanceTop : float = 6.6;
var distanceMid : float = 6.3;
var distanceBottom : float = 6;

var angleTop : float = 0.09;
var angleMid : float = 0.27;
var angleBottom : float = 0.46;

var center : Vector3;
var originOffsetX : float = 0;
var originOffsetY : float = -0.05;
var originOffsetZ : float = 0;
var beamZOffset : float = 0;

var hitTop : RaycastHit;
var hit : RaycastHit;
var hitBottom : RaycastHit;

private var characterRight : boolean;

function Start () {
	characterRight = true;
}

function Update () {
	if (rigidbody.velocity.x < 0) {
		characterRight = false;
	} else if (rigidbody.velocity.x > 0){
		characterRight = true;
	}
	flashLightHit();
}

function flashLightHit() {
	if (characterRight) {
		center = transform.position;
		center.x += originOffsetX;
		center.y += originOffsetY;
		center.z += originOffsetZ;
		
		if (Physics.Raycast (center, Vector3(distanceTop+0.5,-distanceTop*angleTop,beamZOffset), hitTop)) {
			if (hitTop.distance > 6.6) {
				distanceTop = 6.6;
			} else {
				distanceTop = hitTop.distance;
			}
		}
		
		if (Physics.Raycast (center, Vector3(distanceMid+0.25,-distanceMid*angleMid,beamZOffset), hit)) {
			if (hit.distance > 6.3) {
				distanceMid = 6.3;
			} else {
				distanceMid = hit.distance;
			}
		}
		
		if (Physics.Raycast (center, Vector3(distanceBottom,-distanceBottom*angleBottom,beamZOffset), hitBottom)) {
			if (hitBottom.distance > 6) {
				distanceBottom = 6;
			} else {
				distanceBottom = hitBottom.distance;
			}
		}
		
		Debug.DrawRay (center, Vector3(distanceTop,-distanceTop*angleTop,beamZOffset), Color.red);
		Debug.DrawRay (center, Vector3(distanceMid,-distanceMid*angleMid,beamZOffset), Color.red);
		Debug.DrawRay (center, Vector3(distanceBottom,-distanceBottom*angleBottom,beamZOffset), Color.red);
		
	} else {
		center = transform.position;
		center.x -= originOffsetX;
		center.y -= originOffsetY;
		center.z -= originOffsetZ;
		
		if (Physics.Raycast (center, Vector3(-distanceTop+0.5,-distanceTop*angleTop,-beamZOffset), hitTop)) {
			if (hitTop.distance > 6.6) {
				distanceTop = 6.6;
			} else {
				distanceTop = hitTop.distance;
			}
		}
		
		if (Physics.Raycast (center, Vector3(-distanceMid+0.25,-distanceMid*angleMid,-beamZOffset), hit)) {
			if (hit.distance > 6.3) {
				distanceMid = 6.3;
			} else {
				distanceMid = hit.distance;
			}
		}
		
		if (Physics.Raycast (center, Vector3(-distanceBottom,-distanceBottom*angleBottom,-beamZOffset), hitBottom)) {
			if (hitBottom.distance > 6) {
				distanceBottom = 6;
			} else {
				distanceBottom = hitBottom.distance;
			}
		}
		
		Debug.DrawRay (center, Vector3(-distanceTop,-distanceTop*angleTop,-beamZOffset), Color.red);
		Debug.DrawRay (center, Vector3(-distanceMid,-distanceMid*angleMid,-beamZOffset), Color.red);
		Debug.DrawRay (center, Vector3(-distanceBottom,-distanceBottom*angleBottom,-beamZOffset), Color.red);
		
	}
}