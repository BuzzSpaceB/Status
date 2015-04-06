/**
 * Created by Andrew Parkes
 */
 
 /**
 * Being able to get the Appraisal Type for later use such as counting appraisals.
 *
 * @param getAppraisalIdForRequest - get the needed appraisal Id
 * @param appraisals - database field for the appraisals
 */
 
exports.getAppraisalIdForRequest=function(getAppraisalIdForRequest, callback)
{	
	Appraisal.findOne({"appraisal_id": getAppraisalIdForRequest}, function(err, appraisal)//result is stored in appraisal
	{
		if(err)
		{
			console.log("ERR: " + err);
		}
		else
		{
			callback(JSON.stringify(appraisal.status_value));//sending result to callback function in this case as a json string
		}
	});
}

 /**
 * Being able to get the Appraisal for a specific post.
 *
 * @param _postId - get the needed appraisal for a post
 */

exports.getPostAppraisal=function(_postId, callback)
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