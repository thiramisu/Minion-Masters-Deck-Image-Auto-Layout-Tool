window.addEventListener("load", () => {
  "use strict";
  const Const = Object.freeze({
    EMPTY_STRING: Object.freeze(""),
    EMPTY_ARRAY: Object.freeze([]),
    EMPTY_OBJECT: Object.freeze({}),
    LOCALE_FORMAT: Object.freeze({
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }),
    TEAM_BATTLE_CLASS_NAME: "team-battle",
    SOLO_BATTLE_CLASS_NAME: "solo-battle",
    WIN_BATTLE_CLASS_NAME: "win",
    LOSE_BATTLE_CLASS_NAME: "lose",
    WIN_STRING: "勝ち",
    LOSE_STRING: "負け",
    SORT_PRIOR_PROPERTY_NAME: "winTeamId",
    YOU_EXIST_CLASS: ' class="you"',
    ADJACENT_POSITION: "beforeend",
    INVISIBLE_ZERO: '<span class="spacer0">0</span>',
    TEXT_ENCODE: "utf-8",
    CSLogic_PlayerData: "CSLogic.PlayerData",
    CSLogic_TeamMode: "CSLogic.TeamMode"
  });

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
    [2, "野良？"],
    // 未実装
    [3, "NPC"]
  ]);

  const
    $id = (id) => document.getElementById(id),
    $x = (number) => '0x' + number.toString(16).toUpperCase(),
    $escapeRegExp = new RegExp(/<.+?>/),
    $escape = (string) => string.replace($escapeRegExp, Const.EMPTY_STRING),
    $sleep = (sec) => new Promise((resolve) => setTimeout(resolve, sec * 1000)),
    // 長い処理の前にUIを更新したい場合、UIの更新前と処理の前に await $applicationOfUi();
    $applicationOfUi = (async () => {
      await new Promise(requestAnimationFrame);
      // await Promise.resolve()じゃダメっぽいが、理解できてない
      await $sleep(0);
    });

  const Replay = (arrayBuffer) => {
    const
      dataView = new DataView(arrayBuffer),
      gameMode = dataView.getUint32(findStringIndex(dataView, Const.CSLogic_TeamMode, 0x07A8) + 0x22, true),
      // toUnixTime(想定してた式と違って差分から力技したので誤差あるかも)
      time = Number((BigInt(dataView.getUint32(0x037B, true)) + (BigInt(dataView.getUint32(0x037F, true)) << 32n)) / 10000n - 523304371445000n);

    return Object.freeze({
      gameMode,
      gameMode_f: 1 << gameMode,
      duration: dataView.getUint32(0x0372, true), // 0.1sec単位
      time,
      date: new Date(time),
      winTeamId: dataView.getUint32(0x0395, true),
      players: getPlayers(dataView, this.duration === 0),
      graphFragments: [],
      graphFragmentVisibilities: [],
      // 後から追加するもの
      you: {},
      tBody: document.createElement("tbody")
    });
  };

  const getDeckString = (deck) => deck?.map(cardId => CardName.get(cardId)).sort().join(' <span class="unmarkable">/</span> ');

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

  const getString = (buffer, byteOffset, length) => new TextDecoder(Const.TEXT_ENCODE).decode(
    new Uint8Array(buffer, byteOffset, length)
  );

  const getPlayers = (dataView) => {
    const players = [];
    const isZeroDuration = (dataView.getUint8(0x0399, true) === 0x0A);
    let targetAddress = findStringIndex(dataView, Const.CSLogic_PlayerData, isZeroDuration ? 0x987 : 0xA88);
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
        player.guildName = null;
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
    static sort = (async () => {
      if (this.#isSorting)
        return;
      this.#isSorting = true;
      ReplayTable.setReady(false);
      await $applicationOfUi();
      UIManager.constructFilterProperties();
      await Promise.all([new Promise(this.#sort), $sleep(0.1)]);
      ReplayTable.setReady(true);
      this.#isSorting = false;
    }).bind(this);


    static #replays;
    static #replaysCount;
    static #playerNameCounter;
    static #fileInputElement = $id("replay-directory");
    static #loadProggressBar = $id("progress");
    static #isSorting = false;
    static #isLoading = false;
    static #replayRegExp = /[.]rp$/;
    static #settingFileName = /[/]replay-analyzer.json/;
    static #yourName = Const.EMPTY_STRING;

    static #addReplay = ((binary) => {
      const replay = Replay(binary);
      this.#replays.add(replay);
      this.#playerNameCounter.count(replay.players, "name");
    }).bind(this);

    static #sort = ((resolve) => {
      Array.from(this.#replays)
        .filter(this.#filterFunc)
        .sort(this.#sortFunc)
        .forEach(ReplayTable.addReplay);
      resolve();
    }).bind(this);

    static #filterFunc = ((replay) => {
      for (const filterProperty of UIManager.filterProperties) {
        if (filterProperty.test(replay)) {
          continue;
        }
        replay.tBody.hidden = true;
        return false;
      }
      replay.tBody.hidden = false;
      return true;
    }).bind(this);

    static #init = this.#initialize();

    static #initialize() {
      this.#fileInputElement.addEventListener("change", this.#onFileChange);
    }

    static #sortFunc(replay, b) {
      for (const [propertyName, isAscend] of UIManager.sortPriorities) {
        if (propertyName === Const.SORT_PRIOR_PROPERTY_NAME) {
          if (replay.you.exists !== b.you.exists) {
            return (b.you.exists ^ isAscend) * 2 - 1;
          }
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
      if (this.#isLoading)
        return;
      this.#isLoading = true;
      ResultDiv.setReady(false);
      await $applicationOfUi();
      CountUpTimer.start(true);
      this.#replays = new Set();
      this.#replaysCount = 0;
      this.#playerNameCounter = new Counter();
      await this.#loadJson();
      // TODOここから
      CardName.load();
      MasterName.load();
      GameModeName.load();
      // TODOここまで
      const promises = new Set();
      CountUpTimer.lap();
      for (const file of this.#fileInputElement.files) {
        const path = file.webkitRelativePath;
        if (!this.#replayRegExp.test(path)) {
          continue;
        }
        this.#replaysCount += 1;
        // ローカルファイルでもstreamで開くと早くなるのか謎なので保留
        //file.stream().then();
        promises.add(file.arrayBuffer().then(this.#addReplay));
      }
      if (this.#replaysCount === 0) {
        ResultDiv.initializeReady();
        this.#isLoading = false;
        alert("選択フォルダ内にリプレイファイルが存在しませんでした。");
        return;
      }
      promises.add(ReplayTable.clear());
      CountUpTimer.lap();
      await Promise.all(promises);
      CountUpTimer.lap();
      this.#yourName = this.#playerNameCounter.max();
      UIManager.setFilterValue(this.#yourName, "name");
      for (const replay of this.#replays) {
        const you = replay.players.find((player) => player.name === this.#yourName);
        replay.you.exists = you !== undefined;
        replay.you.areTheWinner = (replay.winTeamId === you?.team ?? 0);
        this.#createTBody(replay);
      }
      await this.sort();
      ResultDiv.setReady(true);
      console.log(`${this.#replaysCount}試合のリプレイの読み込みが完了しました`);
      CountUpTimer.lap();
      this.#isLoading = false;
    }

    static async #loadJson() {
      // .find()未対応のため
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
        players = (you === undefined) ? replay.players : replay.players.sort((player1, _player2) =>
          player1 === you ? -1 : player1.team === you.team ? -1 : 0
        );

      tBody.className = `detail-table--tbody all-table--tbody ${isTeamBattle ? Const.TEAM_BATTLE_CLASS_NAME : Const.SOLO_BATTLE_CLASS_NAME} ${isWinner ? Const.WIN_BATTLE_CLASS_NAME : Const.LOSE_BATTLE_CLASS_NAME}`;
      tBody.insertAdjacentHTML(Const.ADJACENT_POSITION, `<tr${players[0] === you ? Const.YOU_EXIST_CLASS : Const.EMPTY_STRING}>
            <td rowspan="4">${new Intl.DateTimeFormat(Const.EMPTY_ARRAY, Const.LOCALE_FORMAT).format(replay.date)}</td>
            <td rowspan="4">${durationString.length <= 4 ? Const.INVISIBLE_ZERO : Const.EMPTY_STRING}${durationString}</td>
            <td rowspan="4">${GameModeName.get(replay.gameMode)}</td>
            <td rowspan="4">${(you === undefined) ? Const.EMPTY_STRING : isWinner ? Const.WIN_STRING : Const.LOSE_STRING}</td>
            <td${players[0]?.name ? Const.EMPTY_STRING : ' class="invalid"'}>${players[0]?.name}</td>
            <td>${MasterName.get(players[0]?.masterId)}</td>
            <td>${getDeckString(players[0]?.deck) ?? "エラーなし"}</td>
          </tr>
          <tr>
            <td${players[1]?.name ? Const.EMPTY_STRING : ' class="invalid"'}>${players[1]?.name}</td>
            <td>${MasterName.get(players[1]?.masterId)}</td>
            <td>${getDeckString(players[1]?.deck) ?? "エラーなし"}</td>
          </tr>${isTeamBattle ? `
          <tr>
            <td${players[2]?.name ? Const.EMPTY_STRING : ' class="invalid"'}>${players[2]?.name}</td>
            <td>${MasterName.get(players[2]?.masterId)}</td>
            <td>${getDeckString(players[2]?.deck) ?? "エラーなし"}</td>
          </tr>
          <tr>
            <td${players[3]?.name ? Const.EMPTY_STRING : ' class="invalid"'}>${players[3]?.name}</td>
            <td>${MasterName.get(players[3]?.masterId)}</td>
            <td>${getDeckString(players[3]?.deck) ?? "エラーなし"}</td>
          </tr>` : Const.EMPTY_STRING}`);
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
    static #filterProperties = new Set();
    static get filterProperties() {
      return this.#filterProperties;
    }

    static #sortProperties = new SortPropertyStack([["time", false]]);
    static get sortPriorities() {
      return this.#sortProperties;
    }

    static #filterElementOf = {
      filter: document.filter,
      name: filter.yourName,
      you: filter.you,
      gameMode1v1: filter.gameMode1v1,
      gameMode2v2: filter.gameMode2v2,
      gameModePremade: filter.gameModePremade,
      gameModeNPC: filter.gameModeNPC,/*
      players: new Set(),
      playerNameList: $id("player-name"),
      playerAdditionButton: $id("filter-player-add"),
      cards: new Set(),
      cardList: $id("card-name"),
      cardAdditionButton: $id("filter-card-add"),*/
      durationGreaterThanMin: filter.gtMins,
      durationGreaterThanSec: filter.gtSecs,
      durationLessThanMin: filter.ltMins,
      durationLessThanSec: filter.ltSecs,
      fromDate: filter.fromDate,
      fromTime: filter.fromTime,
      toDate: filter.toDate,
      toTime: filter.toTime,
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
      for (const radio of this.#filterElementOf.you)
        radio.addEventListener("change", ReplayManager.sort);
      for (const textInputName of [
        "name",
        "durationGreaterThanMin",
        "durationGreaterThanSec",
        "durationLessThanMin",
        "durationLessThanSec",
        "fromDate",
        "fromTime",
        "toDate",
        "toTime"
      ]) {
        const element = this.#filterElementOf[textInputName];
        element.dataset.defaultValue = element.value ?? "";
        element.addEventListener("change", ReplayManager.sort);
        element.addEventListener("click", this.#select);
        element.addEventListener("dblclick", this.#onTextInputDoubleClick);
      }
      for (const gameModeCheckboxName of [
        "gameMode1v1",
        "gameMode2v2",
        "gameModePremade",
        "gameModeNPC"
      ]) {
        this.#filterElementOf[gameModeCheckboxName].addEventListener("change", ReplayManager.sort);
      }
    }

    static #select(e) {
      e.target.select();
    }

    static #onTextInputDoubleClick(e) {
      const target = e.target;
      target.value = target.dataset.defaultValue;
    }

    static #getWinsString(winsCount, losesCount) {
      return (winsCount === 0 && losesCount === 0) ? "該当なし" : `${winsCount} 勝${losesCount} 敗`
    }

    static constructFilterProperties() {
      this.#filterProperties = new Set();
      let element = this.#filterElementOf.you;
      if (element.value !== "any")
        this.#filterProperties.add(new FilterProperty(element.value === "include", FilterProperty.Mode.Same, "you", "exists"));
      let
        sec = this.#filterElementOf.durationGreaterThanSec.valueAsNumber,
        min = this.#filterElementOf.durationGreaterThanMin.valueAsNumber;
      if (min !== 0 || sec !== 0)
        this.#filterProperties.add(new FilterProperty(min * 600 + sec * 10, FilterProperty.Mode.GreaterThanOrEqual, "duration"));
      sec = this.#filterElementOf.durationLessThanSec.valueAsNumber;
      min = this.#filterElementOf.durationLessThanMin.valueAsNumber;
      if (min !== 99 || sec !== 59)
        this.#filterProperties.add(new FilterProperty(min * 600 + sec * 10 + 9, FilterProperty.Mode.LessThanOrEqual, "duration"));
      let
        date = this.#filterElementOf.fromDate.valueAsNumber;
      if (!Number.isNaN(date)) {
        const time = this.#filterElementOf.fromTime.valueAsNumber;
        const dateAsUTC = new Date(date + (Number.isNaN(time) ? 0 : time));
        this.#filterProperties.add(new FilterProperty(dateAsUTC.getTime() + dateAsUTC.getTimezoneOffset() * 60000, FilterProperty.Mode.GreaterThanOrEqual, "time"));
      }
      date = this.#filterElementOf.toDate.valueAsNumber;
      if (!Number.isNaN(date)) {
        const time = this.#filterElementOf.toTime.valueAsNumber;
        const dateAsUTC = new Date(date + (Number.isNaN(time) ? 86400000 : time));
        this.#filterProperties.add(new FilterProperty(dateAsUTC.getTime() + dateAsUTC.getTimezoneOffset() * 60000 + 60000, FilterProperty.Mode.LessThanOrEqual, "time"));
      }
      const gameMode_f = (this.#filterElementOf.gameMode1v1.checked << 0)
        + (this.#filterElementOf.gameModePremade.checked << 1)
        + (this.#filterElementOf.gameMode2v2.checked << 2)
        + (this.#filterElementOf.gameModeNPC << 3);
      if (gameMode_f !== 0 && gameMode_f !== 0b1111)
        this.#filterProperties.add(new FilterProperty(gameMode_f, FilterProperty.Mode.BinaryFlag, "gameMode_f"));
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

  class ResultDiv {
    static #element = $id("result");
    static #classList = this.#element.classList;
    static #readyClassName = "ready";
    static #loadingClassName = "loading";

    static setReady(isReady) {
      if (isReady) {
        this.#classList.remove(this.#loadingClassName);
        this.#classList.add(this.#readyClassName);
      }
      else {
        this.#classList.remove(this.#readyClassName);
        this.#classList.add(this.#loadingClassName);
      }
    }

    static initializeReady() {
      this.#classList.remove(this.#loadingClassName);
      this.#classList.remove(this.#readyClassName);
    }
  }

  class ReplayTable {
    static #element = $id("replay-list");
    static #classList = this.#element.classList;

    static addReplay = ((replay) => {
      // TODO ソートだけの場合はflex-orderのほうがはやいかも
      this.#element.appendChild(replay.tBody);
    }).bind(this);

    static setReady(isReady) {
      if (isReady)
        this.#classList.add("detail-table--ready");
      else
        this.#classList.remove("detail-table--ready");
    }

    static async clear() {
      for (const tBody of this.#element.tBodies) {
        this.#element.removeChild(tBody);
      }
    }
  }

  class FilterProperty {
    static Mode = Object.freeze({
      Same: Symbol("Same Mode"),
      Different: Symbol("Different Mode"),
      Included: Symbol("Included Mode"),
      Excluded: Symbol("Excluded Mode"),
      GreaterThanOrEqual: Symbol("GreaterThanOrEqual Mode"),
      LessThanOrEqual: Symbol("LessThanOrEqual Mode"),
      BinaryFlag: Symbol("BinaryFlag Mode")
    });

    #names;
    #value;
    #comparer;
    #inverted = 0;

    constructor(value, mode, ...names) {
      this.#names = names;
      this.#value = value;
      switch (mode) {
        case FilterProperty.Mode.Same:
          this.#comparer = this.#same;
          break;
        case FilterProperty.Mode.GreaterThanOrEqual:
          this.#comparer = this.#lessThan;
          this.#inverted = 1;
          break;
        case FilterProperty.Mode.LessThanOrEqual:
          this.#comparer = this.#greaterThan;
          this.#inverted = 1;
          break;
        case FilterProperty.Mode.BinaryFlag:
          this.#comparer = this.#binaryFlag;
          break;
        case FilterProperty.Mode.Included:
        case FilterProperty.Mode.Excluded:
        default:
          throw `mode is not defined`;
      }
      console.log(value);
    }

    test(replayValue) {
      for (const name of this.#names)
        replayValue = replayValue[name];
      return (this.#comparer(replayValue) ? 1 : 0) ^ this.#inverted;
    }

    #same(value) {
      return value === this.#value;
    }
    #greaterThan(value) {
      return value > this.#value;
    }
    #lessThan(value) {
      return value < this.#value;
    }
    #binaryFlag(value) {
      return value & this.#value;
    }
  }

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

  // for debug
  class CountUpTimer {
    #start;
    constructor(isLogRemained) {
      if (isLogRemained)
        console.log(`start timer`);
      this.#start = Date.now();
    }
    lap() {
      console.log(`${(Date.now() - this.#start) / 1000}sec`);
      this.#start = Date.now();
    }

    static #globalTimer;
    static start(isLogRemained) {
      this.#globalTimer = new CountUpTimer(isLogRemained);
    }
    static lap() {
      this.#globalTimer?.lap();
    }
  }
});