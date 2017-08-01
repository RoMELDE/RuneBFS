define(['jquery', 'underscore', 'backbone', 'data', 'ui', 'nouislider', 'LZString', 'bootstrap', 'bootstrap-select', 'jquery.unveil', 'dom-to-image'], function ($, _, Backbone, Data, Ui, noUiSlider, LZString, BitSet, skillDescTemplate) {
    var activeMenu = "";
    var runeList = [];
    var runeCheckList = [];
    var classId = 0;
    var minX = 0;
    var maxX = 0;
    var minY = 0;
    var maxY = 0;
    var scale = 0.2;
    var disableEvo3 = false;
    var pathAlgorithm = "nogold";
    var inited = false;
    var runeSize = 60.0;

    var initUiLanguage = function () {
        $('[data-lang]').each(function () {
            var $this = $(this);
            var key = $this.data("lang");
            var value = Ui.getText(key);
            $this.text(value);
        });
    };
    var getActiveMenu = function () {
        return activeMenu;
    }
    var setActiveMenu = function (id) {
        activeMenu = id;
        $("nav.navbar .active").removeClass('active');
        //$("body>div[data-tab]").hide();
        var current = $("nav.navbar [data-class-id=" + id + "]");
        current.parents('li').addClass('active');
        $('#class').text(current.text());
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
        $('#btnSearch').click(function () {
            var text = $('#txtSearch').val();
            //$('.rune[data-name*="' + text + '"]').popover('show');
            var list = $('.rune[data-name="' + text + '"]').not('.rune-not-available');
            list.popover('show');
            if (list.length) {
                var top = 9999999;
                list.each(function (i, o) {
                    top = Math.min(top, parseFloat($(o).css('top')));
                });
                $('#main').animate({
                    scrollTop: Math.max(top - 50, 0)
                }, 500);
            }
            else {
                alert("该符文不存在，请尝试启用进阶符文");
            }
        });
        $('#btnClear').click(function () {
            $('[data-toggle="popover"]').popover('hide');
        });

        $('#btnSaveImage').click(function () {
            var w = window.open('about:blank;', '_blank');
            $(w.document.body).append("生成中……");
            domtoimage.toPng($('.astrolabe-container')[0], { bgcolor: '#fff' })
                .then(function (dataUrl) {
                    $(w.document.body).empty();
                    $(w.document.body).append($('<textarea style="width:100%;height:100px;">').val(window.location));
                    $(w.document.body).append($('<img>').attr('src', dataUrl));
                })
                .catch(function (error) {
                    console.error('生成图片异常', error);
                });
        });
        $('#btnReset').click(function () {
            if (confirm("是否重置本次选择？")) {
                _.each(runeCheckList, function (o, i) {
                    var $rune = $("#rune" + o);
                    $rune.data('status', 0)
                        .removeClass('rune-checked')
                });
                runeCheckList = [];

                renderRuneLink();
                renderCost();
            }
        });
        $('#btnSave').click(function () {
            save();
        });
        $('input[name="evo3"]').change(function () {
            if (this.value == "true") {
                disableEvo3 = false;
            }
            else {
                disableEvo3 = true;
            }
            render(classId);
        });
        $('#scale').change(function () {
            scale = parseFloat(this.value) || 0.2;
            render(classId);
        });
        $('input[name="pathAlgorithm"]').change(function () {
            pathAlgorithm = this.value;
        });
        $('.rune-panel-switch').click(function () {
            $('.rune-panel-main').toggle();
        });
        inited = true;
    };
    var render = function (id, savedata) {
        console.log("render", id, savedata);
        var self = this;
        if (id == 0) {
            return;
        }
        classId = id;
        setActiveMenu(id);
        //clear main
        $('#main').find("img").attr('src', ''); //stop image loading when doPage
        $('#main').empty();
        //get data
        var astrolabe = Data.getAstrolabe();

        minX = _.min(astrolabe, function (o) { return o.X }).X;
        maxX = _.max(astrolabe, function (o) { return o.X }).X;
        minY = _.min(astrolabe, function (o) { return o.Y }).Y;
        maxY = _.max(astrolabe, function (o) { return o.Y }).Y;

        var $div = $("<div>").addClass("astrolabe-container");

        _.each(astrolabe, function (o, i) {
            //debugger;
            var cost = Data.getRuneCost(o.Id);
            var desc = Data.getRuneDesc(o.Id, classId);
            var $rune = $("<div>")
                .addClass("rune")
                .css("left", (((o.X - minX) + runeSize / 2) * scale))
                .css("top", (((maxY - o.Y) + runeSize / 2) * scale))
                .css("width", runeSize * scale)
                .css("height", runeSize * scale)
                .attr("id", "rune" + o.Id)
                .attr("data-id", o.Id)
                .data("rune", o)
                .data("cost", cost)
                .data("desc", desc)
                .data("status", 0)  //0:unchecked,1:checked,2:saved
                .attr("data-toggle", "popover")
                .attr("data-name", desc.Name)
                .attr("title", desc.Name + '<button type="button" id="close" class="close" onclick="$(this).parents(&quot;.popover&quot;).popover(&quot;hide&quot;);">&times;</button>')
                .attr("data-content", (desc.Desc || "")
                + "<br/>" + _.reduce(cost, function (result, current) {
                    return result + current.Name + "*" + current.Count + " ";
                }, ""))
                .click(function () {
                    runeClick(o);
                });
            if (o.Id == 10000) {
                //set default rune as saved
                runeList.push(10000);
                $rune.addClass("rune-center")
                    .data("status", 2)
                    .attr("title", "")
                    .attr("data-toggle", "")
                    .off('click');
            }
            if (disableEvo3 && o.Evo == 3) {
                $rune.addClass("rune-not-available")
                    .attr("title", "")
                    .attr("data-toggle", "")
                    .off('click');
            }
            if (_.any(cost, function (o) { return o.Id == 5261; })) {
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
        $('#main').append($div);

        $('[data-toggle="popover"]').popover({
            html: true,
            trigger: 'hover focus',
            viewport: '.astrolabe-container'
        });

        $('#txtSearch').empty();
        _.each(Data.getAllRuneDescNameByClassId(classId), function (o, i) {
            $('#txtSearch').append($('<option>').text(o).val(o));
        });
        $('.selectpicker').selectpicker('refresh');

        if (savedata) {
            runeList = parseCondition(savedata);
        }
        _.each(runeList, function (o, i) {
            checkRune(o, true, true);
        });
        _.each(runeCheckList, function (o, i) {
            checkRune(o, true, false);
        });
        renderRuneLink();
        renderCost();

        setTimeout(function () {
            //a little delay to unveil for better unveil effect
            $('#main').find("img").unveil();
        }, 100);
    };

    var renderRuneLink = function () {
        $(".rune-link-container").remove();
        var $runeLink = $("<canvas>")
            .attr("width", (maxX - minX + runeSize * 2) * scale)
            .attr("height", (maxY - minY + runeSize * 2) * scale)
            .addClass("rune-link-container");
        $('.astrolabe-container').append($runeLink);
        var linkcontext = $runeLink[0].getContext('2d');
        _.each(Data.getAstrolabe(), function (o, i) {
            var runeData = o;
            _.each(runeData.Link, function (o, i) {
                var runeToData = Data.getRuneDataById(o);
                if (runeToData) {
                    linkcontext.beginPath();
                    linkcontext.moveTo((runeData.X - minX + runeSize) * scale, (maxY - runeData.Y + runeSize) * scale);
                    linkcontext.lineTo((runeToData.X - minX + runeSize) * scale, (maxY - runeToData.Y + runeSize) * scale);
                    linkcontext.lineWidth = 3;
                    if (disableEvo3 && (runeData.Evo == 3 || runeToData.Evo == 3)) {
                        linkcontext.strokeStyle = 'rgba(233, 233, 233, 0.15)';
                        linkcontext.stroke();
                    }
                    else if (!(_.contains(runeList.concat(runeCheckList), runeData.Id) && _.contains(runeList.concat(runeCheckList), runeToData.Id))) {
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
        $(".rune").each(function (i, o) {
            var $rune = $(o);
            var runeData = $rune.data("rune")
            var status = $rune.data('status');
            var cost = $rune.data('cost');
            switch (status) {
                case 0: break;
                case 1: runeCheckCost.push(cost); break;
                case 2: runeCost.push(cost); break;
                default: break;
            }
        });
        runeCheckCost = _.reduce(runeCheckCost, function (memo, item) {
            _.each(item, function (o, i) {
                memo[o.Name] = (memo[o.Name] || 0) + o.Count;
            })
            return memo;
        }, {});
        runeCost = _.reduce(runeCost, function (memo, item) {
            _.each(item, function (o, i) {
                memo[o.Name] = (memo[o.Name] || 0) + o.Count;
            })
            return memo;
        }, {});
        var runeCheckCostText = "";
        _.each(runeCheckCost, function (o, i) {
            runeCheckCostText += i + "*" + o + " ";
        })
        $('#runeCheckCost').text(runeCheckCostText);
        var runeCostText = "";
        _.each(runeCost, function (o, i) {
            runeCostText += i + "*" + o + " ";
        })
        $('#runeCost').text(runeCostText);
    };

    var runeClick = function (rune) {
        var $rune = $("#rune" + rune.Id);
        var status = $rune.data('status');
        switch (status) {
            case 0: checkRune(rune.Id); break;
            case 1: uncheckRune(rune.Id); break;
            case 2: uncheckRuneWithConfirm(rune.Id); break;
            default: break;
        }
        renderRuneLink();
        renderCost();
    };

    var checkRune = function (runeId, noRecursion, isSaved) {
        if (runeId == 10000) {
            return;
        }
        var $rune = $("#rune" + runeId);
        if (disableEvo3 && $rune.data('rune').evo == 3) {
            return;
        }
        if (!noRecursion) {
            //var path = Data.getPath(runeList.concat(runeCheckList), runeId);
            var path = [];
            switch (pathAlgorithm) {
                case "simple": path = Data.getPath(runeList.concat(runeCheckList), runeId, disableEvo3); break;
                case "nogold": path = Data.getPathWithWeight(runeList.concat(runeCheckList), runeId, disableEvo3); break;
                case "custom": {
                    var param = [{ id: 140, weight: parseFloat($('#weight140').val()) || 0 }, { id: 5261, weight: parseFloat($('#weight5261').val()) || 0 }];
                    path = Data.getPathWithWeight(runeList.concat(runeCheckList), runeId, disableEvo3, param);
                    break;
                }
            }
            console.log("getPath", pathAlgorithm, path);
            if (!path.length) {
                alert("无路径！")
                return;
            }
            _.each(path, function (o, i) {
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
        }
    };
    var uncheckRuneWithConfirm = function (runeId) {
        if (confirm("是否取消选中该符文？")) {
            uncheckRune(runeId);
        }
    };
    var uncheckRune = function (runeId, noRecursion) {
        if (runeId == 10000) {
            return;
        }
        var $rune = $("#rune" + runeId);
        if (disableEvo3 && $rune.data('rune').evo == 3) {
            return;
        }
        $rune.data('status', 0)
            .removeClass('rune-checked')
            .removeClass('rune-saved');
        runeList = _.without(runeList, runeId);
        runeCheckList = _.without(runeCheckList, runeId);
        if (!noRecursion) {
            var components = Data.getConnectedComponent(runeList.concat(runeCheckList));
            _.each(components, function (o, i) {
                if (_.contains(o, 10000) == false) {
                    _.each(o, function (p, j) {
                        uncheckRune(p, true);
                    });
                }
            });
        }
    };

    var save = function () {
        runeList = _.unique(runeList.concat(runeCheckList));
        runeCheckList = [];
        _.each(runeList, function (o, i) {
            var $rune = $("#rune" + o);
            $rune.data('status', 2)
                .removeClass('rune-checked')
                .addClass('rune-saved');
        });
        renderCost();

        var data = stringifyCondition(runeList);
        Backbone.history.navigate("class/" + classId + "/share/" + data, { trigger: false });
    };

    function stringifyCondition(condition) {
        return LZString.compressToEncodedURIComponent(JSON.stringify(condition));
    }

    function parseCondition(conditionJson) {
        return JSON.parse(LZString.decompressFromEncodedURIComponent(conditionJson));
    }

    return {
        initUiLanguage: initUiLanguage,
        getActiveMenu: getActiveMenu,
        setActiveMenu: setActiveMenu,
        init: init,
    };
});