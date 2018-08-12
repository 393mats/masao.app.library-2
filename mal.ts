//masao app Library
module mal {

	//Init
  export class init {

    //private version: string = "1.0"; // MAL version

    //Constructor
    protected constructor(obj: any) {
      this.createMalElements(obj.editor, obj["palette"]); //Create mal elements
    }

    //Create Editor and Pallete components
    private createMalElements(edt: any, plt1: any): void {

      //---------------------------------------------------------
      //Editor
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
            cvs.width = 32;               //Chip width
            cvs.height = 32;              //Chip height
            cvs.className = "pBox";       //Set classname
            cvs.id = "_p1_" + (i + i2 * 25);

            cvs.addEventListener('mousedown', mouseDown, false);

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

	function mouseDown(e: any): void{
		console.log("down", e.target.id);

	}

	export function test(): void{
		console.log("test!!!");
	}
}
