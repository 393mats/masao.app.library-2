// ---------------------------------------------------------
//  masao.app.library-2
//  Developed by Tex.my
//
//  https:// masao.app/
//  TypeScript-ES5
// ---------------------------------------------------------
module mal {
  export const version: string = "1.0";  // MAL version
  let lang: string = "ja";
  let layer_mode: number = 1;               // Layer mode. 1: Normal, 0: Background
  let grid_mode: number = 1;               // grid mode. 1: show, 0: hidden
  let map_image = 1;

  let chip: number = 0;
  let chip2: string = "..";
  let mouse_c: number = 0;

  let map: mapdata;                    // Declare mapdata

  let cvs0: any;                       // Canvas
  let ctx0: any;
  let cvs1: any;
  let ctx1: any;
  let cvs2: any;
  let ctx2: any;
  let cvswm: any;
  let ctxwm: any;
  let cvsp: any[] = [];
  let ctxp: any[] = [];
  let cvsp2: any[] = [];
  let ctxp2: any[] = [];

  let pimg: any;    // Parts image
  let pimg2: any;    // Mapchip image

  // Callback functions
  let cb_edt_clicked_c: number = 0;
  let cb_edt_clicked: any = [];
  let cb_edt_moved_c: number = 0;
  let cb_edt_moved: any = [];

  // ---------------------------------------------------------
  // Useful functions
  // ---------------------------------------------------------
  function getdoubleDigestNumber(num: string): string {
    return ("0" + num).slice(-2);
  }


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
      const r: RegExp = new RegExp(".{1,2}", "g"); // match

      // Normal Layer
      const map_data: string = "............................................................";

      // Background layer
      const lay_data: string = map_data + map_data;
      // Normal layer
      for (let i = 0; i <= 29; i++) {
        this.map0[i] = map_data.split("");
        this.map1[i] = map_data.split("");
        this.map2[i] = map_data.split("");
      }

