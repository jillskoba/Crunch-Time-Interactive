#pragma strict

var waypoints : Transform[];

private var currentWaypoint : Transform;
private var currentIndex : int;

var moveSpeed : float = 2.0;
var minDistance : float = 1.0;

function Start() : void {
	currentWaypoint = waypoints[0];
	currentIndex = 0;
}

function Update(){
	MoveTowardWaypoint();

	if (Vector3.Distance(currentWaypoint.transform.position, transform.position) < minDistance){
		++currentIndex;
		if (currentIndex > waypoints.length -1){
			currentIndex = 0;
		}
		currentWaypoint = waypoints[currentIndex];
	}
}

function MoveTowardWaypoint(): void{
	var direction : Vector3 = currentWaypoint.transform.position- transform.position;
	var moveVector : Vector3 = direction.normalized * moveSpeed * Time.deltaTime;
	transform.position += moveVector;
	//transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction), 4 * Time.deltaTime);
}