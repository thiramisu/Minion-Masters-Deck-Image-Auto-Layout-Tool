window.addEventListener("load", () => {
  "use strict";
  class NameGetter {
    #map;
    #defaultMapLikeArray;
    constructor(defaultMapLikeArray) {
      this.#defaultMapLikeArray = defaultMapLikeArray;
    }
    get(id) {
      return this.#map?.get(id) ?? id;
    }
    load(mapLikeArray) {
      this.#map = mapLikeArray
        ? new Map([...this.#defaultMapLikeArray, ...mapLikeArray])
        : new Map(this.#defaultMapLikeArray);
    }
  }

  const CardName = new NameGetter([
    [0, "Caber Tosser"],
    [1, "Warrior"],
    [2, "Plasma Marines"],
    [3, "Grenadier"],
    [4, "Lightning Bolt"],
    [5, "Living Statue"],
    [6, "Dragon Whelp"],
    [7, "Scrat Pack"],
    [8, "Ghost Turret"],
    [9, "Fireball"],
    [10, "Boomer"],
    [11, "Swarmers"],
    [12, "Succubus"],
    [13, "Swarmer Totem"],
    [14, "Demon Warrior"],
    [15, "Cannon Roller"],
    [16, "Ghost"],
    [17, "Howling Moon"],
    [19, "Sniper Scrat"],
    [20, "Soul Stealer"],
    [21, "Bridge Shrine"],
    [22, "Assassin"],
    [23, "Blind Date"],
    [24, "Divine Warrior"],
    [25, "Scrat Horde"],
    [26, "Mana Puff"],
    [27, "Defenso Chopper"],
    [28, "Banner Man"],
    [29, "Healing Fireball"],
    [30, "Shock Rock"],
    [31, "Stun Blast"],
    [32, "Toll of the Dead"],
    [33, "Priestess"],
    [34, "Re-Boomer"],
    [35, "Troubadour"],
    [36, "Bahra the Witchwolf"],
    [37, "Laser Turret"],
    [38, "Whirly Scrat"],
    [39, "Illusory Cleaver"],
    [40, "Shars'Rakk Twins"],
    [41, "Snake Druid"],
    [42, "Brother of the Burning Fist"],
    [43, "Scrat Launcher"],
    [44, "Drone Walker"],
    [45, "Legionnaires"],
    [46, "Fergus Flagon Fighter "],
    [47, "Annihilator"],
    [48, "Stun Lancers"],
    [49, "Disruptor Puff"],
    [50, "Dragon Nest"],
    [51, "Cleaver"],
    [52, "Future Past"],
    [53, "Call To Arms"],
    [54, "Blood Imps"],
    [56, "Crossbow Dudes"],
    [57, "Black Hole"],
    [60, "Infiltration"],
    [61, "Daggerfall"],
    [62, "Bounty Sniper"],
    [63, "Blastmancer"],
    [64, "Slithering Summons"],
    [65, "Gax the World Bomb"],
    [66, "Rammer"],
    [67, "Zeppelin Bomber"],
    [68, "Beam of DOOM!"],
    [69, "Rampage"],
    [70, "Heal Puff"],
    [71, "Jadespark Watchers"],
    [72, "Scrat Tank"],
    [73, "Raging Reinforcements"],
    [74, "Wall"],
    [76, "Spiritmancer"],
    [77, "Undying Skeleton"],
    [78, "Walking Blind Date"],
    [79, "Propeller Scrats"],
    [80, "Tranquil Shi-Hou"],
    [81, "Battle Shi-Hou"],
    [83, "Chain Lightning"],
    [84, "Spear Throwers"],
    [87, "Guardian"],
    [90, "Spirit Vessel"],
    [91, "Xiao Long"],
    [93, "Bazooka Scrat"],
    [96, "Hypnotize"],
    [99, "Magma Storm"],
    [100, "Spirit Infusion"],
    [105, "Fire Imp"],
    [106, "Crakgul Doomcleaver"],
    [108, "Shielded Crossbow Dudes"],
    [111, "Prowler"],
    [112, "Elite Swarmer"],
    [113, "S.T.INT"],
    [114, "Drone Buzzers"],
    [115, "\"Armored\" Scrats"],
    [117, "Caeleth Dawnhammer"],
    [119, "Woodsman"],
    [122, "Healing Shrine"],
    [123, "Combustion"],
    [125, "Musketeer"],
    [128, "Morgrul the Swarmer King"],
    [129, "Scott The Sensitive Savage"],
    [133, "Flightless Dragons"],
    [135, "Gor'Rakk Sacrifice"],
    [138, "Bridge Buddies"],
    [139, "Cursebearer"],
    [140, "Magma Cannon"],
    [142, "Lost Legionnaires"],
    [143, "Gambler's Ball"],
    [149, "Ravenous Swarmers"],
    [158, "Screaming Scrat"],
    [161, "Future Present"],
    [162, "Netherstep"],
    [163, "Incubus"],
    [164, "Brutish Betrayer"],
    [169, "Lord Fanriel the Stormcharger"],
    [170, "Dormant Defenders"],
    [172, "A.I.M. Bot"],
    [173, "Sniper Squad"],
    [175, "Cheese Date"],
    [178, "Sun Burn"],
    [180, "Clear Skies"],
    [182, "Nyrvir's Breath"],
    [183, "Tantrum Throwers"],
    [184, "Propeller Horde"],
    [185, "Dragon Pack"],
    [186, "Crystal Archers"],
    [187, "Crystal Arcanist"],
    [188, "Arcane Bolt"],
    [191, "Crystal Sentry"],
    [192, "Akinlep's Gong of Pestilence"],
    [193, "Crystal Construct"],
    [194, "Jahun"],
    [195, "Mana Puff Madness"],
    [196, "Wheel Of Doom"],
    [197, "Nether Bat"],
    [199, "Styxi"],
    [201, "Once Bitten"],
    [202, "Bats Bats Bats!"],
    [203, "Grasping Thorns"],
    [204, "Lone Wolf"],
    [209, "Harbinger"],
    [210, "Armored Escort"],
    [211, "Last Stand"],
    [212, "Void Altar"],
    [214, "Squire Puff"],
    [215, "Gor'Rakk Gate"],
    [216, "Commander Azali"],
    [218, "Morgrul's Ragers"],
    [219, "Shadow Whelp"],
    [220, "Wreckinator 9000"],
    [221, "Stormy"],
    [222, "Shen Stormstrike"],
    [224, "Poison Strike"],
    [226, "Jungle Jumble"],
    [228, "Zap Shrine"],
    [229, "Rabid Prowler"],
    [234, "Skeleton Horde"],
    [235, "Jolo the Hero Scrat"],
    [236, "Mountainshaper"],
    [237, "Teng & Tung"],
    [238, "Lone Scout"],
    [239, "Border Patrol"],
    [240, "Haunting Hugger"],
    [241, "Lord-Sentinel Thelec"],
    [242, "Spawn of Fury"],
    [249, "Slitherbound"],
    [251, "Shieldguard Of Light"],
    [252, "Caged Prowler"],
    [253, "Shield-Captain Avea"],
    [254, "Gor'Rakk Brutes"],
    [255, "Sewer Scrat"],
    [257, "Scratillery"],
    [258, "Boom Buggy"],
    [259, "Ritual of Servitude"],
    [260, "Wizard Puff"],
    [261, "High-Mage Leiliel"],
    [262, "Leiliel's Vortex"],
    [263, "Arcane Ring"],
    [264, "Glenn's Brew"],
    [265, "AtG Drone x8"],
    [266, "Frostfeathers"],
    [267, "Empowered Soul Stealer"],
    [268, "High Inquisitor Ardera"],
    [269, "Frostfeather Flyby"],
    [270, "Mal'Shar Shadowfork"],
    [271, "Jade Flingers"],
    [272, "Ting"],
    [273, "Dragon Ball"],
    [274, "Blue Golem"],
    [275, "Brothers Of Light"],
    [276, "Colossus"],
    [277, "Smite"],
    [278, "Ardent Aegis"],
    [279, "Windwalker Shi-Hou "],
    [280, "Shen's Shock Stick"],
    [285, "Wolf Among Sheep"],
    [288, "Herald Ah'Mun"],
    [289, "Crossbow Guild"],
    [290, "Sugilite Shield"],
    [291, "Restless Dead"],
    [292, "Unholy Ground"],
    [293, "Corpse Explosion"],
    [294, "Skeleton Crew"],
    [295, "Resonating Blast Crystal"],
    [297, "Lady Infray the Spire Warden"],
    [298, "Red Golem"],
    [299, "Keeper of Jadespark"],
    [300, "Illusory Dragon Whelp"],
    [301, "Pincer of Dread"],
    [302, "Brothers Of The Void"],
    [303, "Groggy Woodsman"],
    [305, "Mountain Gale"],
    [306, "Rock Rivals"],
    [312, "Zealots of the Burning Fist"],
    [315, "Chain Gang"]
  ]);

  const MasterName = new NameGetter([
    [0, "Stormbringer"],
    [1, "Volco"],
    [2, "Mordar"],
    [3, "Ravager"],
    [4, "Ratbo"],
    [5, "King Puff"],
    [6, "Apep"],
    [7, "Settsu"],
    [8, "Milloween"],
    [10, "Diona"],
    [11, "Morellia"],
    [12, "Valorian"]
  ]);

  const GameModeName = new NameGetter([
    [0, "1v1"],
    [1, "プリメイド"],
    [2, "野良？"]
  ]);

  const
    $id = (id) => document.getElementById(id),
    $x = (number) => '0x' + number.toString(16).toUpperCase(),
    $escape = (string) => string.replace(/<.+?>/, "");

  const Replay = (arrayBuffer) => {
    const
      dataView = new DataView(arrayBuffer),
      // toUnixTime(想定してた式と違って差分から力技したので誤差あるかも)
      time = Number((BigInt(dataView.getUint32(0x037B, true)) + (BigInt(dataView.getUint32(0x037F, true)) << 32n)) / 10000n - 523304371445000n);

    return Object.freeze({
      gameMode: dataView.getUint32(findStringIndex(dataView, "CSLogic.TeamMode", 0x07A8) + 0x22, true),
      duration: dataView.getUint32(0x0372, true), // 0.1sec単位
      time,
      date: new Date(time),
      winTeamId: dataView.getUint32(0x0395, true),
      players: getPlayers(dataView, this.duration === 0),
      graphFragments: [],
      graphFragmentVisibilities: [],
      you: {},
      tBody: document.createElement("tbody")
    });
  };

  const getDeckString = (deck) => deck?.map(cardId => CardName.get(cardId)).sort().join(" / ");

  const findStringIndex = (dataView, string, startIndex = 0, count = 1) => {
    let index = startIndex;
    const viewLength = dataView.byteLength;
    const firstCharCode = string.charCodeAt(0);
    const stringLength = string.length;
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

  const findUint8ArrayIndex = (dataView, uint8Array, startIndex = 0, count = 1) => {
    let index = startIndex;
    const viewLength = dataView.byteLength;
    const firstItem = uint8Array[0];
    const arrayLength = uint8Array.length;
    let countNumber = 0;
    while (index < viewLength) {
      if (dataView.getUint8(index++) !== firstItem)
        continue;
      for (let viewIndex = index, arrayIndex = 1; arrayIndex < arrayLength; viewIndex += 1) {
        if (uint8Array[arrayIndex] !== dataView.getUint8(viewIndex))
          break;
        arrayIndex += 1;
        if (arrayIndex === arrayLength && ++countNumber === count) {
          return index - 1;
        }
      }
    }
    return -1;
  };

  const getString = (buffer, byteOffset, length) => new TextDecoder("utf-8").decode(
    new Uint8Array(buffer, byteOffset, length)
  );

  const getPlayers = (dataView) => {
    const players = [];
    const isZeroDuration = (dataView.getUint8(0x0399, true) === 0x0A);
    let targetAddress = findStringIndex(dataView, "CSLogic.PlayerData", isZeroDuration ? 0x987 : 0xA88);
    let deckAddress = 0x1500;
    let length = 0x588;
    const playerCount = dataView.getUint32(isZeroDuration ? 0x03A6 : 0x03AA, true);
    const player = {};
    for (let i = 0; i < playerCount; i += 1) {
      targetAddress += length + 0x2B;
      player.masterId = dataView.getUint32(targetAddress, true);
      targetAddress += 0x05;
      const old = deckAddress;
      deckAddress = findUint8ArrayIndex(dataView, new Uint8Array([0x0F, ...new Uint8Array(dataView.buffer, targetAddress, 4)]), deckAddress);
      console.log(`${i}:${deckAddress - old}`);
      player.deck = Array.from({ length: dataView.getUint32(deckAddress + 0x05, true) }, (_, i) => dataView.getUint32(deckAddress + 0x0A + i * 0x04, true));
      targetAddress += 0x0D;
      length = dataView.getUint8(targetAddress);
      player.name = $escape(getString(dataView.buffer, targetAddress + 1, length));
      targetAddress += length + 0x16;
      player.team = dataView.getUint32(targetAddress, true);
      targetAddress += (i === 0 ? 0x41 : 0x20);
      if (dataView.getUint8(targetAddress) === 0x0A) {
        length = 0;
        player.guildName = "";
      }
      else {
        targetAddress += 0x05;
        length = dataView.getUint8(targetAddress);
        player.guildName = getString(dataView.buffer, targetAddress + 1, length);
      }
      players.push(Player(player.name, player.guildName, player.masterId, player.deck, player.team));
    }
    return players;
  };

  const Player = (name, guildName, masterId, deck, team, rankId) => Object.freeze({ name, team, rankId, guildName, masterId, deck });

  class ReplayManager {
    static #replays;
    static #replaysCount;
    static #playerNameCounter;
    static #fileInputElement = $id("replay-directory");
    static #replayListElement = $id("replay-list");
    static #loadProggressBar = $id("progress");
    static #replayRegExp = /[.]rp$/;
    static #settingFileName = /[/]replay-analyzer.json/;
    static #yourName = "";

    static #addReplay = ((binary) => {
      const replay = Replay(binary);
      this.#replays.add(replay);
      this.#playerNameCounter.count(replay.players, "name");
    }).bind(this);

    static #init = this.#initialize();

    static #initialize() {
      this.#fileInputElement.addEventListener("change", this.#onFileChange);
    }

    static sort() {
      Array.from(this.#replays).filter(this.#filterFunc).sort(this.#sortFunc).forEach((replay) => {
        this.#replayListElement.appendChild(replay.tBody);
      });
    }

    static #filterFunc(replay) {
      for (const filter of UIManager.getFilterProperties()) {
        if (filter.test(replay)) {
          continue;
        }
        this.#replayListElement.removeChild(replay.tBody);
        return false;
      }
      return true;
    }

    static #sortFunc(replay, b) {
      for (const [propertyName, isAscend] of UIManager.sortPriorities) {
        if (propertyName === "winTeamId") {
          if (replay.you.areTheWinner === b.you.areTheWinner)
            continue;
          return ((replay.you.areTheWinner < b.you.areTheWinner) ^ isAscend) * 2 - 1;
        }
        if (replay[propertyName] === b[propertyName])
          continue;
        return ((replay[propertyName] < b[propertyName]) ^ isAscend) * 2 - 1;
      }
      return 0;
    }

    static #onFileChange(e) {
      ReplayManager.#load();
    }

    static async #load() {
      // TODO 多重ロード防止
      const resultState = $id("result").classList;
      resultState.remove("ready");
      resultState.add("loading");
      this.#replays = new Set();
      this.#replaysCount = 0;
      this.#playerNameCounter = new Counter();
      await this.#loadJson();
      // TODOここから
      CardName.load();
      MasterName.load();
      GameModeName.load();
      // TODOここまで
      const promises = [];
      for (const file of this.#fileInputElement.files) {
        const path = file.webkitRelativePath;
        if (!this.#replayRegExp.test(path)) {
          continue;
        }
        this.#replaysCount += 1;
        // ローカルファイルでもstreamで開くと早くなるのか謎なので保留
        //file.stream().then();
        promises.push(file.arrayBuffer().then(this.#addReplay));
      }
      await Promise.all(promises);
      this.#yourName = this.#playerNameCounter.max();
      UIManager.setFilterValue(this.#yourName, "name");
      for (const replay of this.#replays) {
        const you = replay.players.find((player) => player.name === this.#yourName);
        replay.you.exist = you !== undefined;
        replay.you.areTheWinner = (replay.winTeamId === you?.team ?? 0);
        this.#createTBody(replay);
      }
      this.sort();
      resultState.remove("loading");
      resultState.add("ready");
      console.log(`${this.#replaysCount}試合のリプレイの読み込みが完了しました`);
    }

    static async #loadJson() {
      for (const file of this.#fileInputElement.files) {
        if (!this.#settingFileName.test(file.webkitRelativePath))
          continue;
        const json = await file.text();
        JsonReader.read(json);
        console.log("json読み込み終了");
        break;
      }
    }

    static #createTBody(replay) {
      const
        tBody = replay.tBody,
        isTeamBattle = replay.players.length === 4,
        seconds = ((BigInt(replay.duration) % 600n) / 10n).toString(),
        durationString = `${BigInt(replay.duration) / 600n}:${"0".repeat(2 - seconds.length)}${seconds}`,
        you = replay.players.find((player) => player.name === this.#yourName),
        isWinner = replay.winTeamId === (you?.team ?? 0),
        players = (you === undefined) ? replay.players : replay.players.sort((player1, player2) =>
          //        player1 === you ? -1 : player2 === you ? 1 : player1.team === you.team ? 1 
          player1 === you ? -1 : player1.team === you.team ? -1 : 0
        );

      tBody.className = `detail-table--tbody all-table--tbody ${isTeamBattle ? "team-battle" : "solo-battle"} ${isWinner ? "win" : "lose"}`;
      tBody.innerHTML = `<tr${players[0] === you ? ' class="you"' : ""}>
            <td rowspan="4">${new Intl.DateTimeFormat([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(replay.date)}</td>
            <td rowspan="4">${durationString.length <= 4 ? '<span class="spacer0">0</span>' : ""}${durationString}</td>
            <td rowspan="4">${GameModeName.get(replay.gameMode)}</td>
            <td rowspan="4">${isWinner ? "勝ち" : "負け"}</td>
            <td${players[0]?.name ? "" : ' class="invalid"'}>${players[0]?.name}</td>
            <td>${MasterName.get(players[0]?.masterId)}</td>
            <td>${getDeckString(players[0]?.deck) ?? "エラーなし"}</td>
          </tr>
          <tr>
            <td${players[1]?.name ? "" : ' class="invalid"'}>${players[1]?.name}</td>
            <td>${MasterName.get(players[1]?.masterId)}</td>
            <td>${getDeckString(players[1]?.deck) ?? "エラーなし"}</td>
          </tr>${isTeamBattle ? `
          <tr>
            <td${players[2]?.name ? "" : ' class="invalid"'}>${players[2]?.name}</td>
            <td>${MasterName.get(players[2]?.masterId)}</td>
            <td>${getDeckString(players[2]?.deck) ?? "エラーなし"}</td>
          </tr>
          <tr>
            <td${players[3]?.name ? "" : ' class="invalid"'}>${players[3]?.name}</td>
            <td>${MasterName.get(players[3]?.masterId)}</td>
            <td>${getDeckString(players[3]?.deck) ?? "エラーなし"}</td>
          </tr>` : ""}`;
    }
  }

  class Counter {
    #counter = new Map();

    count(array, propertyName) {
      for (const value of array) {
        const name = propertyName ? value[propertyName] : value;
        this.#counter.set(name, (this.#counter.get(name) ?? -1) + 1);
      }
    }

    max() {
      let max = 0;
      let target;
      for (const count of this.#counter) {
        if (max > count[1])
          continue;
        max = count[1];
        target = count;
      }
      return target[0];
    }
  }

  class SortPropertyStack {
    #map;
    #arrayCache;
    #lastPropertyName;
    constructor(array) {
      this.#map = new Map(array);
      this.#arrayCache = [...this.#map.entries()].reverse();
      this.#lastPropertyName = this.#arrayCache[0] ? this.#arrayCache[0][0] : undefined;
    }
    set(propertyName) {
      // 連続で2回選択した時のみ昇順に
      const isAscend = (this.#lastPropertyName === propertyName) && !this.#map.get(propertyName);
      this.#map.delete(propertyName);
      this.#map.set(propertyName, isAscend);
      this.#arrayCache = [...this.#map.entries()].reverse();
      this.#lastPropertyName = propertyName;
    }
    [Symbol.iterator]() {
      return this.#arrayCache.values();
    }
  }

  class UIManager {
    static #filterProperties = new Map();
    static #sortProperties = new SortPropertyStack([["time", false]]);
    static get sortPriorities() {
      return this.#sortProperties;
    }

    static #filterElementOf = {
      name: $id("filter-your-name"),/*
      players: new Set(),
      playerAdditionButton: $id("filter-player-add"),
      cards: new Set(),
      cardAdditionButton: $id("filter-card-add"),
      duration: {
        greaterThan: {
          min: $id("filter-gt-mins"),
          sec: $id("filter-gt-secs")
        },
        lessThan: {
          min: $id("filter-gt-mins"),
          sec: $id("filter-gt-secs")
        }
      },
      date: {
        begin: {
          date: $id("filter-begin-date"),
          time: $id("filter-begin-time")
        },
        end: {
          date: $id("filter-end-date"),
          time: $id("filter-end-time")
        }
      },
      playerNameList: $id("player-name"),
      cardList: $id("card-name"),*/
      sorter: $id("replay-sorter")
    };
    //static #filterOptionTemplate = $id("filter-option");
    static #init = this.#initialize();

    static #initialize() {
      this.#filterElementOf.sorter.addEventListener("click", (e) => {
        const propertyName = e.target.dataset.sort;
        if (propertyName === undefined)
          return;
        this.#sortProperties.set(propertyName);
        ReplayManager.sort();
      });
    }

    static #onTextInputDoubleClick(e) {
      e.target.value = "";
    }

    static addFilterOption() {

    }

    static #getWinsString(winsCount, losesCount) {
      return (winsCount === 0 && losesCount === 0) ? "該当なし" : `${winsCount} 勝${losesCount} 敗`
    }

    static getFilterProperties() {
      return this.#filterProperties;
    }

    static setFilterValue(value, propertyName) {
      this.#filterElementOf[propertyName].value = value;
    }
  }
/*
  class Graph {
    static #element = $id("graph");
    static #fragmentTemplate = $id("template--graph-fragment");
    static #init = this.#initialize();

    static #initialize() {
      this.#fragmentTemplate.removeAttribute("id");
    }

    static #add(replay) {
      const dataset = this.#fragmentTemplate.dataset;
      dataset.master = replay.players.map((player) => MasterName.get(player.masterId)).join("/");
    }
  }
*/
  class JsonReader {
    static read(additionalJSON) {
      return;
      let object;
      try {
        object = JSON.parse(additionalJSON);
      }
      finally {
        CardName.load(object?.cardNames);
        MasterName.load(object?.masterNames);
        GameModeName.load(object?.gameModeNames);
      }
    }
  }
});