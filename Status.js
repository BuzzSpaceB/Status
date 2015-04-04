/*
* Inserts dummy data for database
* Testing purposes only
*/
function c()
{

    db.users.insert({user_id: "u0", status_value:0, post_count:2});
    db.users.insert({user_id: "u1", status_value:0, post_count:5});
    db.users.insert({user_id: "u2", status_value:0, post_count:2});

}

/*
 * Dummy setStatusCaluculator
 * Testing purposes only
 */
function setStatusCalculator()
{
    return 9;
}
/**
*
* Updates the status points of a specific user
*
* @param {string} user_id - The user's id
*
*/
exports.updateStatusPointsForProfile = function(user_id)
{
    db.users.update({user_id: user_id}, {$set:{"status_value":  setStatusCalculator()}});
}

/**
*
* Updates the status points of all users
*
*/
exports.updateAllStatusPoints = function()
{
    db.users.update({}, {$set:{"status_value":  setStatusCalculator()}}, {multi: true});
}
