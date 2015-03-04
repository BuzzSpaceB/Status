/**
 * Created by herb-adventure on 3/22/2015.
 */


// All of these assessors are supported
//ThreadsDepthAssessor
//NumPostsAssessor
//RoleAssessor
//WeightedSumAssessor
//AppraisalsAssessor

///this class is what the setStatusCalculator returns an object of.
///This simply assigns a ProfileAssessor to the BuzzSpace which it has.
setStatusCalculatorResult
{
    var ProfileAssessor;
    var BuzzSpace;
}

exports.setStatusCalculator=function(setStatusCalculatorRequest)
{


    var setStatusCalculatorResult=new setStatusCalculatorResult();// This is what we will return


    setStatusCalculatorResult.ProfileAssessor=setStatusCalculatorRequest.ProfileAssessor;///setting the profile assessor to whatever has been passed
    setStatusCalculatorResult.BuzzSpace=setStatusCalculatorRequest.BuzzSpace;


    return setStatusCalculatorResult;

}

//This Assessor takes the # of posts a user has made and devides it by the total number of posts on the space
function ThreadsDepthAssessor()
{

    return document.treeSizeSum/document.numTrees

}

///this default Assessor returns the number of posts a user has made
function NumPostsAssessor(userId)
{
    return db.find({"_id": userId}).count();


}

//This Assessor returns the users level on the BuzzSpace as his/her assessment
function RoleAssessor()
{
    return db.find({"_id": userId},{"_role":role});

}

function WeightedSumProfileAssessor()
{

}

function AppraisalsAssessor()
{
    db.getSiblingDB(databaseName).getCollection(collectionName).find({"_id": userId}).snapshot().forEach(
        function(document)
        {
            db.getSiblingDB(databaseName).getCollection(collectionName).update(
                {_id: document._id}, {$set:{"statusPoints":  document.appraisalTotal}});
        });

}


/*



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
 function temp(callback)
 {
 Users.find({}, function(err, user)	//results are stored in user
 {
 if(err)
 {
 console.log("ERR: " + err);
 }
 else
 {
 user.forEach(function(auser)	//each record in user is used as auser
 {
 //do something with each individual record
 callback(user);//sends the results you want to work with to the callback function
 });
 }
 });
 }

 //how we will be calling the functions
 getStatusForProfile(userID,               callback);	//this is how the function looks to you
 Status.getStatusForProfile(request.query.userID, Status.tempFunc);	//this is how we call the function from our side
 */