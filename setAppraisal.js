 /**
 * Created by Andrew Parkes
 */
 
 /**
 * The system will allow users to rate posts via an appraisal.
 * This is done by a user being linked to a appraisal and to a post.
 *
 * @param userId - User adding the appraisal
 * @param postId - Post that is having the appraisal added too
 * @param appraisalId - Appraisal between the linking
 */
 
exports.setAppraisal=function(_userId, _postId, _appraisalId)
{
	//linking a user a post and an appraisal
	
	if(Appraisal.find({"user_id":_userId, "post_id":_postId})===null)//check if a user already has an appraisal for the specific post
	{
		var setAppraisals={"user_id": _userId, "post_id": _postId, "appraisal_id":_appraisalId};
		return JSON.stringify(setAppraisals);
	}
	else
	{
		var setAppraisals=Appraisal.update({"user_id": _userId}, "post_id":_postId, {$set:{"appraisal_id": _appraisalId}});
		return JSON.stringify(setAppraisals);
	}
}

exports.setAppraisal=function(_postId, _appraisalName)
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
};/*