webpackJsonp([6],{

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initUiLanguage", function() { return initUiLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getActiveMenu", function() { return getActiveMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setActiveMenu", function() { return setActiveMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initByClass", function() { return initByClass; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_nprogress__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_nprogress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_nprogress__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lz_string__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lz_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lz_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_dom_to_image__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_dom_to_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_dom_to_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_backbone__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_backbone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_backbone__);









var activeMenu = "";
var runeList = [];
var runeCheckList = [];
var typeBranch = 0;
var minX = 0;
var maxX = 0;
var minY = 0;
var maxY = 0;
var scale = 0.2;
var maxevo = 4;
var pathAlgorithm = "nogold";
var inited = false;
var runeSize = 60.0;
var defaultTypeBranch = {
    1: 11,
    2: 21,
    3: 31,
    4: 41,
    5: 51,
    6: 61,
};

var initUiLanguage = function () {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-lang]').each(function () {
        var $this = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
        var key = $this.data("lang");
        var value = __WEBPACK_IMPORTED_MODULE_2__ui_js__["a" /* default */].getText(key);
        $this.text(value);
    });
};
var getActiveMenu = function () {
    return activeMenu;
}
var setActiveMenu = function (id) {
    activeMenu = id;
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()("nav.navbar .active").removeClass('active');
    //$("body>div[data-tab]").hide();
    var current = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("nav.navbar [data-type-branch-id=" + id + "]");
    current.parents('li').addClass('active');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#class').text(current.text());
};
var initByClass = function (id, savedata) {
    if (defaultTypeBranch[id]) {
        id = defaultTypeBranch[id];
    }
    init(id, savedata);
};
var init = function (id, savedata) {
    clear();
    initControl();
    render(id, savedata);
};
var clear = function () {
    runeList = [];
    runeCheckList = [];
};
var initControl = function () {
    if (inited) { return; }
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#version').text(__WEBPACK_IMPORTED_MODULE_3__data_js__["default"].getVersion());
    if (__WEBPACK_IMPORTED_MODULE_3__data_js__["default"].isTest()) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.alert').show();
    }
    else {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.alert').remove();
    }
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#btnSearch').click(function () {
        var text = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#txtSearch').val();
        //$('.rune[data-name*="' + text + '"]').popover('show');
        var list = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.rune[data-name="' + text + '"]').not('.rune-not-available');
        list.popover('show');
        if (list.length) {
            var top = 9999999;
            list.each(function (i, o) {
                top = Math.min(top, parseFloat(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(o).css('top')));
            });
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#main').animate({
                scrollTop: Math.max(top - 50, 0)
            }, 500);
        }
        else {
            //alert("该符文不存在，请尝试启用进阶符文");
            alert(__WEBPACK_IMPORTED_MODULE_2__ui_js__["a" /* default */].getText('runenotexist'));
        }
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#btnClear').click(function () {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-toggle="popover"]').popover('hide');
    });

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#btnSaveImage').click(function () {
        var w = window.open('about:blank;', '_blank');
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(w.document.body).append(__WEBPACK_IMPORTED_MODULE_2__ui_js__["a" /* default */].getText('generating'));
        __WEBPACK_IMPORTED_MODULE_6_dom_to_image___default.a.toPng(__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.astrolabe-container')[0], { bgcolor: '#fff' })
            .then(function (dataUrl) {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(w.document.body).empty();
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(w.document.body).append(__WEBPACK_IMPORTED_MODULE_0_jquery___default()('<textarea style="width:100%;height:100px;">').val(window.location));
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(w.document.body).append(__WEBPACK_IMPORTED_MODULE_0_jquery___default()('<img>').attr('src', dataUrl));
            })
            .catch(function (error) {
                console.error(__WEBPACK_IMPORTED_MODULE_2__ui_js__["a" /* default */].getText('generateerror'), error);
            });
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#btnReset').click(function () {
        if (confirm(__WEBPACK_IMPORTED_MODULE_2__ui_js__["a" /* default */].getText('confirmreset'))) {
            __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(runeCheckList, function (o, i) {
                var $rune = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#rune" + o);
                $rune.data('status', 0)
                    .removeClass('rune-checked')
            });
            runeCheckList = [];

            renderCost();
            renderRuneLink();
        }
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#btnSave').click(function () {
        save();
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('input[name="evo"]').change(function () {
        maxevo = parseInt(this.value);
        render(typeBranch);
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#scale').change(function () {
        scale = parseFloat(this.value) || 0.2;
        render(typeBranch);
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('input[name="pathAlgorithm"]').change(function () {
        pathAlgorithm = this.value;
        if (pathAlgorithm == "custom") {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#algorithmWeight').show();
        }
        else {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#algorithmWeight').hide();
        }
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.rune-panel-switch').click(function () {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.rune-panel-main').toggle();
    });
    inited = true;
};
var render = function (id, savedata) {
    console.log("render", id, savedata);
    var self = this;
    if (id == 0) {
        return;
    }
    typeBranch = id;
    setActiveMenu(typeBranch);
    //clear main
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#main').find("img").attr('src', ''); //stop image loading when doPage
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#main').empty();
    //get data
    var astrolabe = __WEBPACK_IMPORTED_MODULE_3__data_js__["default"].getAstrolabe();

    minX = __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.min(astrolabe, function (o) { return o.X }).X;
    maxX = __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.max(astrolabe, function (o) { return o.X }).X;
    minY = __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.min(astrolabe, function (o) { return o.Y }).Y;
    maxY = __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.max(astrolabe, function (o) { return o.Y }).Y;

    var $div = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("<div>").addClass("astrolabe-container");

    __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(astrolabe, function (o, i) {
        //debugger;
        var cost = __WEBPACK_IMPORTED_MODULE_3__data_js__["default"].getRuneCost(o.Id);
        var resetCost = __WEBPACK_IMPORTED_MODULE_3__data_js__["default"].getRuneResetCost(o.Id);
        var desc = __WEBPACK_IMPORTED_MODULE_3__data_js__["default"].getRuneDesc(o.Id, typeBranch);
        var $rune = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("<div>")
            .addClass("rune")
            .css("left", (((o.X - minX) + runeSize / 2) * scale))
            .css("top", (((maxY - o.Y) + runeSize / 2) * scale))
            .css("width", runeSize * scale)
            .css("height", runeSize * scale)
            .attr("id", "rune" + o.Id)
            .attr("data-id", o.Id)
            .data("rune", o)
            .data("cost", cost)
            .data("resetCost", resetCost)
            .data("desc", desc)
            .data("status", 0)  //0:unchecked,1:checked,2:saved
            .attr("data-toggle", "popover")
            .attr("data-name", desc.Name)
            //.attr("title", desc.Name + '<button type="button" id="close" class="close" onclick="$(this).parents(&quot;.popover&quot;).popover(&quot;hide&quot;);">&times;</button>')
            //.attr("title", $title.html())
            .attr("data-content", (desc.Desc || "")
                + "<br/>" + __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.reduce(cost, function (result, current) {
                    return result + current.Name + "*" + current.Count + " ";
                }, ""))
            .click(function () {
                runeClick(o.Id);
            });
        if (o.Id == 10000) {
            //set default rune as saved
            runeList.push(10000);
            $rune.addClass("rune-center")
                .data("status", 2)
                .attr("title", "")
                .attr("data-toggle", "");
        }
        if (o.Evo > maxevo) {
            $rune.addClass("rune-not-available")
                .attr("title", "")
                .attr("data-toggle", "")
                .off('click');
        }
        if (__WEBPACK_IMPORTED_MODULE_1_underscore___default.a.any(cost, function (o) { return o.Id == 5261; })) {
            $rune.addClass("rune-special");
        }
        if ((o.X - minX) / (maxX - minX) > 0.8) {
            $rune.attr("data-placement", "left");
        }
        if ((maxY - o.Y) / (maxY - minY) < 0.2) {
            $rune.attr("data-placement", "bottom");
        }
        $div.append($rune);
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#main').append($div);

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-toggle="popover"]').popover({
        html: true,
        trigger: 'hover focus',
        viewport: '.astrolabe-container'
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#main').on('show.bs.popover', function (e) {
        var $rune = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target);
        var desc = $rune.data("desc");
        var status = $rune.data("status");
        var $title = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div>')
            .append(__WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div>')
                .attr('runeId', $rune.attr("data-id"))
                .addClass('rune-icon')
                .addClass('rune-' + (status == 0 ? "off" : "on") + '-' + desc.Type)
                .text(desc.Name))
            .append('<button type="button" id="close" class="close" onclick="$(this).parents(&quot;.popover&quot;).popover(&quot;hide&quot;);">&times;</button>');
        $rune.attr('data-original-title', $title.html());
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#main').on('inserted.bs.popover', function (e) {
        var z = 0;
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.popover').each(function (i, o) {
            if (z < parseInt(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(o).css('z-index'))) {
                z = parseInt(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(o).css('z-index'));
            }
        });
        debugger;
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target.nextSibling)
            .css('z-index', z + 1)
            .off('mouseenter').off('click')
            .on("mouseenter click", function () {
                var zIndex = 0;
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.popover').each(function (i, o) {
                    if (zIndex < parseInt(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(o).css('z-index'))) {
                        zIndex = parseInt(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(o).css('z-index'));
                    }
                })
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).css('z-index', zIndex + 1);
                //console.log("current popover Z-Index", zIndex);
            })
            .on("click", '.rune-icon', function () {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).popover('hide');
                runeClick(parseInt(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('runeId')));
            });
    });

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#txtSearch').empty();
    __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(__WEBPACK_IMPORTED_MODULE_3__data_js__["default"].getAllRuneDescNameByTypeBranch(typeBranch), function (o, i) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#txtSearch').append(__WEBPACK_IMPORTED_MODULE_0_jquery___default()('<option>').text(o).val(o));
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.selectpicker').selectpicker('refresh');

    if (savedata) {
        runeList = parseCondition(savedata);
    }
    __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(runeList, function (o, i) {
        checkRune(o, true, true);
    });
    __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(runeCheckList, function (o, i) {
        checkRune(o, true, false);
    });
    renderCost();
    renderRuneLink();

    //setTimeout(function () {
    //    //a little delay to unveil for better unveil effect
    //    $('#main').find("img").unveil();
    //}, 100);
};

