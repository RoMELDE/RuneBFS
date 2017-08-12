define(['jquery', 'underscore'], function ($, _) {
    var supportedLang = [
        /*{
            key: 'ja-JP',
            text: '日本語'
        },*/
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
    data["class"] = { "ja-JP": "", "zh-TW": "職業", "en-US": "Classes", "zh-CN": "职业" };
    data["class-1"] = { "ja-JP": "", "zh-TW": "劍士", "en-US": "Swordman", "zh-CN": "剑士" };
    data["class-2"] = { "ja-JP": "", "zh-TW": "魔法師", "en-US": "Mage", "zh-CN": "魔法师" };
    data["class-3"] = { "ja-JP": "", "zh-TW": "盜賊", "en-US": "Thief", "zh-CN": "盗贼" };
    data["class-4"] = { "ja-JP": "", "zh-TW": "弓箭手", "en-US": "Archer", "zh-CN": "弓箭手" };
    data["class-5"] = { "ja-JP": "", "zh-TW": "服事", "en-US": "Acolyte", "zh-CN": "服事" };
    data["class-6"] = { "ja-JP": "", "zh-TW": "商人", "en-US": "Merchant", "zh-CN": "商人" };

    data["search"] = { "ja-JP": "検索", "zh-TW": "搜尋", "en-US": "Search", "zh-CN": "查询" };
    data["clear"] = { "ja-JP": "", "zh-TW": "清空", "en-US": "Clear", "zh-CN": "清空" };

    data["currentversion"] = { "ja-JP": "", "zh-TW": "當前版本：", "en-US": "Current Ver.:", "zh-CN": "当前版本：" };
    data["officalsite"] = { "ja-JP": "", "zh-TW": "官網", "en-US": "Offical Site", "zh-CN": "官网" };
    data["donate"] = { "ja-JP": "", "zh-TW": "送版主女裝", "en-US": "NGA RO", "zh-CN": "送版主女装" };

    data["ui"] = { "ja-JP": "", "zh-TW": "界面語言", "en-US": "UI", "zh-CN": "界面语言" };
    data["data"] = { "ja-JP": "", "zh-TW": "資料語言", "en-US": "Data", "zh-CN": "数据语言" };
    //rune panel
    data["evorune"] = { "ja-JP": "", "zh-TW": "進階符文", "en-US": "Evolution Rune", "zh-CN": "进阶符文" };
    data["disable"] = { "ja-JP": "", "zh-TW": "不啟用", "en-US": "Disable", "zh-CN": "不启用" };
    data["enable"] = { "ja-JP": "", "zh-TW": "啟用", "en-US": "Enable", "zh-CN": "启用" };
    data["zoom"] = { "ja-JP": "", "zh-TW": "縮放", "en-US": "Zoom", "zh-CN": "缩放" };
    data["algorithm"] = { "ja-JP": "", "zh-TW": "尋路算法", "en-US": "Pathfinding algorithm", "zh-CN": "寻路算法" };
    data["algorithm-simple"] = { "ja-JP": "", "zh-TW": "最短路徑", "en-US": "Shortest Path", "zh-CN": "最短路径" };
    data["algorithm-nogold"] = { "ja-JP": "", "zh-TW": "最少金質勳章", "en-US": "Minimum Golden Badge", "zh-CN": "最少金质勋章" };
    data["algorithm-custom"] = { "ja-JP": "", "zh-TW": "自定義", "en-US": "Custom", "zh-CN": "自定义" };
    data["weight"] = { "ja-JP": "", "zh-TW": "權重", "en-US": "Weights", "zh-CN": "权重" };
    data["contribution"] = { "ja-JP": "", "zh-TW": "貢獻", "en-US": "Contribution", "zh-CN": "贡献" };
    data["goldmedal"] = { "ja-JP": "", "zh-TW": "金質勳章", "en-US": "Golden Badge", "zh-CN": "金质勋章" };
    data["selected"] = { "ja-JP": "", "zh-TW": "已選：", "en-US": "Selected:", "zh-CN": "已选：" };
    data["currentselected"] = { "ja-JP": "", "zh-TW": "本次：", "en-US": "Current:", "zh-CN": "本次：" };
    data["saveimage"] = { "ja-JP": "", "zh-TW": "生成全符文圖片", "en-US": "Generate all rune image", "zh-CN": "生成全符文图片" };
    data["reset"] = { "ja-JP": "", "zh-TW": "重置本次選擇", "en-US": "Reset current selected", "zh-CN": "重置本次选择" };
    data["save"] = { "ja-JP": "", "zh-TW": "保存", "en-US": "Save", "zh-CN": "保存" };
    //dialog



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