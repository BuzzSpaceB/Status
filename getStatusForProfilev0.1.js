/**
 * Created by herb-adventure on 3/21/2015.
 */

var GetStatusForProfileRequest;

exports.getStatusForProfile=function(getStatusForProfileRequest)
{
var stats;
    db.users.find({userId:getStatusForProfileRequest, status:stats})
return stats;

}