var renderRuneLink = function () {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".rune-link-container").remove();
    var runeLinkWidth = (maxX - minX + runeSize * 2) * scale;
    var runeLinkHeight = (maxY - minY + runeSize * 2) * scale
    var $runeLink = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("<canvas>")
        .attr("width", runeLinkWidth)
        .attr("height", runeLinkHeight)
        .addClass("rune-link-container");
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.astrolabe-container').append($runeLink);
    var linkcontext = $runeLink[0].getContext('2d');
    linkcontext.fillStyle = "rgba(0, 0, 0, 0.25)";
    linkcontext.font = "25px PingFang SC,Source Han Sans SC,Noto Sans CJK SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,sans-serif";
    if (__WEBPACK_IMPORTED_MODULE_3__data_js__["default"].isTest()) {
        linkcontext.textAlign = "left";
        linkcontext.fillText(__WEBPACK_IMPORTED_MODULE_2__ui_js__["a" /* default */].getText("alertCBT"), 0, 25);
    }
    linkcontext.textAlign = "left";
    linkcontext.fillText(__WEBPACK_IMPORTED_MODULE_0_jquery___default()('#runeCheckCost').data('cost'), 0, runeLinkHeight - 5);
    linkcontext.fillText(__WEBPACK_IMPORTED_MODULE_0_jquery___default()('#runeCost').data('cost'), 0, runeLinkHeight - 35);
    linkcontext.font = "25px Consolas";
    linkcontext.textAlign = "right";
    linkcontext.fillText("ROMEL Rune BFS", runeLinkWidth, runeLinkHeight - 35);
    linkcontext.fillText("Version:" + __WEBPACK_IMPORTED_MODULE_3__data_js__["default"].getVersion(), runeLinkWidth, runeLinkHeight - 5);
    __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(__WEBPACK_IMPORTED_MODULE_3__data_js__["default"].getAstrolabe(), function (o, i) {
        var runeData = o;
        __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(runeData.Link, function (o, i) {
            var runeToData = __WEBPACK_IMPORTED_MODULE_3__data_js__["default"].getRuneDataById(o);
            if (runeToData) {
                linkcontext.beginPath();
                linkcontext.moveTo((runeData.X - minX + runeSize) * scale, (maxY - runeData.Y + runeSize) * scale);
                linkcontext.lineTo((runeToData.X - minX + runeSize) * scale, (maxY - runeToData.Y + runeSize) * scale);
                linkcontext.lineWidth = 3;
                if (runeData.Evo > maxevo || runeToData.Evo > maxevo) {
                    linkcontext.strokeStyle = 'rgba(233, 233, 233, 0.15)';
                    linkcontext.stroke();
                }
                else if (!(__WEBPACK_IMPORTED_MODULE_1_underscore___default.a.contains(runeList.concat(runeCheckList), runeData.Id) && __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.contains(runeList.concat(runeCheckList), runeToData.Id))) {
                    linkcontext.strokeStyle = '#333';
                    linkcontext.stroke();
                }
                else {
                    linkcontext.lineWidth = 4;
                    linkcontext.strokeStyle = '#13a7ff';
                    linkcontext.stroke();
                    linkcontext.lineWidth = 3;
                    linkcontext.strokeStyle = '#85e2ff';
                    linkcontext.stroke();
                    linkcontext.lineWidth = 2;
                    linkcontext.strokeStyle = '#cef3ff';
                    linkcontext.stroke();
                    linkcontext.lineWidth = 1;
                    linkcontext.strokeStyle = '#eefcff';
                    linkcontext.stroke();
                }
            }
        });
    });
};

