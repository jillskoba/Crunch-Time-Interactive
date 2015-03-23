#pragma strict
var currentLevel : int = 0;
var playerHealth : int = 3; //Character Health
var character : float = 1; //Character Selection

//-------CHARACTER INVENTORY---------
var fragments : int = 0;
var lives : int;
var livesToStart : int;
var fragmentsToLives : int;
var batteries : int = 0;
var overcharge : int = 0;
var overchargeLimit : int;
var batteryLimit : int;

public var fragmentsCollected : int = 0;
public var batteriesCollected : int = 0;
public var overchargeCollected : int = 0;

//-------GAME GUI---------
public var fragmentIcon : Texture2D;
public var lifeIcon : Texture2D;
public var batteryItemIcon : Texture2D;
public var overchargeItemIcon : Texture2D;

public var statusPlateBack : Texture2D;
public var statusPlateFront : Texture2D;

public var healthBar : Texture2D;
public var healthBarEnd : Texture2D;

public var powerBar : Texture2D;
public var powerBarEnd : Texture2D;

public var inventoryPlate : Texture2D;
public var highlight: Texture2D;

//fragment icon dimensions
public var fragmentIconWidth : float;
public var fragmentIconHeight : float;

//life icon dimensions
public var lifeIconWidth : float;
public var lifeIconHeight : float;

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
public var flashlightDecaySpeed : float = 50;
public var flashlightRecoverPower : float = 20;
public var lightOn : boolean = false;

public var overchargeLength : float = 10;
public var overchargeActive : boolean = false;

public var powerupSelect : int = 1;

public var playerAlive : boolean = true;

//--------Pause Screeen------------//
private var isPaused: boolean = false;

//----------------------------------------------END DECLARATIONS------------------------------------

function Start() {
	maxPlayerHealth = playerHealth;
	healthChunk = healthWidth / maxPlayerHealth * playerHealth;
	
	maxPlayerPower = flashlightPower;
	powerChunk = powerWidth / maxPlayerPower * flashlightPower;
	
	InvokeRepeating("FlashlightPower", 1, .5); 
	lightOn = false;
	overchargeActive = false;
	playerAlive = true;
	livesToStart = lives;
	isPaused = false;
}

function Update() {
	healthChunk = healthWidth / maxPlayerHealth * playerHealth;
	powerChunk = powerWidth / maxPlayerPower * flashlightPower;
	
	if(!isPaused){
		if (playerAlive == true) {
			//Activate Light
			if (Input.GetButtonDown ("Fire1") && flashlightPower > 0){ 
				lightOn = !lightOn;
			}
			
			if(Input.GetAxis("Vertical") > 0) {
				powerupSelect = 1;
			} else if (Input.GetAxis("Vertical") < 0) {
				powerupSelect = 2;
			}
		}
		
		//Keeps power from exceeding 100
		if (flashlightPower > 100) {
			flashlightPower = 100;
		}
		
		// Kills flashlight when it runs out of power
	    if (flashlightPower <= 0) {
	    	lightOn = false;
	    }
	    if(Input.GetButtonDown ("Cancel")){
			Debug.Log('pause!');
			pause();
	}
    }else{
	//Used to keep track of pause screen
		if(Input.GetButtonDown ("Fire1")){
			unpause();
		}
		if(Input.GetButtonDown ("Jump")){
			currentLevel = 1;
			LoadLevel();
		}
		if(Input.GetButtonDown("Cancel")){
			Application.Quit();
		}
	}
}

//----------Pause---------

function pause(){
	isPaused = true;
	Time.timeScale = 0;
}
function unpause(){
	isPaused = false;
	Time.timeScale = 1;
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
	if (playerHealth == 0) { //if player dies
		characterDeath();
	}
}


//----------Character Death--------
function characterDeath() {
	playerAlive = false;
	fragments -= fragmentsCollected;
	batteries -= batteriesCollected;
	overcharge -= overchargeCollected;
	lives -= 1;
	//transform.Find("PlayerMesh").animation.Play("Death"); //re-enable when this is fixed.
	yield WaitForSeconds(3.0);  // or however long you want it to wait
	if (lives <= 0) {
		Application.LoadLevel(0);
		lives = livesToStart;
	} else {
		Application.LoadLevel(Application.loadedLevel);
	}
		playerAlive = true;
		playerHealth = 3;
		flashlightPower = 100;
		fragmentsCollected = 0;
		batteriesCollected = 0;
		overchargeCollected = 0;
		isPaused = false;
}


