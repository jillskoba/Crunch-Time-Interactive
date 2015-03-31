#pragma strict
private var gameManager : GameObject;
function Start(){
	gameManager = GameObject.Find("gameManager");
}
function newGame(){
	gameManager.GetComponent(GameManager).LoadNextLevel();
}
function savedGame(){
	gameManager.GetComponent(GameManager).LoadPlayerData();
}
function Quit(){
	Application.Quit();
}
function LoadMainMenu(){
	gameManager.GetComponent(GameManager).currentLevel = 1;
	gameManager.GetComponent(GameManager).LoadLevel();
}