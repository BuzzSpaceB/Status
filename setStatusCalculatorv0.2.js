/**
 * Created by herb-adventure on 3/22/2015.
 */


// All of these assessors are supported
//ThreadsDepthAssessor
//NumPostsAssessor
//RoleAssessor
//WeightedSumAssessor
//AppraisalsAssessor



function setStatusCalculator(profileAssessor,buzzSpace)
{


    var tda= new ThreadsDepthAssessor();
    var npa = new NumPostsAssessor();
    var ra = new RoleAssessor();
    var wsa= new WeightedSumAssessor();
    var aa=new AppraisalsAssessor();



    if(!buzzSpace.isOpen())
    {
        return; /// the buzzspace is closed and we cannot assess
    }

    else{

        if(tda.isPrototypeOf(profileAssessor))
        {
            var treeSize=profileAssessor.assess(); //invoke the ThreadDepthAssessor on the profile
            return treeSize;
        }

        else if(npa.isPrototypeOf(profileAssessor))
        {
            var numPosts=profileAssessor.assess(); //invoke the default NumPostsassessor on the profile
            return numPosts;
        }

        else if(ra.isPrototypeOf(profileAssessor))
        {
            var credit=profileAssessor.assess(); ////invoke the RoleAssessor on the profile
            return credit;
        }

        else if(wsa.isPrototypeOf(profileAssessor))
        {
            var weightedAverage=profileAssessor.assess(); //invoke the WeightedSumAssessor on the profile
            return weightedAverage;
        }

        else if(aa.isPrototypeOf(profileAssessor))
        {
            var rating = profileAssessor.assess(); //invoke the AppraisalsAssessor on the profile
            return rating;
        }

        else throw InvalidprofileAssessorException; // throw an exception if the assessor is not one of these

    }

}

var SetStatusCalculatorRequest=setStatusCalculator(profileAccessor);