$(
	function(){
		$( document ).keydown(
			function ( event ) { 
				Typer.addText( event ); //Capture the keydown event and call the addText, this is executed on page load
				
			}
		);
	}
);

var Typer={
	text: null,
	accessCountimer:null,
	index:0, // current cursor position
	speed:2, // speed of the Typer
	file:"", //file, must be setted
	accessCount:0, //times alt is pressed for Access Granted
	injectingCount:0,
	deniedCount:0, //times caps is pressed for Access Denied
	init: function(){// inizialize Hacker Typer
		accessCountimer=setInterval(function(){Typer.updLstChr();},500); // inizialize timer for blinking cursor
		$.get(Typer.file,function(data){// get the text file
			Typer.text=data;// save the textfile in Typer.text
			
		});
	},
	
	content:function(){
		return $("#console").html();// get console content
	},
	
	write:function(str){// append to console content
		$("#console").append(str);
		return false;
		
	},
	
	makeInjecting:function(){//create Access Granted popUp      FIXME: popup is on top of the page and doesn't show is the page is scrolled
		Typer.hidepop(); // hide all popups
		Typer.accessCount=0; //reset count
		var ddiv=$("<div id='inj'>").html(""); // create new blank div and id "inj"
		ddiv.addClass("injecting"); // add class to the div
		ddiv.html("<h1>INJECTING<br />PAYLOADS...</h1><br /><p>PLEASE BE PATIENT</p>"); // set content of div
		$(document.body).prepend(ddiv); // prepend div to body
		return false;
	},
	
	
	makeAccess:function(){//create Access Granted popUp      FIXME: popup is on top of the page and doesn't show is the page is scrolled
		Typer.hidepop(); // hide all popups
		Typer.accessCount=0; //reset count
		var ddiv=$("<div id='gran'>").html(""); // create new blank div and id "gran"
		ddiv.addClass("accessGranted"); // add class to the div
		ddiv.html("<h1>ACCESS GRANTED</h1><br /><p>Root Access Acquired</p>"); // set content of div
		$(document.body).prepend(ddiv); // prepend div to body
		return false;
	},
	makeDenied:function(){//create Access Denied popUp      FIXME: popup is on top of the page and doesn't show is the page is scrolled
		Typer.hidepop(); // hide all popups
		Typer.deniedCount=0; //reset count
		var ddiv=$("<div id='deni'>").html(""); // create new blank div and id "deni"
		ddiv.addClass("accessDenied");// add class to the div
		ddiv.html("<h1>ACCESS DENIED</h1><br /><p>Unauthorized Request</p>");// set content of div
		$(document.body).prepend(ddiv);// prepend div to body
		return false;
	},
	
	hidepop:function(){// remove all existing popups
		$("#deni").remove();
		$("#gran").remove();
		$("#inj").remove();
		
	},
	
	addText:function(key){//Main function to add the code
		if(key.keyCode==18){// key 18 = alt key
			Typer.accessCount++; //increase counter 
			if(Typer.accessCount>=3){// if it's presed 3 times
				Typer.makeAccess(); // make access popup
			}
		}else if(key.keyCode==20){// key 20 = caps lock
			Typer.deniedCount++; // increase counter
			if(Typer.deniedCount>=3){ // if it's pressed 3 times
				Typer.makeDenied(); // make denied popup
			}
				}else if(key.keyCode==17){// key 17 = ctrl
			Typer.deniedCount++; // increase counter
			if(Typer.deniedCount>=3){ // if it's pressed 3 times
				Typer.makeInjecting(); // make denied popup
				
			}
		}else if(key.keyCode==27){
			Typer.accessCount=0;
			Typer.deniedCount=0; // key 27 = esc key
			Typer.hidepop(); // hide all popups
		}else if(Typer.text){ // otherway if text is loaded
			var cont=Typer.content();
			 // get the console content
			if(cont.substring(cont.length-1,cont.length)=="|") // if the last char is the blinking cursor
				$("#console").html($("#console").html().substring(0,cont.length-1)); // remove it before adding the text
			if(key.keyCode!=8){ // if key is not backspace
				Typer.index+=Typer.speed;	// add to the index the speed
			}else{
				if(Typer.index>0) // else if index is not less than 0 
					Typer.index-=Typer.speed;//	remove speed for deleting text
			}
			var text=$("<div/>").text(Typer.text.substring(0,Typer.index)).html();// parse the text for stripping html enities
			var rtn= new RegExp("\n", "g"); // newline regex
			var rts= new RegExp("\\s", "g"); // whitespace regex
			var rtt= new RegExp("\\t", "g"); // tab regex
			$("#console").html(text.replace(rtn,"<br/>").replace(rtt,"&nbsp;&nbsp;&nbsp;&nbsp;").replace(rts,"&nbsp;"));// replace newline chars with br, tabs with 4 space and blanks with an html blank
			window.scrollBy(0,50); // scroll to make sure bottom is always visible
		}
		if ( key.preventDefault && key.keyCode != 122 ) { // prevent F11(fullscreen) from being blocked
			key.preventDefault()
		};  
		if(key.keyCode != 122){ // otherway prevent keys default behavior
			key.returnValue = false;
		}
	},
	
	updLstChr:function(){ // blinking cursor
		var cont=this.content(); // get console 
		if(cont.substring(cont.length-1,cont.length)=="|") // if last char is the cursor
			$("#console").html($("#console").html().substring(0,cont.length-1)); // remove it
		else
			this.write("|"); // else write it
			
			var blink_speed = 500;
var t = setInterval(function () {
    var ele = document.getElementById('gran');
    ele.style.visibility = (ele.style.visibility == 'hidden' ? '' : 'hidden');
}, blink_speed);


var blink_speed = 500; 
var t = setInterval(function () {
    var ele = document.getElementById('deni');
    ele.style.visibility = (ele.style.visibility == 'hidden' ? '' : 'hidden');
}, blink_speed);

var blink_speed = 450; 
var t = setInterval(function () {
    var ele = document.getElementById('inj');
    ele.style.visibility = (ele.style.visibility == 'hidden' ? '' : 'hidden');
}, blink_speed);
			
	}
}
