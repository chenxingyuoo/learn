/**
 * 游戏进行中的界面
 */
class GamePlayingPanel extends egret.Sprite {
  public static GAME_END: string = 'gameend'
  public static GAME_RESTART: string = 'gamerestart'

  private mode: number = 1
  private skin: number = 1
  private bgimg: egret.Bitmap
  private textfield: egret.TextField;
  private timber: egret.Bitmap
  private kunai: egret.Bitmap
  private timberInterval: number
  // 如果是负数则逆时针转动，数值越大速度越快
  private rotations: number = 3
  private isShooting: boolean = false
  private insertRotate: itemObj[] = []
  private insertRotateNoAnimate: egret.Bitmap[] = []
  protected kunaiW: number = 21
  protected kunaiH: number = 100
  // time interval的间隔，数值越小转的越快
  private rate: number = 35
  // 改变现有旋转速度
  private rateOffset: number = 0
  private dialog: Dialog
  private s1: egret.Bitmap
  private s2: egret.Bitmap
  private layerNum: number
  private scores: egret.TextField
  private timberMask: TimberMask
  private kunaiNumTips: egret.TextField

  // 关数限定
  // 默认需要射中的苦无数量
  private kunaiNum: number = 9
  // 默认第1关
  private level: number = 1

  public constructor() {
    super()
    this.initGame()
  }

  public start(mode: number) {
    // mode1：简单
    // mode2：疯狂
    this.mode = mode

    let mat
    if (this.mode === 1) {
      mat = [
          1, 0, 0, 0, 0,
          0, 1, 0, 0, 0,
          0, 0, 1, 0, 0,
          0, 0, 0, 1, 0,
        ]
    } else if (this.mode === 2) {
      // 反色背景
      mat = [
          -1, 0, 0, 0, 255,
          0, -1, 0, 0, 255,
          0, 0, -1, 0, 255,
          0, 0, 0, 1, 0,
        ]
    }
    const matFilter = new egret.ColorMatrixFilter(mat)
    this.bgimg.filters = [matFilter]
  }

  public end() {
    this.resetGame()
  }

	/**
	 * 创建场景界面
	 * Create scene interface
	 */
  protected async initGame() {

    const { stage } = egret.MainContext.instance
    const stageW = stage.stageWidth
    const stageH = stage.stageHeight

    this.bgimg = new egret.Bitmap()
    this.bgimg.x = 0
    this.bgimg.y = 0
    this.bgimg.width = stageW
    this.bgimg.height = stageH
    this.addChild(this.bgimg)

    const skin = await platform.getData('skin') || 1
    this.skin = parseInt(skin)

    if (this.skin === 1) {
      this.bgimg.texture = RES.getRes('4_jpg')
      this.bgimg.alpha = .4
      this.timber = this.createBitmapByName('timber_png')
      this.addChild(this.timber)
      this.timber.width = 200
      this.timber.height = 200
    } else if (this.skin === 2) {
      this.bgimg.texture = RES.getRes('2_jpg')
      this.bgimg.alpha = .7
      this.timber = this.createBitmapByName('eye_png')
      this.addChild(this.timber)
      this.timber.width = 280
      this.timber.height = 280
    }
    this.timber.anchorOffsetX = this.timber.width / 2
    this.timber.anchorOffsetY = this.timber.height / 2
    this.timber.x = stageW / 2
    this.timber.y = 230

    this.layerNum = this.numChildren

    this.createText()
    this.createKunai()
    this.createKunaiNum()
    this.createScores()

    // 创建分享及广告
    this.share()
  }
	/**
	 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
	 * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
	 */
  private createBitmapByName(name: string): egret.Bitmap {
    let result = new egret.Bitmap();
    let texture: egret.Texture = RES.getRes(name);
    result.texture = texture;
    return result;
  }
	/**
	 * 描述文件加载成功，开始播放动画
	 * Description file loading is successful, start to play the animation
	 */
  private startAnimation(): void {
    if (this.timberInterval) {
      clearInterval(this.timberInterval)
    }
    this.timber.rotation = 0
    this.timberInterval = setInterval(() => {
      this.timber.rotation += this.rotations
    }, this.rate - this.rateOffset)
  }

