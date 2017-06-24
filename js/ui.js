define(['jquery', 'underscore'], function ($, _) {
    var supportedLang = [
        {
            key: 'ja-JP',
            text: '日本語'
        },
        {
            key: 'zh-TW',
            text: '正體中文'
        },
        {
            key: 'en-US',
            text: 'English'
        },
        {
            key: 'zh-CN',
            text: '简体中文'
        }
    ];
    var currentLang = '';
    var data = [];
    //navbar
    data["list"] = { "ja-JP": "図鑑", "zh-TW": "圖鑑", "en-US": "Encyclopedia", "zh-CN": "图鉴" };
    data["search"] = { "ja-JP": "検索", "zh-TW": "搜索", "en-US": "Search", "zh-CN": "搜索" };
    data["category"] = { "ja-JP": "", "zh-TW": "分類", "en-US": "Category", "zh-CN": "分类" };
    data["about"] = { "ja-JP": "", "zh-TW": "關於", "en-US": "About", "zh-CN": "关于" };
    data["info"] = { "ja-JP": "お知らせ", "zh-TW": "通知", "en-US": "Notices", "zh-CN": "游戏公告" };
    data["ui"] = { "ja-JP": "", "zh-TW": "界面語言", "en-US": "UI", "zh-CN": "界面语言" };
    data["data"] = { "ja-JP": "", "zh-TW": "資料語言", "en-US": "Data", "zh-CN": "数据语言" };
    data["class"] = { "ja-JP": "", "zh-TW": "", "en-US": "Class", "zh-CN": "职业" };
    data["officalsite"] = { "ja-JP": "", "zh-TW": "", "en-US": "Offical Site", "zh-CN": "官网" };
    data["donate"] = { "ja-JP": "", "zh-TW": "", "en-US": "Donate", "zh-CN": "送版主女装" };


    var getText = function (key) {
        if (!data[key]) {
            console.log("ui language data missing:" + key);
            return key;
        }
        return data[key][getLang()] || data[key]['en-US'];
    };
    var getLang = function () {
        if (!currentLang) {
            setLang();
        }
        return currentLang;
    };
    var setLang = function (lang) {
        lang = lang || localStorage["uilang"] || navigator.language || navigator.browserLanguage;
        if (_.any(supportedLang, function (o) { return o.key == lang }) == false) {
            lang = 'zh-CN';
        }
        currentLang = lang;
        localStorage["uilang"] = lang;
        $('#currentLang').text(_.find(supportedLang, function (o) {
            return o.key == lang;
        }).text);
    };
    return {
        supportedLang: supportedLang,
        getText: getText,
        getLang: getLang,
        setLang: setLang,
    };
});