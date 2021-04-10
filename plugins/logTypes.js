// Plugin to return log types
// helps to keep logs/analytics unified 
export default function({app}, inject){
    const getType = (param) => {
        let returnType = "";
        switch (param) {
            case "page":
                returnType = "PAGE_VISIT"
                break;
            case "app":
                returnType = "APP_LAUNCH"
                break;
            case "read":
                returnType = "BLOG_POST_READ"
                break;
            case "error":
                returnType = "ERROR"
                break;
            case "click":
                returnType = "CLICK"
                break;
            default:
                break;
        }
        return returnType;
    }
    inject('logTypes', getType);
}