  // 关卡加强
  private resetAnimation(): void {
    if (this.mode === 1) {
    let random = Math.floor(Math.random() * this.level)
      // 改变速度
      this.rateOffset = Math.random() < 0.2 ? random : random * -1
      // 改变方向
      this.rotations = this.level % 3 === 0 && Math.random() < 0.1 ? this.rotations * -1 : this.rotations
    } else if (this.mode === 2) {
      // 疯狂模式下每关增加速度
      this.rateOffset = this.level * 1.2
    }

    if (this.timberInterval) {
      clearInterval(this.timberInterval)
    }
    this.timberInterval = setInterval(() => {
      this.timber.rotation += this.rotations
    }, this.rate - this.rateOffset)

    this.resetRotateKunai()
  }

	/**
	 * 射击动作
	 */
  private shoot(e: egret.TouchEvent) {
    if (this.isShooting || this.kunaiNum <= 0) return
    this.isShooting = true
    this.kunaiNum -= 1
    this.updateKunaiNum()
    const func = (): void => {
      if (this.calcCollision(this.timber.rotation)) {
        // 如坐标集合里面有了，苦无插入重复的位置，弹飞新加的苦无
        this.flickKunai()
      } else {
        // 木屑
        this.woodBits()
        // 木桩被射中动画
        const timberX = this.timber.x
        const timberY = this.timber.y
        egret.Tween.get(this.timber)
          .to({ x: this.timber.x - 6, y: this.timber.y - 7 }, 20, egret.Ease.bounceInOut)
          .to({ x: timberX, y: timberY }, 20, egret.Ease.bounceInOut)
          .call(() => {
            // 判断及动画完成以后进行游戏判断
            if (this.kunaiNum <= 0) {
              this.showNext()
            } else {
              this.resetKunai()
            }
            this.resetAnimation()
          }, this)
        
        this.kunai.alpha = 0
        this.createRotateKunai()
        this.updateScores()

      }
    }
    egret.Tween.get(this.kunai)
      .to({ y: 380 }, 150, egret.Ease.cubicIn)
      .call(func, this)
  }


  private createKunai() {
    const { stage } = egret.MainContext.instance
    this.kunai = this.createBitmapByName('kunai_png')
    this.addChild(this.kunai)
    const stageW = stage.stageWidth
    const stageH = stage.stageHeight
    this.kunai.width = this.kunaiW
    this.kunai.height = this.kunaiH
    this.kunai.x = stageW / 2 - 10
    this.kunai.y = stageH - 170

    this.createRandomKunai()
    this.createClickable()
  }

