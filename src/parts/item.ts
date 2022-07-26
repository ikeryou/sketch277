import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Val } from "../libs/val";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _txt:Array<HTMLElement> = [];
  private _bg:HTMLElement;
  private _hoverRate:Val = new Val();
  private _isPlaying:boolean = false;
  private _isRollover:boolean = false;
  private _fontSize:number = 32;

  constructor(opt:any) {
    super(opt)

    Tween.instance.set(this.getEl(), {
      color:opt.color,
      fontSize:this._fontSize
    })

    this._bg = document.createElement('span');
    this._bg.classList.add('item-bg');
    this.getEl().append(this._bg);

    const num = Util.instance.randomInt(5, 8);
    for(let i = 0; i < num; i++) {
      const t = document.createElement('span');
      t.classList.add('item-txt');
      this.getEl().append(t);

      t.innerHTML = opt.txt;

      this._txt.push(t);
    }

    this._setHover();
  }


  //
  protected _eRollOver() {
    this._isRollover = true;

    if(this._isPlaying) return;
    this._isPlaying = true;

    Tween.instance.a(this._hoverRate, {
      val:[0, 1]
    }, 0.5, 0, Tween.Power2EaseOut, null, null, () => {
      this._eCompRollOver();
    })
  }


  //
  // ------------------------------------
  private _eCompRollOver():void {
    this._isPlaying = false;
    if(!this._isRollover) {
        this._eRollOut();
    }
  }


  //
  protected _eRollOut() {
    this._isRollover = false;

    if(this._isPlaying) return;
    this._isPlaying = true

    Tween.instance.a(this._hoverRate, {
        val:0
    }, 0.75, 0, Tween.Power2EaseInOut, null, null, () => {
        this._eCompRollOut()
    })
  }


  //
  // ------------------------------------
  private _eCompRollOut():void {
    this._isPlaying = false
    if(this._isRollover) {
      this._eRollOver()
    }
  }



  protected _update(): void {
    super._update();

    const radius = 20 * Util.instance.map(this._hoverRate.val, 1, 2, 0, 1);
    const ang = this._c * 1;
    this._txt.forEach((val,i) => {
      const radian = Util.instance.radian(ang + (360 / this._txt.length) * i);
      const x = Math.sin(radian) * radius;
      const y = Math.cos(radian) * radius;

      const dx = 0 - x;
      const dy = 0 - y;
      const rot = Util.instance.degree(Math.atan2(dy, dx)) + Util.instance.map(this._hoverRate.val, 0, -90, 0, 1);

      Tween.instance.set(val, {
        x:x - this._fontSize * 0.5,
        y:y - this._fontSize * 0.5,
        rotationZ:rot
      });
    })

    Tween.instance.set(this._bg, {
      width:radius * 4,
      height:radius * 4,
      x:-radius * 2,
      y:-radius * 2,
    })

  }
}