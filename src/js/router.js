import $ from "jquery";
import _ from 'underscore';
import Backbone from 'backbone';
import Ui from './ui.js';
import {Data} from './data.js'

var init = function () {
    import(
        /* webpackChunkName: "view" */
        './view.js').then(View => {
        var AppRouter = Backbone.Router.extend({
            routes: {
                "class/:id": "classRoute",
                "class/:id/share/:data": "classRoute",
                "class/:id/share/:data/server/:server": "classRoute",
                "typeBranch/:id": "typeBranchRoute",
                "typeBranch/:id/share/:data": "typeBranchRoute",
                "typeBranch/:id/share/:data/server/:server": "typeBranchRoute",
                "lang/:lang": "languageChangeRoute",
                "server/:server": "serverChangeRoute",
                '*path': 'defaultRoute'
            },
            defaultRoute: function () {
                app_router.navigate("typeBranch/11", { trigger: true });
            }
        });
        // Initiate the router
        var app_router = new AppRouter;

        app_router.on('route:classRoute', function (id, data, server) {
            console.log("route:classRoute");
            View.initByClass(id, data, server);
        });
        app_router.on('route:typeBranchRoute', function (id, data, server) {
            console.log("route:typeBranchRoute");
            View.init(id, data, server);
        });
        app_router.on('route:languageChangeRoute', function (lang) {
            Ui.setLang(lang);
            app_router.navigate("/");
            location.reload();
        });
        app_router.on('route:serverChangeRoute', function (server) {
            Data.setCurrentServer(server);
            app_router.navigate("/");
            location.reload();
        });

        Backbone.history.start();
    });
};

export { init };
export default { init };