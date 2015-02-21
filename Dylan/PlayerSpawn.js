#pragma strict

function Start () {
	var manager: GameManager = GameObject.Find("gameManager").GetComponent("GameManager");
	Debug.Log(manager.character);
	var character : GameObject = Instantiate(Resources.Load("P"+ manager.character), gameObject.transform.position, gameObject.transform.rotation);
}