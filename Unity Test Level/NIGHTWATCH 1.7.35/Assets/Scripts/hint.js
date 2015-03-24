#pragma strict

public var hints:String[];

private var isInArea:boolean = false;
private var position:int;
public var customGuiStyle : GUIStyle;

function Start () {

}

function Update () {
	if(Input.GetButtonDown ("Fire3") == true){
		if (position == null || position >= (hints.Length-1)){
			position = 0;
		}else{
			position++;
		}
	
	}
}
function OnTriggerEnter (other : Collider) {
	if(other.tag =='Player'){
		quack();
	}
}
function OnTriggerExit (other : Collider) {
	if(other.tag =='Player'){
		shutUp();
	}
}
function quack(){
	isInArea = true;
	Debug.Log('Entered Duck Region!');
	audio.Play();
}
function shutUp(){
	isInArea = false;
	audio.Pause();
}
function OnGUI () {
	if (isInArea == true){
    	GUI.TextArea (Rect (Screen.width/3.1, Screen.height/1.3, 500, 50), hints[position], customGuiStyle);
    }
}