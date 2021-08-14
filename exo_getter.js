window.addEventListener("load", () => {
  "use strict";

  const Const = Object.freeze({
    EMPTY_STRING: Object.freeze(""),
    EMPTY_ARRAY: Object.freeze([]),
    EMPTY_OBJECT: Object.freeze({}),
    TurnIndex: "TurnIndex",
    RegExp: Object.freeze({
      rate: Object.freeze(/\nrate=(\d+)/),
      scale: Object.freeze(/\nscale=(\d+)/)
    })
  });

  const
    $id = (id) => document.getElementById(id),
    $x = (number) => '0x' + number.toString(16).toUpperCase();

  const findTypedArray = (() => {
    const
      buffer = new ArrayBuffer(5),
      dataView = new DataView(buffer),
      uint8Array = new Uint8Array(buffer);

    return (dataView2, first, second, index = 0, count = 1) => {
      dataView.setUint8(0, first);
      dataView.setUint32(1, second, true);
      const
        viewLength = dataView2.byteLength,
        firstItem = uint8Array[0],
        arrayLength = uint8Array.length;
      let countNumber = 0;
      while (index < viewLength) {
        if (dataView2.getUint8(index++) !== firstItem)
          continue;
        for (let viewIndex = index, arrayIndex = 1; arrayIndex < arrayLength; viewIndex += 1) {
          if (uint8Array[arrayIndex] !== dataView2.getUint8(viewIndex))
            break;
          arrayIndex += 1;
          if (arrayIndex === arrayLength && ++countNumber === count) {
            return index - 1;
          }
        }
      }
      return -1;
    };
  })();

  const findStringIndex = (dataView, string, index = 0, count = 1) => {
    const
      viewLength = dataView.byteLength,
      firstCharCode = string.charCodeAt(0),
      stringLength = string.length;
    let countNumber = 0;
    while (index < viewLength) {
      if (dataView.getUint8(index++) !== firstCharCode)
        continue;
      for (let searchArrayIndex = index, stringIndex = 1; stringIndex < stringLength; searchArrayIndex += 1) {
        if (string.charCodeAt(stringIndex) !== dataView.getUint8(searchArrayIndex))
          break;
        stringIndex += 1;
        if (stringIndex === stringLength && ++countNumber === count) {
          return index - 1;
        }
      }
    }
    return -1;
  };

  class FileLoader {
    static #load() {
      console.log(0);
      if (this.#replayFileInputElement.value === Const.EMPTY_STRING || this.#exoFileInputElement.value === Const.EMPTY_STRING)
        return;
      const file = this.#replayFileInputElement.files[0];
      const name = file.name;
      file.arrayBuffer().then(this.#load2);
    }

    static #load2(arrayBuffer) {
      AupGetter.set(arrayBuffer);
      const file = FileLoader.#exoFileInputElement.files[0];
      const reader = new FileReader();
      reader.addEventListener("loadend", AupGetter.create.bind(this));
      reader.readAsText(file, "Shift_JIS"); // 文字エンコード指定したいので
      // file.text().then(AupGetter.create.bind(this));
    }

    static #initialize() {
      this.#replayFileInputElement.addEventListener("change", this.#load.bind(this));
      this.#exoFileInputElement.addEventListener("change", this.#load.bind(this));
    }

    static #replayFileInputElement = $id("replay-file");
    static #exoFileInputElement = $id("exo-file");
    static #init = this.#initialize();
  }

  class AupGetter {
    static set(arrayBuffer) {
      const
        dataView = new DataView(arrayBuffer),
        length = dataView.getUint32(findTypedArray(dataView, 0x07, 0x00000007, 0x07E6) + 0x0A, true),
        targetAddress = findStringIndex(dataView, Const.TurnIndex) + 0x3E;
      this.#turnIndexes = Array.from({ length: length }, (_, i) => dataView.getUint16(targetAddress + i * 0x10, true), this);
      console.log(this.#turnIndexes);
    }

    static create(e) {
      const
        text = e.target.result,
        rate = parseInt(text.match(/(?<=\r\nrate=)\d+/)),
        scale = parseInt(text.match(/(?<=\r\nscale=)\d+/)),
        base = text.match(/(?:.|\s)+?\r\n(?=\[0\]\r\n)/),
        movie = text.match(/(?<=\[0\]\r\nstart=\d+\r\nend=\d+\r\nlayer=\d+\r\ngroup=\d+\r\n)(?:.|\s)+?(?=\r\n\[1\]\r\n)/),
        [movie00, movie1] = movie[0].split("[0.0]"),
        [movie01, movie2] = movie1.split(/再生位置=\d+/),
        [movie02, movie03] = movie2.split("[0.1]"),
        sound = text.match(/(?<=\[1\]\r\nstart=\d+\r\nend=\d+\r\nlayer=\d+\r\ngroup=\d+\r\n)(?:.|\s)+?(?=\r\n(?:\[2\]\r\n|$))/),
        [sound00, sound1] = sound[0].split("[1.0]"),
        [sound01, sound02] = sound1.split("[1.1]"),
        strings = [base],
        count = AupGetter.#turnIndexes.length,
        frameCountBeforeCardUsing = AupGetter.#frameCountBeforeCardUsingInputElement.valueAsNumber,
        frameCountAfterCardUsing = AupGetter.#frameCountAfterCardUsingInputElement.valueAsNumber;
      let
        currentResultFrame = 1,
        objectCount = 0;
      AupGetter.#deltaFrame = AupGetter.#deltaFrameInputElement.valueAsNumber;
      for (let i = 0; i < count;) {
        const startSourceFrame = AupGetter.#getFraneCountOfTurnIndex(i, rate, scale);
        let currentSourceFrame = startSourceFrame;
        while (1) {
          i += 1;
          if (i === count)
            break;
          const nextSourceFrame = AupGetter.#getFraneCountOfTurnIndex(i, rate, scale);
          console.log(nextSourceFrame);
          if (currentSourceFrame < nextSourceFrame - frameCountAfterCardUsing - frameCountBeforeCardUsing)
            break;
          currentSourceFrame = nextSourceFrame;
        }

        const
          header1 = `\r\nstart=${currentResultFrame}\r\nend=`,
          header3 = `\r\ngroup=${objectCount + 1}\r\n`;
        currentResultFrame += currentSourceFrame - startSourceFrame + frameCountBeforeCardUsing + frameCountAfterCardUsing;
        const header2 = `${currentResultFrame - 1}\r\nlayer=`;
        strings.push(`[${objectCount}]`, header1, header2, 1, header3, movie00, `[${objectCount}.0]`, movie01, "再生位置=", startSourceFrame, movie02, `[${objectCount}.1]`, movie03, "\r\n");
        objectCount += 1;
        strings.push(`[${objectCount}]`, header1, header2, 2, header3, sound00, `[${objectCount}.0]`, sound01, `[${objectCount}.1]`, sound02, "\r\n");
        objectCount += 1;
      }
      const output = AupGetter.#output;
      output.href = URL.createObjectURL(new Blob([strings.join("")], { type: "text/plain" }));
      output.download = 'MMRp.exo';
    }

    static #getFraneCountOfTurnIndex(turnIndex, rate, scale) {
      return Math.round((AupGetter.#turnIndexes[turnIndex]+1) / 10 * rate / scale + AupGetter.#deltaFrame);
    }

    static #turnIndexes;
    static #deltaFrame;
    static #deltaFrameInputElement = $id("delta-frame");
    static #frameCountBeforeCardUsingInputElement = $id("frame-count-before-card-using");
    static #frameCountAfterCardUsingInputElement = $id("frame-count-after-card-using");
    static #output = $id("result");
  }
});