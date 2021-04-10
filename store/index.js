export const state = () => ({
    lastBlogQuery: null,
    headerText: "The only opinion cat owners need!",
    bannerOk: false,
});


export const mutations = {
    changeActivePage(state, pageText) {
        state.headerText = pageText;
    },
    cookieOk(state) {
        state.bannerOk = true;
    },
    setLastBlog(state, searchTerm){
        state.lastBlogQuery = searchTerm;
    }
}

export const actions = {
    changeActivePage(context, pageText) {
        context.commit("changeActivePage", pageText);
    },
    cookieOk(context) {
        context.commit("cookieOk");
    },
    setLastBlogSearch(context, searchTerm){
        context.commit("setLastBlog", searchTerm);
    }
}
