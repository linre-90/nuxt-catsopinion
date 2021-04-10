// actual collection name comes from nuxt.config.js and it gets collection name from .env file
const collections_fi = {
    "blog": "blogFi"
}

const collections_en = {
    "blog": "blogEn"
}

/** 
*Pass in javascript object:
*{id: String, locale: String}
*pass locale from url parameters!!
*/
export default async function({app}, inject){
    const getData = async function (params) {
        let usedColection = collections_en;
        if(params["locale"] == "fi"){
            usedColection = collections_fi;
        }
        try {
            let result = await this.$fire.firestore.collection(this.$config[usedColection["blog"]]).doc(params["id"]).get();
            if(result.exists){
                return [result.data().view];
            }
            else{
                return ["error"];
            }
        } catch (error) {
            // TODO do some error logging plugin too
            return ["error", error.code, error.name];
        }
    }
    inject('findPostById', getData);
}