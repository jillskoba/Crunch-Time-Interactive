#pragma strict

import System.Collections.Generic; //need this line to import dictionary

var flashlight : Light;
var beam: GameObject;
var flickerSpeed : float = 0.7;
var flashlightPower : int = 100;
var flashlightDecaySpeed : float = 0.1;
public var lightOn : boolean = false;

function Start () {
	InvokeRepeating("FlashlightPower", 1, .5); 
	lightOn = false;
	flashlight.enabled = lightOn;
}

function Update () {
	
	
	if (Input.GetButtonDown ("Fire1") && flashlightPower > 0){ 
		lightOn = !lightOn;
		flashlight.enabled = lightOn;
	}
	
	if (Input.GetButtonDown ("Fire2")){ 
		flashlightPower += 20;

		// Prevents light from being off from flicker effect when power is recovered
		lightOn = true;
        flashlight.enabled = lightOn;
	}
	 
	if (flashlightPower > 100) {
		flashlightPower = 100;
	}
	
	if (lightOn) {
		if (flashlightPower <= 20) {
	        if (Random.value > flickerSpeed ){
	           if (flashlight.enabled == true ){
	             flashlight.enabled = false;
	           }
	           else{
	             flashlight.enabled = true;
	           }
	        }
        }
        
        // Kills flashlight when it runs out of power
        if (flashlightPower <= 0) {
        	lightOn = false;
        	flashlight.enabled = lightOn;
        }
	}
}

function FlashlightPower (){
	if (lightOn) {
		flashlightPower -= 1 * Time .deltaTime;
	}
}


function OnTriggerEnter(hit : Collider) {
	if (hit.tag == "enemy") {
		Debug.Log("hit");
		Destroy(hit.gameObject);
	}
}