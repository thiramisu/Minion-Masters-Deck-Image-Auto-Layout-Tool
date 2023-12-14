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
        220, 3, 44, // master
        276, 6, 39, // WC
        325, 4, 42, // mana
        11, 47 //grid
      ]
    }
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
      this.#ctx.fillStyle = "#101729";
    };

    static #drawImage(resolutionRatio, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
      this.#ctx.drawImage(imageLoader.image,
        sx * resolutionRatio / 100, sy * resolutionRatio / 100, sWidth * resolutionRatio / 100, sHeight * resolutionRatio / 100,
        dx, dy, dWidth, dHeight
      );
    }

    static #drawImageAll(card1X, card1Y, card2X, card2Y, masterX, masterY, masterScale, WCX, WCY, WCScale, manaX, manaY, manaScale, gridX, gridY, gridAngle = 0) {
      const resolutionRatio = imageLoader.resolutionRatio;
      this.#ctx.fillRect(0, 0, this.#width, this.#height);
      this.#drawImage(resolutionRatio, 238, 8, 360, 82, card1X, card1Y, 360, 82);
      this.#drawImage(resolutionRatio, 594, 8, 360, 82, card2X, card2Y, 360, 82);
      this.#drawImage(resolutionRatio, 102, 3, 85, 85, masterX, masterY, masterScale, masterScale);
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
        112, 94, 370, 2,
        11, 3, 370, 2
      );
      this.#ctx.restore();
    };

    static #trim(sx, sy) {
      const resolutionRatio = imageLoader.resolutionRatio;
      const size = layout.getSize();
      this.#drawImage(resolutionRatio, sx, sy, size[0], size[1], 0, 0, size[0], size[1]);
    }
  }

  const imageLoader = (({ imageElement, imageInput }) => {
    const checkResolutionRatio = (e) => {
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
      // 1280pxを基準にした時の横幅(%)
      get resolutionRatio() {
        return imageElement.naturalWidth * 10 / 128;
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
  DIRECT_RAYOUT = layout.directSet;

  localStorage.removeItem("resolution");
});