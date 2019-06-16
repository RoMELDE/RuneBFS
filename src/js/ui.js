import $ from "jquery";
import _ from 'underscore';

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
data["class"] = { "ja-JP": "職業", "zh-TW": "職業", "en-US": "Classes", "zh-CN": "职业" };
data["type-1"] = { "ja-JP": "剣士系", "zh-TW": "劍士系", "en-US": "Swordman", "zh-CN": "剑士系" };
data["type-2"] = { "ja-JP": "マジシャン系", "zh-TW": "魔法師系", "en-US": "Mage", "zh-CN": "魔法师系" };
data["type-3"] = { "ja-JP": "シーフ系", "zh-TW": "盜賊系", "en-US": "Thief", "zh-CN": "盗贼系" };
data["type-4"] = { "ja-JP": "アーチャー系", "zh-TW": "弓箭手系", "en-US": "Archer", "zh-CN": "弓箭手系" };
data["type-5"] = { "ja-JP": "アコライト系", "zh-TW": "服事系", "en-US": "Acolyte", "zh-CN": "服事系" };
data["type-6"] = { "ja-JP": "商人系", "zh-TW": "商人系", "en-US": "Merchant", "zh-CN": "商人系" };

data["typeBranch-11"] = { "ja-JP": "騎士", "zh-TW": "騎士", "en-US": "Knight", "zh-CN": "骑士" };
data["typeBranch-12"] = { "ja-JP": "クルセイダー", "zh-TW": "十字軍", "en-US": "Crusader", "zh-CN": "十字军" };
data["typeBranch-21"] = { "ja-JP": "ウィザード", "zh-TW": "巫師", "en-US": "Wizard", "zh-CN": "巫师" };
data["typeBranch-22"] = { "ja-JP": "セージ", "zh-TW": "賢者", "en-US": "Sage", "zh-CN": "贤者" };
data["typeBranch-31"] = { "ja-JP": "アサシン", "zh-TW": "刺客", "en-US": "Assassin", "zh-CN": "刺客" };
data["typeBranch-32"] = { "ja-JP": "ローグ", "zh-TW": "流氓", "en-US": "Rogue", "zh-CN": "流氓" };
data["typeBranch-41"] = { "ja-JP": "ハンター", "zh-TW": "獵人", "en-US": "Hunter", "zh-CN": "猎人" };
data["typeBranch-42"] = { "ja-JP": "バード", "zh-TW": "吟遊詩人", "en-US": "Bard", "zh-CN": "诗人" };
data["typeBranch-43"] = { "ja-JP": "ダンサー", "zh-TW": "舞孃", "en-US": "Dancer", "zh-CN": "舞娘" };
data["typeBranch-51"] = { "ja-JP": "プリースト", "zh-TW": "祭司", "en-US": "Priest", "zh-CN": "牧师" };
data["typeBranch-52"] = { "ja-JP": "モンク", "zh-TW": "武道家", "en-US": "Monk", "zh-CN": "武僧" };
data["typeBranch-61"] = { "ja-JP": "ブラックスミス", "zh-TW": "鐵匠", "en-US": "Blacksmith", "zh-CN": "铁匠" };
data["typeBranch-62"] = { "ja-JP": "アルケミスト", "zh-TW": "鍊金術士", "en-US": "Alchemist", "zh-CN": "炼金术士" };

data["search"] = { "ja-JP": "検索", "zh-TW": "搜尋", "en-US": "Search", "zh-CN": "查询" };
data["clear"] = { "ja-JP": "クリア", "zh-TW": "清空", "en-US": "Clear", "zh-CN": "清空" };

data["currentversion"] = { "ja-JP": "Ver: ", "zh-TW": "當前版本：", "en-US": "Current Ver.:", "zh-CN": "当前版本：" };
data["externallink"] = { "ja-JP": "外部リンク", "zh-TW": "外部鏈接", "en-US": "External Links", "zh-CN": "外部链接" };
data["officalsite"] = { "ja-JP": "公式サイト", "zh-TW": "官網", "en-US": "Offical Site", "zh-CN": "官网" };
data["donate"] = { "ja-JP": "NGA RO", "zh-TW": "送版主女裝", "en-US": "NGA RO", "zh-CN": "送版主女装" };

data["ui"] = { "ja-JP": "言語", "zh-TW": "界面語言", "en-US": "UI", "zh-CN": "界面语言" };
data["data"] = { "ja-JP": "データ", "zh-TW": "資料語言", "en-US": "Data", "zh-CN": "数据语言" };

data["server"] = { "ja-JP": "サーバー", "zh-TW": "伺服器", "en-US": "Server", "zh-CN": "服务器" };
data["disablecache"] = { "ja-JP": "キャッシュを無効化", "zh-TW": "停用快取", "en-US": "Disable Cache", "zh-CN": "禁用缓存", };
data["enablecache"] = { "ja-JP": "キャッシュを有効化", "zh-TW": "啟用快取", "en-US": "Enable Cache", "zh-CN": "启用缓存", };
data["disablecachewarning"]={
    "ja-JP": "キャッシュを無効化にすると、ページの読み込みが遅くなります。無効化にしますか？",
    "zh-TW": "停用快取會使網頁載入變慢，是否確認停用？",
    "en-US": "Disabling caching will cause the page to load slowly, CONFIRM?",
    "zh-CN": "禁用缓存会导致网页加载缓慢，是否确认禁用？"
};

