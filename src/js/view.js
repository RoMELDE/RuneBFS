import $ from "jquery";
import _ from 'underscore';
import Ui from './ui.js';
import { Data } from './data.js'
import NProgress from 'nprogress'
import LZString from 'lz-string'
import domtoimage from 'dom-to-image';
import Backbone from 'backbone';
import * as sigma from 'sigma';
import 'sigma/plugins/sigma.renderers.customShapes/shape-library';
import 'sigma/plugins/sigma.renderers.customShapes/sigma.renderers.customShapes';

// icon & color setting
import IMG_RUNE_OFF_1 from '../img/Rune_Off_1.png';
import IMG_RUNE_OFF_2 from '../img/Rune_Off_2.png';
import IMG_RUNE_OFF_3 from '../img/Rune_Off_3.png';
import IMG_RUNE_OFF_4 from '../img/Rune_Off_4.png';
import IMG_RUNE_OFF_5 from '../img/Rune_Off_5.png';
import IMG_RUNE_OFF_6 from '../img/Rune_Off_6.png';
import IMG_RUNE_SEL_1 from '../img/Rune_SEL_1.png';
import IMG_RUNE_SEL_2 from '../img/Rune_SEL_2.png';
import IMG_RUNE_SEL_3 from '../img/Rune_SEL_3.png';
import IMG_RUNE_SEL_4 from '../img/Rune_SEL_4.png';
import IMG_RUNE_SEL_5 from '../img/Rune_SEL_5.png';
import IMG_RUNE_SEL_6 from '../img/Rune_SEL_6.png';
import IMG_RUNE_ON_1 from '../img/Rune_On_1.png';
import IMG_RUNE_ON_2 from '../img/Rune_On_2.png';
import IMG_RUNE_ON_3 from '../img/Rune_On_3.png';
import IMG_RUNE_ON_4 from '../img/Rune_On_4.png';
import IMG_RUNE_ON_5 from '../img/Rune_On_5.png';
import IMG_RUNE_ON_6 from '../img/Rune_On_6.png';
// IMG_RUNE[status][type]
var IMG_RUNE = [["", IMG_RUNE_OFF_1, IMG_RUNE_OFF_2, IMG_RUNE_OFF_3, IMG_RUNE_OFF_4, IMG_RUNE_OFF_5, IMG_RUNE_OFF_6],
                ["", IMG_RUNE_SEL_1, IMG_RUNE_SEL_2, IMG_RUNE_SEL_3, IMG_RUNE_SEL_4, IMG_RUNE_SEL_5, IMG_RUNE_SEL_6],
                ["", IMG_RUNE_ON_1, IMG_RUNE_ON_2, IMG_RUNE_ON_3, IMG_RUNE_ON_4, IMG_RUNE_ON_5, IMG_RUNE_ON_6]];
var NODE_COLOR = [["","#333333","#333333","#333333","#333333","#333333","#666666"], 
				  ["", "#0ed9d6", "#0ed9d6", "#0ed9d6", "#0ed9d6", "#0ed9d6", "#0ed9d6"],
				  ["", "#e36956", "#3a85ed", "#c6a701", "#379f1e", "#d08349", "#ae56ed"]];

