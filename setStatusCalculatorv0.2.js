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
///it simply assigns a ProfileAssessor to the BuzzSpace which it has.
setStatusCalculatorResult
{
    var ProfileAssessor;
    var BuzzSpace;
}

function setStatusCalculator(setStatusCalculatorRequest)
{


    var setStatusCalculatorResult=new setStatusCalculatorResult();// This is what we will return


    setStatusCalculatorResult.ProfileAssessor=setStatusCalculatorRequest.ProfileAssessor;///setting the profile assessor to whatever has been passed
    setStatusCalculatorResult.BuzzSpace=setStatusCalculatorRequest.BuzzSpace;
    return setStatusCalculatorResult;

}

