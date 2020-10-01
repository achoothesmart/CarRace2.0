/*
Project Name: CarGame
Developed by: Prasanna Ashok
Platform: JavaScript + HTML
*/

var time_interval=setInterval(function(){timer_tick()},5);
var nav_interval;
var nav_Speed = 5;
var Game_Status="start"; //"start","pause","play","over"

	var Road_Width;
	var Road_Height;
	var Road_Top;
	var Road_Left;
	
	var Car_Width;
	var Car_Height;
	var Car_Top;
	var Car_Left;
	
	var Obs1_Top;
	var Obs2_Top;
	var Obs1_Left;
	var Obs2_Left;
	
function Read_Values()
{
	Road_Width = document.getElementById("Road").offsetWidth;
	Road_Height = document.getElementById("Road").offsetHeight;
	Road_Top = document.getElementById("Road").offsetTop;
	Road_Left = document.getElementById("Road").offsetLeft;
	
	Car_Width = document.getElementById("Car").offsetWidth;
	Car_Height = document.getElementById("Car").offsetHeight;
	Car_Top = document.getElementById("Car").offsetTop;
	Car_Left = document.getElementById("Car").offsetLeft;
	
	Obs1_Top = document.getElementById("Obs1").offsetTop;
	Obs2_Top = document.getElementById("Obs2").offsetTop;
	Obs1_Left = document.getElementById("Obs1").offsetLeft;
	Obs2_Left = document.getElementById("Obs2").offsetLeft;
}

function Update_Values()
{
	document.getElementById("Car").style.width = Car_Width;
	document.getElementById("Car").style.height = Car_Height;
	document.getElementById("Car").style.top = Car_Top;
	document.getElementById("Car").style.left = Car_Left;
	
	document.getElementById("Road").style.width = Road_Width;
	document.getElementById("Road").style.height = Road_Height;
	document.getElementById("Road").style.top = Road_Top;
	document.getElementById("Road").style.left = Road_Left;
	
	document.getElementById("Obs1").style.top = Obs1_Top;
	document.getElementById("Obs2").style.top = Obs2_Top;
	document.getElementById("Obs1").style.left = Obs1_Left;
	document.getElementById("Obs2").style.left = Obs2_Left;
}


function page_load()
{
	

	//Reading Values
	Read_Values();
	//////////////////////------------

	
	
	Car_Top = Road_Height-Car_Height -20;
	Car_Left = Road_Left + 20;
	var WL_Center = Road_Width/2 - 10;
	
	document.getElementById("WL1").style.left = WL_Center;
	document.getElementById("WL2").style.left = WL_Center;
	document.getElementById("WL3").style.left = WL_Center;
	document.getElementById("WL4").style.left = WL_Center;
	document.getElementById("WL5").style.left = WL_Center;
	
	for(var i=1; i<=5; i++)
	{
		document.getElementById("WL"+i).style.top = ((i*120) - 80)+'px';
	}
	
	//Assigning Values Back
	Update_Values();
}

function ModelCar_Click()
{
	alert("car");
	alert(document.getElementById("Car").offsetLeft);
}

function msg(str)
{
	document.getElementById("msg").innerHTML=str;
}


/*----------------Timer------------------------------*/

