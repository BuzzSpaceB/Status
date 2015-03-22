var FR;
var lvl1;
var lvl2;
var lvl3;

$(document).ready(function(){

	//converts all input fields to json for insertion into database, including icons
	//for creating appraisal
    $("#submit").click(function () {
        var createAppraisal={name: $("#appraisal").val(), description: $("#description").val(), notRatedIcon: FR};
        JSON.stringify(createAppraisal);
    });
	
	//converts all input fields to json for insertion into database, including icons
	//for creating appraisal levels
    $("#submit2").click(function(){
       var appraisalLevels={level1: $("#lvl1").val(), level2: $("#lvl2").val(), level3: $("#lvl3").val(), level1icon: lvl1, level2icon: lvl2, level3icon: lvl3};
        JSON.stringify(appraisalLevels);
    });

    $("#notRatedIcon").change(function(){
        readNotRatedIcon(this);
    });

    $("#lvl1icon").change(function () {
        readLevel1Icon(this);
    })
    $("#lvl2icon").change(function () {
        readLevel2Icon(this);
    })
    $("#lvl3icon").change(function () {
        readLevel3Icon(this);
    })
});

//following functions convert images to base64
function readNotRatedIcon(input) {
    if (input.files && input.files[0]) {
        FR = new FileReader();
        FR.onload = function (e) {
            $('#nri').attr("src", e.target.result);
            $('#base').text("Image string for json: "+e.target.result);
        };
        FR.readAsDataURL(input.files[0]);
    }
}

function readLevel1Icon(input) {
    if (input.files && input.files[0]) {
        lvl1 = new FileReader();
        lvl1.onload = function (e) {
            $('#nri').attr("src", e.target.result);
            $('#base').text("Image string for json: "+e.target.result);
        };
        lvl1.readAsDataURL(input.files[0]);
    }
}

function readLevel2Icon(input) {
    if (input.files && input.files[0]) {
        lvl2 = new FileReader();
        lvl2.onload = function (e) {
            $('#nri').attr("src", e.target.result);
            $('#base').text("Image string for json: "+e.target.result);
        };
        lvl2.readAsDataURL(input.files[0]);
    }
}

function readLevel3Icon(input) {
    if (input.files && input.files[0]) {
        lvl3 = new FileReader();
        lvl3.onload = function (e) {
            $('#nri').attr("src", e.target.result);
            $('#base').text("Image string for json: "+e.target.result);
        };
        lvl3.readAsDataURL(input.files[0]);
    }
}