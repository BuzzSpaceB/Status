/**
 * Created by herb-adventure on 3/22/2015.
 */


// All of these assessors are supported
//ThreadsDepthAssessor
//NumPostsAssessor
//RoleAssessor
//WeightedSumAssessor
//AppraisalsAssessor



function setStatusCalculator(setStatusCalculatorRequest)
{

    if(!setStatusCalculatorRequest.BuzzSpace.isOpen) //// if the buzzSpace is closed we cannot set a status calculator
    {
        throw new SpaceNotActiveException;
    }

    var setStatusCalculatorResult=new setStatusCalculatorResult();// This is what we will return


    setStatusCalculatorResult.ProfileAssessor=setStatusCalculatorRequest.ProfileAssessor;///setting the profile assessor to whatever has been passed
    setStatusCalculatorResult.BuzzSpace=setStatusCalculatorRequest.BuzzSpace;
    return setStatusCalculatorResult;

}