var renderCost = function () {
    var runeCost = [];
    var runeCheckCost = [];
    var runeResetCost = [];
    var runeCheckResetCost = [];

    var runeTotalAttr = [];
    var runeCheckTotalAttr = [];
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(".rune").each(function (i, o) {
        var $rune = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(o);
        var runeData = $rune.data("rune");
        var desc = $rune.data("desc");
        var status = $rune.data('status');
        var cost = $rune.data('cost');
        var resetCost = $rune.data('resetCost');
        switch (status) {
            case 0: break;
            case 1: {
                runeCheckCost.push(cost);
                runeCheckResetCost.push(resetCost);
                runeCheckTotalAttr.push(desc);
                break;
            }
            case 2: {
                runeCost.push(cost);
                runeResetCost.push(resetCost);
                runeTotalAttr.push(desc);
                break;
            }
            default: break;
        }
    });
    runeCheckCost = __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.reduce(runeCheckCost, function (memo, item) {
        __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(item, function (o, i) {
            memo[o.Name] = (memo[o.Name] || 0) + o.Count;
        })
        return memo;
    }, {});
    runeCost = __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.reduce(runeCost, function (memo, item) {
        __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(item, function (o, i) {
            memo[o.Name] = (memo[o.Name] || 0) + o.Count;
        })
        return memo;
    }, {});
    var runeCheckCostText = "";
    __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(runeCheckCost, function (o, i) {
        runeCheckCostText += i + "*" + o + " ";
    })
    var runeCostText = "";
    __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(runeCost, function (o, i) {
        runeCostText += i + "*" + o + " ";
    })
    runeCheckResetCost = __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.reduce(runeCheckResetCost, function (memo, item) {
        __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(item, function (o, i) {
            memo[o.Name] = (memo[o.Name] || 0) + o.Count;
        })
        return memo;
    }, {});
    runeResetCost = __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.reduce(runeResetCost, function (memo, item) {
        __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(item, function (o, i) {
            memo[o.Name] = (memo[o.Name] || 0) + o.Count;
        })
        return memo;
    }, {});
    var runeCheckResetCostText = "";
    __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(runeCheckResetCost, function (o, i) {
        runeCheckResetCostText += i + "*" + o + " ";
    })
    var runeResetCostText = "";
    __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(runeResetCost, function (o, i) {
        runeResetCostText += i + "*" + o + " ";
    })
    runeCheckTotalAttr = __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.reduce(runeCheckTotalAttr, function (memo, o) {
        if (!o || !o.Key) { return memo; }
        memo[o.Key] = (memo[o.Key] || 0) + o.Value;
        return memo;
    }, {});
    runeTotalAttr = __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.reduce(runeTotalAttr, function (memo, o) {
        if (!o || !o.Key) { return memo; }
        memo[o.Key] = (memo[o.Key] || 0) + o.Value;
        return memo;
    }, {});

    var runeCheckTotalAttrText = "";
    var index = 0;
    __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(runeCheckTotalAttr, function (o, i) {
        index++;
        runeCheckTotalAttrText += __WEBPACK_IMPORTED_MODULE_2__ui_js__["a" /* default */].getEquipEffect(i) + "+" + Math.round(o * 100) / 100 + " ";
        if (index % 4 == 0) { runeCheckTotalAttrText += "<br/>"; }
    })
    var runeTotalAttrText = "";
    index = 0;
    __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(runeTotalAttr, function (o, i) {
        index++;
        runeTotalAttrText += __WEBPACK_IMPORTED_MODULE_2__ui_js__["a" /* default */].getEquipEffect(i) + "+" + Math.round(o * 100) / 100 + " ";
        if (index % 4 == 0) { runeTotalAttrText += "<br/>"; }
    })
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#runeCheckCost').empty()
        .append(runeCheckCostText.trim()
            + "(" + runeCheckResetCostText.trim() + ")"
            + '<br/>' + runeCheckTotalAttrText.trim());
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#runeCheckCost').data('cost', runeCheckCostText.trim() + "(" + runeCheckResetCostText.trim() + ")");
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#runeCost').empty()
        .append(runeCostText.trim()
            + "(" + runeResetCostText.trim() + ")"
            + '<br/>' + runeTotalAttrText.trim());
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#runeCost').data('cost', runeCostText.trim() + "(" + runeResetCostText.trim() + ")");
};

