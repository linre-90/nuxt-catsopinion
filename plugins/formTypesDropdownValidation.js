// validation for dropdown
// accepts only certain words
// define them in array const validWords
export default async function({app}, inject){
    const validWords = [/*undefined, just a test for type of*/ "bug", "question", "other"]
    const validateData = function (param){
        let returnValue = false;
        validWords.forEach(word => {
           // it really does not matter with these array sizes how to compare them
           // NOTE: page does not support potatos and even potato can calculate this
            if(typeof word === "string" && typeof param === "string"){
                if(word === param){
                    returnValue = true;
                }
            }
        });
       return returnValue;
    }
    inject('formTypesDropdownValidation', validateData);
}