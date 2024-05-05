import "phaser";

class Example extends Phaser.Scene {
  // 画面ロード前の実行ロジック
  preload() {
    this.load.image("kuya_shonin", "http://localhost:3000/src/assets/kuya_shonin.jpg");

    this.load.setBaseURL("https://labs.phaser.io");

    this.load.image("sky", "assets/skies/space3.png");
    this.load.image("logo", "assets/sprites/phaser3-logo.png");
    this.load.image("red", "assets/particles/red.png");
  }

  // 画面作成時の実行ロジック
  create() {
    // 背景画像を配置
    // デフォルトではアセットの中心位置を0,0にしてしまうので、画像の中心位置を画面の中心位置に合わせるために400,300を指定
    this.add.image(400, 300, "sky");
    // もしくは、以下のように画像の中心位置を画面の中心位置に合わせることも可能
    // this.add.image(0, 0, "sky").setOrigin(0);

    this.add.image(670, 380, "kuya_shonin").setScale(0.5);

    const particles = this.add.particles(0, 0, "red", {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    const logo = this.physics.add.image(400, 100, "logo");

    logo.setVelocity(100, 100);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    particles.startFollow(logo);
  }

  // 画面更新時の実行ロジック
  update(time: number, delta: number): void {}
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: Example,
  physics: {
    default: "arcade",
    // arcade: {
    //   gravity: { x: 200, y: 300 },
    // },
  },
};

const game = new Phaser.Game(config);
