var jsonAppraisalLevels;
var jsonAppraisal;
var jsonPeriod;
var appraisalLevels=[];
var appraisal;
var period;

/**
 * Convert textbox input into json strings for database insertion
 *
 * @param  {String} _name - Name of appraisal
 * @param {String} _description - Description of appraisal
 * @return {String}
 */
exports.createAppraisal=function(_name, _description){

    appraisal={name: _name, description: _description};
    jsonAppraisal=JSON.stringify(appraisal);
    return jsonAppraisal;
};

/**
 * Convert textbox input into json strings for database insertion
 *
 * {int} appraisalNumber - level of the appraisal (1, 2, etc.)
 * {String} levelName - name of the appraisal level
 * @return {String}
 */
exports.addAppraisalLevel=function(appraisalNumber, levelName){

    appraisalLevels.push({rating: appraisalNumber, rating_name: levelName});
    jsonAppraisalLevels=JSON.stringify(appraisalLevels);
    return jsonAppraisalLevels;
};

/**
 * Convert image/icon to base64
 *
 * @param  input - An uploaded image from html
 * @param {String} iconName - Name of the image being uploaded (ie. lvl1, notratedicon, etc)
 * @return {String} base64
 */
exports.readIcon=function(input, iconName) {
    if (input.files && input.files[0]) {
        var FR = new FileReader();
        FR.readAsDataURL(input.files[0]);

        if (iconName=="notratedicon")
        {
            appraisal["notratedicon"]=FR;
        }
        else
        {
            appraisalLevels[iconName]=FR;
        }

        jsonAppraisal=JSON.stringify(appraisal);
        jsonAppraisalLevels=JSON.stringify(appraisalLevels);

        return FR;
    }
};

/**
 * Specify an activation period for an appraisal
 *
 * @param active_from - date to start activation period
 * @param active_to - date to end activation period
 * @returns {String}
 */
exports.activePeriod=function(active_from, active_to){
    period={"active_from": active_from, "active_to": active_to};
    jsonPeriod=JSON.stringify(period);
    return jsonPeriod;
};

/**
 * Store json in database
 *
 * 
 */
exports.store=function(){
	
	var Appraisal=require('../models/appraisal');

    var newAppraisal=new Appraisal();
    newAppraisal.name=appraisal["name"];
    newAppraisal.description=appraisal["description"];
    newAppraisal.not_rated_icon=appraisal["notratedicon"];
    newAppraisal.active_from=period["active_from"];
    newAppraisal.active_to=period["active_to"];

    var jsonLevels=JSON.parse(levels);
	newAppraisal.appraisal_ratings=jsonLevels;

    newAppraisal.save(function(err){
       if (err)
           console.log(err);
        else
            console.log("saved");
    });
};