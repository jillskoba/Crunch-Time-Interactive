#pragma strict
var currentLevel : int = 0;
var playerHealth : int = 3; //Character Health
var character : float = 1; //Character Selection

//-------CHARACTER INVENTORY---------
var fragments : int = 0;
var batteries : int = 0;
var overcharge : int = 0;
var overchargeLimit : int = 1;
var batteryLimit : int = 5;


//-------GAME GUI---------
public var fragmentIcon : Texture2D;
public var batteryItemIcon : Texture2D;
public var overchargeItemIcon : Texture2D;

public var statusPlateBack : Texture2D;
public var statusPlateFront : Texture2D;

public var healthBar : Texture2D;
public var healthBarEnd : Texture2D;

public var powerBar : Texture2D;
public var powerBarEnd : Texture2D;

public var inventoryPlate : Texture2D;

//fragment icon dimensions
public var fragmentIconWidth : float;
public var fragmentIconHeight : float;

//battery icon dimensions
public var batteryIconWidth : float;
public var batteryIconHeight : float;

//overcharge icon dimensions
public var overchargeIconWidth : float;
public var overchargeIconHeight : float;

//inventory plate dimensions
public var inventoryPlateWidth : float;
public var inventoryPlateHeight : float;

//health bar dimensions
public var healthWidth : float;
public var healthHeight : float;

//power bar dimensions
public var powerWidth : float;
public var powerHeight : float;
public var pbEndWidth : float;
public var pbEndHeight : float;

//health frame dimensions
public var statusFrameWidth : float;
public var statusFrameHeight : float;

//health frame padding
public var statusTopMarginLeft : float;
public var statusTopMarginTop : float;

//Health Bar additional variables
private var maxPlayerHealth : float; //capture the total possible amount of health a player can have in-game
public var healthChunk : float; //captures 'chunks' of the health bar, according to Health Bar Width / Player Health

//Power Bar additional variables
private var maxPlayerPower : float; //capture the total possible amount of power a player can have in-game
public var powerChunk : float; //captures 'chunks' of the power bar, according to Power Bar Width / Player Power

//-------Flashlight Copy-over-------//
public var flashlightPower : float = 100;
public var flashlightDecaySpeed : float = 25;
public var flashlightRecoverPower : float = 20;
public var lightOn : boolean = false;


//----------------------------------------------END DECLARATIONS------------------------------------

function Start() {
	maxPlayerHealth = playerHealth;
	healthChunk = healthWidth / maxPlayerHealth * playerHealth;
	
	maxPlayerPower = flashlightPower;
	powerChunk = powerWidth / maxPlayerPower * flashlightPower;
	
	InvokeRepeating("FlashlightPower", 1, .5); 
	lightOn = false;
	
}

function Update() {
	healthChunk = healthWidth / maxPlayerHealth * playerHealth;
	powerChunk = powerWidth / maxPlayerPower * flashlightPower;
	
	//Activate Light
	if (Input.GetButtonDown ("Fire1") && flashlightPower > 0){ 
		lightOn = !lightOn;
	}
	
	//Consume Battery
	if (Input.GetButtonDown ("Fire2") && flashlightPower < 100 && batteries > 0){ 
		flashlightPower += flashlightRecoverPower;
		UseBattery();
	}
	
	//Keeps power from exceeding 100
	if (flashlightPower > 100) {
		flashlightPower = 100;
	}
	
	// Kills flashlight when it runs out of power
        if (flashlightPower <= 0) {
        	lightOn = false;
        }
	
}


//----------HEALTH----------
function GainHealth () {
	if (playerHealth < 3) {
		playerHealth += 1;
	} else {
		playerHealth = 3;
	}
}

function LoseHealth () {
	if (playerHealth > 0) {
		playerHealth -= 1;
	} else {
		playerHealth = 0;
	}
}

//----------FRAGMENTS----------

function PickupFragment () {
	fragments += 1;
}

//----------BATTERIES----------

function PickupBattery () {
	if (batteries == 0) {
		batteryItemIcon = Resources.Load("batteryIcon-Active") as Texture2D;
	}
	batteries += 1;
}

