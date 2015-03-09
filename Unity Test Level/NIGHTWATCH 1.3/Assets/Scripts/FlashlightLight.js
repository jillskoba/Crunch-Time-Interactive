#pragma strict

public var player: GameObject;
private var isEnemy : boolean = false;

var distanceTop : float = 6.65;
var distanceTopMid : float = 6.5;
var distanceMid : float = 6.35;
var distanceBottomMid : float = 6.2;
var distanceBottom : float = 6.05;

var distanceTopBase : float = 6.65;
var distanceTopMidBase : float = 6.5;
var distanceMidBase : float = 6.35;
var distanceBottomMidBase : float = 6.2;
var distanceBottomBase : float = 6.05;

var angleTop : float = 0.04;
var angleTopMid : float = 0.14;
var angleMid : float = 0.24;
var angleBottomMid : float = 0.34;
var angleBottom : float = 0.44;

var center : Vector3;
var originOffsetX : float = 0;
var originOffsetY : float = -0.05;
var originOffsetZ : float = 0;
var beamZOffset : float = 0;

var hitTop : RaycastHit;
var hitTopMid : RaycastHit;
var hitMid : RaycastHit;
var hitBottomMid : RaycastHit;
var hitBottom : RaycastHit;

//Used to keep track of which Raycast hit object hit an enemy
private var currentHit : RaycastHit;

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
	if (player.GetComponent(Flashlight).lightOn) {
		currentHit = new RaycastHit();
		flashLightHit();
	}
	
}

