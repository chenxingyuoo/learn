/**
 * 皮肤切换窗口
 */
class SkinDialog extends egret.Sprite {
  constructor() {
    super()
    this.init()
  }

  public static CLOSE_SKIN: string = 'closeskin'
  public _width: number = 300
  public _height: number = 400

  private init () {

    const shape: egret.Shape = new egret.Shape()
    shape.graphics.beginFill(0x000000, .8)
    shape.graphics.drawRoundRect(0, 0, this._width, this._height, 10)
    shape.graphics.endFill()
    this.addChild(shape)
    
    const closeBtn: egret.Bitmap = new egret.Bitmap(RES.getRes('close_png'))
    closeBtn.width = 25
    closeBtn.height = 25
    closeBtn.x = this._width - 13
    closeBtn.y = -13
    this.addChild(closeBtn)
    closeBtn.touchEnabled = true
    closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      this.dispatchEventWith(SkinDialog.CLOSE_SKIN)
    }, this)
    

    const title: egret.TextField = new egret.TextField()
      title.textColor = 0xffffff
      title.size = 24
      title.text = '皮肤选择'
      title.x = this._width / 2 - title.width / 2
      title.y = 20
      this.addChild(title)

    const skinList: skinItem[] = [{ text: '默认皮肤', value: 1 }, { text: '无限月读', value: 2 }]
    skinList.forEach((item: skinItem, index: number) => {
      const text: egret.TextField = new egret.TextField()
      text.textColor = 0xffffff
      text.size = 16
      text.y = 40 * index + 70
      text.x = 20
      text.text = item.text
      text.touchEnabled = true
      text.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        platform.setData({ key: 'skin', value: item.value })
        this.dispatchEventWith(SkinDialog.CLOSE_SKIN)
      }, this)
      this.addChild(text)
    })
  }
}

declare interface skinItem {
  text: string
  value: number
}