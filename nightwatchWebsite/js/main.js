// JavaScript Document

function init() {
	document.getElementById("enter").addEventListener("click", function(){
    	var cover = document.querySelector("#cover");
    	var main = document.querySelector("#mainContent");
    	var content = document.getElementsByClassName("content");

    	TweenLite.to(cover, 1, {display: 'none', opacity: 0});
    	TweenLite.to(main, 1, {display: 'block', opacity: 1, delay:1});
		TweenLite.to(content, 1, {display: 'block', opacity: 1, delay:2});
	});
}

window.addEventListener("load", init, false);