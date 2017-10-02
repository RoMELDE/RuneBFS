define(['jquery', 'underscore', 'backbone', 'ui', 'view'], function ($, _, Backbone, Ui, View) {
    var app_router;
    function init() {
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
        app_router = new AppRouter;

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
    }
    return {
        init: init
    };
});