function UseBattery () {
	batteries -= 1;
	if (batteries == 0) {
		batteryItemIcon = Resources.Load("batteryIcon-Inactive") as Texture2D;
	}
}

//----------OVERCHARGE----------

function PickupOvercharge () {
	if (overcharge == 0) {
			overchargeItemIcon = Resources.Load("overchargeIcon-Active") as Texture2D;
		}
	overcharge += 1;
}

function UseOvercharge () {
	if (overcharge > 0){
		overcharge -= 1;
	} else {
		overcharge = 0;
	}
	if (overcharge == 0) {
		overchargeItemIcon = Resources.Load("overchargeIcon-Inactive") as Texture2D;
	}
}

//----------LEVEL----------

function Awake () {
	DontDestroyOnLoad (gameObject);
}

function LoadNextLevel () {
	currentLevel += 1;
	Application.LoadLevel(currentLevel);
}

function LoadLevel(){
	Application.LoadLevel(currentLevel);
}

//----------Flashlight-------

function FlashlightPower (){
	if (lightOn) {
		flashlightPower -= flashlightDecaySpeed * Time.deltaTime;
	}
}

//----------GUI----------

function OnGUI() {
	//var customSkin : GUISkin = Resources.Load("myGUI") as GUISkin;

	var whiteText = GUI.skin.GetStyle("Label");
	whiteText.richText = true;
	whiteText.fontSize = 16;

	//GUI.skin = customSkin;
	GUI.contentColor = Color.black;
	
	if (Application.loadedLevel >= 2) { //if we're in an actual game level
	
		//Health Bar
		GUI.DrawTexture(Rect(statusTopMarginLeft, statusTopMarginTop,statusFrameWidth,statusFrameHeight), statusPlateBack); //status plate back
		GUI.DrawTexture(Rect(statusTopMarginLeft + 34, statusTopMarginTop,healthChunk,healthHeight), healthBar); //health bar
		GUI.DrawTexture(Rect(statusTopMarginLeft + 34 + healthChunk, statusTopMarginTop,13,28), healthBarEnd); //health bar end
		
		GUI.DrawTexture(Rect(statusTopMarginLeft + 34, statusTopMarginTop + 27,powerChunk,powerHeight), powerBar); //power bar
		//GUI.DrawTexture(Rect(statusTopMarginLeft + 34 + powerChunk, statusTopMarginTop + 27,pbEndWidth,pbEndHeight), powerBarEnd); //power bar end
		
		GUI.DrawTexture(Rect(statusTopMarginLeft, statusTopMarginTop,statusFrameWidth,statusFrameHeight), statusPlateFront); //status plate front
		
		//Fragment Count
		GUI.DrawTexture(new Rect(Screen.width - Screen.width, Screen.height - 50,fragmentIconWidth,fragmentIconHeight), fragmentIcon); //fragment icon
		GUI.Label(Rect(Screen.width - Screen.width + 36, Screen.height - 40,75,75), "<color=white>" + fragments + "</color>", whiteText); //fragment count
		 
		 //Inventory
		 GUI.DrawTexture(new Rect(Screen.width / 2, Screen.height - 65, inventoryPlateWidth, inventoryPlateHeight), inventoryPlate); //inventory plate
		 GUI.DrawTexture(new Rect(Screen.width / 2 + 29, Screen.height - 55, batteryIconWidth, batteryIconHeight), batteryItemIcon); //battery inventory icon
		 GUI.DrawTexture(new Rect(Screen.width / 2 + 89, Screen.height - 55, overchargeIconWidth, overchargeIconHeight), overchargeItemIcon); //overcharge inventory icon
		 GUI.Label(Rect(Screen.width / 2 + 53, Screen.height - 35,75,75), "<color=white>" + batteries + "</color>", whiteText); //battery count
		 GUI.Label(Rect(Screen.width / 2 + 116, Screen.height - 35,75,75), "<color=white>" + overcharge + "</color>", whiteText); //overcharge count
	}
}