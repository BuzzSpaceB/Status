/**
* A BuzzSpace may calculate the status of its contributors by utilizing one of the following calculators:
* NumPostsAssessor; ThreadsDepthAssessor; RoleAssessor; AppraisalsAssessor; WeightedSumProfileAssessor.
* The relevant calculator is chosen accordingly and performs it's unique calculations.
* The default calculator for a BuzzSpace is the NumPostsAssessor calculator*
* @param updateStatusPointsForProfileRequest - get required profile assesor
* @param spaceThreads - get access to all threads in buzzSpace 
*/
function updateStatusPointsForProfile(updateStatusPointsForProfileRequest, spaceThreads) 
{
    var currentUserProfile = JSON.parse(updateStatusPointsForProfileRequest);
    var threads = JSON.parse(spaceThreads);

    //If the current statusCalulator is the NumPostsAssessor [default]
    if (currentUserProfile instanceof NumPostsAssessor) 
    {
        /**assessment is proportional to the number of posts a user has*/
        this.statusPoints = this.getNumberOfPosts();
    }

    //If the current statusCalulator is the ThreadsDepthAssessor
    if (currentUserProfile instanceof ThreadsDepthAssessor) 
    {
        /**assessment is based on average tree size attached for threads associated with a profile*/
        this.statusPoints = this.getNumberOfUserThreads() / threads.getNumberOfThreads();
    }

    //If the current statusCalulator is the RoleAssessor
    if (currentUserProfile instanceof RoleAssessor) 
    {
    
        /**assessment is soley determined by the role the associated user has within the module*/
        this.statusPoints = this.getUsersRolesForModule();
    }

    //If the current statusCalulator is the AppraisalsAssessor
    if (currentUserProfile instanceof AppraisalsAssessor) 
    {
        /**assessment is sum of total appraisal value of a particular appraisal type*/
        this.statusPoints = this.getTotalUserPosts(appraisalType);
    }

    //If the current statusCalulator is the WeightedSumProfileAssessor
    if (currentUserProfile instanceof WeightedSumProfileAssessor) 
    {
        var sum = 0;

        if (AssessorArray[0] === true) {
            sum += this.getNumberOfPosts();
        }
        if (AssessorArray[1] === true) {
            sum += (this.getNumberOfUserThreads() / threads.getNumberOfThreads());
        }
        if (AssessorArray[2] === true) {
            sum += this.getUsersRolesForModule();
        }

        if (AssessorArray[3] === true) {
            sum += this.getTotalUserPosts(appraisalType);
        }

        /**assessment is result of sum of all selected leaf assessors*/
        this.statusPoints = sum;
    }
}

/*

* Updates the status points of a user
* @param {string} databaseName - The name of the databse
* @param {string} collectionName - The name of the collection
* @param {string} profileId - The user's id

function updateStatusPointsForProfile(databaseName, collectionName, profileId)
{
	 db.getSiblingDB(databaseName).getCollection(collectionName).find({"_id": profileId}).snapshot().forEach(
	function(document)
	{
		db.getSiblingDB(databaseName).getCollection(collectionName).update(
		{_id: document._id}, {$set:{"statusPoints":  document.weightedProfileContribution}});
	});      
}
*/

/**
* Calculate status of each BuzzSpace Contributor
* The default calculator for a BuzzSpace is the NumPostsAssessor calculator
* @param updateStatusPointsForProfileRequest - get required profile assesor
* @param spaceThreads - get access to all threads in buzzSpace 
*/
function updateAllStatusPoints(updateStatusPointsForProfileRequest, spaceThreads) 
{
    var threads = JSON.parse(spaceThreads);

    for (i = 0; i < threads.ListOfContributors().length; i++)
    {
        threads.ListOfContributors()[i].updateStatusPointsForProfile(updateStatusPointsForProfileRequest, spaceThreads);
    }
}

/*
* Updates the status points of all the users in the database
* @param {string} databaseName - The name of the databse
* @param {string} collectionName - The name of the collection

function updateAllStatusPoints(databaseName, collectionName)
{
    db.getSiblingDB(databaseName).getCollection(collectionName).find().snapshot().forEach(
	function(document)
	{
		db.getSiblingDB(databaseName).getCollection(collectionName).update(
		{_id: document._id}, {$set:{"statusPoints":  document.weightedProfileContribution}});
	});
}
*/
