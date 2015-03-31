#pragma strict

public var levels : GameObject[];
private var numLevels : int;
private var position : int = 0;

//Light that will move;
public var spotlight:GameObject;
//Speed of the spotlight
public var speed: float = 10;


function Start () {
	numLevels = levels.length;
	position = Mathf.Round(numLevels/2);
	var target: Vector3 = levels[(position)].transform.position;
	//Make the default light hover over the default character (who ever is in the middle)
	spotlight.transform.position.x = target.x;
	spotlight.transform.position.z = target.z-1;
	InvokeRepeating("checkInput", 0, .1);
}
function checkInput(){
	if (Input.GetAxisRaw ("Horizontal") <= -1 && position > 0){
		moveLeft();
	}
	if (Input.GetAxisRaw ("Horizontal") >=1 && position < (levels.Length-1)){
		moveRight();
	}
}
function moveLeft(){
	var target: Vector3;
	position--;
	target = levels[(position)].transform.position;
	spotlight.transform.position.x = target.x;
	spotlight.transform.position.z = target.z-1;
}
function moveRight(){
	var target: Vector3;
	position++;
	target = levels[(position)].transform.position;
	spotlight.transform.position.x = target.x;
	spotlight.transform.position.z = target.z-1;

}

function Update () {
	var target: Vector3;
	//Add Listeners
//	if (Input.GetKeyDown (KeyCode.A) && position > 0){
//		position--;
//		target = levels[(position)].transform.position;
//		spotlight.transform.position.x = target.x;
//		spotlight.transform.position.z = target.z-1;
//	}
//	if (Input.GetKeyDown (KeyCode.D) && position < (levels.Length-1)){
//		position++;
//		target = levels[(position)].transform.position;
//		spotlight.transform.position.x = target.x;
//		spotlight.transform.position.z = target.z-1;
//	}
	//Testing purposes
	if(Input.GetButtonDown ("Jump")){
		var manager: GameManager = GameObject.Find("gameManager").GetComponent("GameManager");
		var levelName = getLevel();
		if (levelName.name == "Level 1"){
			Debug.Log('works!');
			manager.currentLevel = 1;
		}else if (levelName.name == "Level 2"){
			Debug.Log('works!');
			manager.currentLevel = 3;
		}else if (levelName.name == "Level 3"){
			Debug.Log('works!');
			manager.currentLevel = 4;
		}
		else if (levelName.name == "Level 4"){
			Debug.Log('works!');
			manager.currentLevel = 5;
		}
		else if (levelName.name == "Level 5"){
			Debug.Log('works!');
			manager.currentLevel = 6;
		}
		else if (levelName.name == "Level 6"){
			Debug.Log('works!');
			manager.currentLevel = 7;
		}
		else{
			manager.currentLevel = 1;
		}
		//Application.LoadLevel(Application.loadedLevel + 1);
		manager.LoadLevel();
		//Debug.Log(levelName);
	}
}
function getLevel(){
	return levels[position];
}