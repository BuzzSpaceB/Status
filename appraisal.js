//<img src="Emoj/A.png" title="Appraisal" id="appraisalButton" onclick="popup();" height="50" width="50"><div id="popon"></div>

var popupHide=true;
var loadedAppraisals=false;
var tbl = document.createElement("table");
var pop = document.getElementById("popon");

function getCurrentAppraisal()
{
	/* 
	If you have previously voted on an appraisal it should be added on loading of page
	*/
	//pop.src="Emoj/"+type+".png";
}

function popup()
{
	if(popupHide)//display appraisals
	{
		if(!loadedAppraisals)
		{
			addAppraisals();
		}
		displayPopup();
	}
	else// hide appraisals
	{
		hidePopup();
	}
}

function addAppraisals()//adds Appraisal types to the appraisals table
{
	tbl.id = "popTable";
			
	//get location of appraisalButton and set it to bottom right on popup
	var element = document.getElementById('appraisalButton');
	var position = element.getBoundingClientRect();
	var x = position.left;
	var y = position.top;
	pop.style.top=y+50+"px";
	pop.style.left=x+50+"px";
	
	//create tble of appraisals only 4*4 currently not dynamic
	for ( var r = 0; r < 4; ++r )
	{
		var tr = tbl.insertRow(-1);
		for ( var c = 0; c < 4; ++c )
		{
			var td1 = tr.insertCell(-1);
			td1.innerHTML = "<img src='Emoj/"+((r*4)+c+1)+".png' title='Smiley face' alt=''height='30' width='30' onclick='updateAppraisal("+((r*4)+c+1)+");'>";
		}
	}
	pop.appendChild(tbl);
	loadedAppraisals=true;
}

function hidePopup()
{
	pop.style.display = "none";
	tbl.style.display = "none";
	popupHide=true;
}

function displayPopup()
{
	pop.style.display = "block";
	tbl.style.display = "block";
	popupHide=false;
}

function updateAppraisal(type)
{
	hidePopup();
	var pop = document.getElementById("appraisalButton");
	pop.src="Emoj/"+type+".png";
}