#pragma strict
//Empty Array of Waypoints

//Used to keep track on enemy Type A
public var waypoints : Transform[];

private var currentWaypoint : Transform;
private var currentIndex : int;

var moveSpeed : float = 2.0;
var minDistance : float = 1.0;


private var stunned: boolean = false;

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
		currentWaypoint = waypoints[0];
		currentIndex = 0;
		
		InvokeRepeating("patrol", 0, .1);
		
	}
	if(enemyType == enemyTypes.B){
		InvokeRepeating("chase", 0, .5);
		
	}
	if(enemyType == enemyTypes.C){
		InvokeRepeating("search", 0,turnTime);
	}
  	
}
function Update () {
	//Check to see what type of enemy it is
	if(enemyType == enemyTypes.A){
		if(stunned==true){
			var model: Transform = gameObject.transform.Find('Monkey_out_01');
			model.animation.Play();
			InvokeRepeating("patrol", 0, .1);
			var child = transform.Find("Jump Collider");
			child.active = false;
			stunned=false;
		}
	}
}
function patrol(){
	var model: Transform = gameObject.transform.Find('Monkey_out_01');
	MoveTowardWaypoint();

	if (Vector3.Distance(currentWaypoint.transform.position, transform.position) < minDistance){
		currentIndex++;
		if (currentIndex > waypoints.length -1){
			currentIndex = 0;
		}
		if(this.rigidbody.velocity.x < 0){
			model.Rotate(0,180,0);

		}if(this.rigidbody.velocity.x > 0){
			model.Rotate(0,180,0);
		}
		currentWaypoint = waypoints[currentIndex];
	}
	Debug.Log(model.rotation.y);
}
function MoveTowardWaypoint(): void{
	var direction : Vector3 = currentWaypoint.transform.position- transform.position;
	var moveVector : Vector3 = direction.normalized * moveSpeed * Time.deltaTime;
	
	rigidbody.velocity = moveVector;
	//transform.position += moveVector;
	//transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction), 4 * Time.deltaTime);
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
			InvokeRepeating("clap", clapRate/2,clapRate);
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
	var model: Transform = gameObject.transform.Find('Monkey_out_01');
	model.animation.Stop();
	rigidbody.velocity = Vector3(0,0,0);
	var child = transform.Find("Jump Collider");
	child.active = true;

	if(stunned== false){
	yield WaitForSeconds (stunTime);
	stunned = true;
	}
	
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
	var model: Transform = gameObject.transform.Find('plants/model');

	model.animation.Play();

	var spawner: Transform = this.transform.Find("Spawner");
	var clone : GameObject = Instantiate(projectile,  spawner.position, spawner.rotation);


	
}
function clap(){
	//clap animation, if player is in area, deal damage
	var gameManager: GameObject = GameObject.Find("gameManager");
	gameManager.GetComponent(GameManager).LoseHealth();
}
function OnTriggerExit(other : Collider) {
	if(other.tag == 'Player'){
		if(enemyType == enemyTypes.C){
		 Debug.Log('Player lost! Stop the shooting!!');
		 CancelInvoke("shoot");
		 InvokeRepeating("search", turnTime/2,turnTime);
		}
		if(enemyType == enemyTypes.D){
			CancelInvoke("clap");
		}
	}	
}
function hide(){
	Destroy(this.gameObject.Find('Model/Cylinder'));
	this.gameObject.collider.enabled = false;
	this.gameObject.Find('Model').tag ='wall';
	CancelInvoke("clap");
}
function EnemyHit () {
	seconds += 1;
	Debug.Log(seconds);
	if (seconds >= deathTime) {
		Destroy(this.gameObject);
	}
}