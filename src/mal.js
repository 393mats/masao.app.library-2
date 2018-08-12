var mal;
(function (mal) {
    var lang = "ja";
    var chip = "0";
    var map;
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
        palette.plt_chip_data = ".A98BCDHIJEFOGPQNuvwxUV12WXR{}abcdefghijznmopqrs..[]<>5647Y+-*/KLMtklySTZ3.";
        var plt_chips = palette.plt_chip_data.split("");
        palette.plt_description = {
            "ja": [
                "空白",
                "正男",
                "コイン",
                "星",
                "亀",
                "亀（落ちる）",
                "亀（３体）",
                "ポッピー（上下移動）",
                "ポッピー（直進）",
                "ポッピー（３体）",
                "ピカチー",
                "チコリン",
                "マリリ",
                "ヒノララシ",
                "ヤチャモ",
                "ミズタロウ",
                "ドッスンスン",
                "土管１",
                "土管２",
                "土管３",
                "土管４",
                "ファイヤーバー（左回り）",
                "ファイヤーバー（右回り）",
                "雲（左）",
                "雲（右）",
                "タイキング",
                "クラゲッソ",
                "エアームズ",
                "亀（追跡）",
                "ピカチー（追跡）",
                "ブロック１",
                "ブロック２",
                "ブロック３",
                "ブロック４",
                "ブロック５",
                "ブロック６",
                "ブロック７",
                "ブロック８",
                "ブロック９",
                "ブロック１０",
                "すべる床",
                "ファイヤフラワー",
                "バリア",
                "タイム",
                "ジェット",
                "ヘルメット",
                "しっぽ",
                "ドリル",
                "空白",
                "空白",
                "通り抜けれる床",
                "はしご",
                "坂道（左）",
                "坂道（右）",
                "トゲ（上）",
                "トゲ（下）",
                "水",
                "ろうそく",
                "わかめ",
                "一言メッセージ１",
                "一言メッセージ２",
                "一言メッセージ３",
                "一言メッセージ４",
                "動く床（上下）",
                "動く床（左右）",
                "動く床（左右、２つ）",
                "グレネード",
                "コイン１",
                "コイン３",
                "１UP",
                "グラーダ",
                "カイオール",
                "センクウサ",
                "草",
                "空白"
            ],
            "en": []
        };
        function getChipname(str) {
            return plt_chips[str];
        }
        palette.getChipname = getChipname;
    })(palette || (palette = {}));
    var mouseEvent;
    (function (mouseEvent) {
        function plt1_mDown(e) {
            var id = e.target.id.slice(4);
            console.log("down", palette.getChipname(id), palette.plt_description[lang][id]);
        }
        mouseEvent.plt1_mDown = plt1_mDown;
        function edt_mDown(e) {
        }
        mouseEvent.edt_mDown = edt_mDown;
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
                newCanvas.width = 5728;
                newCanvas.height = 928;
                newCanvas.style.top = "0";
                newCanvas.style.left = "0";
                newCanvas.style.position = "absolute";
                elm_edt.appendChild(newCanvas);
            }
            var scrollHeight = elm_edt.scrollHeight;
            elm_edt.scrollTop = scrollHeight;
            var elm_plt1 = document.getElementById(plt1["id-1"]);
            var img_plt1 = new Image();
            img_plt1.src = plt1.parts + "?" + new Date().getTime();
            img_plt1.onload = function () {
                for (var i2 = 0; i2 < 3; i2++) {
                    for (var i = 0; i < 25; i++) {
                        var cvs = document.createElement('canvas');
                        cvs.width = 32;
                        cvs.height = 32;
                        cvs.className = "pBox";
                        cvs.id = "_p1_" + (i + i2 * 25);
                        cvs.addEventListener('mousedown', mouseEvent.plt1_mDown, false);
                        var ctx = cvs.getContext('2d');
                        ctx.drawImage(img_plt1, 32 * i, 32 * i2, 32, 32, 0, 0, 32, 32);
                        elm_plt1.appendChild(cvs);
                        console.log(cvs);
                    }
                }
            };
            console.log("done");
        };
        return init;
    }());
    mal.init = init;
    function test() {
        console.log(map.map0);
    }
    mal.test = test;
})(mal || (mal = {}));
