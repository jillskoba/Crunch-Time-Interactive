#pragma strict

public var speed : float = 7;
public var jumpHeight : float = 17;
public var gravity : float = 38;
private var targetRotation : int;
private var gameManager : GameObject;
public var playerMesh : GameObject;
public var material1 : Material;
public var material2 : Material;


rigidbody.useGravity = false;

//curVel = Vector3.Lerp(curVel, vel, 5 friction friction * Time.deltaTime);

function Start () {
	gameManager = GameObject.Find("gameManager");
}

function FixedUpdate () {
	transform.position.z = 0; //precaution to keep player from moving in the z direction
	rigidbody.AddForce(new Vector3(0,-gravity * rigidbody.mass,0)); //custom gravity formula
	
	//handle horz movement
	rigidbody.velocity.x = speed * Input.GetAxis("Horizontal"); //left -1, right +1, default 0
	
	if(!Input.GetAxis("Horizontal")){
		rigidbody.velocity.x = 0;
	}
	
	if(rigidbody.velocity.x < 0){
		targetRotation = 180;
	}else if(rigidbody.velocity.x > 0){
		targetRotation = 0;
	}
	
	//transform.eulerAngles.y = targetRotation;
	transform.eulerAngles.y -= (transform.eulerAngles.y-targetRotation)/5;
	
}

function Update(){
	//handle jump
	if(Input.GetButton("Jump") && isGrounded()){
		rigidbody.velocity.y = jumpHeight;
	}

	//Overcharge Use Proxy
	if(Input.GetButton("Fire3") && gameManager.GetComponent(GameManager).overcharge > 0){
		gameManager.GetComponent(GameManager).UseOvercharge();
		OverchargeActive();
	}
}

//Overcharge Effect
function OverchargeActive() {
	if (Random.value > 0.9 ){
	        playerMesh.renderer.material = material2;
	        Debug.Log("Blink");
		}else{
			playerMesh.renderer.material = material1;
		}
}

function isGrounded(){
	var front : Vector3 = transform.position;
	front.x += 0.4;
	
	var middle : Vector3 = transform.position;
	
	var back : Vector3 = transform.position;
	back.x -=0.4;
	
	//debug ray cast
	var jumpLine : float = collider.bounds.size.y/2 +0.1;
	//Debug.DrawRay (middle,Vector3(0,-jumpLine,0),Color.red);
	//Debug.DrawRay (front,Vector3(0,-jumpLine,0),Color.red);
	//Debug.DrawRay (back,Vector3(0,-jumpLine,0),Color.red);
	
	if(Physics.Raycast(front, Vector3.down, collider.bounds.size.y/2 + 0.1) || Physics.Raycast(middle, Vector3.down, collider.bounds.size.y/2 + 0.1) || Physics.Raycast(back, Vector3.down, collider.bounds.size.y/2 + 0.1)){
		return true;
	}
	return false;
}

