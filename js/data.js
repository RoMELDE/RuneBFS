define(['jquery'], function () {
    var data = {};

    var init = function (type) {
        var dtd = $.Deferred();
        if (!type) {
            dtd.reject();
            return dtd.promise();
        }
        var key = type;
        var self = this;
        return self.isDataTooOld().then(function (force) {
            var json = localStorage.getItem(key);
            if (json && !force) {
                var jsondata = JSON.parse(json);
                console.log("Get data from cache. ", key);
                data[type] = jsondata;
                dtd.resolve();
                return dtd.promise();
            }
            else {
                var url = 'data/' + key + '.json'
                return $.ajax({
                    url: url,
                    cache: false,
                    dataType: "json"
                })
                    .done(function (jsondata) {
                        localStorage[key] = JSON.stringify(jsondata);
                        console.log("Get data from web. ", key);
                        data[type] = jsondata;
                    });
            }
        });
    };

    var isDataTooOld = function () {
        var dtd = $.Deferred();
        var key = "lastUpdate";
        var lastUpdate = localStorage.getItem(key);
        if (!lastUpdate) {
            dtd.resolve(true);
            return dtd.promise();
        }
        var url = 'data/lastUpdate.json'
        return $.ajax({
            url: url,
            cache: false,
            dataType: "json"
        }).then(function (data) {
            var local = JSON.parse(lastUpdate);
            var remote = data;
            return new Date(local).getTime() < new Date(remote).getTime();
        });
    };

    var getAstrolabe = function () {
        return data["astrolabe"];
    }
    var getRuneCost = function (id) {
        return (_.find(data.rune, function (p) { return p.Id === parseInt(id); }) || {}).Cost || [];
    }
    var getRuneDesc = function (id, classId) {
        var desc = _.find(data.runeByClass[classId], function (p) { return p.Id === parseInt(id); }) || {};
        if (desc.SpecialDescId) {
            desc.Runetip = _.find(data.runeSpecial, function (p) { return p.Id === parseInt(desc.SpecialDescId); });
            if (desc.Runetip) {
                desc.Runetip.Text = _.find(data.runeSpecialDesc, function (p) { return p.Id === desc.Runetip.Runetip }).Text;
                desc.Desc = formatRunetip(desc.Runetip);
            }
        }
        else {
            desc.Desc = desc.Key + "+" + desc.Value;
        }
        return desc;
    }


    var getRuneLink = function (id) {
        return (_.find(data.astrolabe, function (p) { return p.Id === parseInt(id); }) || {}).Link || [];
    }
    var getPath = function (runeList, runeId, disableEvo3) {
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
                    if (disableEvo3 && (_.find(data.astrolabe, function (p) { return p.Id === parseInt(w); }) || {}).Evo === 3) {
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

    return {
        //data: data,
        getAstrolabe: getAstrolabe,
        getRuneCost: getRuneCost,
        getRuneDesc: getRuneDesc,
        getPath: getPath,
        getConnectedComponent: getConnectedComponent,
        init: init,
        isDataTooOld: isDataTooOld,
    };
});