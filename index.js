var Appraisal = ds.models.appraisal;
var Users = ds.models.user;
var Posts = ds.models.post;
var Threads = ds.models.thread;
var jsonAppraisalLevels;
var jsonAppraisal;
var jsonPeriod;
var appraisalLevels=[];
var appraisal;
var period;

/**
 * Function I created to clear the appraisalLevels array after used
 **/
function clearAppraisalLevels()
{
	appraisalLevels = [];
}

/**
 * Convert textbox input into json strings for database insertion
 *
 * @param  {String} _name - Name of appraisal
 * @param {String} _description - Description of appraisal
 * @return {String}
 */
function createAppraisal(_name, _description){

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
function addAppraisalLevel(appraisalNumber, levelName){
    appraisalLevels.push({rating:appraisalNumber, rating_name: levelName});
    jsonAppraisalLevels=JSON.stringify(appraisalLevels);
    return jsonAppraisalLevels;
};

/**
 * Specify an activation period for an appraisal
 *
 * @param active_from - date to start activation period
 * @param active_to - date to end activation period
 * @returns {String}
 */
function activePeriod(active_from, active_to){
    period={"active_from": active_from, "active_to": active_to};
    jsonPeriod=JSON.stringify(period);
    return jsonPeriod;
};

 /**
 * Being able to get the Appraisals from the database.
 * It will then be possible to vote on each type of appraisal
 * @param callback - Function where the result gets sent to
 */
function getAllAppraisalsForVote(callback)
{
	Appraisal.find({}, function(err, appraisals)	//results are stored in appraisal
	{
		if(err)
		{
			console.log("ERR: " + err);
		}
		else
		{
			appraisals.forEach(function(aappraisal)	//each record in appraisals is used as aappraisal
			{
				callback(aappraisal);//sends each appraisal to the callback function
			});
		}
	});
};

/**
*
* Updates the status points of a specific user
*
* @param {string} user_id - A user's id
*
* @param {number} tempResult - Value to update status points
*
*/
function updateStatusPointsForProfile(user_id, tempResult)
{
	try
	{
		Users.findOne({"user_id": user_id}, function(err, user)
		{
			if(err)
			{
				console.log("ERR: " + err);
			}
			else
			{
				user.status_value = tempResult;
				user.save(function(err)
				{
					if(err)
						console.log("ERR: " + err);
				});
			}
		});
	}
	catch(e)
	{
		console.log("Status Calculator error: " + e);
	}
}

/**
*
* Updates the status points of all users
*
* @param {number} tempResult - Value to update status points
* @param user - User ID of the user being calculated from
*/
function updateAllStatusPoints(user, tempResult)
{
	try
	{
		Users.find({}, function(err, user)
		{
			if(err)
			{
				console.log("ERR: " + err);
			}
			else
			{
				user.forEach(function(auser)
				{
					auser.status_value = tempResult;
					auser.save(function(err)
					{
						if(err)
							console.log("ERR: " + err);
					});
				});
			}
		});
	}
	catch(e)
	{
		console.log("Status Calculator error: " + e);
	}
}

/**
 * The system will enable lecturers to specify different ways in which the profiles
 * of users can be assessed. This is done through a number of pluggable ProfileAssessors,
 * each implementing the ProfileAssessor interface.*
 * @param assessProfileRequest - get required assessor request - which is a pluggable Profile Assessor
 * @param user - User ID of the user being calculated from
 * @param callback - Function where the result gets sent to
 */
function assessProfile(assessProfileRequest, user, callback)
{
    var currentAssessmentRequest = assessProfileRequest;

    var assessmentValue;

    if (!currentAssessmentRequest)
    {
        console.log("No profile assessment request has been plugged in");
        return;
    }
    else
    currentAssessmentRequest(user, callback);
}

 /**
 * Being able to get the Appraisal for a specific post.
 *
 * @param _postId - get the needed appraisal for a post
 */
function getPostAppraisal(_postId, callback)
{
	Posts.findOne({"post_id": _postId}, function(err, post)
   	{
   		if(err)
   		{
   			console.log("ERR: " + err);
   		}
   		else
   		{
   			callback(post.appraisal_id);
   		}
   	});
};

function setAppraisal(_postId, _appraisalName)
{
   	Posts.findOne({"post_id": _postId}, function(err, post)
   	{
   		if(err)
   		{
   			console.log("ERR: " + err);
   		}
   		else
   		{
   			post.appraisal_id = _appraisalName;
   			post.save(function(err)
   			{
   				if(err)
   					console.log("ERR: " + err);
   			});
   		}
   	});
};

/**
 * Store json in database
 *
 * 
 */
function store(levels){

    var newAppraisal=new Appraisal();
    newAppraisal.name=appraisal["name"];
    newAppraisal.description=appraisal["description"];
    newAppraisal.not_rated_icon=appraisal["notratedicon"];
    newAppraisal.active_from=period["active_from"];
    newAppraisal.active_to=period["active_to"];

	var tempJSONlevels = JSON.parse(levels);
		
	newAppraisal.appraisal_ratings = tempJSONlevels;

    newAppraisal.save(function(err){
       if (err)
           console.log(err);
        else
            console.log("saved");
    });
};

function getStatusForProfile(getStatusForProfileRequest, callback)
{
    Users.findOne({"user_id": getStatusForProfileRequest}, function(err, user)//result is stored in user
    {
        if(err)
        {
            console.log("ERR: " + err);
        }
        else
        {
            callback(JSON.stringify(user.status_value));//sending result to callback function in this case as a json string
        }
    });
};

function NumPostsAssessor(userId, callback)
{
    Threads.count({"user_id":userId},function(err,count)
    {
        if(err)
            console.lo("ERR: "+err);
        else callback(userId, count);
    });
}

function ThreadsDepthAssessor(userId, callback)
{
    var threads = 0;
    var average = function(count)
    {
        return (threads/count);
    }
    Threads.count({}, function(err, count)
    {
        threads = count;
        Threads.count({"user_id": userId}, function(err, count)
        {
            callback(userId, average(count));
        });
    });
};

function statusCalculatorRequest(callback) {
    var profileAssessor;
};

//not yet used
function statusCalculatorResult(callback) {
    var profileAssessor;
};

function setStatusCalculator(setStatusCalculatorRequest)
{
    var result = new statusCalculatorResult();// This is what we will return

    result.ProfileAssessor = setStatusCalculatorRequest.ProfileAssessor;//setting the profile assessor to whatever has been passed

    return result;
};

module.exports.clearAppraisalLevels = clearAppraisalLevels;
module.exports.createAppraisal = createAppraisal;
module.exports.addAppraisalLevel = addAppraisalLevel;
module.exports.activePeriod = activePeriod;
module.exports.getAllAppraisalsForVote = getAllAppraisalsForVote;
module.exports.updateStatusPointsForProfile = updateStatusPointsForProfile;
module.exports.updateAllStatusPoints = updateAllStatusPoints;
module.exports.assessProfile = assessProfile;
module.exports.getPostAppraisal = getPostAppraisal;
module.exports.setAppraisal = setAppraisal;
module.exports.store = store;
module.exports.getStatusForProfile = getStatusForProfile;
module.exports.NumPostsAssessor = NumPostsAssessor;
module.exports.ThreadsDepthAssessor = ThreadsDepthAssessor;
module.exports.statusCalculatorRequest = statusCalculatorRequest;
module.exports.statusCalculatorResult = statusCalculatorResult;
module.exports.setStatusCalculator = setStatusCalculator;