var runeClick = function (runeId) {
    if (runeId == 10000) {
        uncheckRuneWithConfirm(runeId);
    }
    else {
        var $rune = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#rune" + runeId);
        var status = $rune.data('status');
        switch (status) {
            case 0: checkRune(runeId); break;
            case 1: uncheckRune(runeId); break;
            case 2: uncheckRuneWithConfirm(runeId); break;
            default: break;
        }
    }
    renderCost();
    renderRuneLink();
};

var checkRune = function (runeId, noRecursion, isSaved) {
    if (runeId == 10000) {
        return;
    }
    var $rune = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#rune" + runeId);
    if ($rune.data('rune').evo > maxevo) {
        return;
    }
    if (!noRecursion) {
        //var path = Data.getPath(runeList.concat(runeCheckList), runeId);
        var path = [];
        switch (pathAlgorithm) {
            case "simple": path = __WEBPACK_IMPORTED_MODULE_3__data_js__["default"].getPath(runeList.concat(runeCheckList), runeId, maxevo); break;
            case "nogold": path = __WEBPACK_IMPORTED_MODULE_3__data_js__["default"].getPathWithWeight(runeList.concat(runeCheckList), runeId, maxevo); break;
            case "custom": {
                var param = [{ id: 140, weight: parseFloat(__WEBPACK_IMPORTED_MODULE_0_jquery___default()('#weight140').val()) || 0 }, { id: 5261, weight: parseFloat(__WEBPACK_IMPORTED_MODULE_0_jquery___default()('#weight5261').val()) || 0 }];
                path = __WEBPACK_IMPORTED_MODULE_3__data_js__["default"].getPathWithWeight(runeList.concat(runeCheckList), runeId, maxevo, param);
                break;
            }
        }
        console.log("getPath", pathAlgorithm, path);
        if (!path.length) {
            alert(__WEBPACK_IMPORTED_MODULE_2__ui_js__["a" /* default */].getText("nopath"))
            return;
        }
        __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(path, function (o, i) {
            checkRune(o, true);
        });
    }
    else {
        if (isSaved) {
            $rune.data('status', 2)
                .addClass('rune-saved');
        }
        else {
            $rune.data('status', 1)
                .addClass('rune-checked');
            runeCheckList.push(runeId);
        }
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.rune-icon[runeId="' + runeId + '"]')
            .toggleClass('rune-off-' + $rune.data('desc').Type)
            .toggleClass('rune-on-' + $rune.data('desc').Type);
    }
};
var uncheckRuneWithConfirm = function (runeId) {
    if (confirm(__WEBPACK_IMPORTED_MODULE_2__ui_js__["a" /* default */].getText("confirmuncheck"))) {
        uncheckRune(runeId);
    }
};
var uncheckRune = function (runeId, noRecursion) {
    var $rune = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#rune" + runeId);
    if ($rune.data('rune').evo > maxevo) {
        return;
    }
    $rune.data('status', 0)
        .removeClass('rune-checked')
        .removeClass('rune-saved');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.rune-icon[runeId="' + runeId + '"]')
        .toggleClass('rune-off-' + $rune.data('desc').Type)
        .toggleClass('rune-on-' + $rune.data('desc').Type);
    runeList = __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.without(runeList, runeId);
    runeCheckList = __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.without(runeCheckList, runeId);
    if (!noRecursion) {
        var components = __WEBPACK_IMPORTED_MODULE_3__data_js__["default"].getConnectedComponent(runeList.concat(runeCheckList));
        __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(components, function (o, i) {
            if (__WEBPACK_IMPORTED_MODULE_1_underscore___default.a.contains(o, 10000) == false) {
                __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(o, function (p, j) {
                    uncheckRune(p, true);
                });
            }
        });
    }
    runeList = __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.union(runeList, [10000]);
};

var save = function () {
    runeList = __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.unique(runeList.concat(runeCheckList));
    runeCheckList = [];
    __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(runeList, function (o, i) {
        var $rune = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("#rune" + o);
        $rune.data('status', 2)
            .removeClass('rune-checked')
            .addClass('rune-saved');
    });
    renderCost();
    renderRuneLink();

    var data = stringifyCondition(runeList);
    __WEBPACK_IMPORTED_MODULE_7_backbone___default.a.history.navigate("typeBranch/" + typeBranch + "/share/" + data, { trigger: false });
};

function stringifyCondition(condition) {
    return __WEBPACK_IMPORTED_MODULE_5_lz_string___default.a.compressToEncodedURIComponent(JSON.stringify(condition));
}

function parseCondition(conditionJson) {
    return JSON.parse(__WEBPACK_IMPORTED_MODULE_5_lz_string___default.a.decompressFromEncodedURIComponent(conditionJson));
}


