#pragma strict

public var flashlightScript : Flashlight;

function Start () {

}

function Update () {

}

function OnTriggerEnter(hit : Collider) {
	if (hit.tag == "battery") {
		//var flashlightScript: Flashlight = GetComponent(Flashlight); 
		
		Destroy(hit.gameObject);
	}
}