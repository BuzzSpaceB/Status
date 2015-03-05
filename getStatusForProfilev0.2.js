/**
 * Created by herb-adventure on 3/5/2015.
 */

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
}
