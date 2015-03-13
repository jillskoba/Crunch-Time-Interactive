#pragma strict

public var gameManager : GameObject;


function Start () {
	gameManager = GameObject.Find("gameManager");
}

function Update () {

}

function OnTriggerEnter(hit : Collider) {
	if (hit.tag == "battery" && gameManager.GetComponent(GameManager).batteries < gameManager.GetComponent(GameManager).batteryLimit) {
		gameManager.GetComponent(GameManager).PickupBattery();
		Destroy(hit.gameObject);
	}
	
	if (hit.tag == "overcharge" && gameManager.GetComponent(GameManager).overcharge < gameManager.GetComponent(GameManager).overchargeLimit) {
		gameManager.GetComponent(GameManager).PickupOvercharge();
		Destroy(hit.gameObject);
	}
	
	if (hit.tag == "fragment") {
		gameManager.GetComponent(GameManager).PickupFragment();
		Destroy(hit.gameObject);
	}
	
	if (hit.tag == "levelend") {
		gameManager.GetComponent(GameManager).LoadNextLevel();
	}

	if (hit.tag=='weakSpot'){
		//rigidbody.velocity.y = jumpHeight;
		Destroy(hit.gameObject.transform.parent.gameObject);
		Debug.Log("EnemyHit");
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
	//Added Enemy Collisions, example enemy model hitboxes need light tweaking will fix later this week
	if(hit.tag == "enemy"){
		if (gameManager.GetComponent(GameManager).overchargeActive == true) {
			Destroy(hit.gameObject);
		} else {
			var enemy: enemyAI = hit.gameObject.GetComponent('enemyAI');
			//If enemy is undefined, find the enemy tag's parent
			if(enemy == null){
				enemy = hit.gameObject.transform.parent.gameObject.GetComponent('enemyAI');
			}
			Debug.Log('Player collided with enemy type ' + enemy.enemyType);
			gameManager.GetComponent(GameManager).LoseHealth();
		}
	}
	
	//For projectile shooter
	if(hit.tag == "projectile"){
		Debug.Log('Hit By a projectile!');
		gameManager.GetComponent(GameManager).LoseHealth();
	}
	
}