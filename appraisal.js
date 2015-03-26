/**
 * Created by Andrew Parkes
 */
 
 /**
 * The system will allow users to upvote posts via an appraisal.
 * This is done by a user being linked to a appraisal which is linked to a post.
 * This is done through a pluggable GetAppraisalTypes aswell as setAppraisal,
 * each implementing the Appraisal interface
 * @param getUser - get the current usersId
 * @param getPost -  get 
 * @param getAppraisal - 
 */
 
 function setAppraisalForPost(getCurrentUser, getCurrentPost, getAppraisal)
 {
	
 }
 
  /**
 * Being able to get the Appraisal for later use.
 * @param getAppraisalIdForRequest - get the needed appraisal Id
 */
 
 function getAppraisal(getAppraisalIdForRequest)
 {   
	return db.appraisal.find({appraisalId:getAppraisalIdForRequest});
 }
 
   /**
 * Being able to get the Appraisal Typr for later use such as counting appraisals.
 * @param getAppraisalIdForRequest - get the needed appraisal Id
 */
 
  function getAppraisalType(getAppraisalIdForRequest)
 {   
	var type;
	return db.appraisal.find({appraisalId:getAppraisalIdForRequest, appraisalType:type});
	return type;
 }