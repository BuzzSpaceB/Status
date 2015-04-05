/**
 * Created by Andrew Parkes
 */
 
 /**
 * Being able to get the Appraisals from the database.
 * It will then be possibale to vote on each type of appraisal
 */

exports.getAllAppraisalsForVote=function(callback)
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
}
