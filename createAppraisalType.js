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
    /*if (Object.keys(appraisalLevels)==0)
        appraisalLevels={appraisalNumber: levelName};
    else
       appraisalLevels[appraisalNumber]=levelName;*/

    appraisalLevels.push({appraisalNumber: levelName});
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
 * @param  db - db connection
 */
exports.store=function(db){

  //  var mongoose=require('mongoose');

    /*db.appraisals.save(jsonAppraisal, function(err, saved){
        if (err || !saved)
            console.log("Appraisal not added");
        else
            console.log("Appraisal added");
    });

    db.appraisallevels.save(jsonAppraisalLevels, function(err, saved){
        if (err || !saved)
            console.log("Appraisal Levels not added");
        else
            console.log("Appraisal Levels added");
    });

    db.period.save(jsonPeriod, function(err, saved){
        if (err || !saved)
            console.log("Period not added");
        else
            console.log("Period added");
    });*/

    var appraisalThread=new Thread();
    appraisalThread.name=appraisal["name"];
    appraisalThread.description=appraisal["description"];
    appraisalThread.not_rated_icon=appraisal["notratedicon"];
    appraisalThread.active_from=period["active_from"];
    appraisalThread.active_to=period["active_to"];

    var size=Object.keys(appraisalLevels).length;
    var count=1;
    while (count<=size)
    {
        appraisalThread.appraisal_ratings.rating_name=appraisalLevels[count];
        appraisalThread.appraisal_ratings.rating=count;
        appraisalThread.rating.rating_Icon=appraisalLevels["lvl"+count+"icon"];
        count++;
    }

    appraisalThread.save(function(err, save){
       if (err || !saved)
           console.log(err);
        else
            console.log("saved");
    });
};