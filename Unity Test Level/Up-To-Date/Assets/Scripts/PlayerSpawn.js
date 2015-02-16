#pragma strict

function Start () {
	var character : GameObject = Instantiate(Resources.Load("Player"), gameObject.transform.position, gameObject.transform.rotation);
}