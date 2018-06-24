import $ from "jquery";
import _ from 'underscore';
import Backbone from 'backbone';
import Ui from './ui.js';
import Data from './data.js'

var init = function () {
    import(
        /* webpackChunkName: "view" */
        './view.js').then(View => {
        var AppRouter = Backbone.Router.extend({
            routes: {
                "class/:id": "classRoute",
                "class/:id/share/:data": "classRoute",
                "typeBranch/:id": "typeBranchRoute",
                "typeBranch/:id/share/:data": "typeBranchRoute",
                "lang/:lang": "languageChangeRoute",
                '*path': 'defaultRoute'
            },
            defaultRoute: function () {
                app_router.navigate("class/1", { trigger: true });
            }
        });
        // Initiate the router
        var app_router = new AppRouter;

        app_router.on('route:classRoute', function (id, data) {
            console.log("route:classRoute");
            View.initByClass(id, data);
        });
        app_router.on('route:typeBranchRoute', function (id, data) {
            console.log("route:typeBranchRoute");
            View.init(id, data);
        });
        app_router.on('route:languageChangeRoute', function (lang) {
            Ui.setLang(lang);
            app_router.navigate("unit");
            location.reload();
        });

        Backbone.history.start();
    });
};

export { init };
export default { init };