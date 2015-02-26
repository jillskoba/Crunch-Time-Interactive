#pragma strict

var flashlight : Light;
var beam: GameObject;
var flickerSpeed : float = 0.7;
var flashlightPower : int = 100;
var flashlightDecaySpeed : float = 0.1;
var flashlightRecoverPower : int = 20;
public var lightOn : boolean = false;
public var gameManager : GameObject;

function Start () {
	InvokeRepeating("FlashlightPower", 1, .5); 
	lightOn = false;
	flashlight.enabled = lightOn;
	beam.renderer.enabled = false;
	gameManager = GameObject.Find("gameManager");
}

function Update () {
	if (Input.GetButtonDown ("Fire1") && flashlightPower > 0){ 
		lightOn = !lightOn;
		flashlight.enabled = lightOn;
		Debug.Log(flashlightPower);
	}
	
	if (Input.GetButtonDown ("Fire2") && flashlightPower < 100 && gameManager.GetComponent(GameManager).batteries > 0){ 
		flashlightPower += flashlightRecoverPower;
		gameManager.GetComponent(GameManager).UseBattery();
	}
	 
	if (flashlightPower > 100) {
		flashlightPower = 100;
	}
	
	if (lightOn) {
		if (flashlightPower <= 20) {
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
        
        // Kills flashlight when it runs out of power
        if (flashlightPower <= 0) {
        	lightOn = false;
        	flashlight.enabled = lightOn;
        	beam.renderer.enabled = false;
        }
	}
}

function FlashlightPower (){
	if (lightOn) {
		flashlightPower -= 1 * Time .deltaTime;
	}
}