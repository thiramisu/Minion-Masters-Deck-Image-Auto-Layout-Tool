window.addEventListener("load", () => {
  "use strict";
  const $id = (id) => document.getElementById(id);

  class CardManager {
    static #cidElement = $id("cid");
    static #cdElement = $id("cd");
    static #outputElement = $id("output");
    static #cardCountElement = $id("card-count");
    static #defaultJSONElement = $id("default-json");
    static #cards = this.#load();

    static #load() {
      this.#cidElement.addEventListener("change", this.#onChange);
      this.#cdElement.addEventListener("change", this.#onChange);
      this.#defaultJSONElement.addEventListener("change", this.#onChange);
      this.#outputElement.addEventListener("click", function () { this.select(); });
      // ページロード時のデモ用
      setTimeout(this.#onChange, 1);
      return null;
    }

    static #onChange(e) {
      CardManager.#registerCards();
      CardManager.#output();
    }

    static #registerCards() {
      this.#cards = this.#defaultJSONElement.value ? new Map(JSON.parse(this.#defaultJSONElement.value)) : new Map();
      try {
        const namesIterator = this.#cdElement.value.split("\n").flatMap((strings) => {
          const names = strings.split(", ");
          names[0] = names[0]?.match(/^.+?[:] (.+)/)[1];
          return names;
        }).values();
        const ids = this.#cidElement.value.split("\n").flatMap((strings) => {
          const ids = strings.split(" ");
          ids.shift();
          return ids;
        });
        for (const id of ids) {
          this.#cards.set(parseInt(id), namesIterator.next().value);
        }
        if (namesIterator.next().done !== true) {
          alert("カード名にカンマが含まれているなどの理由で、idと名前の数が一致しなかったため、処理が正常に終了しませんでした(入力中にも関わらずこれが出る場合、カードIDのほうから入力してみてください)");
        }
      }
      catch (e) {
        console.log(e);
      }
    }

    static #output() {
      //      this.#outputElement.textContent = Array.from(this.#cards).sort(this.#cardComparer).map().join(",\n");
      console.log("output");
      this.#cardCountElement.textContent = this.#cards.size;
      this.#outputElement.textContent = JSON.stringify(Array.from(this.#cards).sort(this.#cardComparer)).replace(/^\[\[/, "[\n[").replace(/\]\]$/, "]\n]").replace(/\],\[/g, "],\n[");
    }

    static #cardComparer(a, b) {
      return a[0] - b[0];
    }

    static escapeString(string) {
      return string.replace('"', "&quot;");
    }
  }
});