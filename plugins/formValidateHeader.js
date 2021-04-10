// Rough validation for FormInput.vue component
// Server does more validation with designed package 
export default async function({app}, inject){
    const regex = new RegExp(/[<>\\/":;$!.,';={}&*()]/);
    const validateData = function (param){
        if(param.length < 1 || param.length > 20 || regex.test(param)){
            return false;
        }
        else{
            return true;
        }
    }
    inject('formValidateHeader', validateData);
}