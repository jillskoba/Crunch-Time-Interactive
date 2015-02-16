#pragma strict
var currentLevel : float = 0;
var fragments : float = 0;
var batteries : float = 0;
var batteryLimit : float = 5;

function Start() {

}

function PickupFragment () {
	fragments += 1;
}

function PickupBattery () {
	batteries += 1;
}

function UseBattery () {
	batteries -= 1;
}

function Awake () {
	DontDestroyOnLoad (gameObject);
}

function LoadNextLevel () {
	currentLevel += 1;
	Application.LoadLevel(currentLevel);
}