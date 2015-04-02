/**
 * Created by Andrew Parkes
 */
 
 /**
 * Being able to get the best Appraisal the specific post.
 *
 * @param postId - get the needed post Id
 */

function(postId)
{
	db.appraisals.aggregate([
	
    // Count all occurrences of the post with the same appraisals
    { "$group": {
        "_postId": {
            "_appraisalId": "$appraisalId",
        },
        "count": { "$sum": 1 }
    }},

    // Sum all occurrences and count distinct
    { "$group": {
        "_postId": {
            "_appraisalId": "$_postId.appraisalId",
        },
        "totalCount": { "$sum": "$count" },
        "distinctCount": { "$sum": 1 }
    }}
]);

	$group.find().sort({"distinctCount":-1}).limit(1).pretty()
	
	return $group.findOne({$query:{},$orderby:{"_appraisalId":-1}});
}