let DIRECT_LAYOUT;
window.addEventListener("load", () => {
  "use strict";
  const CARD_LINE_SIZE = { x: 766, y: 184 };
  const LAYOUTS = [
    // トリミングだけ
    {
      size: [2160, 216],
      positions: [
        192, 1218 // trim
      ]
    },
    // memo line 1210 ~ 3px card 1218 ~ 216px
    // 水平の仕切り線の上にマスター、WC、平均マナ
    // 下にカードを2行で表示
    {
      size: [800, 450],
      positions: [
        17, 76, 17, 268, // cards
        685, 5, 70, // master
        306, 4, 22, // WC
        2, 26 //grid
      ]
    }
      // 垂直の仕切り線の左にマスター、WC、平均マナ
      // 右にカードを2行で表示
      //
      // 水平の仕切り線の上にマスター、WC、平均マナ
      // 下にカードを2行で表示
      // (パターン2)
  ];


  const $id = (id) => document.getElementById(id);


  class Warning {
    static log(output) {
      this.#output.textContent = output;
    }

    static clear() {
      Warning.#output.textContent = "";
    }

    static #output = $id("warning");
  }

  class Canvas {
    static #canvas = $id("canvas");
    static #ctx;
    static #width;
    static #height;

    static applyImage(e) {
      Canvas.#reset.apply(Canvas, layout.getSize());
      const positions = layout.getPositions();
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
      this.#ctx.fillStyle = "#272127";
    };

    static #drawImage(resolutionRatio, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
      this.#ctx.drawImage(imageLoader.image,
        sx * resolutionRatio / 100, sy * resolutionRatio / 100, sWidth * resolutionRatio / 100, sHeight * resolutionRatio / 100,
        dx, dy, dWidth, dHeight
      );
    }

    static #drawImageAll(card1X, card1Y, card2X, card2Y, masterX, masterY, masterSize, WCX, WCY, WCSize, gridX, gridY, gridAngle = 0) {
      const resolutionRatio = imageLoader.resolutionRatio;
      this.#ctx.fillRect(0, 0, this.#width, this.#height);
      this.#drawImage(resolutionRatio, 514, 1232, CARD_LINE_SIZE.x, CARD_LINE_SIZE.y, card1X, card1Y, CARD_LINE_SIZE.x, CARD_LINE_SIZE.y);
      this.#drawImage(resolutionRatio, 1280, 1232, CARD_LINE_SIZE.x, CARD_LINE_SIZE.y, card2X, card2Y, CARD_LINE_SIZE.x, CARD_LINE_SIZE.y);
      this.#drawImage(resolutionRatio, 258, 1239, 200, 150, masterX, masterY, masterSize / 150 * 200, masterSize);
      //this.#drawImage(resolutionRatio, 194, 25, 39, 39, WCX, WCY, WCSize, WCSize);

      this.#ctx.save();
      this.#ctx.translate(gridX, gridY);
      this.#ctx.rotate(gridAngle * Math.PI / 180);
      /*
      // 先端
      this.#drawImage(resolutionRatio,
        101, 91, 11, 7,
        0, 0, 11, 7
      );
      */
      this.#ctx.restore();
    };

    static #trim(sx, sy) {
      const resolutionRatio = imageLoader.resolutionRatio;
      const size = layout.getSize();
      this.#drawImage(resolutionRatio, sx, sy, size[0], size[1], 0, 0, size[0], size[1]);
    }
  }

  const imageLoader = (({ imageElement, imageInput }) => {
    const checkResolutionRatio = () => {
      if (imageElement.naturalWidth / 16 * 9 !== imageElement.naturalHeight) {
        Warning.log("アスペクト比が厳密な16:9でないため、表示が崩れる可能性があります。 / Because the aspect ratio is not exactly 16:9, There is a possibility the layout is broken.");
      }
    }

    const loadImage = () => {
      if (imageInput.files.length === 0)
        return;
      imageElement.src = URL.createObjectURL(imageInput.files[0]);
    };

    imageInput.addEventListener("change", loadImage);
    imageElement.addEventListener("load", () => {
      Warning.clear();
      checkResolutionRatio();
      Canvas.applyImage();
    });

    return {
      get image() {
        return imageElement;
      },
      // 2560pxを基準にした時の横幅(%)
      get resolutionRatio() {
        return imageElement.naturalWidth * 10 / 256;
      },
      loadImage,
    };
  })({
    imageElement: $id("preview"),
    imageInput: $id("image"),
  });

  const layout = (({ select, direct }) => {
    const saveKindId = () => {
      localStorage.setItem("layout-kind", kindId);
    }

    const DIRECT_KIND_ID = -1;
    let kindId = parseInt(localStorage.getItem("layout-kind") ?? 1, 10);
    select.value = kindId;
    select.addEventListener("change", () => {
      kindId = parseInt(select.value, 10);
      saveKindId();
      imageLoader.loadImage();
    });

    return {
      getSize() {
        return (kindId === DIRECT_KIND_ID ? direct : LAYOUTS[kindId]).size;
      },
      getPositions() {
        return (kindId === DIRECT_KIND_ID ? direct : LAYOUTS[kindId]).positions;
      },
      changeLayoutDirectly(layout) {
        kindId = DIRECT_KIND_ID;
        saveKindId();
        direct.size = layout.slice(0, 2);
        direct.positions = layout.slice(2);
        localStorage.setItem("direct-layout", JSON.stringify(direct));
        imageLoader.loadImage();
      }
    }
  })(
    {
      select: $id("layout"),
      direct: JSON.parse(localStorage.getItem("direct-layout")) ?? {
        size: [],
        positions: []
      },
    }
  );
  DIRECT_LAYOUT = layout.changeLayoutDirectly;

  localStorage.removeItem("resolution");
});