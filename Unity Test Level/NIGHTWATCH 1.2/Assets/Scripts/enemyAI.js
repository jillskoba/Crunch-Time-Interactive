#pragma strict
//Empty Array of Waypoints
var waypoint: Transform[];
//Used to keep track on enemy
private var currentWaypoint: int = 0;

//Used for enemies who die via light
private var seconds: int = 0;
public var deathTime : int = 0;

//Speed of the enemy
public var speed: float = 5;

//Amount of seconds enemy will stop when hit with flashlight
public var stunTime: float = 5;

//Different Types of Enemies
enum enemyTypes{A, B, C, D};
public var enemyType : enemyTypes;

function Start (){
	transform.position.z = 0; //precaution to keep it in the z direction
	if(enemyType == enemyTypes.A){
		InvokeRepeating("patrol", 0, 1);
	}
	if(enemyType == enemyTypes.B){
		InvokeRepeating("chase", 0, .5);
	}
  	
}
function Update () {
	//Check to see what kind of enemy it is
	
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
		Debug.Log('Player hit! Do Damage!');
		if(enemyType == enemyTypes.B){
			Destroy(this.gameObject);
		}
	}
	//If it's the player's light
	else if(other.tag == "lightbeam"){
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
	rigidbody.velocity = Vector3(0,0,0);
	var child = transform.Find("Jump Collider");
	child.active = true;
	
}
function OnTriggerExit(other : Collider) {	
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
function EnemyHit () {
	seconds += 1;
	Debug.Log(seconds);
	if (seconds >= deathTime) {
		Destroy(this.gameObject);
	}
}
