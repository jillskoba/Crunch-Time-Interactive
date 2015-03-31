#pragma strict

function Start () {
	var gameManager = GameObject.Find("gameManager");
	yield WaitForSeconds(3);
	
	gameManager.GetComponent(GameManager).LoadNextLevel();
}