data["alertCBT"] = { "ja-JP": "注意：CBTサーバのデータを利用しています。", "zh-TW": "警告：正在使用測試服務器數據。", "en-US": "Warning:Currently using CBT server data.", "zh-CN": "警告：正在使用测试服务器数据。" };
//rune panel
data["selectall"] = { "ja-JP": "ルーン全選択", "zh-TW": "選擇全部符文", "en-US": "Select All Runes", "zh-CN": "选择全部符文" };

data["runerange"] = { "ja-JP": "ルーン範囲", "zh-TW": "符文範圍", "en-US": "Rune Range", "zh-CN": "符文范围" };
data["firstclass"] = { "ja-JP": "一次職", "zh-TW": "一轉", "en-US": "First Class", "zh-CN": "一转" };
data["secondclass"] = { "ja-JP": "二次職", "zh-TW": "二轉", "en-US": "Second Class", "zh-CN": "二转" };
data["transcendentsecondclass"] = { "ja-JP": "上位二次職", "zh-TW": "進階二轉", "en-US": "Transcendent Second Class", "zh-CN": "进阶二转" };
data["thirdclass"] = { "ja-JP": "三次職", "zh-TW": "三轉", "en-US": "Third Class", "zh-CN": "三转" };
data["thirdclassplus"] = { "ja-JP": "三次職+", "zh-TW": "三轉+", "en-US": "Third Class+", "zh-CN": "深化" };


data["disable"] = { "ja-JP": "拡張前", "zh-TW": "不啟用", "en-US": "Disable", "zh-CN": "不启用" };
data["enable"] = { "ja-JP": "拡張後", "zh-TW": "啟用", "en-US": "Enable", "zh-CN": "启用" };
data["zoom"] = { "ja-JP": "拡大率", "zh-TW": "縮放", "en-US": "Zoom", "zh-CN": "缩放" };
data["algorithm"] = { "ja-JP": "経路算出：", "zh-TW": "尋路算法", "en-US": "Pathfinding algorithm", "zh-CN": "寻路算法" };
data["algorithm-simple"] = { "ja-JP": "最短経路", "zh-TW": "最短路徑", "en-US": "Shortest Path", "zh-CN": "最短路径" };
data["algorithm-nogold"] = { "ja-JP": "最低金メダル", "zh-TW": "最少金質勳章", "en-US": "Minimum Golden Badge", "zh-CN": "最少金质勋章" };
data["algorithm-custom"] = { "ja-JP": "カスタム", "zh-TW": "自定義", "en-US": "Custom", "zh-CN": "自定义" };
data["weight"] = { "ja-JP": "比重", "zh-TW": "權重", "en-US": "Weights", "zh-CN": "权重" };
data["contribution"] = { "ja-JP": "貢献", "zh-TW": "貢獻", "en-US": "Contribution", "zh-CN": "贡献" };
data["goldmedal"] = { "ja-JP": "金盾", "zh-TW": "金質勳章", "en-US": "Golden Badge", "zh-CN": "金质勋章" };
data["selected"] = { "ja-JP": "保存済：", "zh-TW": "已選：", "en-US": "Selected:", "zh-CN": "已选：" };
data["currentselected"] = { "ja-JP": "現選択：", "zh-TW": "本次：", "en-US": "Current:", "zh-CN": "本次：" };
data["saveimage"] = { "ja-JP": "画像生成", "zh-TW": "生成全符文圖片", "en-US": "Generate all rune image", "zh-CN": "生成全符文图片" };
data["reset"] = { "ja-JP": "選択リセット", "zh-TW": "重置本次選擇", "en-US": "Reset current selected", "zh-CN": "重置本次选择" };
data["save"] = { "ja-JP": "選択保存", "zh-TW": "保存", "en-US": "Save", "zh-CN": "保存" };
//dialog
data["runenotexist"] = { "ja-JP": "このルーンを取得するためには神碑を拡張する必要があります", "zh-TW": "該符文不存在，請嘗試啟用進階符文", "en-US": "This rune is not exist, try enable Evolution Rune first", "zh-CN": "该符文不存在，请尝试启用进阶符文" };
data["generating"] = { "ja-JP": "生成中...", "zh-TW": "生成中……", "en-US": "Generating...", "zh-CN": "生成中……" };
data["generateerror"] = { "ja-JP": "生成失敗", "zh-TW": "生成圖片異常", "en-US": "Generate Error", "zh-CN": "生成图片异常" };
data["confirmreset"] = { "ja-JP": "選択状態を全てリセットして良いですか？", "zh-TW": "是否重置本次選擇？", "en-US": "Confirm reset current selected?", "zh-CN": "是否重置本次选择？" };
data["nopath"] = { "ja-JP": "パスがありません", "zh-TW": "無路徑！", "en-US": "No path!", "zh-CN": "无路径！" };
data["confirmuncheck"] = { "ja-JP": "保存済みのルーン選択状態を解除してよいですか？", "zh-TW": "是否取消選中該符文？", "en-US": "Confirm uncheck this rune?", "zh-CN": "是否取消选中该符文？" };

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
var init = function () {
    $('[data-lang]').each(function () {
        var $this = $(this);
        var key = $this.data("lang");
        var value = getText(key);
        var target = $this.data("lang-target");
        if (target) {
            $this.attr(target, value);
        }
        else {
            $this.text(value);
        }
    });
    //deal with bootstrap select
    switch (currentLang) {
        case "ja-JP": {
            import('bootstrap-select/js/i18n/defaults-ja_JP');
            break;
        }
        case "zh-TW": {
            import('bootstrap-select/js/i18n/defaults-zh_TW');
            break;
        }
        case "en-US": {
            import('bootstrap-select/js/i18n/defaults-en_US');
            break;
        }
        case "zh-CN": {
            import('bootstrap-select/js/i18n/defaults-zh_CN');
            break;
        }
    }
};

