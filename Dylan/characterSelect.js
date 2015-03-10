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
	
}

function Update () {
	var target: Vector3;
	//Add Listeners
	if (Input.GetKeyDown (KeyCode.A) && position > 0){
		position--;
		target = characters[(position)].transform.position;
		spotlight.transform.position.x = target.x;
		spotlight.transform.position.z = target.z-1;
	}
	if (Input.GetKeyDown (KeyCode.D) && position < (characters.Length-1)){
		position++;
		target = characters[(position)].transform.position;
		spotlight.transform.position.x = target.x;
		spotlight.transform.position.z = target.z-1;
	}
	//Testing purposes
	if(Input.GetKeyDown (KeyCode.Space)){
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
		Application.LoadLevel(Application.loadedLevel + 1);
		Debug.Log(characterName);
	}
}
function getCharacter(){
	return characters[position];
}