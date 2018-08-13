// ---------------------------------------------------------
//  masao.app.library-2
//  Developed by Tex.my
//
//  https:// masao.app/
//  TypeScript-ES5
// ---------------------------------------------------------
module mal {
  export var version: string = "1.0";  // MAL version
  var lang: string = "ja";
  var chip: number = 0;

  var map: mapdata;                    // Declare mapdata

  var cvs0: any;                       // Canvas
  var ctx0: any;
  var cvs1: any;
  var ctx1: any;
  var cvs2: any;
  var ctx2: any;
  var cvsp: any[] = new Array();;
  var ctxp: any[] = new Array();;

  var pimg: any;    // Parts image

  // ---------------------------------------------------------
  // Mapdata class
  // ---------------------------------------------------------
  class mapdata {
    public map0: any[] = new Array();
    public map1: any[] = new Array();
    public map2: any[] = new Array();
    public lay0: any[] = new Array();
    public lay1: any[] = new Array();
    public lay2: any[] = new Array();

    constructor() {
      var r: RegExp = new RegExp(".{1,2}", "g"); // match
      var map_data: string = "............................................................";
      var lay_data: string = "........................................................................................................................";

      // Normal layer
      for (var i = 0; i <= 29; i++) {
        this.map0[i] = map_data.split("");
        this.map1[i] = map_data.split("");
        this.map2[i] = map_data.split("");
      }

      // Background layer
      for (var i = 0; i <= 29; i++) {
        this.lay0[i] = lay_data.match(r);
        this.lay1[i] = lay_data.match(r);
        this.lay2[i] = lay_data.match(r);
      }
    }
  }

  // ---------------------------------------------------------
  // Palette module
  // ---------------------------------------------------------
  module palette {

    // Chipdata for normal layer pallete
    var plt_chip_data: string = ".A98BCDHIJEFOGPQWXR{}abcdefghijz[]<>5647Y+-*/KLMNuvwxUV12nmopqrstklySTZ3";
    export var plt_chips: any[] = plt_chip_data.split("");

    export var plt_description = {
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
      "en": [

      ]
    };

    // Get chip code from chip number for Palette-1
    export function getChipname(int: number): string {
      return plt_chips[int];
    }

    // Get chip description from chip number for Palette-1
    export function getChipDesc(str: string): string {
      return palette.plt_description[lang][str];
    }

  }

  // ---------------------------------------------------------
  // Mouse event module
  // ---------------------------------------------------------
  module mouseEvent {

    // - - - - - - - - - - - - - - - - - - - - -
    // Palette-1 mouse down event
    export function plt1_mDown(e: any): void {

      // Get parts id from element id "_p1_*"
      var id: string = e.target.id.slice(4);

      //String to integer
      chip = parseInt(id);

      //Get chip id
      var chip_id = palette.getChipname(chip);

      console.log("down", palette.getChipname(chip), palette.getChipDesc(chip_id));

      Redraw(1); // Redraw canvas

      // draw chosen chip red
      ctxp[id].fillStyle = "rgba(" + [255, 0, 0, 0.5] + ")";
      ctxp[id].fillRect(0, 0, 32, 32);


    }

    // - - - - - - - - - - - - - - - - - - - - -
    // Editor mouse down event
    export function edt_mDown(e: any): void {

      // Get msp cordinates
      var rect = e.target.getBoundingClientRect();
      var x: number = e.clientX - rect.left;
      var y: number = e.clientY - rect.top;
      x = Math.floor(x / 32);
      y = Math.floor(y / 32);
      var cx: number = x * 32;  //  X
      var cy: number = y * 32;  //  Y

      // Clear canvas
      ctx1.clearRect(cx, cy, 32, 32);

      // Get chip
      var chip_num = chip;
      var ch_y = 0;
      if (chip_num > 15 && chip_num < 16*2) {
          chip_num -= 16;
          ch_y = 1;
      }
      else if (chip_num > 15 * 2 && chip_num < 16*3) {
          chip_num -= 16*2;
          ch_y = 2;
      }
      else if (chip_num > 15 * 3 && chip_num < 16*4) {
          chip_num -= 16*3;
          ch_y = 3;
      }
      else if (chip_num > 15 * 4 && chip_num < 16*5) {
          chip_num -= 16*4;
          ch_y = 4;
      }

      // Draw chip on editor
      ctx1.drawImage(pimg, 32 * chip_num, 32 * ch_y, 32, 32, cx, cy, 32, 32);
      console.log(x, y, chip_num);

      if (x < 60) {
          map.map0[y][x] = palette.getChipname(chip);
      }
      else if (x > 59 && x < 120) {
          map.map1[y][x-60] = palette.getChipname(chip);
      }
      else if (x > 119 && x < 180) {
          map.map2[y][x-120] = palette.getChipname(chip);
      }
    }