var EquipEffect = {
    "zh-CN": {
        Atk: "物理攻击",
        Def: "物理防御",
        MAtk: "魔法攻击",
        MDef: "魔法防御",
        MaxHp: "最大生命值",
        MaxHpPer: "最大生命值%",
        Str: "力量",
        Int: "智力",
        Vit: "体质",
        Agi: "敏捷",
        Dex: "灵巧",
        Luk: "幸运",
        AtkPer: "物攻百分比",
        DefPer: "物防百分比",
        MAtkPer: "魔攻百分比",
        MDefPer: "魔防百分比",
        Hit: "命中",
        Flee: "闪避",
        Cri: "暴击",
        CriRes: "暴击防护",
        AtkSpd: "攻击速度",
        MoveSpd: "移动速度",
        CastSpd: "吟唱速度",
        Refine: "精炼物攻",
        MRefine: "精炼魔攻",
        DamIncrease: "物伤加成",
        MDamIncrease: "魔伤加成",
        DamReduc: "物伤减免",
        MDamReduc: "魔伤减免",
        RefineDamReduc: "精炼物免",
        RefineMDamReduc: "精炼魔免",
    },
    "zh-TW": {
        Atk: "物理攻擊",
        Def: "物理防禦",
        MAtk: "魔法攻擊",
        MDef: "魔法防禦",
        MaxHp: "最大生命值",
        MaxHpPer: "最大生命值%",
        Str: "力量",
        Int: "智力",
        Vit: "體質",
        Agi: "敏捷",
        Dex: "靈巧",
        Luk: "幸運",
        AtkPer: "物攻百分比",
        DefPer: "物防百分比",
        MAtkPer: "魔攻百分比",
        MDefPer: "魔防百分比",
        Hit: "命中",
        Flee: "閃避",
        Cri: "暴擊",
        CriRes: "暴擊防護",
        AtkSpd: "攻擊速度",
        MoveSpd: "移動速度",
        CastSpd: "吟唱速度",
        Refine: "精煉物攻",
        MRefine: "精煉魔攻",
        DamIncrease: "物傷加成",
        MDamIncrease: "魔傷加成",
        DamReduc: "物傷減免",
        MDamReduc: "魔傷減免",
        RefineDamReduc: "精煉物免",
        RefineMDamReduc: "精煉魔免",
    },
    "ja-JP": {
        Atk: "物理攻撃",
        Def: "物理防御",
        MAtk: "魔法攻撃",
        MDef: "魔法防御",
        MaxHp: "MaxHP",
        MaxHpPer: "MaxHP%",
        Str: "STR",
        Int: "INT",
        Vit: "VIT",
        Agi: "AGI",
        Dex: "DEX",
        Luk: "LUK",
        AtkPer: "物攻%",
        DefPer: "物防%",
        MAtkPer: "魔攻%",
        MDefPer: "魔防%",
        Hit: "命中",
        Flee: "Flee",
        Cri: "クリティカル",
        CriRes: "クリティカル防御",
        AtkSpd: "攻撃速度",
        MoveSpd: "移動速度",
        CastSpd: "詠唱速度",
        Refine: "精錬物攻",
        MRefine: "精錬魔攻",
        DamIncrease: "物ダメ増加",
        MDamIncrease: "魔ダメ増加",
        DamReduc: "物ダメ軽減",
        MDamReduc: "魔ダメ軽減",
        RefineDamReduc: "精錬物ダメ耐性",
        RefineMDamReduc: "精錬魔ダメ耐性",
    }
}
var getEquipEffect = function (key) {
    if (!EquipEffect[getLang()]) {
        return key;
    }
    return EquipEffect[getLang()][key] || key;
};


export {
    supportedLang,
    getText,
    getLang,
    setLang,
    init,
    getEquipEffect
};
export default {
    supportedLang,
    getText,
    getLang,
    setLang,
    init,
    getEquipEffect
};