var activeMenu = "";
var runeList = [];
var runeCheckList = [];
var typeBranch = 0;
var maxevo = 99999;
var pathAlgorithm = "nogold";
var inited = false;
var runeSize = 6.0;
var defaultTypeBranch = {
    1: 11,
    2: 21,
    3: 31,
    4: 41,
    5: 51,
    6: 61,
};
// sigma.js 
var s, g;

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
    $("nav.navbar [data-type-branch-id].active").removeClass('active');
    //$("body>div[data-tab]").hide();
    var current = $("nav.navbar [data-type-branch-id=" + id + "]");
    current.addClass('active');
    current.parents('li').addClass('active');
    $('#class').text(current.text());
};
var initByClass = function (id, savedata, server) {
    if (defaultTypeBranch[id]) {
        id = defaultTypeBranch[id];
    }
    init(id, savedata, server);
};
var init = function (id, savedata, server) {
    if (server && server != Data.getCurrentServer().id) {
        Data.setCurrentServer(server);
        location.reload();
    }
    clear();
    initControl();
    initGraph(id, savedata);
    initEventListener();
};
var clear = function () {
    runeList = [];
    runeCheckList = [];
};
var initControl = function () {
    if (inited) { return; }
    var server = Data.getCurrentServer();
    $('#server').text(server.name);
    $('#version').text(server.version);
    if (server.isTest) {
        $('.alert').show();
    }
    else {
        $('.alert').remove();
    }
    _.each(Data.getAllServers(), function (o, i) {
        if (!o.version) {
            return;
        }
        $('#serverDivider').before('<a class="dropdown-item ' + ((o.id == server.id) ? ' active ' : '') + (o.version ? '' : ' disabled ') + '" href="#server/' + o.id + '">' + o.name + '<div class="m-0" style="font-size:0.75rem;line-height:0.75rem;">' + o.version + '</div></a>');
    });

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
            alert(Ui.getText('Rune not exist'));
        }
    });
    $('#btnClear').click(function () {
        $('[data-toggle="popover"]').popover('hide');
    });

    $('#btnSelectAll').click(function () {
        var astrolabe = Data.getAstrolabe();
        _.each(astrolabe, function (o, i) {
            checkRune(o.Id, true, false);
        });
        //renderCost();
		updateGraph();
    });

    $('#btnSaveImage').click(function () {
        var w = window.open('about:blank;', '_blank');
        $(w.document.body).append(Ui.getText('generating'));
        domtoimage.toPng($('.astrolabe-container')[0], { bgcolor: '#fff' })
            .then(function (dataUrl) {
                $(w.document.body).empty();
                $(w.document.body).append($('<textarea style="width:100%;height:100px;">').val(window.location));
                $(w.document.body).append($('<img>').attr('src', dataUrl));
            })
            .catch(function (error) {
                console.error(Ui.getText('generateerror'), error);
            });
    });
    $('#btnReset').click(function () {
        if (confirm(Ui.getText('confirmreset'))) {
            _.each(runeCheckList, function (o, i) {
                var rune = s.graph.nodes("rune" + o);
                rune.status = 0;
            });
            runeCheckList = [];
			updateGraph();
        }
    });
    $('#btnSave').click(function () {
        save();
    });
    $('input[name="evo"]').change(function () {
        maxevo = parseInt(this.value);
        initGraph(typeBranch);
    });
    $('input[name="pathAlgorithm"]').change(function () {
        pathAlgorithm = this.value;
        if (pathAlgorithm == "custom") {
            $('#algorithmWeight').show();
        }
        else {
            $('#algorithmWeight').hide();
        }
    });
    $('.rune-panel-switch').click(function () {
        $('.rune-panel-main').toggle();
    });
    inited = true;
};

var updateGraph = function(){
	_.each(s.graph.nodes(), function(rune, i) {
        rune.color = NODE_COLOR[rune.status][rune.runetype];
	    rune.image.url = IMG_RUNE[rune.status][rune.runetype];
	});
	s.refresh();
};

var initGraph = function (id, savedata) {
    console.log("initGraph", id, savedata);
    if(s) s.kill();
    var self = this;
    if (id == 0) {
        return;
    }
    typeBranch = id;
    setActiveMenu(typeBranch);

    //get data
    var astrolabe = Data.getAstrolabe();

	// generate nodes and edges
	var nodes = [];
	var edges = []
    _.each(astrolabe, function (o, i) {
        // nodes: 
        var cost = Data.getRuneCost(o.Id);
        var resetCost = Data.getRuneResetCost(o.Id);
        var desc = Data.getRuneDesc(o.Id, typeBranch);
        var rune = {
            id: "rune" + o.Id,
            x: o.X,
            y: -1 * o.Y ,
            size: runeSize,
            image: {
	            url: IMG_RUNE[0][desc.Type],
	            scale: 1.3
	        },
            dataid: o.Id,
            rune: o,
            cost: cost,
            label: desc.Name, //desc.Desc,
            runetype: desc.Type,
            status: 0,   //0:unchecked,1:checked,2:saved
        };
        if (o.Id == 10000) {
            //set default rune as saved
            rune.status = 2;
            runeCheckList.push(o.Id);
        }
        if (o.Evo > maxevo) {  // evo はルーン盤の解放範囲
            rune.status = 3;
        }
        nodes.push(rune);
        
        // edges 
        _.each(o.Link, function (oo, i) {
        	var target = Data.getRuneDataById(oo)
            if (target) {
				var edge = {
		    		id: 'edge'+ o.Id +'-'+ target.Id,
	    			source: 'rune' + o.Id,
	    			target: 'rune' + target.Id 
	    		};
		    	edges.push(edge);
	    	}
	    });
    });
	g = { nodes: nodes, edges : edges };
    s = new sigma({ graph: g,
					renderer: {
						container: document.getElementById('astrolabe-viewer'),
						type: 'canvas'
    				},
					settings: {
				        autoRescale: ["nodePosition", "nodeSize"],
				        adjustSizes: false,
				        fixed: true,
				        defaultNodeType: 'circle', 
				        defaultLabelAlignment : 'inside',
				        labelSize : "proportional", 
				        labelSizeRatio: 0.5, 
				        labelThreshold: 12,
				}
			});
    CustomShapes.init(s);
    s.cameras[0].goTo({ x: 0, y: 50, angle: 0, ratio: 0.25 });
    updateGraph();	
};

