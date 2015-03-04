#pragma strict

private var gameManager : GameObject;

function Start () {
	gameManager = GameObject.Find("gameManager");
}

function Update () {

}

function OnTriggerEnter(hit : Collider) {
	//----------PICKUPS----------
	if (hit.tag == "battery" && gameManager.GetComponent(GameManager).batteries < gameManager.GetComponent(GameManager).batteryLimit) {
		gameManager.GetComponent(GameManager).PickupBattery();
		Destroy(hit.gameObject);
	}

	if (hit.tag == "fragment") {
		gameManager.GetComponent(GameManager).PickupFragment();
		Destroy(hit.gameObject);
	}

	if (hit.tag == "overcharge" && gameManager.GetComponent(GameManager).overcharge < gameManager.GetComponent(GameManager).overchargeLimit) {
	//if (hit.tag == "overcharge"){
		gameManager.GetComponent(GameManager).PickupOvercharge();
		Destroy(hit.gameObject);
	}
	
	
	//----------UTILITY----------
	if (hit.tag == "levelend") {
		gameManager.GetComponent(GameManager).LoadNextLevel();
	}
	
	if(hit.tag == "wall"){
		collider.material.staticFriction = 0;
		collider.material.dynamicFriction = 0;
	}
	//handle moving platform collision
	if(hit.tag == "movingplatform"){
		collider.material.staticFriction = 1;
		collider.material.dynamicFriction = 1;
	}
	
	
	//----------ENEMY----------
	if (hit.tag=='weakSpot'){
		//rigidbody.velocity.y = jumpHeight;
		Destroy(hit.gameObject.transform.parent.gameObject);
		//Debug.Log("EnemyHit");
	}
	
	if (hit.tag == "enemy") {
		gameManager.GetComponent(GameManager).LoseHealth();
		Debug.Log("Hit by an enemy! Health remaining: "+gameManager.GetComponent(GameManager).health);
	}
}