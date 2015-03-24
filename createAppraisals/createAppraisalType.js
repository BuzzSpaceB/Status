/**
 * Convert textbox input into json strings for database insertion
 *
 * @param  {String} _name - Name of appraisal
 * @param {String} _description - Description of appraisal
 * @return {String}
 */
exports.createAppraisal=function(_name, _description){

    var appraisal={name: _name, description: _description};
    return JSON.stringify(appraisal);
}


/**
 * Convert textbox input into json strings for database insertion
 *
 * @param  {String} _lvl1 - Name of level 1 appraisal
 * @param {String} _lvl2 - Name of level 2 appraisal
 * @param {String} _lvl3 - Name of level 3 appraisal
 * @return {String}
 */
exports.createAppraisalLevels=function(_lvl1, _lvl2, _lvl3){
    var appraisalLevels={level1: _lvl1, level2: _lvl2, level3:_lvl3};
    return JSON.stringify(appraisalLevels);
}


/**
 * Convert image/icon to base64
 *
 * @param  input - An uploaded image from html
 * @return {String} base64
 */
exports.readNotRatedIcon=function(input) {
    if (input.files && input.files[0]) {
        var FR = new FileReader();
        FR.readAsDataURL(input.files[0]);
        return FR;
    }
}


/**
 * Convert image/icon to base64
 *
 * @param  input - An uploaded image from html
 * @return {String} base64
 */
exports.readLevel1Icon=function(input) {
    if (input.files && input.files[0]) {
       var lvl1 = new FileReader();
        lvl1.readAsDataURL(input.files[0]);
        return lvl1;
    }
}


/**
 * Convert image/icon to base64
 *
 * @param  input - An uploaded image from html
 * @return {String} base64
 */
exports.readLevel2Icon=function(input) {
    if (input.files && input.files[0]) {
       var lvl2 = new FileReader();
        lvl2.readAsDataURL(input.files[0]);
        return lvl2;
    }
}


/**
 * Convert image/icon to base64
 *
 * @param  input - An uploaded image from html
 * @return {String} base64
 */
exports.readLevel3Icon=function(input) {
    if (input.files && input.files[0]) {
       var lvl3 = new FileReader();
        lvl3.readAsDataURL(input.files[0]);
        return lvl3;
    }
}