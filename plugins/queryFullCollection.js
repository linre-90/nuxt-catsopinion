// actual collection name comes from nuxt.config.js and it gets collection name from .env file
const collections_fi = {
    "news": "newsFi",
    "series": "series_env"
}

const collections_en = {
    "news": "newsEn",
    "series": "series_env"
    
}

/** 
*Pass in javascript object:
*{collection: String, locale: String}
*check collections from .env file. they come from there
*pass locale from i18n
*/
export default async function({app}, inject){
    const getData = async function (params) {
        let usedColection = collections_en;
        if(params["locale"] == "fi"){
            usedColection = collections_fi;
        }
        try {
            let response = await this.$fire.firestore.collection(this.$config[usedColection[params["collection"]]]).get();
            let data = [];
            response.forEach((element) => {
                let objectToPush = element.data();
                objectToPush["id"] = element.id;
                data.push(objectToPush);
            });
            return data;
        } catch (error) {
            // TODO do some error logging plugin too
            return ["error", error.code, error.name];
        }
    }
    inject('queryFullCollection', getData);
}