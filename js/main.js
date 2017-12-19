require.config({
    shim: {
        "bootstrap": { "deps": ['jquery'] },
        "bootstrap-select": { "deps": ['bootstrap'] },
        "jquery.unveil": { "deps": ['jquery'] },
        'LZString': {
            exports: 'LZString'
        },
    },
    baseUrl: 'js',
    paths: {
        "text": "libs/require-text",
        "jquery": "libs/jquery-1.12.3.min",
        "jquery.unveil": "libs/jquery.unveil",
        "underscore": "libs/underscore-min",
        "backbone": "libs/backbone-min",
        "nprogress": "libs/nprogress",
        "LZString": "libs/lz-string.min",
        "bitset": "libs/bitset.min",
        "nouislider": "libs/nouislider.min",
        "bootstrap": "libs/bootstrap.min",
        "bootstrap-select": "libs/bootstrap-select.min",
        "dom-to-image": "libs/dom-to-image.min"
    }
});
NProgress.start();
require(['jquery', 'underscore', 'data', 'ui', 'view', 'router'], function ($, _, Data, Ui, View, Router) {
    $(function () {
        NProgress.set(0.33);
        View.initUiLanguage();
        $.when(Data.init("astrolabe"))
            .then(function () {
                NProgress.set(0.5);
                $.when(Data.init("rune"))
                    .then(function () {
                        NProgress.set(0.66);
                        $.when(Data.init("runeByTypeBranch"), Data.init("runeSpecial"), Data.init("runeSpecialDesc"))
                            .done(function () {
                                NProgress.set(0.9);
                                Data.saveLastUpdate();
                                NProgress.inc();
                                Router.init();
                                NProgress.done();

                                //彩蛋
                                if (new Date() % 10 == 0) {
                                    $('[data-class-id=1]').text('狸猫');
                                }
                            });
                    });
            });
    });
}, function (err) {
    console.log("network error, will auto reload.");
    debugger;
    location.reload();
});