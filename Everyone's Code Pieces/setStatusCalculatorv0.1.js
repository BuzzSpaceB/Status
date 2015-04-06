/**
 * Created by herb-adventure on 3/21/2015.
 */

    //ThreadsDepthAccessor
    //NumPostsAccessor
    //RoleAccessor
    //WeightedSumAccessor
    //AppraisalsAccessor



function setStatusCalculator(profileAccessor)
{


    var tda= new ThreadsDepthAccessor();
    var npa = new NumPostsAccessor();
    var ra = new RoleAccessor();
    var wsa= new WeightedSumAccessor();
    var aa=new AppraisalsAccessor();


    var BuzzSpaceObject=new BuzzSpaceObject(currentBuzzSpace);
    if(!BuzzSpaceObject.isOpen())
    {
        return;
    }

    else{

            if(tda.isPrototypeOf(profileAccessor))
            {
                    var treeSize=profileAccessor.access();
                    return treeSize;
            }

            else if(npa.isPrototypeOf(profileAccessor))
            {
                    var numPosts=profileAccessor.access();
                    return numPosts;
            }

            else if(ra.isPrototypeOf(profileAccessor))
            {
                    var credit=profileAccessor.access();
                    return credit;
            }

            else if(wsa.isPrototypeOf(profileAccessor))
            {
                    var weightedAverage=profileAccessor.access();
                    return weightedAverage;
            }

            else if(aa.isPrototypeOf(profileAccessor))
            {
                    var rating = profileAccessor.access();
                    return rating;
            }

            else throw InvalidProfileAccessorException;

    }

}

var SetStatusCalculatorRequest=setStatusCalculator(profileAccessor);