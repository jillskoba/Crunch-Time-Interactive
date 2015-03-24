#pragma strict
public var damage : int = 1;
public var lifeTime: float = 20;
public var speed: float = 800;

function Start () {
	//Start Moving Projectile
	this.rigidbody.velocity = transform.TransformDirection(Vector3(speed * Time.deltaTime,0,0));
}
function  OnTriggerEnter (other : Collider) {
	//Check to see if the collision box hit was an enemy
	if( other.gameObject.tag == 'Player'){
		Debug.Log('Player Hit Deal Damage!');
		Destroy(gameObject);
	}else{
		Physics.IgnoreCollision(this.collider, other);
	}
}
function Update () {
	//Destroy the projectile after a certain time 
	Destroy(gameObject, lifeTime);
}