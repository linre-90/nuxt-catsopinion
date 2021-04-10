// actual collection name comes from nuxt.config.js and it gets collection name from .env file
const collections_fi = {
    "blog": "blogFi"
}

const collections_en = {
    "blog": "blogEn"
}

/** 
*Pass in javascript object:
*{locale:this.$i18n.locale, queryData:queryParams}
*pass locale from i18n
*/
export default async function({app}, inject){
    const getData = async function (params) {
        let usedColection = collections_en;
        if(params["locale"] == "fi"){
            usedColection = collections_fi;
        }
        const queryParams = params["queryData"];
        try {
            let response = await this.$fire.firestore.collection(this.$config[usedColection["blog"]])
                .where("series", "==", queryParams["query"].toLowerCase())
                .orderBy("date", "desc")
                .get();
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
    inject('findPostsByQuery', getData);
}