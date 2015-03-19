#pragma strict

public var speed : float = 7;
public var jumpHeight : float = 17;
public var gravity : float = 38;
public var targetRotation : int;
private var gameManager : GameObject;
private var playerMesh : GameObject;

public var flashlight : Light;
public var beam: GameObject;
public var flickerSpeed : float = 0.7;

rigidbody.useGravity = false;

//curVel = Vector3.Lerp(curVel, vel, 5 friction friction * Time.deltaTime);

function Start () {
	gameManager = GameObject.Find("gameManager");
	flashlight.enabled = false;
	beam.renderer.enabled = false;
}

function FixedUpdate () {
	transform.position.z = 0; //precaution to keep player from moving in the z direction

if (gameManager.GetComponent(GameManager).playerAlive == true) {
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
	} else {
			rigidbody.isKinematic = false;
			rigidbody.velocity.x = 0;
		}
}

function Update(){
	if (gameManager.GetComponent(GameManager).playerAlive == true) {
		//handle jump
		if(Input.GetButton("Jump") && isGrounded()){
			rigidbody.velocity.y = jumpHeight;
			transform.Find("PlayerMesh").animation.Play("Jump");
		}
		
		if(isGrounded() && !Input.GetButton("Jump")){
			transform.Find("PlayerMesh").animation.Play("Walk");
		}



		//Item Use
		if (Input.GetButtonDown ("Fire3")) {
			if (gameManager.GetComponent(GameManager).powerupSelect == 1) { //Use Battery
				if (gameManager.GetComponent(GameManager).flashlightPower < 100 && gameManager.GetComponent(GameManager).batteries > 0) {
					gameManager.GetComponent(GameManager).UseBattery();
				}
			}
			if (gameManager.GetComponent(GameManager).powerupSelect == 2) { //Use Overcharge
				if (gameManager.GetComponent(GameManager).overcharge > 0) {
					gameManager.GetComponent(GameManager).UseOvercharge();
				}
			}
		}
	}
	
	//Check Game Manager flashlight boolean
	if(gameManager.GetComponent(GameManager).lightOn == true) {
		beam.renderer.enabled = true;
		flashlight.enabled = true;
	} else {
		beam.renderer.enabled = false;
		flashlight.enabled = false;
	}
	
	if (gameManager.GetComponent(GameManager).lightOn == true) {
		if (gameManager.GetComponent(GameManager).flashlightPower <= 20) {
	        if (Random.value > flickerSpeed ){
	           if (flashlight.enabled == true ){
	             flashlight.enabled = false;
	             beam.renderer.enabled = false;
	           }
	           else{
	             flashlight.enabled = true;
	             beam.renderer.enabled = true;
	           }
	        }
        }
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

