statusCalculatorResult = function(callback) {
    var profileAssessor;
};


statusCalculatorRequest = function(callback) {
    var profileAssessor;
};


function ThreadsDepthAssessor(userId, callback)
{
    var threads = 0;
    var average = function(count)
    {
        return (threads/count);
    }
    Threads.count({}, function(err, count)
    {
        threads = count;
        Threads.count({"user_id": userId}, function(err, count)
        {
            callback(userId, average(count));
        });
    });
}

function NumPostsAssessor(userId, callback)
{
    Threads.count({"user_id":userId},function(err,count)
        {
            if(err)
                console.lo("ERR: "+err);
            else callback(userId, count);
        }



    )
}


exports.setStatusCalculator = function(setStatusCalculatorRequest)
{
    var result = new statusCalculatorResult();// This is what we will return


    result.ProfileAssessor = setStatusCalculatorRequest.ProfileAssessor;//setting the profile assessor to whatever has been passed

    return result;
};

statusCalculatorRequest=function(callback)
{
  var profileAssessor;
};