/* harmony default export */ __webpack_exports__["default"] = ({
    initUiLanguage,
    getActiveMenu,
    setActiveMenu,
    init,
    initByClass,
});

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.4
var LZString = (function() {

// private property
var f = String.fromCharCode;
var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
var baseReverseDic = {};

function getBaseValue(alphabet, character) {
  if (!baseReverseDic[alphabet]) {
    baseReverseDic[alphabet] = {};
    for (var i=0 ; i<alphabet.length ; i++) {
      baseReverseDic[alphabet][alphabet.charAt(i)] = i;
    }
  }
  return baseReverseDic[alphabet][character];
}

var LZString = {
  compressToBase64 : function (input) {
    if (input == null) return "";
    var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
    switch (res.length % 4) { // To produce valid Base64
    default: // When could this happen ?
    case 0 : return res;
    case 1 : return res+"===";
    case 2 : return res+"==";
    case 3 : return res+"=";
    }
  },

  decompressFromBase64 : function (input) {
    if (input == null) return "";
    if (input == "") return null;
    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
  },

  compressToUTF16 : function (input) {
    if (input == null) return "";
    return LZString._compress(input, 15, function(a){return f(a+32);}) + " ";
  },

  decompressFromUTF16: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
  },

  //compress into uint8array (UCS-2 big endian format)
  compressToUint8Array: function (uncompressed) {
    var compressed = LZString.compress(uncompressed);
    var buf=new Uint8Array(compressed.length*2); // 2 bytes per character

    for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
      var current_value = compressed.charCodeAt(i);
      buf[i*2] = current_value >>> 8;
      buf[i*2+1] = current_value % 256;
    }
    return buf;
  },

  //decompress from uint8array (UCS-2 big endian format)
  decompressFromUint8Array:function (compressed) {
    if (compressed===null || compressed===undefined){
        return LZString.decompress(compressed);
    } else {
        var buf=new Array(compressed.length/2); // 2 bytes per character
        for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
          buf[i]=compressed[i*2]*256+compressed[i*2+1];
        }

        var result = [];
        buf.forEach(function (c) {
          result.push(f(c));
        });
        return LZString.decompress(result.join(''));

    }

  },


  //compress into a string that is already URI encoded
  compressToEncodedURIComponent: function (input) {
    if (input == null) return "";
    return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
  },

  //decompress from an output of compressToEncodedURIComponent
  decompressFromEncodedURIComponent:function (input) {
    if (input == null) return "";
    if (input == "") return null;
    input = input.replace(/ /g, "+");
    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
  },

  compress: function (uncompressed) {
    return LZString._compress(uncompressed, 16, function(a){return f(a);});
  },
  _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
    if (uncompressed == null) return "";
    var i, value,
        context_dictionary= {},
        context_dictionaryToCreate= {},
        context_c="",
        context_wc="",
        context_w="",
        context_enlargeIn= 2, // Compensate for the first entry which should not count
        context_dictSize= 3,
        context_numBits= 2,
        context_data=[],
        context_data_val=0,
        context_data_position=0,
        ii;

    for (ii = 0; ii < uncompressed.length; ii += 1) {
      context_c = uncompressed.charAt(ii);
      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
        context_dictionary[context_c] = context_dictSize++;
        context_dictionaryToCreate[context_c] = true;
      }

      context_wc = context_w + context_c;
      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
        context_w = context_wc;
      } else {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
          if (context_w.charCodeAt(0)<256) {
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<8 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position ==bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<16 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }


        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        // Add wc to the dictionary.
        context_dictionary[context_wc] = context_dictSize++;
        context_w = String(context_c);
      }
    }

    // Output the code for w.
    if (context_w !== "") {
      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
        if (context_w.charCodeAt(0)<256) {
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<8 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        } else {
          value = 1;
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | value;
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = 0;
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<16 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        delete context_dictionaryToCreate[context_w];
      } else {
        value = context_dictionary[context_w];
        for (i=0 ; i<context_numBits ; i++) {
          context_data_val = (context_data_val << 1) | (value&1);
          if (context_data_position == bitsPerChar-1) {
            context_data_position = 0;
            context_data.push(getCharFromInt(context_data_val));
            context_data_val = 0;
          } else {
            context_data_position++;
          }
          value = value >> 1;
        }


      }
      context_enlargeIn--;
      if (context_enlargeIn == 0) {
        context_enlargeIn = Math.pow(2, context_numBits);
        context_numBits++;
      }
    }

    // Mark the end of the stream
    value = 2;
    for (i=0 ; i<context_numBits ; i++) {
      context_data_val = (context_data_val << 1) | (value&1);
      if (context_data_position == bitsPerChar-1) {
        context_data_position = 0;
        context_data.push(getCharFromInt(context_data_val));
        context_data_val = 0;
      } else {
        context_data_position++;
      }
      value = value >> 1;
    }

    // Flush the last char
    while (true) {
      context_data_val = (context_data_val << 1);
      if (context_data_position == bitsPerChar-1) {
        context_data.push(getCharFromInt(context_data_val));
        break;
      }
      else context_data_position++;
    }
    return context_data.join('');
  },

  decompress: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
  },

  _decompress: function (length, resetValue, getNextValue) {
    var dictionary = [],
        next,
        enlargeIn = 4,
        dictSize = 4,
        numBits = 3,
        entry = "",
        result = [],
        i,
        w,
        bits, resb, maxpower, power,
        c,
        data = {val:getNextValue(0), position:resetValue, index:1};

    for (i = 0; i < 3; i += 1) {
      dictionary[i] = i;
    }

    bits = 0;
    maxpower = Math.pow(2,2);
    power=1;
    while (power!=maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position == 0) {
        data.position = resetValue;
        data.val = getNextValue(data.index++);
      }
      bits |= (resb>0 ? 1 : 0) * power;
      power <<= 1;
    }

    switch (next = bits) {
      case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 2:
        return "";
    }
    dictionary[3] = c;
    w = c;
    result.push(c);
    while (true) {
      if (data.index > length) {
        return "";
      }

      bits = 0;
      maxpower = Math.pow(2,numBits);
      power=1;
      while (power!=maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position == 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        bits |= (resb>0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (c = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }

          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 2:
          return result.join('');
      }

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

      if (dictionary[c]) {
        entry = dictionary[c];
      } else {
        if (c === dictSize) {
          entry = w + w.charAt(0);
        } else {
          return null;
        }
      }
      result.push(entry);

      // Add w+entry[0] to the dictionary.
      dictionary[dictSize++] = w + entry.charAt(0);
      enlargeIn--;

      w = entry;

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

    }
  }
};
  return LZString;
})();

if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return LZString; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if( typeof module !== 'undefined' && module != null ) {
  module.exports = LZString
}


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

