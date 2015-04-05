/**
*
* Updates the status points of a specific user
*
* @param {string} user_id - A user's id
*
*/
exports.updateStatusPointsForProfile = function(user_id)
{
   try
   	{
   		var tempResult = Status.setStatusCalculator();
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
*/
exports.updateAllStatusPoints = function()
{
   try
   	{
   		var tempResult = Status.setStatusCalculator();
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
