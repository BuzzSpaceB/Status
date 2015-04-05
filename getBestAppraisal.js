/**
 * Created by Andrew Parkes
 */
 
 /**
 * Being able to get the best Appraisal the specific post.
 *
 * @param postId - get the needed post Id
 */

function getBestAppraisal(postId)
{
	Appraisal.aggregate([
	
    // Count all occurrences of the post with the same appraisals
    { "$group": {
        "post_id": {
            "appraisal_id": "$appraisal_id",
        },
        "count": { "$sum": 1 }
    }},

    // Sum all occurrences and count distinct
    { "$group": {
        "post_id": {
            "appraisal_id": "$post_id.appraisal_id",
        },
        "totalCount": { "$sum": "$count" },
        "distinctCount": { "$sum": 1 }
    }}
]);

	$group.find().sort({"distinctCount":-1}).limit(1).pretty()
	
	return $group.findOne({$query:{},$orderby:{"appraisal_id":-1}});
}