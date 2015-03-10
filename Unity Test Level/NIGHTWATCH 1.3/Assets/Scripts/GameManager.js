#pragma strict
var currentLevel : int = 0;
var fragments : int = 0;
var batteries : int = 0;
var overcharge : int = 0;
var overchargeLimit : int = 1;
var batteryLimit : int = 5;
var character : float = 1;
var health : int = 3;

function Start() {

}


//----------HEALTH----------
function GainHealth () {
	if (health < 3) {
		health += 1;
	} else {
		health = 3;
	}
}

function LoseHealth () {
	if (health > 0) {
		health -= 1;
	} else {
		health = 0;
	}
}

//----------FRAGMENTS----------

function PickupFragment () {
	fragments += 1;
}

//----------BATTERIES----------

function PickupBattery () {
	batteries += 1;
}

function UseBattery () {
	batteries -= 1;
}

//----------OVERCHARGE----------

function PickupOvercharge () {
	overcharge += 1;
}

function UseOvercharge () {
	if (overcharge > 0){
		overcharge -= 1;
	} else {
		overcharge = 0;
	}
}

//----------LEVEL----------

function Awake () {
	DontDestroyOnLoad (gameObject);
}

function LoadNextLevel () {
	currentLevel += 1;
	Application.LoadLevel(currentLevel);
}
function LoadLevel(){
	Application.LoadLevel(currentLevel);
}