var initEventListener = function(){
	s.bind("clickNode", function(e){
	    /*if (e.node.dataId == 10000) {
	        uncheckRuneWithConfirm(runeId);
	    }else{*/
	    console.log("clicked :", e);
		switch(e.data.node.status) {
            case 0:
			    console.log("case 0 : checkRune");
                checkRune(e.data.node);
                break;	
            case 1:
                uncheckRune(e.data.node);
                break;
            case 2:
                uncheckRuneWithConfirm(e.data.node);
                break;
            default:
                break;
         }
		updateGraph();
	});
};


	/*

    $('#txtSearch').empty();
    _.each(Data.getAllRuneDescNameByTypeBranch(typeBranch), function (o, i) {
        $('#txtSearch').append($('<option>').text(o).val(o));
    });
    $('.selectpicker').selectpicker('refresh');

    if (savedata) {
        runeList = parseCondition(savedata);
    }
    _.each(, function (o, i) {
        checkRune(o, true, true);
    });
    _.each(runeCheckList, function (o, i) {
        checkRune(o, true, false);
    });
    renderCost();
    */

var renderCost = function () {
    var runeCost = [];
    var runeCheckCost = [];
    var runeResetCost = [];
    var runeCheckResetCost = [];

    var runeTotalAttr = [];
    var runeCheckTotalAttr = [];
    $(".rune").each(function (i, o) {
        var $rune = $(o);
        var runeData = $rune.data("rune");
        var desc = $rune.data("desc");
        var status = $rune.data('status');
        var cost = $rune.data('cost');
        var resetCost = $rune.data('resetCost');
        switch (status) {
            case 0:
                break;
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
            default:
                break;
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
    var runeCostText = "";
    _.each(runeCost, function (o, i) {
        runeCostText += i + "*" + o + " ";
    })
    runeCheckResetCost = _.reduce(runeCheckResetCost, function (memo, item) {
        _.each(item, function (o, i) {
            memo[o.Name] = (memo[o.Name] || 0) + o.Count;
        })
        return memo;
    }, {});
    runeResetCost = _.reduce(runeResetCost, function (memo, item) {
        _.each(item, function (o, i) {
            memo[o.Name] = (memo[o.Name] || 0) + o.Count;
        })
        return memo;
    }, {});
    var runeCheckResetCostText = "";
    _.each(runeCheckResetCost, function (o, i) {
        runeCheckResetCostText += i + "*" + o + " ";
    })
    var runeResetCostText = "";
    _.each(runeResetCost, function (o, i) {
        runeResetCostText += i + "*" + o + " ";
    })
    runeCheckTotalAttr = _.reduce(runeCheckTotalAttr, function (memo, o) {
        if (!o || !o.Key) { return memo; }
        memo[o.Key] = (memo[o.Key] || 0) + o.Value;
        return memo;
    }, {});
    runeTotalAttr = _.reduce(runeTotalAttr, function (memo, o) {
        if (!o || !o.Key) { return memo; }
        memo[o.Key] = (memo[o.Key] || 0) + o.Value;
        return memo;
    }, {});

    var runeCheckTotalAttrText = "";
    var index = 0;
    _.each(runeCheckTotalAttr, function (o, i) {
        index++;
        runeCheckTotalAttrText += Ui.getEquipEffect(i) + "+" + Math.round(o * 100) / 100 + " ";
        if (index % 4 == 0) { runeCheckTotalAttrText += "<br/>"; }
    })
    var runeTotalAttrText = "";
    index = 0;
    _.each(runeTotalAttr, function (o, i) {
        index++;
        runeTotalAttrText += Ui.getEquipEffect(i) + "+" + Math.round(o * 100) / 100 + " ";
        if (index % 4 == 0) { runeTotalAttrText += "<br/>"; }
    })
    $('#runeCheckCost').empty()
        .append(runeCheckCostText.trim() +
            "(" + runeCheckResetCostText.trim() + ")" +
            '<br/>' + runeCheckTotalAttrText.trim());
    $('#runeCheckCost').data('cost', runeCheckCostText.trim() + "(" + runeCheckResetCostText.trim() + ")");
    $('#runeCost').empty()
        .append(runeCostText.trim() +
            "(" + runeResetCostText.trim() + ")" +
            '<br/>' + runeTotalAttrText.trim());
    $('#runeCost').data('cost', runeCostText.trim() + "(" + runeResetCostText.trim() + ")");
};

var checkRune = function (rune, noRecursion, isSaved) {
	var runeId = rune.dataid;
    if (runeId == 10000) {
        return;
    }
    if (rune.Evo > maxevo) {
        return;
    }
    if (!noRecursion) {
        //var path = Data.getPath(runeList.concat(runeCheckList), runeId);
        var path = [];
        switch (pathAlgorithm) {
            case "simple":
                path = Data.getPath(runeList.concat(runeCheckList), runeId, maxevo);
                break;
            case "nogold":
                path = Data.getPathWithWeight(runeList.concat(runeCheckList), runeId, maxevo);
                break;
            case "custom": {
                var param = [{ id: 140, weight: parseFloat($('#weight140').val()) || 0 }, { id: 5261, weight: parseFloat($('#weight5261').val()) || 0 }];
                path = Data.getPathWithWeight(runeList.concat(runeCheckList), runeId, maxevo, param);
                break;
            }
        }
        console.log("getPath", pathAlgorithm, path);
        if (!path.length) {
            alert(Ui.getText("nopath"))
            return;
        }
        _.each(path, function (o, i) {
            checkRune(s.graph.nodes('rune'+ o), true);
        });
    }
    else {
        if (isSaved) {
            if (rune.status >= 2) {
                return;
            }
            rune.status = 2;
        }
        else {
            if (rune.status >= 1) {
                return;
            }
            rune.status = 1;
            runeCheckList.push(runeId);
        }
    }
};

var uncheckRuneWithConfirm = function (runeId) {
    if (confirm(Ui.getText("confirmuncheck"))) {
        uncheckRune(runeId);
    }
};
var uncheckRune = function (rune, noRecursion) {
    var runeId = rune.dataid;
    if (rune.Evo > maxevo) {
        return;
    }
    rune.status = 0;

    runeList = _.without(runeList, runeId);
    runeCheckList = _.without(runeCheckList, runeId);
    if (!noRecursion) {
        var components = Data.getConnectedComponent(runeList.concat(runeCheckList));
        _.each(components, function (o, i) {
            if (_.contains(o, 10000) == false) {
                _.each(o, function (p, j) {
                    uncheckRune(s.graph.nodes('rune'+ p), true);
                });
            }
        });
    }
    runeList = _.union(runeList, [10000]);
};

var save = function () {
    runeList = _.unique(runeList.concat(runeCheckList));
    runeCheckList = [];
    _.each(runeList, function (o, i) {
        var rune = s.graph.nodes("rune" + o);
        rune.status = 2;
    });
    // renderCost();
    updateGraph();

    var data = stringifyCondition(runeList);
    Backbone.history.navigate("typeBranch/" + typeBranch + "/share/" + data + '/server/' + Data.getCurrentServer().id, { trigger: false });
};

function stringifyCondition(condition) {
    return LZString.compressToEncodedURIComponent(JSON.stringify(condition));
}

function parseCondition(conditionJson) {
    return JSON.parse(LZString.decompressFromEncodedURIComponent(conditionJson));
}

export {
    initUiLanguage,
    getActiveMenu,
    setActiveMenu,
    init,
    initByClass,
};
export default {
    initUiLanguage,
    getActiveMenu,
    setActiveMenu,
    init,
    initByClass,
};