function timer_tick()
{
	//document.getElementById("Car").style.left=document.getElementById("Car").offsetLeft+1+'px';
	//msg(document.getElementById("Car").offsetLeft+1+'px');
    //Set_BoardText("");
    
    if (Game_Status == "pause") {
        Pause_Game();
        return;
    }
    else if (Game_Status == "start") 
    {
        Pause_Game();
        Set_BoardText("Press Space to Start");
        return;
    }
    else Set_BoardText("");
	
	for(var i=1; i<=5; i++)
	{
		
		var WLi_Top = document.getElementById("WL"+i).offsetTop;
		var WLi_Height = document.getElementById("WL"+i).offsetHeight;
		
		WLi_Top = WLi_Top+1;
		
		if(WLi_Top >  Road_Height)
		{
			WLi_Top = Road_Top - WLi_Height - 70;
		}	
		
		//Updating
		document.getElementById("WL"+i).style.top = WLi_Top;
	}
	
	Read_Values();
		if(Obs1_Top > Road_Height)
		{
			Obs1_Top = Road_Top - 100;
			
			if(Car_Left < (Road_Width/2)-15)
			{
				//msg("Left Side");
				Obs1_Left = Car_Left;
			}
			
		}
		if(Obs2_Top > Road_Height)
		{
			Obs2_Top = Road_Top - 150;
			
			if(Car_Left >= (Road_Width/2)-15)
			{
				//msg("Right Side");
				Obs2_Left = Car_Left;
			}
			
		}		
		
		
		Obs1_Top = Obs1_Top+1;
		Obs2_Top = Obs2_Top+1;
		
		
		//Clash Condition
		if(Car_Left <= Obs1_Left+40 && Car_Left >=Obs1_Left-30 && Car_Top <= Obs1_Top+40 && Car_Top >= Obs1_Top-46) //40:Obstacle Width/Height
		{
			Game_Over();
		}
		
		if(Car_Left <= Obs2_Left+40 && Car_Left >=Obs2_Left-30 && Car_Top <= Obs2_Top+40 && Car_Top >= Obs2_Top-46) //40:Obstacle Width/Height
		{
			Game_Over();
		}
		
	Update_Values();

}

function Set_BoardText(str)
{
    document.getElementById("Board").innerHTML = str;
}

function Game_Over()
{
	//msg("Game Over");
    Set_BoardText("Game Over");
	clearInterval(time_interval);
}

function Pause_Game()
{
	//msg("Paused");
	Game_Status="pause";
	Set_BoardText("Paused");
	clearInterval(time_interval);
}

function Resume_Game()
{
	clearInterval(time_interval);
	Game_Status="play";
	time_interval=setInterval(function(){timer_tick()},1);
}
/*===================================================*/

function Page_KeyDown(event)
{
	Read_Values();
	var key=event.keyCode;
	switch(key)
	{
		case 27:
			Pause_Game();
			break;
		case 37: 
			onLeftKey();
			break;
		case 39: 
			onRightKey();
			break;
		case 32:
			Resume_Game();
			break;
		case 65: //a
			Move_Car("Right");
			//Move_Car_Left();
			break;
		case 83: //s
			Move_Car("Left");
			//Move_Car_Right();
			break;
		default:
			//msg("keyCode: " + key);    
			
			break;
	}
	
	Update_Values();
}

function Page_KeyUp()
{
	var key=event.keyCode;
	switch(key)
	{
		case 32: 
			clearInterval(time_interval);
			time_interval=setInterval(function(){timer_tick()},5);
			break;
		default:
			stopNav();
			break;
	}
}

/// external calling method
function stopNav(){
	clearInterval(nav_interval);
}

function Move_Car(dir)
{
	if(Game_Status=="play")
	{
		switch(dir)
		{
			case "Right":
				//Move_Car_Right();
				break;
			case "Left":
				//Move_Car_Left();
				break;
		}
	}
}

function onLeftKey()
{
	clearInterval(nav_interval);
	nav_interval=setInterval(function(){Move_Car_Left()},10);
}

function onRightKey()
{
	clearInterval(nav_interval);
	nav_interval=setInterval(function(){Move_Car_Right()},10);
}

function Move_Car_Right()
{
	Read_Values();
	if(Car_Left < Road_Width+Road_Left-Car_Width-10)
	{
		Car_Left = Car_Left + nav_Speed;
	}
	Update_Values();
}

function Move_Car_Left()
{
	Read_Values();
	if(Car_Left > Road_Left)
	{
		Car_Left = Car_Left - nav_Speed;
	}
	Update_Values();
}