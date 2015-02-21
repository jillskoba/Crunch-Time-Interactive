#pragma strict

public var levels : GameObject[];
private var numlevels : int;
private var position : int;

//Light that will move;
public var spotlight:GameObject;
//Speed of the spotlight
public var speed: float = 10;


function Start () {
	numlevels = levels.length;
	position = Mathf.Round(numlevels/2);
	var target: Vector3 = levels[(position)].transform.position;
	//Make the default light hover over the default character (who ever is in the middle)
	spotlight.transform.position.x = target.x;
	spotlight.transform.position.z = target.z-1;
	
}

function Update () {
	var target: Vector3;
	//Add Listeners
	if (Input.GetKeyDown (KeyCode.A) && position > 0){
		position--;
		target = levels[(position)].transform.position;
		spotlight.transform.position.x = target.x;
		spotlight.transform.position.z = target.z-1;
	}
	if (Input.GetKeyDown (KeyCode.D) && position < (levels.Length-1)){
		position++;
		target = levels[(position)].transform.position;
		spotlight.transform.position.x = target.x;
		spotlight.transform.position.z = target.z-1;
	}
	//Testing purposes
	if(Input.GetKeyDown (KeyCode.Space)){
		var levelName = getLevel();
		var manager: GameManager = GameObject.Find("gameManager").GetComponent("GameManager");
		
		if (levelName.name == "Player1"){
			Debug.Log('works!');
			manager.currentLevel = 1;
		}else if (levelName.name == "Player2"){
			Debug.Log('works!');
			manager.currentLevel = 2;
		}else if (levelName.name == "Player3"){
			Debug.Log('works!');
			manager.currentLevel = 3;
		}else{
			manager.currentLevel = 1;
		}
		//Application.LoadLevel(Application.loadedLevel + 1);
		manager.LoadLevel();
	}
}
function getLevel(){
	return levels[position];
}