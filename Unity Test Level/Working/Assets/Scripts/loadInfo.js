#pragma strict

function Start () {
	if(PlayerPrefs.HasKey("Color")){
		if(PlayerPrefs.GetString("Color") == "Green"){
			renderer.material.color = Color.green;
		}
		else if(PlayerPrefs.GetString("Color") == "Yellow"){
			renderer.material.color = Color.yellow;
		}
		else if(PlayerPrefs.GetString("Color") == "Red"){
			renderer.material.color = Color.red;
		}
	}
	
	//instantiate character from Resources Folder
	
	var playerHolder : GameObject = GameObject.Find("holder");
	var example : String = "dude";
	var character : GameObject = Instantiate(Resources.Load(example)) as GameObject;
	
	character.transform.parent = playerHolder.transform;
	character.transform.localPosition = new Vector3(0,0,0);
}