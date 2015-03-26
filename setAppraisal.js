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
 * @param appraisals - database field for the appraisals
 */
 
exports.setAppraisal=function(_userId, _postId, _appraisalId)
{
	//linking a user a post and an appraisal
	var setAppraisals={userId: _userId, postId: _postId, appraisalId:_appraisalId};
	return JSON.stringify(setAppraisals);
}