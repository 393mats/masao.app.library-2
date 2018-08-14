var mal;
(function (mal) {
    mal.version = "1.0";
    var lang = "ja";
    var layer_mode = 1;
    var grid_mode = 1;
    var map_image = 1;
    var chip = 0;
    var chip2 = "..";
    var map;
    var cvs0;
    var ctx0;
    var cvs1;
    var ctx1;
    var cvs2;
    var ctx2;
    var cvswm;
    var ctxwm;
    var cvsp = new Array();
    var ctxp = new Array();
    var cvsp2 = new Array();
    var ctxp2 = new Array();
    var pimg;
    var pimg2;
    function getdoubleDigestNumber(num) {
        return ("0" + num).slice(-2);
    }
    var mapdata = (function () {
        function mapdata() {
            this.map0 = new Array();
            this.map1 = new Array();
            this.map2 = new Array();
            this.lay0 = new Array();
            this.lay1 = new Array();
            this.lay2 = new Array();
            var r = new RegExp(".{1,2}", "g");
            var map_data = "............................................................";
            var lay_data = map_data + map_data;
            for (var i = 0; i <= 29; i++) {
                this.map0[i] = map_data.split("");
                this.map1[i] = map_data.split("");
                this.map2[i] = map_data.split("");
            }
            for (var i = 0; i <= 29; i++) {
                this.lay0[i] = lay_data.match(r);
                this.lay1[i] = lay_data.match(r);
                this.lay2[i] = lay_data.match(r);
            }
        }
        return mapdata;
    }());
    var palette;
    (function (palette) {
        var plt_chip_data = ".A98BCDHIJEFOGPQWXR{}abcdefghijz[]<>5647Y+-*/KLMNuvwxUV12nmopqrstklySTZ3";
        palette.plt_chips = plt_chip_data.split("");
        var plt2_chip_data = "abcdef";
        palette.plt2_chips = plt2_chip_data.split("");
        palette.plt_description = {
            "ja": {
                ".": "空白",
                "A": "正男",
                "9": "コイン",
                "8": "星",
                "B": "亀",
                "C": "亀（落ちる）",
                "D": "亀（３体）",
                "H": "ポッピー（上下移動）",
                "I": "ポッピー（直進）",
                "J": "ポッピー（３体）",
                "E": "ピカチー",
                "F": "チコリン",
                "O": "マリリ",
                "G": "ヒノララシ",
                "P": "ヤチャモ",
                "Q": "ミズタロウ",
                "N": "ドッスンスン",
                "u": "土管１",
                "v": "土管２",
                "w": "土管３",
                "x": "土管４",
                "U": "ファイヤーバー（左回り）",
                "V": "ファイヤーバー（右回り）",
                "1": "雲（左）",
                "2": "雲（右）",
                "W": "タイキング",
                "X": "クラゲッソ",
                "R": "エアームズ",
                "{": "亀（追跡）",
                "}": "ピカチー（追跡）",
                "a": "ブロック１",
                "b": "ブロック２",
                "c": "ブロック３",
                "d": "ブロック４",
                "e": "ブロック５",
                "f": "ブロック６",
                "g": "ブロック７",
                "h": "ブロック８",
                "i": "ブロック９",
                "j": "ブロック１０",
                "z": "すべる床",
                "n": "ファイヤフラワー",
                "m": "バリア",
                "o": "タイム",
                "p": "ジェット",
                "q": "ヘルメット",
                "r": "しっぽ",
                "s": "ドリル",
                "[": "通り抜けれる床",
                "]": "はしご",
                "<": "坂道（左）",
                ">": "坂道（右）",
                "5": "トゲ（上）",
                "6": "トゲ（下）",
                "4": "水",
                "7": "ろうそく",
                "Y": "わかめ",
                "+": "一言メッセージ１",
                "-": "一言メッセージ２",
                "*": "一言メッセージ３",
                "/": "一言メッセージ４",
                "K": "動く床（上下）",
                "L": "動く床（左右）",
                "M": "動く床（左右、２つ）",
                "t": "グレネード",
                "k": "コイン１",
                "l": "コイン３",
                "y": "１UP",
                "S": "グラーダ",
                "T": "カイオール",
                "Z": "センクウサ",
                "3": "草",
            },
            "en": []
        };
        palette.cmv_color = {
            "A": "#FF0000",
            "9": "#FFFF00",
            "8": "#FFFF00",
            "B": "#32CD32",
            "C": "#32CD32",
            "D": "#32CD32",
            "H": "#808000",
            "I": "#808000",
            "J": "#808000",
            "E": "#FFD700",
            "F": "#32CD32",
            "O": "#1E90FF",
            "G": "#FF8C00",
            "P": "#FF8C00",
            "Q": "#1E90FF",
            "N": "#FAFAFA",
            "u": "#008000",
            "v": "#008000",
            "w": "#008000",
            "x": "#008000",
            "U": "#DC143C",
            "V": "#DC143C",
            "1": "#fff",
            "2": "#fff",
            "W": "#DC143C",
            "X": "#4B0082",
            "R": "#696969",
            "{": "#32CD32",
            "}": "#FFD700",
            "a": "#800000",
            "b": "#808080",
            "c": "#008080",
            "d": "#A9A9A9",
            "e": "#DC143C",
            "f": "#DC143C",
            "g": "#DAA520",
            "h": "#A9A9A9",
            "i": "#9E9D24",
            "j": "#008000",
            "z": "#800000",
            "n": "#A52A2A",
            "m": "#A52A2A",
            "o": "#A52A2A",
            "p": "#A52A2A",
            "q": "#A52A2A",
            "r": "#A52A2A",
            "s": "#A52A2A",
            "[": "#DCDCDC",
            "]": "#DCDCDC",
            "<": "#808080",
            ">": "#808080",
            "5": "#DCDCDC",
            "6": "#DCDCDC",
            "4": "#0000FF",
            "7": "#800000",
            "Y": "#006400",
            "+": "#FF00FF",
            "-": "#FF00FF",
            "*": "#FF00FF",
            "/": "#FF00FF",
            "K": "#FFD700",
            "L": "#FFD700",
            "M": "#FFD700",
            "t": "#A52A2A",
            "k": "#A52A2A",
            "l": "#A52A2A",
            "y": "#A52A2A",
            "S": "#CD5C5C",
            "T": "#00008B",
            "Z": "#00FF00",
            "3": "#81C784"
        };
        function getChipname(int) {
            return palette.plt_chips[int];
        }
        palette.getChipname = getChipname;
        function getChipDesc(str) {
            return palette.plt_description[lang][str];
        }
        palette.getChipDesc = getChipDesc;
    })(palette || (palette = {}));
    var mouseEvent;
    (function (mouseEvent) {
        function plt1_mDown(e) {
            var id = e.target.id.slice(4);
            chip = parseInt(id);
            var chip_id = palette.getChipname(chip);
            console.log("down", palette.getChipname(chip), palette.getChipDesc(chip_id));
            Redraw(1);
            ctxp[id].fillStyle = "rgba(" + [255, 0, 0, 0.5] + ")";
            ctxp[id].fillRect(0, 0, 32, 32);
        }
        mouseEvent.plt1_mDown = plt1_mDown;
        function plt2_mDown(e) {
            var id = e.target.id.slice(4);
            chip2 = id;
            if (id == "00")
                chip2 = "..";
            console.log("down", chip2);
            Redraw(2);
            ctxp2[id].fillStyle = "rgba(" + [255, 0, 0, 0.5] + ")";
            ctxp2[id].fillRect(0, 0, 32, 32);
        }
        mouseEvent.plt2_mDown = plt2_mDown;
        function edt_mDown(e) {
            var rect = e.target.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            x = Math.floor(x / 32);
            y = Math.floor(y / 32);
            var cx = x * 32;
            var cy = y * 32;
            edit(x, y, cx, cy);
        }
        mouseEvent.edt_mDown = edt_mDown;
        function edit(x, y, cx, cy) {
            var chip_num;
            var mcX;
            var mcY;
            switch (layer_mode) {
                case 1:
                    ctx1.clearRect(cx, cy, 32, 32);
                    chip_num = chip;
                    mcX = chip_num - Math.floor(chip_num / 16) * 16;
                    mcY = Math.floor(chip_num / 16);
                    ctx1.drawImage(pimg, 32 * mcX, 32 * mcY, 32, 32, cx, cy, 32, 32);
                    var wm_c = palette.getChipname(chip);
                    if (wm_c == ".") {
                        ctxwm.clearRect(x * 2, y * 2, 2, 2);
                    }
                    else {
                        ctxwm.fillStyle = palette.cmv_color[wm_c];
                        ctxwm.fillRect(x * 2, y * 2, 2, 2);
                    }
                    console.log(x, y, chip_num);
                    if (x < 60) {
                        map.map0[y][x] = palette.getChipname(chip);
                    }
                    else if (x > 59 && x < 120) {
                        map.map1[y][x - 60] = palette.getChipname(chip);
                    }
                    else if (x > 119 && x < 180) {
                        map.map2[y][x - 120] = palette.getChipname(chip);
                    }
                    break;
                case 0:
                    ctx0.clearRect(cx, cy, 32, 32);
                    var chip2_c = chip2;
                    if (chip2 == "..")
                        chip2_c = "00";
                    if (chip2_c.slice(0, 1) == "0")
                        chip2_c = chip2_c.slice(1);
                    chip_num = parseInt(chip2_c, 16);
                    mcX = chip_num - Math.floor(chip_num / 16) * 16;
                    mcY = Math.floor(chip_num / 16);
                    ctx0.drawImage(pimg2, 32 * mcX, 32 * mcY, 32, 32, cx, cy, 32, 32);
                    console.log(chip2, chip_num, mcX, mcY);
                    if (x < 60) {
                        map.lay0[y][x] = chip2;
                    }
                    else if (x > 59 && x < 120) {
                        map.lay1[y][x - 60] = chip2;
                    }
                    else if (x > 119 && x < 180) {
                        map.lay2[y][x - 120] = chip2;
                    }
                    break;
            }
        }
        function Redraw(mode) {
            switch (mode) {
                case 1:
                    for (var i2 = 0; i2 < 5; i2++) {
                        for (var i = 0; i < 16; i++) {
                            var count = i + i2 * 16;
                            if (count >= 72)
                                continue;
                            ctxp[count].clearRect(0, 0, 32, 32);
                            ctxp[count].drawImage(pimg, 32 * i, 32 * i2, 32, 32, 0, 0, 32, 32);
                        }
                    }
                    break;
                case 2:
                    for (var i2 = 0; i2 < 16; i2++) {
                        for (var i = 0; i < 16; i++) {
                            var count = i + i2 * 16;
                            if (count >= 255)
                                continue;
                            var chip_n = getdoubleDigestNumber(count.toString(16));
                            ctxp2[chip_n].clearRect(0, 0, 32, 32);
                            ctxp2[chip_n].drawImage(pimg2, 32 * i, 32 * i2, 32, 32, 0, 0, 32, 32);
                        }
                    }
                    break;
            }
        }
    })(mouseEvent || (mouseEvent = {}));
    var init = (function () {
        function init(obj) {
            map = new mapdata();
            this.createMalElements(obj.editor, obj["palette"]);
        }
        init.prototype.createMalElements = function (edt, plt) {
            var elm_edt = document.getElementById(edt.id);
            for (var i = 0; i < 3; i++) {
                var newCanvas = document.createElement("canvas");
                newCanvas.id = "c" + i;
                newCanvas.width = 5760;
                newCanvas.height = 960;
                newCanvas.style.top = "0";
                newCanvas.style.left = "0";
                newCanvas.style.position = "absolute";
                elm_edt.appendChild(newCanvas);
            }
            cvs0 = document.getElementById("c0");
            ctx0 = cvs0.getContext("2d");
            cvs1 = document.getElementById("c1");
            ctx1 = cvs1.getContext("2d");
            cvs2 = document.getElementById("c2");
            ctx2 = cvs2.getContext("2d");
            document.getElementById("c2").addEventListener('mousedown', mouseEvent.edt_mDown, false);
            var scrollHeight = elm_edt.scrollHeight;
            elm_edt.scrollTop = scrollHeight;
            var elm_plt1 = document.getElementById(plt["id-1"]);
            var img_plt1 = new Image();
            pimg = img_plt1;
            img_plt1.src = plt.parts + "?" + new Date().getTime();
            img_plt1.onload = function () {
                for (var i2 = 0; i2 < 5; i2++) {
                    for (var i = 0; i < 16; i++) {
                        var count = i + i2 * 16;
                        if (count >= 72)
                            continue;
                        var cvs = document.createElement('canvas');
                        cvs.width = 32;
                        cvs.height = 32;
                        cvs.className = "pBox";
                        cvs.id = "_p1_" + count;
                        cvs.addEventListener('mousedown', mouseEvent.plt1_mDown, false);
                        var ctx = cvs.getContext('2d');
                        ctx.drawImage(img_plt1, 32 * i, 32 * i2, 32, 32, 0, 0, 32, 32);
                        elm_plt1.appendChild(cvs);
                        cvsp[count] = cvs;
                        ctxp[count] = cvsp[count].getContext("2d");
                    }
                }
                ctxp[0].fillStyle = "rgba(" + [255, 0, 0, 0.5] + ")";
                ctxp[0].fillRect(0, 0, 32, 32);
            };
            var elm_plt2 = document.getElementById(plt["id-2"]);
            var img_plt2 = new Image();
            pimg2 = img_plt2;
            img_plt2.src = plt.mapchip + "?" + new Date().getTime();
            img_plt2.onload = function () {
                for (var i2 = 0; i2 < 16; i2++) {
                    for (var i = 0; i < 16; i++) {
                        var count = i + i2 * 16;
                        if (count >= 255)
                            continue;
                        var chip_n = getdoubleDigestNumber(count.toString(16));
                        var cvs = document.createElement('canvas');
                        cvs.width = 32;
                        cvs.height = 32;
                        cvs.className = "pBox";
                        cvs.id = "_p2_" + chip_n;
                        cvs.addEventListener('mousedown', mouseEvent.plt2_mDown, false);
                        var ctx = cvs.getContext('2d');
                        ctx.drawImage(img_plt2, 32 * i, 32 * i2, 32, 32, 0, 0, 32, 32);
                        elm_plt2.appendChild(cvs);
                        cvsp2[chip_n] = cvs;
                        ctxp2[chip_n] = cvsp2[chip_n].getContext("2d");
                    }
                }
                ctxp2["00"].fillStyle = "rgba(" + [255, 0, 0, 0.5] + ")";
                ctxp2["00"].fillRect(0, 0, 32, 32);
            };
            ctx2.beginPath();
            ctx2.fillStyle = "rgb(" + [255, 255, 255] + ")";
            for (var i = 1; i < 180 * 32; i++) {
                ctx2.moveTo(i * 32, 0);
                ctx2.lineTo(i * 32, 960);
            }
            for (var i = 1; i < 30 * 32; i++) {
                ctx2.moveTo(0, i * 32);
                ctx2.lineTo(5760, i * 32);
            }
            ctx2.stroke();
            switchGrid(parseFloat(edt.grid));
            var elm_cmv = document.getElementById(edt["map-view-id"]);
            var cvs_wm = document.createElement('canvas');
            cvs_wm.width = 360;
            cvs_wm.height = 60;
            cvs_wm.id = "_cmv";
            elm_cmv.appendChild(cvs_wm);
            cvswm = cvs_wm;
            ctxwm = cvswm.getContext("2d");
            console.log("Loaded");
        };
        return init;
    }());
    mal.init = init;
    function switchLayer(int) {
        var elm_c1 = document.getElementById("c1");
        var elm_c0 = document.getElementById("c0");
        switch (int) {
            case 1:
                elm_c1.style.opacity = "1";
                elm_c0.style.opacity = "0.5";
                layer_mode = 1;
                break;
            case 0:
                elm_c1.style.opacity = "0.5";
                elm_c0.style.opacity = "1";
                layer_mode = 0;
                break;
        }
    }
    mal.switchLayer = switchLayer;
    function getLayerMode() {
        return layer_mode;
    }
    mal.getLayerMode = getLayerMode;
    function switchGrid(int) {
        var elm_c2 = document.getElementById("c2");
        switch (int) {
            case 1:
                elm_c2.style.opacity = "1";
                grid_mode = 1;
                break;
            case 0:
                elm_c2.style.opacity = "0";
                grid_mode = 0;
                break;
        }
    }
    mal.switchGrid = switchGrid;
    function getGridMode() {
        return grid_mode;
    }
    mal.getGridMode = getGridMode;
    function getHTML() {
        var a = document.getElementById("source");
        var str = "new CanvasMasao.Game({\n";
        for (var i = 0; i <= 29; i++) {
            str += "\"map0-" + i + "\" : \"" + map.map0[i].join('') + "\",\n";
        }
        for (var i = 0; i <= 29; i++) {
            str += "\"map1-" + i + "\" : \"" + map.map1[i].join('') + "\",\n";
        }
        for (var i = 0; i <= 29; i++) {
            str += "\"map2-" + i + "\" : \"" + map.map2[i].join('') + "\",\n";
        }
        for (var i = 0; i <= 29; i++) {
            str += "\"layer0-" + i + "\" : \"" + map.lay0[i].join('') + "\",\n";
        }
        for (var i = 0; i <= 29; i++) {
            str += "\"layer1-" + i + "\" : \"" + map.lay1[i].join('') + "\",\n";
        }
        for (var i = 0; i <= 29; i++) {
            str += "\"layer2-" + i + "\" : \"" + map.lay2[i].join('') + "\",\n";
        }
        str += "});";
        a.innerText = str;
    }
    mal.getHTML = getHTML;
})(mal || (mal = {}));
