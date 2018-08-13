var mal;
(function (mal) {
    mal.version = "1.0";
    var lang = "ja";
    var chip = 0;
    var map;
    var cvs0;
    var ctx0;
    var cvs1;
    var ctx1;
    var cvs2;
    var ctx2;
    var cvsp = new Array();
    ;
    var ctxp = new Array();
    ;
    var pimg;
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
            var lay_data = "........................................................................................................................";
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
        function edt_mDown(e) {
            var rect = e.target.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            x = Math.floor(x / 32);
            y = Math.floor(y / 32);
            var cx = x * 32;
            var cy = y * 32;
            ctx1.clearRect(cx, cy, 32, 32);
            var chip_num = chip;
            var ch_y = 0;
            if (chip_num > 15 && chip_num < 16 * 2) {
                chip_num -= 16;
                ch_y = 1;
            }
            else if (chip_num > 15 * 2 && chip_num < 16 * 3) {
                chip_num -= 16 * 2;
                ch_y = 2;
            }
            else if (chip_num > 15 * 3 && chip_num < 16 * 4) {
                chip_num -= 16 * 3;
                ch_y = 3;
            }
            else if (chip_num > 15 * 4 && chip_num < 16 * 5) {
                chip_num -= 16 * 4;
                ch_y = 4;
            }
            ctx1.drawImage(pimg, 32 * chip_num, 32 * ch_y, 32, 32, cx, cy, 32, 32);
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
        }
        mouseEvent.edt_mDown = edt_mDown;
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
            }
        }
    })(mouseEvent || (mouseEvent = {}));
    var init = (function () {
        function init(obj) {
            map = new mapdata;
            this.createMalElements(obj.editor, obj["palette"]);
        }
        init.prototype.createMalElements = function (edt, plt1) {
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
            ctx2 = cvs1.getContext("2d");
            document.getElementById("c2").addEventListener('mousedown', mouseEvent.edt_mDown, false);
            var scrollHeight = elm_edt.scrollHeight;
            elm_edt.scrollTop = scrollHeight;
            var elm_plt1 = document.getElementById(plt1["id-1"]);
            var img_plt1 = new Image();
            pimg = img_plt1;
            img_plt1.src = plt1.parts + "?" + new Date().getTime();
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
            console.log("done");
        };
        return init;
    }());
    mal.init = init;
    function test() {
        var a = document.getElementById("source");
        var ary = new Array();
        var str = "";
        for (var i = 0; i <= 29; i++) {
            str += "\"map0-" + i + "\" : \"" + map.map0[i].join('') + "\",\n";
        }
        for (var i = 0; i <= 29; i++) {
            str += "\"map1-" + i + "\" : \"" + map.map1[i].join('') + "\",\n";
        }
        for (var i = 0; i <= 29; i++) {
            str += "\"map2-" + i + "\" : \"" + map.map2[i].join('') + "\",\n";
        }
        a.innerText = str;
    }
    mal.test = test;
})(mal || (mal = {}));
