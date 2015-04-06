/**
*
* Updates the status points of a specific user
*
* @param {string} user_id - A user's id
*
* @param {number} tempResult - Value to update status points
*
*/
exports.updateStatusPointsForProfile = function(user_id, tempResult)
{
	try
	{
		Users.findOne({"user_id": user_id}, function(err, user)
		{
			if(err)
			{
				console.log("ERR: " + err);
			}
			else
			{
				user.status_value = tempResult;
				user.save(function(err)
				{
					if(err)
						console.log("ERR: " + err);
				});
			}
		});
	}
	catch(e)
	{
		console.log("Status Calculator error: " + e);
	}
}

/**
*
* Updates the status points of all users
*
* @param {number} tempResult - Value to update status points
*
*/

exports.updateAllStatusPoints = function(user, tempResult)
{
	try
	{
		Users.find({}, function(err, user)
		{
			if(err)
			{
				console.log("ERR: " + err);
			}
			else
			{
				user.forEach(function(auser)
				{
					auser.status_value = tempResult;
					auser.save(function(err)
					{
						if(err)
							console.log("ERR: " + err);
					});
				});
			}
		});
	}
	catch(e)
	{
		console.log("Status Calculator error: " + e);
	}
}
