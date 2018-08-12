//---------------------------------------------------------
//  masao.app.library-2
//  Developed by Tex.my
//
//  https://masao.app/
//  TypeScript-ES5
//---------------------------------------------------------
module mal {

  var lang: string = "ja";
  var chip: string = "0";

  var map: mapdata; //Declare mapdata

  //Original mapdata class
  class mapdata {
    public map0: any[] = new Array();
    public map1: any[] = new Array();
    public map2: any[] = new Array();
    public lay0: any[] = new Array();
    public lay1: any[] = new Array();
    public lay2: any[] = new Array();

    constructor() {
      var r: RegExp = new RegExp(".{1,2}", "g"); //match
      var map_data: string = "............................................................";
      var lay_data: string = "........................................................................................................................";

      //Normal layer
      for (var i = 0; i <= 29; i++) {
        this.map0[i] = map_data.split("");
        this.map1[i] = map_data.split("");
        this.map2[i] = map_data.split("");
      }

      //Background layer
      for (var i = 0; i <= 29; i++) {
        this.lay0[i] = lay_data.match(r);
        this.lay1[i] = lay_data.match(r);
        this.lay2[i] = lay_data.match(r);
      }
    }
  }

  //---------------------------------------------------------
  //Palette module
  //---------------------------------------------------------
  module palette {

    //Chipdata for normal layer pallete
    export var plt_chip_data: string = ".A98BCDHIJEFOGPQNuvwxUV12WXR{}abcdefghijznmopqrs..[]<>5647Y+-*/KLMtklySTZ3.";
    var plt_chips: any[] = plt_chip_data.split("");
    
    export var plt_description = {
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
      "en": [

      ]
    };


    export function getChipname(str: string): string {
      return plt_chips[str];
    }

  }

  //---------------------------------------------------------
  //Mouse event module
  //---------------------------------------------------------
  module mouseEvent {

    export function plt1_mDown(e: any): void {
      var id: string = e.target.id.slice(4);
      console.log("down", palette.getChipname(id), palette.plt_description[lang][id]);
    }

    export function edt_mDown(e: any): void {

    }

  }

  //---------------------------------------------------------
  //Init class
  //---------------------------------------------------------
  export class init {

    //private version: string = "1.0"; // MAL version

    //Constructor
    protected constructor(obj: any) {
      map = new mapdata;
      this.createMalElements(obj.editor, obj["palette"]); //Create mal elements
    }

    //Create Editor and Pallete components
    private createMalElements(edt: any, plt1: any): void {

      //---------------------------------------------------------
      //Editor
      //---------------------------------------------------------

      //Get place from element id to put editor
      var elm_edt: HTMLElement = document.getElementById(edt.id);

      //Create 3 canvas elements, background, main, and front layer.
      for (var i = 0; i < 3; i++) {
        var newCanvas: HTMLCanvasElement = document.createElement("canvas");
        newCanvas.id = "c" + i;                       //Set id
        newCanvas.width = 5728;                       //Default width
        newCanvas.height = 928;                       //Default height
        newCanvas.style.top = "0";                    //Set top
        newCanvas.style.left = "0";                   //Set left
        newCanvas.style.position = "absolute";        //Set position absolute
        elm_edt.appendChild(newCanvas);               //Put a canvas on the editor element
      }

      //Get Editor's height and scroll down automatically
      var scrollHeight: number = elm_edt.scrollHeight;
      elm_edt.scrollTop = scrollHeight;

      //---------------------------------------------------------
      //Palette-1
      //---------------------------------------------------------

      //Get place from element id to put palette-1
      var elm_plt1: HTMLElement = document.getElementById(plt1["id-1"]);

      //Declare image object to make a Pallete
      var img_plt1 = new Image();

      //Set parts file
      img_plt1.src = plt1.parts + "?" + new Date().getTime();

      //After load parts images
      img_plt1.onload = function() {

        //Create all palette objects as a canvas element
        for (var i2 = 0; i2 < 3; i2++) {  //Vertical

          for (var i = 0; i < 25; i++) {  //Horizontal

            //Create canvas element
            var cvs: HTMLCanvasElement = document.createElement('canvas');
            cvs.width = 32;                  //Chip width
            cvs.height = 32;                 //Chip height
            cvs.className = "pBox";          //Set classname
            cvs.id = "_p1_" + (i + i2 * 25); //Set id

            //Mousedown event
            cvs.addEventListener('mousedown', mouseEvent.plt1_mDown, false);

            //Get context
            var ctx: any = cvs.getContext('2d');

            //Draw chip
            ctx.drawImage(img_plt1, 32 * i, 32 * i2, 32, 32, 0, 0, 32, 32);

            //Put canvas on the palette element
            elm_plt1.appendChild(cvs);

            console.log(cvs);
          }
        }
      }

      console.log("done");
    }

  }

  export function test(): void {
    console.log(map.map0);
  }

}