  // 创建游戏点击区域
  private createClickable() {
    const { stage } = egret.MainContext.instance
    const rect = new egret.Shape()
    rect.graphics.beginFill(0x000000, 0)
    rect.graphics.drawRect(0, stage.stageHeight - 200, stage.stageWidth, 300)
    rect.graphics.endFill()
    this.addChild(rect)
    rect.touchEnabled = true
    rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shoot, this)
  }

  private resetKunai() {
    const { stage } = egret.MainContext.instance
    const stageW = stage.stageWidth
    const stageH = stage.stageHeight
    this.kunai.width = 20
    this.kunai.height = 100
    this.kunai.rotation = 0
    this.kunai.x = stageW / 2 - 10
    this.kunai.y = stageH - 170
    this.kunai.alpha = 1

    this.isShooting = false
  }

  private createRotateKunai(kunaiRotate?: number) {
    // 数据存储木桩上的苦无坐标
    // 有kunaiRotate则是随机生成的苦无
    const { stage } = egret.MainContext.instance
    const rotate = typeof kunaiRotate === 'number' ? kunaiRotate : this.timber.rotation
    const range = []
    range.push(rotate - 10)
    range.push(rotate + 10)

    // 生成木桩上的苦无
    const kunai: egret.Bitmap = this.createBitmapByName('kunai_png')
    kunai.anchorOffsetX = 5
    kunai.anchorOffsetY = -52
    kunai.x = stage.stageWidth / 2
    kunai.y = 230
    kunai.width = this.kunaiW
    kunai.height = this.kunaiH
    // 如果是用kunaiRotate做判断需要乘以-1
    kunai.rotation = typeof kunaiRotate === 'number' ? -kunaiRotate : 0
    this.addChildAt(kunai, this.layerNum - 1)
    const time: number = setInterval(() => {
      kunai.rotation += this.rotations
    }, this.rate - this.rateOffset)

    const obj = { id: this.timber.rotation, range, kunai, time }
    this.insertRotate.push(obj)

  }

  /**
   * 替换原有的动画苦无为静态，方便后续做掉落动画
   */
  private createRotateKunaiNoAnimate(rotate: number) {
    // 生成无动画的苦无
    const { stage } = egret.MainContext.instance 

    // 生成木桩上的苦无
    const kunai: egret.Bitmap = this.createBitmapByName('kunai_png')
    kunai.anchorOffsetX = 5
    kunai.anchorOffsetY = -52
    kunai.x = stage.stageWidth / 2
    kunai.y = 230
    kunai.width = this.kunaiW
    kunai.height = this.kunaiH
    // 如果是用kunaiRotate做判断需要乘以-1
    kunai.rotation = - rotate
    this.addChildAt(kunai, this.layerNum - 1)

    this.insertRotateNoAnimate.push(kunai)
  }

  // 重设苦无动画
  private resetRotateKunai() {
    this.insertRotate.forEach((item: itemObj) => {
      if (item.time) {
        clearInterval(item.time)
      }
      const time = setInterval(() => {
        item.kunai.rotation += this.rotations
      }, this.rate - this.rateOffset)
      item.time = time
    })
  }

  // 消除一定数量的苦无
  private removeRotateKunai(num: number = 3) {
    for (let i = 0; i < num; i++) {
      let item = this.insertRotate.splice(0, 1)[0]
      if (item && item.kunai) {
        egret.Tween.get(item.kunai).to({ alpha: 0 }, 100).call(() => {
          item.kunai.parent.removeChild(item.kunai)
        }, this)
      }
    }
  }

  // 即将到达木桩的苦无与现存于木桩的苦无进行坐标比较
  private calcCollision = (rotate: number): boolean => {
    const { insertRotate } = this
    return insertRotate.some((item: itemObj): boolean => {
      return (rotate <= item.range[1] && rotate >= item.range[0])
    })
  }

  // 重复苦无的动画，游戏失败等等
  private flickKunai() {
    const { stage } = egret.MainContext.instance
    const func = (): void => {
      setTimeout(() => {
        this.showDialog()
      }, 500)
    }

    egret.Tween.get(this.kunai)
      .to({ x: stage.stageWidth + 100, y: stage.stageHeight + 100, rotation: 720 }, 700, egret.Ease.bounceOut)
      .call(func, this)
  }

  // 文字提示
  private createText() {
    const { stage } = egret.MainContext.instance
    const shape1 = new egret.Shape()
    shape1.graphics.beginFill(0x2f1810, .8)
    shape1.graphics.drawRoundRect(-10, 10, 80, 30, 10)
    shape1.graphics.endFill()
    this.addChild(shape1)

    this.textfield = new egret.TextField()
    this.addChild(this.textfield)
    this.textfield.x = 12
    this.textfield.y = 17
    this.textfield.textColor = 0xffffff
    this.textfield.textAlign = egret.HorizontalAlign.CENTER
    this.textfield.size = 14
    this.updateLevel()

  }

  // 关数显示
  private updateLevel() {
    this.textfield.text = `第 ${this.level} 关`
  }

  // 绘制剩余苦无
  private createKunaiNum() {
    const { stage } = egret.MainContext.instance
    const kunai = this.createBitmapByName('kunai_png')
    kunai.width = 10
    kunai.height = 50
    kunai.x = 30
    kunai.y = stage.stageHeight - 100
    this.addChild(kunai)

    this.kunaiNumTips = new egret.TextField()
    this.addChild(this.kunaiNumTips)
    this.kunaiNumTips.x = 50
    this.kunaiNumTips.y = stage.stageHeight - 80
    this.kunaiNumTips.textColor = 0xFFFFFF
    this.kunaiNumTips.textAlign = egret.HorizontalAlign.LEFT
    this.kunaiNumTips.size = 14
    this.updateKunaiNum()
  }

  // 更新剩余苦无
  private updateKunaiNum() {
    this.kunaiNumTips.text = `x ${this.kunaiNum}`
  }


  // 创建分数
  private createScores() {
    const { stage } = egret.MainContext.instance
    const shape: egret.Shape = new egret.Shape()
    shape.graphics.beginFill(0xffffff, .8)
    shape.graphics.drawRoundRect(stage.stageWidth / 2 - 50, 10, 100, 60, 10)
    shape.graphics.endFill()
    this.addChild(shape)

    const text: egret.TextField = new egret.TextField()
    text.size = 18
    text.textColor = 0x000000
    text.text = '得分'
    text.x = stage.stageWidth / 2 - text.width / 2
    text.y = 20
    this.addChild(text)

    this.scores = new egret.TextField()
    this.scores.size = 16
    this.scores.textColor = 0x000000
    this.scores.text = '0'
    this.scores.x = stage.stageWidth / 2 - this.scores.width / 2
    this.scores.y = 45
    this.addChild(this.scores)
  }

  // 更新得分
  private updateScores(s?: number) {
    const { stage } = egret.MainContext.instance
    this.scores.text = typeof s === 'number' ? `${s}` : `${parseInt(this.scores.text) + 1}`
    this.scores.x = stage.stageWidth / 2 - this.scores.width / 2
  }

  // 下一关
  private showNext() {
    this.timber.alpha = 0
    this.masks()
    this.timberMask.startAnimation()
    const ary: number[] = []
    this.insertRotate.forEach((item: itemObj) => {
      if (item.time) {
        clearInterval(item.time)
      }
      item.kunai.parent.removeChild(item.kunai)
      ary.push(item.id)
    })
    this.insertRotate = []
    ary.forEach((rotate: number) => {
      this.createRotateKunaiNoAnimate(rotate)
    })
    this.insertRotateNoAnimate.forEach((item: egret.Bitmap) => {
      item.rotation = Tools.generateRandom(-180, 180)
      egret.Tween.get(item).to({x: Tools.generateRandom(-this.stage.stageWidth, this.stage.stageWidth), y: this.stage.stageHeight + item.height * 2 }, 1000)
    })

    setTimeout(() => {
      this.timber.alpha = 1
      this.goNext()
    }, 1100)
  }

  // 下一关
  private goNext() {
    // 关数加1
    this.level += 1
    // 根据关卡加强的难度减少需要射出的苦无
    this.kunaiNum = 9 + Math.floor(this.level / 10 - 1)
    if(this.kunaiNum <=0 ) {
      this.kunaiNum = 1
    }
    this.cleanBitmap()
    this.createRandomKunai()
    this.updateKunaiNum()
    this.updateLevel()
    this.resetKunai()
  }

  /**
   * 每过一关改变关卡过关方式，并重新生成已在木桩上的苦无
   */
  private createRandomKunai() {
    if (this.level !== 1) {
      if (this.mode === 1) {
        // 简单模式，每关随机增减苦无
        const random = Math.floor(Math.random() * this.level)
        if (random >= this.level / 2) {
          this.kunaiNum = this.kunaiNum - Math.floor(Math.random() * this.level / 2 + 1)
        }
        for (let i = 1; i < random; i++) {
          let r = Math.floor(Math.random() * 180)
          r = Math.random() < .5 ? r * -1 : r
          this.createRotateKunai(r)
        }
      } else if (this.mode === 2) {
        // 疯狂模式每加一关，已插入的苦无多一把
        for (let i = 1; i < this.level; i++) {
          let random = Math.floor(Math.random() * 180)
          random = Math.random() < .5 ? random * -1 : random
          this.createRotateKunai(random)
        }
      }
    }
    this.startAnimation()
  }

  // 游戏结束提示框
  private async showDialog() {
    const { stage } = egret.MainContext.instance
    this.dialog = new Dialog()
    this.dialog.setScores(this.scores.text)
    this.addChild(this.dialog)
    this.dialog.x = stage.stageWidth / 2 - this.dialog._width / 2
    this.dialog.y = stage.stageHeight / 2 - this.dialog._height / 2
    this.dialog.addEventListener(Dialog.GO_HOME, () => {
      this.dispatchEventWith(GamePlayingPanel.GAME_END)
    }, this)
    this.dialog.addEventListener(Dialog.RESTART, () => {
      this.resetGame()
    }, this)
    this.dialog.addEventListener(Dialog.REBIRTH, () => {
      this.rebirth()
    }, this)
    this.dialog.addEventListener(Dialog.NOCHANCE, () => {
      this.noChance()
    }, this)

    // 上传到云
    const obj = {
      key: 'score',
      value: this.scores.text
    }
    platform.setUserCloudStorage(obj)

  }

  private closeDialog() {
    this.removeChild(this.dialog)
    this.dialog.removeEventListener(Dialog.GO_HOME, () => {
      this.dispatchEventWith(GamePlayingPanel.GAME_END)
    }, this)
    this.dialog.removeEventListener(Dialog.RESTART, () => {
      this.resetGame()
    }, this)
    this.dialog.removeEventListener(Dialog.REBIRTH, () => {
      this.rebirth()
    }, this)
  }

  // 重置游戏设置
  private resetGame() {
    this.closeDialog()
    this.level = 1
    this.kunaiNum = 9
    this.cleanBitmap()
    this.createRandomKunai()
    this.updateKunaiNum()
    this.updateLevel()
    this.resetKunai()
    this.updateScores(0)
  }

  // 清除现有所有的苦无
  private cleanBitmap() {
    this.insertRotate.forEach((item: itemObj) => {
      item.kunai.parent.removeChild(item.kunai)
    })
    this.insertRotate = []
  }

  // 木屑
  private woodBits() {
    const { stageWidth, stageHeight } = egret.MainContext.instance.stage
    for (let i = 0; i < 4; i++) {
      const dou = this.createBitmapByName('dou_png')
      dou.width = 5
      dou.height = 5
      dou.x = stageWidth / 2 - 1
      dou.y = 290
      this.addChild(dou)
      let random = Math.floor(Math.random() * stageWidth * 2)
      random = Math.random() < .5 ? random * -1 : random
      egret.Tween.get(dou)
        .to({ x: random, y: stageHeight }, 500, egret.Ease.sineOut)
        .call(() => {
          this.removeChild(dou)
        })
    }
  }

  private share() {
    const { stage } = egret.MainContext.instance
    this.s1 = this.createBitmapByName('s1_png')
    this.s1.width = 118 * .5
    this.s1.height = 107 * .5
    this.s1.x = stage.stageWidth - this.s1.width
    this.s1.y = stage.stageHeight - 330
    const s1y = this.s1.y
    this.addChild(this.s1)
    egret.Tween.get(this.s1, { loop: true }).to({ y: this.s1.y + 10 }, 1000).to({ y: s1y }, 1000)
    this.s1.touchEnabled = true
    this.s1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      platform.share(this.removeRotateKunai(3))
    }, this)

    // this.s2 = this.createBitmapByName('s2_png')
    // this.s2.width = 119 * .5
    // this.s2.height = 106 * .5
    // this.s2.x = stage.stageWidth - this.s2.width
    // this.s2.y = stage.stageHeight - 250
    // const s2y = this.s2.y
    // this.addChild(this.s2)
    // egret.Tween.get(this.s2, { loop: true }).to({ y: this.s2.y - 10 }, 1000).to({ y: s2y }, 1000)
  }

  // 复活
  private rebirth() {
    this.closeDialog()
    this.resetKunai()
    this.kunaiNum += 1
    this.updateKunaiNum()
  }

  // 没有复活机会
  private noChance() {
    const msg: Msg = new Msg()
    this.addChild(msg)
    msg.init('一天只有三次复活机会哦')
  }

  private masks() {
    const { stage } = this
    this.timberMask = new TimberMask()
    this.timberMask.init(this.skin)
    this.addChild(this.timberMask)
    this.timberMask.x = stage.stageWidth / 2 - this.timberMask.width / 2
    this.timberMask.y = 130
  }
}


interface itemObj {
  id: number
  range: number[]
  kunai: egret.Bitmap
  time: number
}