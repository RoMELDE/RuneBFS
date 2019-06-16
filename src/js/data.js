import localForage from "localforage";
import _ from 'underscore';
import Ui from './ui.js';
import serverList from "../data/serverList.json";

const baseKey = "ROMEL_RuneBFS_";
const lastUpdateKey = "lastUpdate_ROMEL_RuneBFS";
const serverKey = baseKey + "Server";

var data = {};

var getAllServers = function () {
    return serverList;
}
var getDefaultServer = function () {
    return _.find(getAllServers(), function (o) { return o.isDefault });
}
var getCurrentServer = function () {
    var currentServerID = localStorage.getItem(serverKey);
    if (!currentServerID) {
        return getDefaultServer();
    }
    var current = _.find(getAllServers(), function (o) { return o.id == currentServerID });
    return current || getDefaultServer();
}
var setCurrentServer = function (id) {
    var server = getAllServers()[id] || getDefaultServer();
    localStorage.setItem(serverKey, server.id);
}

var init = function (forceInit) {
    forceInit = !!forceInit;
    var folder = getCurrentServer().folder;
    var store = localForage.createInstance({
        name: baseKey + folder
    });
    return isDataOutdated().then(function (needForceUpdate) {
        var promises = [];
        if (!forceInit && !needForceUpdate) {
            console.log("All data cached. ", folder);
            var loaddata = function (key) {
                return store.getItem(baseKey + key).then(json => {
                    data[key] = JSON.parse(json);
                });
            };
            promises.push(loaddata('astrolabe'));
            promises.push(loaddata('rune'));
            promises.push(loaddata('runeByTypeBranch'));
            promises.push(loaddata('runeSpecial'));
            promises.push(loaddata('runeSpecialDesc'));
            return Promise.all(promises);
        }
        return store.clear().then(() => {
            var savedata = function (key, server, jsondata) {
                return store.setItem(baseKey + key, JSON.stringify(jsondata), function () {
                    console.log("Get data from web. ", server, key);
                    data[key] = jsondata;
                });
            }
            promises.push(import(
                /* webpackChunkName: "jsondata" */
                '../data/' + folder + '/astrolabe.json').then(jsondata => {
                return savedata('astrolabe', folder, jsondata.default);
            }));
            promises.push(import(
                /* webpackChunkName: "jsondata" */
                '../data/' + folder + '/rune.json').then(jsondata => {
                return savedata('rune', folder, jsondata.default);
            }));
            promises.push(import(
                /* webpackChunkName: "jsondata" */
                '../data/' + folder + '/runeByTypeBranch.json').then(jsondata => {
                return savedata('runeByTypeBranch', folder, jsondata.default);
            }));
            promises.push(import(
                /* webpackChunkName: "jsondata" */
                '../data/' + folder + '/runeSpecial.json').then(jsondata => {
                return savedata('runeSpecial', folder, jsondata.default);
            }));
            promises.push(import(
                /* webpackChunkName: "jsondata" */
                '../data/' + folder + '/runeSpecialDesc.json').then(jsondata => {
                return savedata('runeSpecialDesc', folder, jsondata.default);
            }));
            return Promise.all(promises).then(() => {
                return store.setItem(lastUpdateKey, lastUpdate)
            });
        });
    });
};

var lastUpdate;
var isDataOutdated = function () {
    var folder = getCurrentServer().folder;
    var store = localForage.createInstance({
        name: baseKey + folder
    });
    return store.getItem(lastUpdateKey).then(function (data) {
        lastUpdate = data;
        return import('../data/' + folder + '/lastUpdate.json').then(data => {
            var local = lastUpdate;
            var remote = data.default;
            var isLatest = new Date(local).getTime() >= new Date(remote).getTime();
            lastUpdate = remote;
            if (!local) {
                return true;
            }
            return isLatest == false;
        });
    });
};

var getAstrolabe = function () {
    return data["astrolabe"];
};
var getRuneCost = function (id) {
    return (_.find(data.rune, function (p) { return p.Id === parseInt(id); }) || {}).Cost || [];
}
var getRuneResetCost = function (id) {
    return (_.find(data.rune, function (p) { return p.Id === parseInt(id); }) || {}).ResetCost || [];
}
var getRuneDesc = function (id, typeBranch) {
    var desc = _.find(data.runeByTypeBranch[typeBranch], function (p) { return p.Id === parseInt(id); }) || {};
    if (desc.SpecialDescId) {
        desc.Runetip = _.find(data.runeSpecial, function (p) { return p.Id === parseInt(desc.SpecialDescId); });
        if (desc.Runetip) {
            desc.Runetip.Text = _.find(data.runeSpecialDesc, function (p) { return p.Id === desc.Runetip.Runetip }).Text;
            desc.Desc = formatRunetip(desc.Runetip);
        }
    }
    else {
        desc.Desc = Ui.getEquipEffect(desc.Key) + "+" + desc.Value;
    }
    return desc;
}
var getAllRuneDescNameByTypeBranch = function (typeBranch) {
    return _.chain(data.runeByTypeBranch[typeBranch])
        .uniq(function (rune) { return rune.Name; })
        .pluck('Name')
        .compact()
        .sortBy(function (o) { return o; })
        .value() || [];
}


