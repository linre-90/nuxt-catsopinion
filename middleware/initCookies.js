/**
 * Middleware to init cookies no matter what page we land on
 * cookies in use are app id for error handling and troubles hooting
 * cookie consent is for cookie approval and eccepting our necessary cookies
 */
export default function ({app}){
    if(typeof app.$cookies.get("appid") === "undefined"){
        const random1 = Math.floor(Math.random()*10000);
        const random2 = Date.now();
        const appid = random1.toString() + "_" + random2.toString();
        app.$cookies.set("appid", appid,{
            path: "*",
            maxAge: 60*60*24,
            sameSite: true
        });
    }
    if(typeof app.$cookies.get("cookieConsent") === "undefined"){
        app.$cookies.set("cookieConsent", false,{
            path: "*",
            maxAge: 60*60*24*7,
            sameSite: true
        });
    }
}