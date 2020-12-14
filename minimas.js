let DIRECT_RAYOUT;
window.addEventListener("load", () => {
  "use strict";
  const LAYOUTS = [
    {
      size: [913, 98],
      positions: [
        99, 0 // trim
      ]
    },
    {
      size: [360, 195],
      positions: [
        0, 31, 0, 113,
        273, 1, 27, // master
        306, 4, 22, // WC
        333, 2, 25, // mana
        2, 26 //grid
      ]
    },
    {
      size: [393, 164],
      positions: [
        33, 0, 33, 82, // cards
        1, 21, 30, // master
        4, 70, 24, // WC
        3, 114, 28, // mana
        30, 164, -90 //grid
      ]
    },
    {
      size: [384, 216],
      positions: [
        12, 52, 12, 134, // cards
        218, 1, 48, // master
        273, 4, 43, // WC
        322, 2, 46, // mana
        14, 47 //grid
      ]
    }
  ];


  const $id = (id) => document.getElementById(id);


  class Canvas {
    static #canvas = $id("canvas");
    static #ctx;
    static #width;
    static #height;

    static applyImage(e) {
      Canvas.#reset.apply(Canvas, Layout.getSize());
      const positions = Layout.getPositions();
      if (positions.length === 2) {
        Canvas.#trim.apply(Canvas, positions);
        return;
      }
      Canvas.#drawImageAll.apply(Canvas, positions);
    }

    static #reset(width, height) {
      if (width === this.#width && height === this.#height) {
        return;
      }
      const style = this.#canvas.style;
      if (width !== this.#width) {
        this.#width = width;
        this.#canvas.width = width;
        style.width = width + "px";
      }
      if (height !== this.#height) {
        this.#height = height;
        this.#canvas.height = height;
        style.height = height + "px";
      }
      this.#ctx = this.#canvas.getContext('2d');
      this.#ctx.fillStyle = "#101729";
    };

    static #drawImage(resolutionRatio, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
      this.#ctx.drawImage(ImageLoader.image,
        sx * resolutionRatio / 100, sy * resolutionRatio / 100, sWidth * resolutionRatio / 100, sHeight * resolutionRatio / 100,
        dx, dy, dWidth, dHeight
      );
    }

    static #drawImageAll(card1X, card1Y, card2X, card2Y, masterX, masterY, masterScale, WCX, WCY, WCScale, manaX, manaY, manaScale, gridX, gridY, gridAngle = 0) {
      const resolutionRatio = ImageLoader.resolutionRatio;
      this.#ctx.fillRect(0, 0, this.#width, this.#height);
      this.#drawImage(resolutionRatio, 238, 8, 360, 82, card1X, card1Y, 360, 82);
      this.#drawImage(resolutionRatio, 594, 8, 360, 82, card2X, card2Y, 360, 82);
      this.#drawImage(resolutionRatio, 102, 3, 84, 84, masterX, masterY, masterScale, masterScale);
      this.#drawImage(resolutionRatio, 194, 25, 39, 39, WCX, WCY, WCScale, WCScale);
      this.#drawImage(resolutionRatio, 955, 19, 52, 52, manaX, manaY, manaScale, manaScale);

      this.#ctx.save();
      this.#ctx.translate(gridX, gridY);
      this.#ctx.rotate(gridAngle * Math.PI / 180);
      // 先端
      this.#drawImage(resolutionRatio,
        101, 91, 11, 7,
        0, 0, 11, 7
      );
      // 仕切り
      this.#drawImage(resolutionRatio,
        112, 94, 360, 2,
        11, 3, 360, 2
      );
      this.#ctx.restore();
    };

    static #trim(sx, sy) {
      const resolutionRatio = ImageLoader.resolutionRatio;
      const size = Layout.getSize();
      this.#drawImage(resolutionRatio, sx, sy, size[0], size[1], 0, 0, size[0], size[1]);
    }
  }

  class ImageLoader {
    static #imageElement = $id("preview");
    static #inputImage = $id("image");
    static get image() {
      return this.#imageElement;
    }

    // 1280pxを基準にした時の横幅(%)
    static #resolutionRatio;
    static get resolutionRatio() {
      return this.#resolutionRatio;
    }

    static #init = this.#initialize();

    static loadImage(e) {
      if (ImageLoader.#inputImage.files.length === 0)
        return;
      ImageLoader.#imageElement.src = URL.createObjectURL(ImageLoader.#inputImage.files[0]);
    };

    static #loadResolutionRatio(e) {
      if (ImageLoader.#imageElement.naturalWidth / 16 * 9 !== ImageLoader.#imageElement.naturalHeight) {
        Warning.log("アスペクト比が厳密な16:9でないため、表示が崩れる可能性があります。 / Because the aspect ratio is not exactly 16:9, There is a possibility that the layout is broken.");
      }
      ImageLoader.#resolutionRatio = ImageLoader.#imageElement.naturalWidth * 10 / 128;
    }

    static #initialize() {
      this.#inputImage.addEventListener("change", this.loadImage);
      this.#imageElement.addEventListener("load", ImageLoader.#loadResolutionRatio);
      this.#imageElement.addEventListener("load", Canvas.applyImage);
      return true;
    }
  }


  class Layout {
    static #select = $id("layout");
    static #direct = JSON.parse(localStorage.getItem("direct-layout")) ?? {
      size: [],
      positions: []
    };;
    static #kindId = this.#load();

    static getSize() {
      return (this.#kindId === -1 ? this.#direct : LAYOUTS[this.#kindId]).size;
    }
    static getPositions() {
      return (this.#kindId === -1 ? this.#direct : LAYOUTS[this.#kindId]).positions;
    }
    static #set(id) {
      this.#kindId = id;
      localStorage.setItem("layout-kind", this.#kindId);
    }
    static directSet(layout) {
      this.#set(-1);
      this.#direct.size = layout.slice(0, 2);
      this.#direct.positions = layout.slice(2);
      localStorage.setItem("direct-layout", JSON.stringify(this.#direct));
    }
    static #load() {
      const kind = parseInt(localStorage.getItem("layout-kind") ?? 1, 10);
      this.#select.value = kind;
      this.#select.addEventListener("change", this.#save);
      this.#select.addEventListener("change", ImageLoader.loadImage);
      return kind;
    }
    static #save(e) {
      Layout.#set(parseInt(Layout.#select.value, 10));
    }

  }
  DIRECT_RAYOUT = Layout.directSet;

  class Warning {
    static log(output) {
      this.#output.textContent = output;
    }

    static #output = $id("warning");
  }

  localStorage.removeItem("resolution");
});