(function (global) {
    'use strict';

    var util = newUtil();
    var inliner = newInliner();
    var fontFaces = newFontFaces();
    var images = newImages();

    // Default impl options
    var defaultOptions = {
        // Default is to fail on error, no placeholder
        imagePlaceholder: undefined,
        // Default cache bust is false, it will use the cache
        cacheBust: false
    };

    var domtoimage = {
        toSvg: toSvg,
        toPng: toPng,
        toJpeg: toJpeg,
        toBlob: toBlob,
        toPixelData: toPixelData,
        impl: {
            fontFaces: fontFaces,
            images: images,
            util: util,
            inliner: inliner,
            options: {}
        }
    };

    if (true)
        module.exports = domtoimage;
    else
        global.domtoimage = domtoimage;


    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options
     * @param {Function} options.filter - Should return true if passed node should be included in the output
     *          (excluding node means excluding it's children as well). Not called on the root node.
     * @param {String} options.bgcolor - color for the background, any valid CSS color value.
     * @param {Number} options.width - width to be applied to node before rendering.
     * @param {Number} options.height - height to be applied to node before rendering.
     * @param {Object} options.style - an object whose properties to be copied to node's style before rendering.
     * @param {Number} options.quality - a Number between 0 and 1 indicating image quality (applicable to JPEG only),
                defaults to 1.0.
     * @param {String} options.imagePlaceholder - dataURL to use as a placeholder for failed images, default behaviour is to fail fast on images we can't fetch
     * @param {Boolean} options.cacheBust - set to true to cache bust by appending the time to the request url
     * @return {Promise} - A promise that is fulfilled with a SVG image data URL
     * */
    function toSvg(node, options) {
        options = options || {};
        copyOptions(options);
        return Promise.resolve(node)
            .then(function (node) {
                return cloneNode(node, options.filter, true);
            })
            .then(embedFonts)
            .then(inlineImages)
            .then(applyOptions)
            .then(function (clone) {
                return makeSvgDataUri(clone,
                    options.width || util.width(node),
                    options.height || util.height(node)
                );
            });

        function applyOptions(clone) {
            if (options.bgcolor) clone.style.backgroundColor = options.bgcolor;

            if (options.width) clone.style.width = options.width + 'px';
            if (options.height) clone.style.height = options.height + 'px';

            if (options.style)
                Object.keys(options.style).forEach(function (property) {
                    clone.style[property] = options.style[property];
                });

            return clone;
        }
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a Uint8Array containing RGBA pixel data.
     * */
    function toPixelData(node, options) {
        return draw(node, options || {})
            .then(function (canvas) {
                return canvas.getContext('2d').getImageData(
                    0,
                    0,
                    util.width(node),
                    util.height(node)
                ).data;
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a PNG image data URL
     * */
    function toPng(node, options) {
        return draw(node, options || {})
            .then(function (canvas) {
                return canvas.toDataURL();
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a JPEG image data URL
     * */
    function toJpeg(node, options) {
        options = options || {};
        return draw(node, options)
            .then(function (canvas) {
                return canvas.toDataURL('image/jpeg', options.quality || 1.0);
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a PNG image blob
     * */
    function toBlob(node, options) {
        return draw(node, options || {})
            .then(util.canvasToBlob);
    }

    function copyOptions(options) {
        // Copy options to impl options for use in impl
        if(typeof(options.imagePlaceholder) === 'undefined') {
            domtoimage.impl.options.imagePlaceholder = defaultOptions.imagePlaceholder;
        } else {
            domtoimage.impl.options.imagePlaceholder = options.imagePlaceholder;
        }

        if(typeof(options.cacheBust) === 'undefined') {
            domtoimage.impl.options.cacheBust = defaultOptions.cacheBust;
        } else {
            domtoimage.impl.options.cacheBust = options.cacheBust;
        }
    }

    function draw(domNode, options) {
        return toSvg(domNode, options)
            .then(util.makeImage)
            .then(util.delay(100))
            .then(function (image) {
                var canvas = newCanvas(domNode);
                canvas.getContext('2d').drawImage(image, 0, 0);
                return canvas;
            });

        function newCanvas(domNode) {
            var canvas = document.createElement('canvas');
            canvas.width = options.width || util.width(domNode);
            canvas.height = options.height || util.height(domNode);

            if (options.bgcolor) {
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = options.bgcolor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            return canvas;
        }
    }

    function cloneNode(node, filter, root) {
        if (!root && filter && !filter(node)) return Promise.resolve();

        return Promise.resolve(node)
            .then(makeNodeCopy)
            .then(function (clone) {
                return cloneChildren(node, clone, filter);
            })
            .then(function (clone) {
                return processClone(node, clone);
            });

        function makeNodeCopy(node) {
            if (node instanceof HTMLCanvasElement) return util.makeImage(node.toDataURL());
            return node.cloneNode(false);
        }

        function cloneChildren(original, clone, filter) {
            var children = original.childNodes;
            if (children.length === 0) return Promise.resolve(clone);

            return cloneChildrenInOrder(clone, util.asArray(children), filter)
                .then(function () {
                    return clone;
                });

            function cloneChildrenInOrder(parent, children, filter) {
                var done = Promise.resolve();
                children.forEach(function (child) {
                    done = done
                        .then(function () {
                            return cloneNode(child, filter);
                        })
                        .then(function (childClone) {
                            if (childClone) parent.appendChild(childClone);
                        });
                });
                return done;
            }
        }

        function processClone(original, clone) {
            if (!(clone instanceof Element)) return clone;

            return Promise.resolve()
                .then(cloneStyle)
                .then(clonePseudoElements)
                .then(copyUserInput)
                .then(fixSvg)
                .then(function () {
                    return clone;
                });

            function cloneStyle() {
                copyStyle(window.getComputedStyle(original), clone.style);

                function copyStyle(source, target) {
                    if (source.cssText) target.cssText = source.cssText;
                    else copyProperties(source, target);

                    function copyProperties(source, target) {
                        util.asArray(source).forEach(function (name) {
                            target.setProperty(
                                name,
                                source.getPropertyValue(name),
                                source.getPropertyPriority(name)
                            );
                        });
                    }
                }
            }

            function clonePseudoElements() {
                [':before', ':after'].forEach(function (element) {
                    clonePseudoElement(element);
                });

                function clonePseudoElement(element) {
                    var style = window.getComputedStyle(original, element);
                    var content = style.getPropertyValue('content');

                    if (content === '' || content === 'none') return;

                    var className = util.uid();
                    clone.className = clone.className + ' ' + className;
                    var styleElement = document.createElement('style');
                    styleElement.appendChild(formatPseudoElementStyle(className, element, style));
                    clone.appendChild(styleElement);

                    function formatPseudoElementStyle(className, element, style) {
                        var selector = '.' + className + ':' + element;
                        var cssText = style.cssText ? formatCssText(style) : formatCssProperties(style);
                        return document.createTextNode(selector + '{' + cssText + '}');

                        function formatCssText(style) {
                            var content = style.getPropertyValue('content');
                            return style.cssText + ' content: ' + content + ';';
                        }

                        function formatCssProperties(style) {

                            return util.asArray(style)
                                .map(formatProperty)
                                .join('; ') + ';';

                            function formatProperty(name) {
                                return name + ': ' +
                                    style.getPropertyValue(name) +
                                    (style.getPropertyPriority(name) ? ' !important' : '');
                            }
                        }
                    }
                }
            }

            function copyUserInput() {
                if (original instanceof HTMLTextAreaElement) clone.innerHTML = original.value;
                if (original instanceof HTMLInputElement) clone.setAttribute("value", original.value);
            }

            function fixSvg() {
                if (!(clone instanceof SVGElement)) return;
                clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

                if (!(clone instanceof SVGRectElement)) return;
                ['width', 'height'].forEach(function (attribute) {
                    var value = clone.getAttribute(attribute);
                    if (!value) return;

                    clone.style.setProperty(attribute, value);
                });
            }
        }
    }

    function embedFonts(node) {
        return fontFaces.resolveAll()
            .then(function (cssText) {
                var styleNode = document.createElement('style');
                node.appendChild(styleNode);
                styleNode.appendChild(document.createTextNode(cssText));
                return node;
            });
    }

    function inlineImages(node) {
        return images.inlineAll(node)
            .then(function () {
                return node;
            });
    }

    function makeSvgDataUri(node, width, height) {
        return Promise.resolve(node)
            .then(function (node) {
                node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
                return new XMLSerializer().serializeToString(node);
            })
            .then(util.escapeXhtml)
            .then(function (xhtml) {
                return '<foreignObject x="0" y="0" width="100%" height="100%">' + xhtml + '</foreignObject>';
            })
            .then(function (foreignObject) {
                return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
                    foreignObject + '</svg>';
            })
            .then(function (svg) {
                return 'data:image/svg+xml;charset=utf-8,' + svg;
            });
    }

    function newUtil() {
        return {
            escape: escape,
            parseExtension: parseExtension,
            mimeType: mimeType,
            dataAsUrl: dataAsUrl,
            isDataUrl: isDataUrl,
            canvasToBlob: canvasToBlob,
            resolveUrl: resolveUrl,
            getAndEncode: getAndEncode,
            uid: uid(),
            delay: delay,
            asArray: asArray,
            escapeXhtml: escapeXhtml,
            makeImage: makeImage,
            width: width,
            height: height
        };

        function mimes() {
            /*
             * Only WOFF and EOT mime types for fonts are 'real'
             * see http://www.iana.org/assignments/media-types/media-types.xhtml
             */
            var WOFF = 'application/font-woff';
            var JPEG = 'image/jpeg';

            return {
                'woff': WOFF,
                'woff2': WOFF,
                'ttf': 'application/font-truetype',
                'eot': 'application/vnd.ms-fontobject',
                'png': 'image/png',
                'jpg': JPEG,
                'jpeg': JPEG,
                'gif': 'image/gif',
                'tiff': 'image/tiff',
                'svg': 'image/svg+xml'
            };
        }

        function parseExtension(url) {
            var match = /\.([^\.\/]*?)$/g.exec(url);
            if (match) return match[1];
            else return '';
        }

        function mimeType(url) {
            var extension = parseExtension(url).toLowerCase();
            return mimes()[extension] || '';
        }

        function isDataUrl(url) {
            return url.search(/^(data:)/) !== -1;
        }

        function toBlob(canvas) {
            return new Promise(function (resolve) {
                var binaryString = window.atob(canvas.toDataURL().split(',')[1]);
                var length = binaryString.length;
                var binaryArray = new Uint8Array(length);

                for (var i = 0; i < length; i++)
                    binaryArray[i] = binaryString.charCodeAt(i);

                resolve(new Blob([binaryArray], {
                    type: 'image/png'
                }));
            });
        }

        function canvasToBlob(canvas) {
            if (canvas.toBlob)
                return new Promise(function (resolve) {
                    canvas.toBlob(resolve);
                });

            return toBlob(canvas);
        }

        function resolveUrl(url, baseUrl) {
            var doc = document.implementation.createHTMLDocument();
            var base = doc.createElement('base');
            doc.head.appendChild(base);
            var a = doc.createElement('a');
            doc.body.appendChild(a);
            base.href = baseUrl;
            a.href = url;
            return a.href;
        }

        function uid() {
            var index = 0;

            return function () {
                return 'u' + fourRandomChars() + index++;

                function fourRandomChars() {
                    /* see http://stackoverflow.com/a/6248722/2519373 */
                    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
                }
            };
        }

        function makeImage(uri) {
            return new Promise(function (resolve, reject) {
                var image = new Image();
                image.onload = function () {
                    resolve(image);
                };
                image.onerror = reject;
                image.src = uri;
            });
        }

        function getAndEncode(url) {
            var TIMEOUT = 30000;
            if(domtoimage.impl.options.cacheBust) {
                // Cache bypass so we dont have CORS issues with cached images
                // Source: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
                url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
            }

            return new Promise(function (resolve) {
                var request = new XMLHttpRequest();

                request.onreadystatechange = done;
                request.ontimeout = timeout;
                request.responseType = 'blob';
                request.timeout = TIMEOUT;
                request.open('GET', url, true);
                request.send();

                var placeholder;
                if(domtoimage.impl.options.imagePlaceholder) {
                    var split = domtoimage.impl.options.imagePlaceholder.split(/,/);
                    if(split && split[1]) {
                        placeholder = split[1];
                    }
                }

                function done() {
                    if (request.readyState !== 4) return;

                    if (request.status !== 200) {
                        if(placeholder) {
                            resolve(placeholder);
                        } else {
                            fail('cannot fetch resource: ' + url + ', status: ' + request.status);
                        }

                        return;
                    }

                    var encoder = new FileReader();
                    encoder.onloadend = function () {
                        var content = encoder.result.split(/,/)[1];
                        resolve(content);
                    };
                    encoder.readAsDataURL(request.response);
                }

                function timeout() {
                    if(placeholder) {
                        resolve(placeholder);
                    } else {
                        fail('timeout of ' + TIMEOUT + 'ms occured while fetching resource: ' + url);
                    }
                }

                function fail(message) {
                    console.error(message);
                    resolve('');
                }
            });
        }

        function dataAsUrl(content, type) {
            return 'data:' + type + ';base64,' + content;
        }

        function escape(string) {
            return string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
        }

        function delay(ms) {
            return function (arg) {
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(arg);
                    }, ms);
                });
            };
        }

        function asArray(arrayLike) {
            var array = [];
            var length = arrayLike.length;
            for (var i = 0; i < length; i++) array.push(arrayLike[i]);
            return array;
        }

        function escapeXhtml(string) {
            return string.replace(/#/g, '%23').replace(/\n/g, '%0A');
        }

        function width(node) {
            var leftBorder = px(node, 'border-left-width');
            var rightBorder = px(node, 'border-right-width');
            return node.scrollWidth + leftBorder + rightBorder;
        }

        function height(node) {
            var topBorder = px(node, 'border-top-width');
            var bottomBorder = px(node, 'border-bottom-width');
            return node.scrollHeight + topBorder + bottomBorder;
        }

        function px(node, styleProperty) {
            var value = window.getComputedStyle(node).getPropertyValue(styleProperty);
            return parseFloat(value.replace('px', ''));
        }
    }

    function newInliner() {
        var URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;

        return {
            inlineAll: inlineAll,
            shouldProcess: shouldProcess,
            impl: {
                readUrls: readUrls,
                inline: inline
            }
        };

        function shouldProcess(string) {
            return string.search(URL_REGEX) !== -1;
        }

        function readUrls(string) {
            var result = [];
            var match;
            while ((match = URL_REGEX.exec(string)) !== null) {
                result.push(match[1]);
            }
            return result.filter(function (url) {
                return !util.isDataUrl(url);
            });
        }

        function inline(string, url, baseUrl, get) {
            return Promise.resolve(url)
                .then(function (url) {
                    return baseUrl ? util.resolveUrl(url, baseUrl) : url;
                })
                .then(get || util.getAndEncode)
                .then(function (data) {
                    return util.dataAsUrl(data, util.mimeType(url));
                })
                .then(function (dataUrl) {
                    return string.replace(urlAsRegex(url), '$1' + dataUrl + '$3');
                });

            function urlAsRegex(url) {
                return new RegExp('(url\\([\'"]?)(' + util.escape(url) + ')([\'"]?\\))', 'g');
            }
        }

        function inlineAll(string, baseUrl, get) {
            if (nothingToInline()) return Promise.resolve(string);

            return Promise.resolve(string)
                .then(readUrls)
                .then(function (urls) {
                    var done = Promise.resolve(string);
                    urls.forEach(function (url) {
                        done = done.then(function (string) {
                            return inline(string, url, baseUrl, get);
                        });
                    });
                    return done;
                });

            function nothingToInline() {
                return !shouldProcess(string);
            }
        }
    }

    function newFontFaces() {
        return {
            resolveAll: resolveAll,
            impl: {
                readAll: readAll
            }
        };

        function resolveAll() {
            return readAll(document)
                .then(function (webFonts) {
                    return Promise.all(
                        webFonts.map(function (webFont) {
                            return webFont.resolve();
                        })
                    );
                })
                .then(function (cssStrings) {
                    return cssStrings.join('\n');
                });
        }

        function readAll() {
            return Promise.resolve(util.asArray(document.styleSheets))
                .then(getCssRules)
                .then(selectWebFontRules)
                .then(function (rules) {
                    return rules.map(newWebFont);
                });

            function selectWebFontRules(cssRules) {
                return cssRules
                    .filter(function (rule) {
                        return rule.type === CSSRule.FONT_FACE_RULE;
                    })
                    .filter(function (rule) {
                        return inliner.shouldProcess(rule.style.getPropertyValue('src'));
                    });
            }

            function getCssRules(styleSheets) {
                var cssRules = [];
                styleSheets.forEach(function (sheet) {
                    try {
                        util.asArray(sheet.cssRules || []).forEach(cssRules.push.bind(cssRules));
                    } catch (e) {
                        console.log('Error while reading CSS rules from ' + sheet.href, e.toString());
                    }
                });
                return cssRules;
            }

            function newWebFont(webFontRule) {
                return {
                    resolve: function resolve() {
                        var baseUrl = (webFontRule.parentStyleSheet || {}).href;
                        return inliner.inlineAll(webFontRule.cssText, baseUrl);
                    },
                    src: function () {
                        return webFontRule.style.getPropertyValue('src');
                    }
                };
            }
        }
    }

    function newImages() {
        return {
            inlineAll: inlineAll,
            impl: {
                newImage: newImage
            }
        };

        function newImage(element) {
            return {
                inline: inline
            };

            function inline(get) {
                if (util.isDataUrl(element.src)) return Promise.resolve();

                return Promise.resolve(element.src)
                    .then(get || util.getAndEncode)
                    .then(function (data) {
                        return util.dataAsUrl(data, util.mimeType(element.src));
                    })
                    .then(function (dataUrl) {
                        return new Promise(function (resolve, reject) {
                            element.onload = resolve;
                            element.onerror = reject;
                            element.src = dataUrl;
                        });
                    });
            }
        }

        function inlineAll(node) {
            if (!(node instanceof Element)) return Promise.resolve(node);

            return inlineBackground(node)
                .then(function () {
                    if (node instanceof HTMLImageElement)
                        return newImage(node).inline();
                    else
                        return Promise.all(
                            util.asArray(node.childNodes).map(function (child) {
                                return inlineAll(child);
                            })
                        );
                });

            function inlineBackground(node) {
                var background = node.style.getPropertyValue('background');

                if (!background) return Promise.resolve(node);

                return inliner.inlineAll(background)
                    .then(function (inlined) {
                        node.style.setProperty(
                            'background',
                            inlined,
                            node.style.getPropertyPriority('background')
                        );
                    })
                    .then(function () {
                        return node;
                    });
            }
        }
    }
})(this);


/***/ })

});