    // Drawing canvas
    function Redraw(mode: number): void {
      switch (mode) {
        // Palette1
        case 1:
          // reset all palette objects as a canvas element
          for (var i2 = 0; i2 < 5; i2++) {  // Vertical
            for (var i = 0; i < 16; i++) {  // Horizontal
              var count: number = i + i2 * 16;
              if(count >= 72) continue;

              // Draw chip
              ctxp[count].clearRect(0, 0, 32, 32);
              ctxp[count].drawImage(pimg, 32 * i, 32 * i2, 32, 32, 0, 0, 32, 32);
            }
          }
          break;
      }
    }
  }

  // ---------------------------------------------------------
  // Init class
  // ---------------------------------------------------------
  export class init {

    // Constructor
    protected constructor(obj: any) {
      map = new mapdata;
      this.createMalElements(obj.editor, obj["palette"]); // Create mal elements
    }

    // Create Editor and Pallete components
    private createMalElements(edt: any, plt1: any): void {

      // ---------------------------------------------------------
      // Editor
      // ---------------------------------------------------------

      // Get place from element id to put editor
      var elm_edt: HTMLElement = document.getElementById(edt.id);

      // Create 3 canvas elements, background, main, and front layer.
      // c0: bg layer, c1: noraml layer, c2: grid and touch
      for (var i = 0; i < 3; i++) {
        var newCanvas: HTMLCanvasElement = document.createElement("canvas");
        newCanvas.id = "c" + i;                       // Set id
        newCanvas.width = 5760;                       // Default width
        newCanvas.height = 960;                       // Default height
        newCanvas.style.top = "0";                    // Set top
        newCanvas.style.left = "0";                   // Set left
        newCanvas.style.position = "absolute";        // Set position absolute
        elm_edt.appendChild(newCanvas);               // Put a canvas on the editor element
      }

      // Background layer camvas
      cvs0 = <HTMLCanvasElement>document.getElementById("c0");
      ctx0 = cvs0.getContext("2d");

      // Normal layer camvas
      cvs1 = <HTMLCanvasElement>document.getElementById("c1");
      ctx1 = cvs1.getContext("2d");

      // grid camvas
      cvs2 = <HTMLCanvasElement>document.getElementById("c2");
      ctx2 = cvs1.getContext("2d");

      // Mouse event
      document.getElementById("c2").addEventListener('mousedown', mouseEvent.edt_mDown, false);


      // Get Editor's height and scroll down automatically
      var scrollHeight: number = elm_edt.scrollHeight;
      elm_edt.scrollTop = scrollHeight;

      // ---------------------------------------------------------
      // Palette-1
      // ---------------------------------------------------------

      // Get place from element id to put palette-1
      var elm_plt1: HTMLElement = document.getElementById(plt1["id-1"]);

      // Declare image object to make a Pallete
      var img_plt1 = new Image();
      pimg = img_plt1;

      // Set parts file
      img_plt1.src = plt1.parts + "?" + new Date().getTime();

      // After load parts images
      img_plt1.onload = function() {

        // Create all palette objects as a canvas element
        for (var i2 = 0; i2 < 5; i2++) {  // Vertical

          for (var i = 0; i < 16; i++) {  // Horizontal
            var count = i + i2 * 16;      // Count repeat time. It becomes chip id
            if(count >= 72) continue;

            // Create canvas element
            var cvs: HTMLCanvasElement = document.createElement('canvas');
            cvs.width = 32;                  // Chip width
            cvs.height = 32;                 // Chip height
            cvs.className = "pBox";          // Set classname
            cvs.id = "_p1_" + count;         // Set id

            // Mousedown event
            cvs.addEventListener('mousedown', mouseEvent.plt1_mDown, false);

            // Get context
            var ctx: any = cvs.getContext('2d');

            // Draw chip
            ctx.drawImage(img_plt1, 32 * i, 32 * i2, 32, 32, 0, 0, 32, 32);

            // Put canvas on the palette element
            elm_plt1.appendChild(cvs);

            // plette object
            cvsp[count] = cvs;
            ctxp[count] = cvsp[count].getContext("2d");

          }
        }

        // Draw chosen parts
        ctxp[0].fillStyle = "rgba(" + [255, 0, 0, 0.5] + ")";
        ctxp[0].fillRect(0, 0, 32, 32);
      }

      console.log("done");
    }

  }

  // Just for method test
  export function test(): void {
    var a: HTMLElement = document.getElementById("source");
    var ary: any[] = new Array();
    var str: string = "";

    // Makes mapdata source
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
}
