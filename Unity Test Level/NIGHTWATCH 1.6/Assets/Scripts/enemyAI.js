#pragma strict
//Empty Array of Waypoints
var waypoint: Transform[];
//Used to keep track on enemy Type B
private var currentWaypoint: int = 0;

//Used for enemies who die via light
private var seconds: int = 0;
public var deathTime : int = 0;

//Type C
private var lookingBehind: boolean = false;
public var turnTime: float = 5;

public var projectile : GameObject;
public var fireRate: float = 3;

//Type D
public var clapRate: float = 3;

//Speed of the enemy
public var speed: float = 5;

//Amount of seconds enemy will stop when hit with flashlight
public var stunTime: float = 5;

//Different Types of Enemies
enum enemyTypes{A, B, C, D};
public var enemyType : enemyTypes;

function Start (){
	//Check to see what type of enemy it is
	if(enemyType == enemyTypes.A){
		InvokeRepeating("patrol", 0, 1);
	}
	if(enemyType == enemyTypes.B){
		InvokeRepeating("chase", 0, .5);
	}
	if(enemyType == enemyTypes.C){
		InvokeRepeating("search", 0,turnTime);
	}
  	
}
function Update () {
	
	
}
function patrol(){
	if(currentWaypoint < waypoint.Length){
		var target: Vector3 = waypoint[currentWaypoint].position;
		var moveDirection: Vector3 = target - transform.position;
		var velocity = moveDirection.normalized * speed;
		
		if(moveDirection.magnitude < .5){
		currentWaypoint++;
		}
	}else{
	currentWaypoint = 0;
	}
	//Enemy is moving
	rigidbody.velocity = velocity;
}
function chase(){
	var player: GameObject = GameObject.FindGameObjectWithTag("Player");
	var target: Vector3 = player.transform.position;
	var moveDirection: Vector3 = target - transform.position;
	var velocity = moveDirection.normalized * speed;
	
	//Enemy is moving
	rigidbody.velocity = velocity;

}
function OnTriggerEnter (other : Collider) {
	//If it's the player
	if(other.tag == 'Player'){
		if(enemyType == enemyTypes.B){
			Destroy(this.gameObject);
		}
		if(enemyType == enemyTypes.C){
		 CancelInvoke("search");
		 InvokeRepeating("shoot", 0,fireRate);
		}
		if(enemyType == enemyTypes.D){
			InvokeRepeating("clap", 0,clapRate);
		}
	}
	//If it's the player's light
	if(other.gameObject.name == "Flashlight"){
		if(enemyType == enemyTypes.A){
			//Stun Enemy
			CancelInvoke("patrol");
			stun();
			Debug.Log('LIGHT HIT!');
		}
		if(enemyType == enemyTypes.B){
			//Stun Enemy
			CancelInvoke("chase");
			//Start countdown
			Debug.Log('LIGHT HIT!');
			Destroy(this.gameObject);
		}
	}
	else{
		if(enemyType == enemyTypes.B){
			Physics.IgnoreCollision(this.collider, other);
		}
	
	}
}
function stun(){
	//make the enemy stop moving
	CancelInvoke("patrol");
	rigidbody.velocity = Vector3(0,0,0);
	//this.gameObject.collider.active=false;
	var child = transform.Find("Jump Collider");
	child.active = true;
	
}
function search(){
	//Look back and forth to find a player, stopping when they do
	//Debug.Log('Looking for player!');
	if(lookingBehind == true){
		Debug.Log('Face Left!');
		lookingBehind  = false;
		transform.Rotate(0,0,0);
	}
	if(lookingBehind == false){
		Debug.Log('Face Right!');
		lookingBehind  = true;
		transform.Rotate(0,180, 0);
	}
	
}
function shoot(){
	var spawner: GameObject = GameObject.Find("Spawner");
	var clone : GameObject = Instantiate(projectile,  spawner.transform.position, spawner.transform.rotation);
	
}
function clap(){
	//clap animation, if player is in area, deal damage
	//Debug.Log('CLAP! Player is hit!');
}
function OnTriggerExit(other : Collider) {
	if(other.tag == 'Player'){
		if(enemyType == enemyTypes.C){
		 Debug.Log('Player lost! Stop the shooting!!');
		 CancelInvoke("shoot");
		 InvokeRepeating("search", 0,turnTime);
		}
		if(enemyType == enemyTypes.D){
			CancelInvoke("clap");
		}
	}	
	if (other.tag == "lightbeam"){
		//CancelInvoke("chaserHit");
		//seconds = 0;
		if(enemyType == enemyTypes.A){
			InvokeRepeating("patrol", stunTime, 1);
			yield WaitForSeconds (stunTime);
			var child = transform.Find("Jump Collider");
			child.active = false;
		}
	}
}
function hide(){
	
}
function EnemyHit () {
	seconds += 1;
	Debug.Log(seconds);
	if (seconds >= deathTime) {
		Destroy(this.gameObject);
	}
}