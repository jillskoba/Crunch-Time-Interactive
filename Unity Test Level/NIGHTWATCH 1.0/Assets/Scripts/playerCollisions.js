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
	if (hit.tag == "fragment") {
		gameManager.GetComponent(GameManager).PickupFragment();
		Destroy(hit.gameObject);
	}
	
	if (hit.tag == "levelend") {
		gameManager.GetComponent(GameManager).LoadNextLevel();
	}
}