var getRuneDataById = function (id) {
    return _.find(data.astrolabe, function (p) { return p.Id === parseInt(id); });
};
var getRuneLink = function (id) {
    return (getRuneDataById(id) || {}).Link || [];
};
var getPath = function (runeList, runeId, maxevo) {
    maxevo = maxevo || 999;
    var pathList = [];

    var queue = [];
    var marked = [];
    var edgeTo = [];
    var bfs = function (runeFrom) {
        marked[runeFrom] = true;
        queue.push(runeFrom);
        while (queue.length) {
            var v = queue.shift();
            _.each(getRuneLink(v), function (w) {
                if ((_.find(data.astrolabe, function (p) { return p.Id === parseInt(w); }) || {}).Evo > maxevo) {
                    return;
                }
                if (!marked[w]) {
                    edgeTo[w] = v;
                    marked[w] = true;
                    queue.push(w);
                }
            });
        }
    };
    var hasPathTo = function (runeTo) {
        return marked[runeTo];
    }
    var pathTo = function (runeFrom, runeTo) {
        if (!hasPathTo(runeTo)) {
            return [];
        }
        if (runeFrom == runeTo) {
            return [];
        }
        var path = [];
        for (var x = runeTo; x != runeFrom; x = edgeTo[x]) {
            path.push(x);
        }
        path.push(runeFrom);
        return path.reverse();
    };

    bfs(runeId);
    _.each(runeList, function (o, i) {
        var path = pathTo(runeId, o);
        if (path.length) {
            pathList.push(path);
        }
    });
    if (!pathList.length) {
        return [];
    }
    return _.min(pathList, function (o) { return o.length; });
}

var getPathWithWeight = function (runeList, runeId, maxevo, param) {
    maxevo = maxevo || 999;
    var distTo = [];
    var edgeTo = [];
    var pq = [];

    var DijkstraSP = function (s) {
        _.each(data.astrolabe, function (o, i) {
            distTo[o.Id] = Infinity;
        });
        distTo[s] = 0;
        pq.push({ id: s, weight: 0 });
        while (pq.length) {
            var min = _.min(pq, "weight");
            pq = _.without(pq, min);
            relax(min.id);
        }
    };

    var relax = function (v) {
        _.each(getRuneLink(v), function (w) {
            if ((_.find(data.astrolabe, function (p) { return p.Id === parseInt(w); }) || {}).Evo > maxevo) {
                return;
            }
            var weight = getRuneWeight(v, param);
            if (distTo[w] > distTo[v] + weight) {
                distTo[w] = distTo[v] + weight;
                edgeTo[w] = v;
                if (_.any(pq, function (o) { return o.id == w })) {
                    _.find(pq, function (o) { return o.id == w }).weight = distTo[w];
                }
                else {
                    pq.push({ id: w, weight: distTo[w] });
                }
            }
        });
    };

    var hasPathTo = function (v) {
        return distTo[v] < Infinity;
    };
    var pathTo = function (v) {
        if (!hasPathTo(v)) {
            return [];
        }
        var path = []
        for (var e = edgeTo[v]; !!e; e = edgeTo[e]) {
            path.push(e);
        }
        return path;
    };

    DijkstraSP(runeId);
    var minRuneId = 0;
    _.each(runeList, function (o, i) {
        if (!minRuneId) {
            minRuneId = o;
        }
        else {
            minRuneId = distTo[minRuneId] < distTo[o] ? minRuneId : o;
        }
    });
    if (!minRuneId) {
        return [];
    }
    return pathTo(minRuneId);
};

var getRuneWeight = function (runeId, param) {
    if (!param) {
        param = [{ id: 140, weight: 0.001 }, { id: 5261, weight: 1000 }];
    }
    var cost = getRuneCost(runeId);
    return _.reduce(cost, function (memo, item) {
        return memo + item.Count * (_.find(param, function (o) { return o.id == item.Id }) || { weight: 0 }).weight;
    }, 0);
};

var getConnectedComponent = function (runeList) {
    var marked = [];
    var id = [];
    var count = 0;
    var components = [];

    var dfs = function (v) {
        marked[v] = true;
        id[v] = count;
        _.each(getRuneLink(v), function (w) {
            if (_.contains(runeList, w) == false) {
                return;
            }
            if (!marked[w]) {
                dfs(w);
            }
        })
    }

    var connected = function (v, w) {
        return id[v] && (id[v] == id[w]);
    }

    _.each(runeList, function (s) {
        if (!marked[s]) {
            dfs(s);
            count++;
        }
    });

    for (var index = 0; index < count; index++) {
        components[index] = [];
    }
    _.each(runeList, function (o) {
        components[id[o]].push(o);
    });

    return components;
}

var formatRunetip = function (Runetip) {
    var text = formatRichText(Runetip.Text);
    Runetip.SkillTipParm = Runetip.SkillTipParm || [];
    for (var i = 0; i < Runetip.SkillTipParm.length; i++) {
        text = text.replace("%s", Runetip.SkillTipParm[i]);
    }
    return text.replace(/%%/g, "%");
};

var formatRichText = function (richText) {
    return richText.replace(/(?:\r\n|\r|\n|\\n)/g, "<br/>").replace(/\[-\]/g, "</span>").replace(/\[([A-Za-z0-9]{6})\]/g, "<span style='color:#$1'>");
};

const Data = {
    getAllServers,
    getCurrentServer,
    setCurrentServer,
    getAstrolabe,
    getRuneCost,
    getRuneResetCost,
    getRuneDesc,
    getAllRuneDescNameByTypeBranch,
    getRuneDataById,
    getPath,
    getPathWithWeight,
    getConnectedComponent,
    init,
    isDataOutdated,
};

export { Data };
export default Data;