//----------FRAGMENTS---------
function PickupFragment () {
	fragments += 1;
	fragmentsCollected += 1;
	if (fragments >= fragmentsToLives) {
		fragments = 0;
		lives += 1;
	}
}

//----------BATTERIES----------
function PickupBattery () {
	if (batteries == 0) {
		batteryItemIcon = Resources.Load("batteryIcon-Active") as Texture2D;
	}
	batteries += 1;
	batteriesCollected += 1;
}

function UseBattery () {
	batteries -= 1;
	if (batteries == 0) {
		batteryItemIcon = Resources.Load("batteryIcon-Inactive") as Texture2D;
	}
	flashlightPower += flashlightRecoverPower;
	batteriesCollected -= 1;
}

//----------OVERCHARGE----------
function PickupOvercharge () {
	if (overcharge == 0) {
			overchargeItemIcon = Resources.Load("overchargeIcon-Active") as Texture2D;
		}
	overcharge += 1;
	overchargeCollected += 1;
}

function UseOvercharge () {
	overcharge -= 1;
	if (overcharge == 0) {
		overchargeItemIcon = Resources.Load("overchargeIcon-Inactive") as Texture2D;
	}
	overchargeCollected -= 1;
	overchargeActive = true;
	audio.Play();
	yield WaitForSeconds(overchargeLength);
    overchargeCooldown();
}

function overchargeCooldown() {
	overchargeActive = false;
	audio.Pause();
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
	isPaused = false;
	Application.LoadLevel(currentLevel);
}

// wipes for all level loads, rather than linear progression
function OnLevelWasLoaded (level : int) {
		if (level >= 2) {
			fragmentsCollected = 0;
			batteriesCollected = 0;
			overchargeCollected = 0;
		}
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
		if (playerAlive) {
			if(isPaused){
				GUI.Label (Rect (Screen.width/2-150, Screen.height/2-75, 300, 150), "<size=60><color=white>Pause!</color></size>", whiteText);
				GUI.Label (Rect (Screen.width/2-120, Screen.height/2-10, 300, 150), "<size=10><color=white>Press left click to unpause! </color></size>", whiteText);
				GUI.Label (Rect (Screen.width/2-120, Screen.height/2+10, 300, 150), "<size=10><color=white>Press space to change levels! </color></size>", whiteText);
				GUI.Label (Rect (Screen.width/2-120, Screen.height/2+30, 300, 150), "<size=10><color=white>Press escape to exit game! </color></size>", whiteText);
			}
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
			
			//Life Count
			GUI.DrawTexture(new Rect(Screen.width - 70, Screen.height - 50,lifeIconWidth,lifeIconHeight), lifeIcon); //fragment icon
			GUI.Label(Rect(Screen.width - 20, Screen.height - 40,75,75), "<color=white>" + lives + "</color>", whiteText); //fragment count
			 
			 //Inventory
			 GUI.DrawTexture(new Rect(Screen.width - 68, 10, inventoryPlateWidth, inventoryPlateHeight), inventoryPlate); //inventory plate
			 GUI.DrawTexture(new Rect(Screen.width - 49, 30, batteryIconWidth, batteryIconHeight), batteryItemIcon); //battery inventory icon
			 GUI.DrawTexture(new Rect(Screen.width - 52, 95, overchargeIconWidth, overchargeIconHeight), overchargeItemIcon); //overcharge inventory icon
			 GUI.Label(Rect(Screen.width - 27, 52,75,75), "<color=white>" + batteries + "</color>", whiteText); //battery count
			 GUI.Label(Rect(Screen.width - 27, 115,75,75), "<color=white>" + overcharge + "</color>", whiteText); //overcharge count
			 
			 if (powerupSelect == 1) {
			 	GUI.DrawTexture(Rect(Screen.width - 63, 25, 50, 50), highlight); //batteryHover
			 }
			 
			 if (powerupSelect == 2) {
			 	GUI.DrawTexture(Rect(Screen.width - 63, 88, 50, 50), highlight); //overchargeHover
			 }
		}else {
			if (lives == 0) {
				GUI.Label (Rect (Screen.width/2-150, Screen.height/2-75, 300, 150), "<size=60><color=white>GAME OVER</color></size>", whiteText);
			} else {
				GUI.Label (Rect (Screen.width/2-150, Screen.height/2-75, 300, 150), "<size=60><color=white>YOU DIED</color></size>", whiteText);
			}
		}
	}
}