      // Background layer
      for (let i = 0; i <= 29; i++) {
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
    const plt_chip_data: string = ".A98BCDHIJEFOGPQWXR{}abcdefghijz[]<>5647Y+-*/KLMNuvwxUV12nmopqrstklySTZ3";
    export const plt_chips: any[] = plt_chip_data.split("");

    const plt2_chip_data: string = "abcdef";
    export const plt2_chips: any[] = plt2_chip_data.split("");

    export const plt_description = {
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

    export const cmv_color = {
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
      const id: string = e.target.id.slice(4);

      // String to integer
      chip = parseInt(id);

      // Get chip id
      const chip_id = palette.getChipname(chip);

      console.log("down", palette.getChipname(chip), palette.getChipDesc(chip_id));

      Redraw(1); // Redraw canvas

      // draw chosen chip red
      ctxp[id].fillStyle = "rgba(" + [255, 0, 0, 0.5] + ")";
      ctxp[id].fillRect(0, 0, 32, 32);

    }
    // - - - - - - - - - - - - - - - - - - - - -
    // Palette-2 mouse down event
    export function plt2_mDown(e: any): void {

      // Get parts id from element id "_p1_*"
      const id: string = e.target.id.slice(4);

      // Set chip
      chip2 = id;
      if (id == "00") chip2 = "..";

      console.log("down", chip2);

      Redraw(2); // Redraw canvas

      // draw chosen chip red
      ctxp2[id].fillStyle = "rgba(" + [255, 0, 0, 0.5] + ")";
      ctxp2[id].fillRect(0, 0, 32, 32);

    }

    // - - - - - - - - - - - - - - - - - - - - -
    // Editor mouse down event
    export function edt_mDown(e: any): void {

      // Get msp cordinates
      const rect = e.target.getBoundingClientRect();
      let x: number = e.clientX - rect.left;
      let y: number = e.clientY - rect.top;
      x = Math.floor(x / 32);
      y = Math.floor(y / 32);
      const cx: number = x * 32;  // X
      const cy: number = y * 32;  // Y

      edit(x, y, cx, cy);       // Edit map
      mouse_c = 1;

      for (let i = 0; i < cb_edt_clicked_c; i++) {
        cb_edt_clicked[i](x, y, chip);
      }

    }
    // Editor mouse move event
    export function edt_mMove(e: any): void {

      // Get msp cordinates
      const rect = e.target.getBoundingClientRect();
      let x: number = e.clientX - rect.left;
      let y: number = e.clientY - rect.top;
      x = Math.floor(x / 32);
      y = Math.floor(y / 32);
      const cx: number = x * 32;  // X
      const cy: number = y * 32;  // Y

      if (mouse_c == 1) {
        edit(x, y, cx, cy);       // Edit map

        for (let i = 0; i < cb_edt_moved_c; i++) {
          cb_edt_moved[i](x, y, chip);
        }

      }

    }
    // Editor mouse up event
    export function mUp(e: any): void {
      mouse_c = 0;
    };

    // Edit map data
    function edit(x: number, y: number, cx: number, cy: number) {

      let chip_num: number;
      let mcX: number;
      let mcY: number;

      //Editor input mode
      switch (layer_mode) {
        case 1:
          // Clear canvas
          ctx1.clearRect(cx, cy, 32, 32);

          // Get chip
          chip_num = chip;

          // Draw chip on editor
          mcX = chip_num - Math.floor(chip_num / 16) * 16;
          mcY = Math.floor(chip_num / 16);

          // Draw chip on editor
          ctx1.drawImage(pimg, 32 * mcX, 32 * mcY, 32, 32, cx, cy, 32, 32);

          let wm_c: string = palette.getChipname(chip);
          if (wm_c == ".") {
            ctxwm.clearRect(x * 2, y * 2, 2, 2);
          } else {
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
          // Clear canvas
          ctx0.clearRect(cx, cy, 32, 32);

          let chip2_c: string = chip2;

          // Make ".." to number
          if (chip2 == "..") chip2_c = "00";

          // Delete the first "0"
          if (chip2_c.slice(0, 1) == "0") chip2_c = chip2_c.slice(1);

          // Get decimal number
          chip_num = parseInt(chip2_c, 16)

          // Draw chip on editor
          mcX = chip_num - Math.floor(chip_num / 16) * 16;
          mcY = Math.floor(chip_num / 16);

          // Draw chip
          ctx0.drawImage(pimg2, 32 * mcX, 32 * mcY, 32, 32, cx, cy, 32, 32);

          console.log(chip2, chip_num, mcX, mcY);

          // Reflect layer map data
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

    // Drawing canvas
    function Redraw(mode: number): void {
      switch (mode) {
        // Palette-1
        case 1:
          // reset all palette objects as a canvas element
          for (let i2 = 0; i2 < 5; i2++) {  // Vertical
            for (let i = 0; i < 16; i++) {  // Horizontal
              const count: number = i + i2 * 16;
              if (count >= 72) continue;

              // Draw chip
              ctxp[count].clearRect(0, 0, 32, 32);
              ctxp[count].drawImage(pimg, 32 * i, 32 * i2, 32, 32, 0, 0, 32, 32);
            }
          }
          break;
        // Palette-2
        case 2:
          // reset all palette objects as a canvas element
          for (let i2 = 0; i2 < 16; i2++) {  // Vertical
            for (let i = 0; i < 16; i++) {   // Horizontal
              const count: number = i + i2 * 16;
              if (count >= 255) continue;

              // Hexadecimal
              const chip_n: string = getdoubleDigestNumber(count.toString(16));

              // Draw chip
              ctxp2[chip_n].clearRect(0, 0, 32, 32);
              ctxp2[chip_n].drawImage(pimg2, 32 * i, 32 * i2, 32, 32, 0, 0, 32, 32);
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
      map = new mapdata();
      this.createMalElements(obj.editor, obj["palette"]); // Create mal elements
    }

    // Create Editor and Pallete components
    private createMalElements(edt: any, plt: any): void {

      // ---------------------------------------------------------
      // Editor
      // ---------------------------------------------------------

      // Get place from element id to put editor
      const elm_edt: HTMLElement = document.getElementById(edt.id);

      // Create 3 canvas elements, background, main, and front layer.
      // c0: bg layer, c1: noraml layer, c2: grid and touch
      for (let i = 0; i < 3; i++) {
        const newCanvas: HTMLCanvasElement = document.createElement("canvas");
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
      ctx2 = cvs2.getContext("2d");

      // Mouse event
      document.getElementById("c2").addEventListener('mousedown', mouseEvent.edt_mDown, false);
      document.getElementById("c2").addEventListener('mousemove', mouseEvent.edt_mMove, false);
      //document.getElementById("c2").addEventListener('touchmove', touchMove, false);
      document.addEventListener('mouseup', mouseEvent.mUp, false);

      // Get Editor's height and scroll down automatically
      const scrollHeight: number = elm_edt.scrollHeight;
      elm_edt.scrollTop = scrollHeight;

      // ---------------------------------------------------------
      // Palette-1
      // ---------------------------------------------------------

      // Get place from element id to put palette-1
      const elm_plt1: HTMLElement = document.getElementById(plt["id-1"]);

      // Declare image object to make a Pallete
      let img_plt1 = new Image();
      pimg = img_plt1;

      // Set parts file
      img_plt1.src = plt.parts + "?" + new Date().getTime();

      // After load parts images
      img_plt1.onload = function() {

        // Create all palette objects as a canvas element
        for (let i2 = 0; i2 < 5; i2++) {  // Vertical

          for (let i = 0; i < 16; i++) {  // Horizontal
            let count = i + i2 * 16;      // Count repeat time. It becomes chip id
            if (count >= 72) continue;

            // Create canvas element
            const cvs: HTMLCanvasElement = document.createElement('canvas');
            cvs.width = 32;                  // Chip width
            cvs.height = 32;                 // Chip height
            cvs.className = "pBox";          // Set classname
            cvs.id = "_p1_" + count;         // Set id

            // Mousedown event
            cvs.addEventListener('mousedown', mouseEvent.plt1_mDown, false);

            // Get context
            const ctx: any = cvs.getContext('2d');

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

      // ---------------------------------------------------------
      // Palette-2
      // ---------------------------------------------------------

      // Get place from element id to put palette-2
      const elm_plt2: HTMLElement = document.getElementById(plt["id-2"]);

      // Declare image object to make a Pallete
      let img_plt2 = new Image();
      pimg2 = img_plt2;

      // Set parts file
      img_plt2.src = plt.mapchip + "?" + new Date().getTime();

      // After load mapchip images
      img_plt2.onload = function() {

        // Create all palette objects as a canvas element
        for (let i2 = 0; i2 < 16; i2++) {  // Vertical

          for (let i = 0; i < 16; i++) {  // Horizontal
            let count = i + i2 * 16;      // Count repeat time.
            if (count >= 255) continue;

            // Get hexadecimal number
            const chip_n: string = getdoubleDigestNumber(count.toString(16));

            // Create canvas element
            const cvs: HTMLCanvasElement = document.createElement('canvas');
            cvs.width = 32;                  // Chip width
            cvs.height = 32;                 // Chip height
            cvs.className = "pBox";          // Set classname
            cvs.id = "_p2_" + chip_n;         // Set id

            // Mousedown event
            cvs.addEventListener('mousedown', mouseEvent.plt2_mDown, false);

            // Get context
            const ctx: any = cvs.getContext('2d');

            // Draw chip
            ctx.drawImage(img_plt2, 32 * i, 32 * i2, 32, 32, 0, 0, 32, 32);

            // Put canvas on the palette element
            elm_plt2.appendChild(cvs);

            // plette object
            cvsp2[chip_n] = cvs;
            ctxp2[chip_n] = cvsp2[chip_n].getContext("2d");

          }
        }

        // Draw chosen parts
        ctxp2["00"].fillStyle = "rgba(" + [255, 0, 0, 0.5] + ")";
        ctxp2["00"].fillRect(0, 0, 32, 32);

      }

      // ---------------------------------------------------------
      // Grid
      // ---------------------------------------------------------
      ctx2.beginPath();
      ctx2.fillStyle = "rgb(" + [255, 255, 255] + ")";
      for (let i = 1; i < 180 * 32; i++) {
        ctx2.moveTo(i * 32, 0);
        ctx2.lineTo(i * 32, 960);
      }
      for (let i = 1; i < 30 * 32; i++) {
        ctx2.moveTo(0, i * 32);
        ctx2.lineTo(5760, i * 32);
      }
      ctx2.stroke();

      switchGrid(parseFloat(edt.grid));

      // ---------------------------------------------------------
      // Map complete picture canvas
      // ---------------------------------------------------------

      // Get place from element id to put Map picture
      const elm_cmv: HTMLElement = document.getElementById(edt["map-view-id"]);

      const cvs_wm: HTMLCanvasElement = document.createElement('canvas');
      cvs_wm.width = 360;                 // Chip width
      cvs_wm.height = 60;                 // Chip height
      cvs_wm.id = "_cmv";                // Set id

      // Put canvas on the palette element
      elm_cmv.appendChild(cvs_wm);

      // plette object
      cvswm = cvs_wm;
      ctxwm = cvswm.getContext("2d");

      console.log("Loaded");
    }

  }

  export function switchLayer(int: number): void {

    const elm_c1: HTMLElement = document.getElementById("c1"); // Normal layer
    const elm_c0: HTMLElement = document.getElementById("c0"); // Background layer

    switch (int) {
      case 1:   // Normal layer
        elm_c1.style.opacity = "1";
        elm_c0.style.opacity = "0.5";

        layer_mode = 1;
        break;

      case 0:   // Background layer
        elm_c1.style.opacity = "0.5";
        elm_c0.style.opacity = "1";

        layer_mode = 0;
        break;
    }
  }

  export function getLayerMode(): number {
    return layer_mode;
  }

  export function switchGrid(int: number): void {

    const elm_c2: HTMLElement = document.getElementById("c2"); // Grid canvas

    switch (int) {
      case 1:   // show
        elm_c2.style.opacity = "1";

        grid_mode = 1;
        break;

      case 0:   // hidden
        elm_c2.style.opacity = "0";

        grid_mode = 0;
        break;
    }
  }

  export function getGridMode(): number {
    return grid_mode;
  }

  // Just for method test
  export function getHTML(): void {
    const a: HTMLElement = document.getElementById("source");
    let str: string = "new CanvasMasao.Game({\n";

    // Makes mapdata source
    for (let i = 0; i <= 29; i++) {
      str += "\"map0-" + i + "\" : \"" + map.map0[i].join('') + "\",\n";
    }
    for (let i = 0; i <= 29; i++) {
      str += "\"map1-" + i + "\" : \"" + map.map1[i].join('') + "\",\n";
    }
    for (let i = 0; i <= 29; i++) {
      str += "\"map2-" + i + "\" : \"" + map.map2[i].join('') + "\",\n";
    }
    for (let i = 0; i <= 29; i++) {
      str += "\"layer0-" + i + "\" : \"" + map.lay0[i].join('') + "\",\n";
    }
    for (let i = 0; i <= 29; i++) {
      str += "\"layer1-" + i + "\" : \"" + map.lay1[i].join('') + "\",\n";
    }
    for (let i = 0; i <= 29; i++) {
      str += "\"layer2-" + i + "\" : \"" + map.lay2[i].join('') + "\",\n";
    }

    str += "});";

    a.innerText = str;

  }
  // Add event listener
  export function add(event: string, func: any): void {

    switch (event) {
      //  エディタをクリックした時
      case "edt_clicked":
        cb_edt_clicked[cb_edt_clicked_c] = func;
        cb_edt_clicked++;

        break;
        
      case "edt_moved":
        cb_edt_moved[cb_edt_moved_c] = func;
        cb_edt_moved++;

        break;
    }
  }
}