function flashLightHit() {
	isEnemy=false;
	if (characterRight) {
		center = transform.position;
		center.x += originOffsetX;
		center.y += originOffsetY;
		center.z += originOffsetZ;
		
		//Top
		if (Physics.Raycast (center, Vector3(distanceTop+0.5,-distanceTop*angleTop,beamZOffset), hitTop)) {
			if (hitTop.distance > distanceTopBase) {
				distanceTop = distanceTopBase;
			} else {
				distanceTop = hitTop.distance;
			}
			if(hitTop.collider.tag == 'enemy'){
				isEnemy =true;
				currentHit = hitTop;
			}
		}
		
		//Top-Mid
		if (Physics.Raycast (center, Vector3(distanceTopMid+0.5,-distanceTopMid*angleTopMid,beamZOffset), hitTopMid)) {
			if (hitTopMid.distance > distanceTopMidBase) {
				distanceTopMid = distanceTopMidBase;
			} else {
				distanceTopMid = hitTopMid.distance;
			}
			if(hitTopMid.collider.tag == 'enemy'){
				isEnemy =true;
				currentHit = hitTop;
			}
		}
		
		//Mid
		if (Physics.Raycast (center, Vector3(distanceMid+0.25,-distanceMid*angleMid,beamZOffset), hitMid)) {
			if (hitMid.distance > distanceMidBase) {
				distanceMid = distanceMidBase;
			} else {
				distanceMid = hitMid.distance;
			}
			if(hitMid.collider.tag == 'enemy'){
				isEnemy =true;
				currentHit = hitTop; 
			}
		}
		
		//Bottom-Mid
		if (Physics.Raycast (center, Vector3(distanceBottomMid,-distanceBottomMid*angleBottomMid,beamZOffset), hitBottomMid)) {
			if (hitBottomMid.distance > distanceBottomMidBase) {
				distanceBottomMid = distanceBottomMidBase;
			} else {
				distanceBottomMid = hitBottomMid.distance;
			}
			if(hitBottomMid.collider.tag == 'enemy'){
				isEnemy =true;
				currentHit = hitTop; 
			}
		}
		
		//Bottom
		if (Physics.Raycast (center, Vector3(distanceBottom,-distanceBottom*angleBottom,beamZOffset), hitBottom)) {
			if (hitBottom.distance > distanceBottomBase) {
				distanceBottom = distanceBottomBase;
			} else {
				distanceBottom = hitBottom.distance;
			}
			if(hitBottom.collider.tag == 'enemy'){
				isEnemy =true;
				currentHit = hitTop;
			}
		}
		
		Debug.DrawRay (center, Vector3(distanceTop,-distanceTop*angleTop,beamZOffset), Color.red); //Top
		Debug.DrawRay (center, Vector3(distanceTopMid,-distanceTopMid*angleTopMid,beamZOffset), Color.red); //Top-Mid
		Debug.DrawRay (center, Vector3(distanceMid,-distanceMid*angleMid,beamZOffset), Color.red); //Mid
		Debug.DrawRay (center, Vector3(distanceBottomMid,-distanceBottomMid*angleBottomMid,beamZOffset), Color.red); //Bottom-Mid
		Debug.DrawRay (center, Vector3(distanceBottom,-distanceBottom*angleBottom,beamZOffset), Color.red); //Bottom
		
	} else {
		center = transform.position;
		center.x -= originOffsetX;
		center.y -= originOffsetY;
		center.z -= originOffsetZ;
		
		//Top
		if (Physics.Raycast (center, Vector3(-distanceTop+0.5,-distanceTop*angleTop,-beamZOffset), hitTop)) {
			if (hitTop.distance > distanceTopBase) {
				distanceTop = distanceTopBase;
			} else {
				distanceTop = hitTop.distance;
			}
			if(hitTop.collider.tag == 'enemy'){
				Debug.Log('IS A BADDIE!');
				isEnemy =true; 
				currentHit = hitTop;
			}
		}
		
		//Top-Mid
		if (Physics.Raycast (center, Vector3(-distanceTopMid+0.5,-distanceTopMid*angleTopMid,-beamZOffset), hitTopMid)) {
			if (hitTopMid.distance > distanceTopMidBase) {
				distanceTopMid = distanceTopMidBase;
			} else {
				distanceTopMid = hitTopMid.distance;
			}
			if(hitTopMid.collider.tag == 'enemy'){
				Debug.Log('IS A BADDIE!');
				isEnemy =true;
				currentHit = hitTop;
			}
		}
		
		//Mid
		if (Physics.Raycast (center, Vector3(-distanceMid+0.25,-distanceMid*angleMid,-beamZOffset), hitMid)) {
			if (hitMid.distance > distanceMidBase) {
				distanceMid = distanceMidBase;
			} else {
				distanceMid = hitMid.distance;
			}
			if(hitMid.collider.tag == 'enemy'){
				Debug.Log('IS A BADDIE!');
				isEnemy =true;
				currentHit = hitTop;
			}
		}
		
		//Bottom-Mid
		if (Physics.Raycast (center, Vector3(-distanceBottomMid,-distanceBottomMid*angleBottomMid,-beamZOffset), hitBottomMid)) {
			if (hitBottomMid.distance > distanceBottomMidBase) {
				distanceBottomMid = distanceBottomMidBase;
			} else {
				distanceBottomMid = hitBottomMid.distance;
			}
			if(hitBottomMid.collider.tag == 'enemy'){
				Debug.Log('IS A BADDIE!');
				isEnemy =true;
				currentHit = hitTop; 
			}
		}
		
		//Bottom
		if (Physics.Raycast (center, Vector3(-distanceBottom,-distanceBottom*angleBottom,-beamZOffset), hitBottom)) {
			if (hitBottom.distance > distanceBottomBase) {
				distanceBottom = distanceBottomBase;
			} else {
				distanceBottom = hitBottom.distance;
			}
			if(hitBottom.collider.tag == 'enemy'){
				Debug.Log('IS A BADDIE!');
				isEnemy =true;
				currentHit = hitTop;
			}
		}
		
		Debug.DrawRay (center, Vector3(-distanceTop,-distanceTop*angleTop,-beamZOffset), Color.red); //Top
		Debug.DrawRay (center, Vector3(-distanceTopMid,-distanceTopMid*angleTopMid,-beamZOffset), Color.red); //Top-Mid
		Debug.DrawRay (center, Vector3(-distanceMid,-distanceMid*angleMid,-beamZOffset), Color.red); //Mid
		Debug.DrawRay (center, Vector3(-distanceBottomMid,-distanceBottomMid*angleBottomMid,-beamZOffset), Color.red); //Bottom-Mid
		Debug.DrawRay (center, Vector3(-distanceBottom,-distanceBottom*angleBottom,-beamZOffset), Color.red); //Bottom
		
	}
	if(isEnemy==true){
		enemyBehaviour();
	}
}
//Uses current hit to figure out which enemy has the flashlight shown on them
function enemyBehaviour(){
var enemy : enemyAI = currentHit.collider.gameObject.GetComponent('enemyAI');
if(enemy == null){
	enemy = currentHit.collider.gameObject.transform.parent.gameObject.GetComponent('enemyAI');
}

	if(enemy.enemyType == enemyTypes.B){
		Debug.Log('Destroyed A Chaser!');
		Destroy(currentHit.collider.gameObject);
	}
	if(enemy.enemyType == enemyTypes.A){
		//stun enemy, need to figure out way to recall patrol
		enemy.stun();
	}
	if(enemy.enemyType == enemyTypes.D){
		Destroy(enemy.gameObject.Find('Cylinder'));
		enemy.collider.tag ="wall";
	}
	
}