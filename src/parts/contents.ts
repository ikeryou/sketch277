import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _item:Array<Item> = [];
  private _line:number = 5;

  constructor(opt:any) {
    super(opt)

    const colors = [
      '#FCF200',
      '#E43C6A',
      '#07F1D9',
      '#EE3E26'
    ]

    const num = this._line * 3;
    for(let i = 0; i < num; i++) {
      const itemEl = document.createElement('span');
      itemEl.classList.add('item');
      this.getEl().append(itemEl);

      const item = new Item({
        el:itemEl,
        txt:Util.instance.randomArr('ACDEFGHIKLMNOPRSTUVWXYZ0123456789'.split('')),
        color:colors[i % colors.length]
      });
      this._item.push(item);
    }

    this._resize();
  }




  protected _update(): void {
    super._update();
  }


  protected _resize(): void {
    super._resize();

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();

    this._item.forEach((val,i) => {
      const ix = ~~(i % this._line);
      const iy = ~~(i / this._line);
      const interval = Func.instance.val(70, 200);

      let x = sw * 0.5 + ix * interval;
      let y = sh * 0.5 + iy * interval;

      x -= (interval * (this._line - 1)) * 0.5;
      y -= (interval * 2) * 0.5;

      Tween.instance.set(val.getEl(), {
        x:x,
        y:y
      });
    });
  }
}