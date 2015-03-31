#pragma strict

public var characters : GameObject[];
private var numCharacters : int;
private var position : int;

//Light that will move;
public var spotlight:GameObject;
//Speed of the spotlight
public var speed: float = 10;


function Start () {
	numCharacters = characters.length;
	position = Mathf.Round(numCharacters/2);
	var target: Vector3 = characters[(position)].transform.position;
	//Make the default light hover over the default character (who ever is in the middle)
	spotlight.transform.position.x = target.x;
	spotlight.transform.position.z = target.z-1;

	InvokeRepeating("checkInput", 0, .1);
}
function checkInput(){
	if (Input.GetAxisRaw ("Horizontal") <= -1 && position > 0){
		moveLeft();
	}
	if (Input.GetAxisRaw ("Horizontal") >=1 && position < (characters.Length-1)){
		moveRight();
	}
}

function Update () {
	
	//Add Listeners
	if (Input.GetAxisRaw ("Horizontal") <= -1 && position > 0){
		//moveLeft();
	}
	if (Input.GetAxisRaw ("Horizontal") >=1 && position < (characters.Length-1)){
		//moveRight();
	}
	//Debug.Log(Input.GetAxisRaw ("Horizontal"));
	//Testing purposes
	if(Input.GetButtonDown ("Jump")){
		var characterName = getCharacter();
		var manager: GameManager = GameObject.Find("gameManager").GetComponent("GameManager");
		
		if (characterName.name == "Player1"){
			Debug.Log('works!');
			manager.character = 1;
		}else if (characterName.name == "Player2"){
			Debug.Log('works!');
			manager.character = 2;
		}else if (characterName.name == "Player3"){
			Debug.Log('works!');
			manager.character = 3;
		}else{
			manager.character = 1;
		}
		//Application.LoadLevel(Application.loadedLevel + 1);
		manager.LoadNextLevel();
		Debug.Log(characterName);
	}
}
function moveLeft(){
	var target: Vector3;
	position--;
	target = characters[(position)].transform.position;
	spotlight.transform.position.x = target.x;
	spotlight.transform.position.z = target.z-1;
}
function moveRight(){
	var target: Vector3;
	position++;
	target = characters[(position)].transform.position;
	spotlight.transform.position.x = target.x;
	spotlight.transform.position.z = target.z-1;

}
function getCharacter(){
	return characters[position];
}