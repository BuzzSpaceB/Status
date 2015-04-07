var createApp=require('./createAppraisalType.js');
var name="Funny";
var description="humorous post";
var appraisal=createApp.createAppraisal(name,description);
console.log('Appraisal: '+appraisal);

var lvl1="eh";
var lvl2="funny";
var lvl3="sides have left planet";
var levels=createApp.addAppraisalLevel(1, lvl1);
levels=createApp.addAppraisalLevel(2, lvl2);
console.log('Appraisal Levels: '+levels);