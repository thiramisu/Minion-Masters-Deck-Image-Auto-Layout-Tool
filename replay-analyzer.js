window.addEventListener("load", () => {
  "use strict";
  const
    Const = Object.freeze({
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
      WIN_STRING: "勝ち",
      LOSE_STRING: "負け",
      SORT_PRIOR_PROPERTY_NAME: "winTeamId",
      YOU_EXIST_CLASS_NAME: "you",
      ALLY_CLASS_NAME: "ally",
      SECOND_ALLY_CLASS_NAME: "second-ally",
      ADJACENT_POSITION: "beforeend",
      INVISIBLE_ZERO: '<span class="spacer0">0</span>',
      TEXT_ENCODE: "utf-8",
      CSLogic_PlayerData: "CSLogic.PlayerData",
      CSLogic_TeamMode: "CSLogic.TeamMode",
      T_BODY_TAG_NAME: "tbody",
      CARD_SEPARATOR: ' <span class="unmarkable">/</span> ',
      ESCAPE_REGEXP: new RegExp(/<.+?(?:>|$)/, "g"),
      CHANGE_EVENT: new Event("change")
    }),
    $id = (id) => document.getElementById(id),
    $x = (number) => '0x' + number.toString(16).toUpperCase(),
    $escape = (string) => string.replace(Const.ESCAPE_REGEXP, Const.EMPTY_STRING),
    $sleep = (sec) => new Promise((resolve) => setTimeout(resolve, sec * 1000)),
    // 長い処理の前にUIを更新したい場合、UIの更新前と処理の前に await $applicationOfUi();
    $applicationOfUi = (async () => {
      await new Promise(requestAnimationFrame);
      // await Promise.resolve()じゃダメっぽいが、理解できてない
      await $sleep(0);
    });

  class NameGetter {
    #map;
    #defaultMapLikeArray;
    #dataList;
    constructor(dataList, defaultMapLikeArray) {
      this.#dataList = dataList;
      this.#defaultMapLikeArray = defaultMapLikeArray;
      this.boundGet = this.get.bind(this);
    }
    get(id) {
      return this.#map?.get(id) ?? id;
    }
    load(mapLikeArray) {
      this.#map = mapLikeArray
        ? new Map([...this.#defaultMapLikeArray, ...mapLikeArray])
        : new Map(this.#defaultMapLikeArray);
      if (this.#dataList)
        this.#applyToDataList();
    }
    #applyToDataList() {
      this.#dataList.innerHTML = '<option value="' + Array.from(this.#map.values()).sort().join('"><option value="') + '">';
    }
  }

  const CardName = new NameGetter($id("card-names"), [
    [0, "Cleaver"],
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
    [17, "Last Stand"],
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
    [32, "Wizard Puff"],
    [33, "Priestess"],
    [34, "Re-Boomer"],
    [35, "Colossus"],
    [36, "Beam of DOOM!"],
    [37, "Laser Turret"],
    [38, "Whirly Scrat"],
    [39, "Illusory Cleaver"],
    [40, "Troubadour"],
    [41, "Snake Druid"],
    [42, "Dragon Pack"],
    [43, "Scrat Launcher"],
    [44, "Drone Walker"],
    [45, "Legionnaires"],
    [46, "Harbinger"],
    [47, "Annihilator"],
    [48, "Stun Lancers"],
    [49, "Disruptor Puff"],
    [50, "Dragon Nest"],
    [51, "Crossbow Guild"],
    [52, "Future Past"],
    [53, "Call To Arms"],
    [54, "Blood Imps"],
    [56, "Crossbow Dudes"],
    [57, "Black Hole"],
    [60, "Infiltration"],
    [61, "Daggerfall"],
    [62, "Bounty Sniper"],
    [63, "Blastmancer"],
    [64, "Styxi"],
    [65, "Gax the World Bomb"],
    [66, "Rammer"],
    [67, "Zeppelin Bomber"],
    [68, "Blue Golem"],
    [69, "Rampage"],
    [70, "Heal Puff"],
    [71, "Red Golem"],
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
    [106, "Future Present"],
    [108, "Shielded Crossbow Dudes"],
    [111, "Prowler"],
    [112, "Elite Swarmer"],
    [113, "S.T.INT"],
    [114, "Drone Buzzers"],
    [115, "\"Armored\" Scrats"],
    [117, "Commander Azali"],
    [119, "AtG Drone x8"],
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
    [161, "Gor'Rakk Brutes"],
    [162, "Netherstep"],
    [163, "Incubus"],
    [164, "Brutish Betrayer"],
    [169, "Shars'Rakk Twins"],
    [170, "Dragon Ball"],
    [172, "A.I.M. Bot"],
    [173, "Sniper Squad"],
    [175, "Cheese Date"],
    [178, "Sun Burn"],
    [180, "Clear Skies"],
    [182, "Rabid Prowler"],
    [183, "Tantrum Throwers"],
    [184, "Propeller Horde"],
    [185, "Empowered Soul Stealer"],
    [186, "Crystal Archers"],
    [187, "Crystal Arcanist"],
    [188, "Arcane Bolt"],
    [191, "Crystal Sentry"],
    [192, "Armored Escort"],
    [193, "Crystal Construct"],
    [194, "Lord-Sentinel Thelec"],
    [195, "Mana Puff Madness"],
    [196, "Wheel Of Doom"],
    [197, "Nether Bat"],
    [199, "Wolf Among Sheep"],
    [201, "Once Bitten"],
    [202, "Bats Bats Bats!"],
    [203, "Grasping Thorns"],
    [204, "Lone Wolf"],
    [209, "Howling Moon"],
    [210, "Bahra the Witchwolf"],
    [211, "Shieldguard Of Light"],
    [212, "Brothers Of Light"],
    [214, "Squire Puff"],
    [215, "Gor'Rakk Gate"],
    [216, "Crakgul Doomcleaver"],
    [218, "Morgrul's Ragers"],
    [219, "Shadow Whelp"],
    [220, "Caeleth Dawnhammer"],
    [221, "Stormy"],
    [222, "Shen Stormstrike"],
    [224, "Poison Strike"],
    [226, "Jungle Jumble"],
    [228, "Zap Shrine"],
    [229, "Rock Rivals"],
    [234, "Skeleton Horde"],
    [235, "Jolo the Hero Scrat"],
    [236, "Nyrvir's Breath"],
    [237, "Toll of the Dead"],
    [238, "Lone Scout"],
    [239, "Border Patrol"],
    [240, "Haunting Hugger"],
    [241, "Nyrvir the Fallen"],
    [242, "Spawn of Fury"],
    [249, "Slitherbound"],
    [251, "Wreckinator 9000"],
    [252, "Caged Prowler"],
    [253, "Slithering Summons"],
    [254, "Herald Ah'Mun"],
    [255, "Sewer Scrat"],
    [257, "Scratillery"],
    [258, "Boom Buggy"],
    [259, "Ritual of Servitude"],
    [260, "Woodsman"],
    [261, "High-Mage Leiliel"],
    [262, "Leiliel's Vortex"],
    [263, "Arcane Ring"],
    [264, "Glenn's Brew"],
    [265, "Caber Tosser"],
    [266, "Frostfeathers"],
    [267, "Fergus Flagon Fighter "],
    [268, "Mountainshaper"],
    [269, "Frostfeather Flyby"],
    [270, "Mal'Shar Shadowfork"],
    [271, "Jade Flingers"],
    [272, "Ting, Teng & Tung"],
    [273, "High Inquisitor Ardera"],
    [274, "Brother of the Burning Fist"],
    [275, "Jahun, Keeper of Jadespark"],
    [276, "Jadespark Watchers"],
    [277, "Smite"],
    [278, "Ardent Aegis"],
    [279, "Windwalker Shi-Hou "],
    [280, "Shen's Shock Stick"],
    [285, "Zealots of the Burning Fist"],
    [288, "Lord Fanriel the Stormcharger"],
    [289, "Dormant Defenders"],
    [290, "Sugilite Shield"],
    [291, "Restless Dead"],
    [292, "Unholy Ground"],
    [293, "Corpse Explosion"],
    [294, "Skeleton Crew"],
    [295, "Resonating Blast Crystal"],
    [297, "Lady Infray the Spire Warden"],
    [298, "Void Altar"],
    [299, "Mar'Dred, Prince of Nightmares"],
    [300, "Illusory Dragon Whelp"],
    [301, "Pincer of Dread"],
    [302, "Brothers Of The Void"],
    [303, "Groggy Woodsman"],
    [305, "Mountain Gale"],
    [306, "Shield-Captain Avea"],
    [308, "Rockin' Roller"],
    [309, "Lash of Ah'Mun"],
    [310, "Shroom Puff"],
    [312, "Akinlep's Gong of Pestilence"],
    [314, "Jing Long"],
    [315, "Chain Gang"]
  ]
  );

  const MasterName = new NameGetter($id("master-names"), [
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

  const GameModeName = new NameGetter(null, [
    [0, "1v1"],
    [1, "2v2"],
    // 未実装
    [2, "野良？"],
    [3, "NPC"]
  ]);


  const RankName = class {
    static #rankNames = ["Master", "Diamond", "Platinum", "Gold", "Silver", "Bronze", "Stone", "Wood"];
    static #grandMaster = "GM";
    static #contender = "Contender";

    static get(rankId, rating) {
      switch (rankId) {
        case 0:
          return `${this.#grandMaster} #${rating}`;
        case 4294967295:
          return `${this.#contender} #${rating}`;
        default:
          const rankId2 = rankId - 1;
          return `${this.#rankNames[Math.trunc(rankId2 / 5)]}${rankId2 % 5 + 1}`;
      }
    }
  };

  // [1, 2] != [1, 2] とならないようにする
  class ArrayPool {
    #arrayPool = new Map();

    get(array) {
      let pool = this.#arrayPool;
      for (const item of array) {
        pool = this.#getOrCreate(pool, item);
      }
      return this.#getOrCreate(pool, "array", array);
    }

    #getOrCreate(map, key, array) {
      if (map.has(key)) {
        return map.get(key);
      }
      const newPool = array ?? new Map();
      map.set(key, newPool);
      return newPool;
    }
  }

  const deckList = new ArrayPool();

  const getWinsString = (matchesCount, winsCount) => (matchesCount === 0 && winsCount === 0)
    ? "該当なし"
    : `${winsCount} 勝${losesCount} 敗`;

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
      players: getPlayers(dataView, this.duration === 0),/*
      graphFragments: [],
      graphFragmentVisibilities: [],*/
      // 後から追加するもの
      you: {},
      tBody: document.createElement(Const.T_BODY_TAG_NAME)
    });
  };

  const getDeckString = (deck) => deck?.map(cardId => CardName.get(cardId)).sort().join(Const.CARD_SEPARATOR);

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

  const getString = (buffer, byteOffset, length) => new TextDecoder(Const.TEXT_ENCODE).decode(
    new Uint8Array(buffer, byteOffset, length)
  );

  const getPlayers = (dataView) => {
    const players = [];
    const isZeroDuration = (dataView.getUint8(0x0399) === 0x0A);
    let targetAddress = findTypedArray(dataView, 0x07, 0x00000007, 0x07E6);
    const length1 = dataView.getUint32(targetAddress + 0x0A, true);
    targetAddress = findStringIndex(dataView, Const.CSLogic_PlayerData, (isZeroDuration ? 0x987 : 0xA88) + length1 * 5);
    let deckAddress = 0x1500 + length1 * 0x10;
    if (!isZeroDuration) {
      deckAddress += dataView.getUint32(targetAddress - 0x0E, true) * 5;
    }
    let length = 0x588;
    const playerCount = dataView.getUint32(isZeroDuration ? 0x03A6 : 0x03AA, true);
    const player = {};
    for (let i = 0; i < playerCount; i += 1) {
      targetAddress += length + 0x2B;
      player.masterId = dataView.getUint32(targetAddress, true);
      targetAddress += 0x05;
      // const old = deckAddress;
      deckAddress = findTypedArray(dataView, 0x0F, dataView.getUint32(targetAddress, true), deckAddress) + 0x05;
      // console.log(`${i}:${deckAddress - old}`);
      player.deck = constructDeckArray(dataView, deckAddress);
      targetAddress += 0x04;
      player.rating = dataView.getUint32(targetAddress, true);
      targetAddress += 0x09;
      length = dataView.getUint8(targetAddress);
      targetAddress += 0x01;
      player.name = $escape(getString(dataView.buffer, targetAddress, length));
      targetAddress += length;
      player.isNPC = dataView.getUint32(targetAddress, true) === 0 && dataView.getUint32(targetAddress + 4, true) === 0;
      targetAddress += 0x15;
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
      player.rankId = dataView.getUint32(targetAddress + length + 13, true);
      players.push(Player((player.isNPC ? "&lt;NPC&gt;" : "") + player.name, player.guildName, player.masterId, player.deck, player.team, player.rankId, player.rating, player.isNPC));
    }
    return players;
  };

  const Player = (name, guildName, masterId, deck, team, rankId, rating, isNPC) => Object.freeze({ name, team, rankId, rating, isNPC, guildName, masterId, deck: deckList.get(deck.sort()), uniqueDeck: new Set(deck) });

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

  const constructDeckArray = (() => {
    const arrayLikeObject = {
      length: 0
    };
    let
      deckAddress,
      dataView;

    const getItem = (_, i) => {
      return dataView.getUint32(deckAddress + i * 0x04, true);
    };

    return (_dataView, _deckAddress) => {
      dataView = _dataView;
      deckAddress = _deckAddress;
      arrayLikeObject.length = dataView.getUint32(deckAddress, true);
      deckAddress += 0x05;
      return Array.from(arrayLikeObject, getItem);
    };
  })();

  class ReplayManager {
    static sort = (async (appliesFilter = true) => {
      if (this.#isSorting)
        return;
      this.#isSorting = true;
      ReplayTable.setReady(false);
      ScrollPositionCacher.save();
      await $applicationOfUi();
      UIManager.constructFilterProperties();
      await Promise.all([new Promise(appliesFilter ? this.#filter : this.#sort), $sleep(0.1)]);
      ScrollPositionCacher.load();
      ReplayTable.setReady(true);
      this.#isSorting = false;
    }).bind(this);

    static #replays;
    static #replaysCount;
    static #replayCounters;
    static #playerNameCounter;
    static #fileInputElement = $id("replay-directory");
    static #loadProggressBar = $id("progress");
    // TODO UIManager側でソート中判定をやらないと、
    // ソート処理中に同じ列を連続してクリックした場合に昇順・降順がおかしくなる
    static #isSorting = false;
    static #isLoading = false;
    static #replayRegExp = /[.]rp$/;
    static #settingFileName = /[/]replay-analyzer.json/;
    static #yourName = Const.EMPTY_STRING;
    // 以下ソート用
    static #currentReplay;
    static #you;

    static #addReplay = ((binary) => {
      const replay = Replay(binary);
      this.#replays.add(replay);
      this.#playerNameCounter.count(replay.players, "name");
    }).bind(this);

    static #sort = ((resolve) => {
      this.#replays
        .sort(this.#sortFunc)
        .forEach(ReplayTable.addReplay, ReplayTable);
      resolve();
    }).bind(this);

    static #filter = ((resolve) => {
      this.#replayCounters = new ReplayCounterManager();
      this.#replays
        .filter(this.#filterFunc, this)
        .sort(this.#sortFunc)
        .forEach(ReplayTable.addReplay, ReplayTable);
      this.#replayCounters.applyToSummary();
      UIManager.triggerSummarySelectorChange();
      resolve();
    }).bind(this);

    static #init = this.#initialize();

    static #initialize() {
      this.#fileInputElement.addEventListener("change", this.#onFileChange);
    }

    static #filterFunc(replay) {
      for (const filterProperty of UIManager.filterProperties) {
        if (filterProperty.test(replay)) {
          continue;
        }
        replay.tBody.hidden = true;
        return false;
      }
      this.#replayCounters.count(replay);
      replay.tBody.hidden = false;
      return true;
    }

    static #sortFunc(replay, b) {
      // 分割代入してもしなくても速度にそこまで差はなさそうなので、する方を採用
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
      if (this.#isLoading || this.#fileInputElement.value === Const.EMPTY_STRING)
        return;
      CountUpTimer.start(true);
      this.#isLoading = true;
      ResultDiv.setReady(false);
      CountUpTimer.lap();
      await $applicationOfUi();
      CountUpTimer.lap();
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
      this.#replays = Array.from(this.#replays);
      CountUpTimer.lap();
      this.changeYourName(this.#playerNameCounter.max(), true);
      CountUpTimer.lap();
      $id("player-names").innerHTML = '<option value="' + Array.from(this.#playerNameCounter.result.keys()).sort().join('"><option value="') + '">';
      CountUpTimer.lap();
      this.sort();
      CountUpTimer.lap();
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

    static changeYourName(name, isDefault) {
      this.#yourName = name;
      UIManager.setFilterValue(name, "name", isDefault);
      for (const replay of this.#replays) {
        const you = replay.players.find(this.#nameComparer, this);
        replay.you.exists = you !== undefined;
        replay.you.areTheWinner = replay.winTeamId === (you?.team ?? 0);
        ReplayManager.#currentReplay = replay;
        ReplayManager.#you = you;
        replay.players.sort(this.#playerSortFunc);
        this.#createTBody(replay);
      }
      ReplayManager.#currentReplay = null;
      ReplayManager.#you = null;
    }

    static #playerSortFunc(player1, player2) {
      return ReplayManager.#you === undefined ? (
        player1.team === ReplayManager.#currentReplay.winTeamId ? -1 : 0
      )
        : player1 === ReplayManager.#you ? -1 : player1.team === ReplayManager.#you.team && player2.team !== ReplayManager.#you.team ? -1 : 0
    }

    static #nameComparer(player) {
      return player.name === this.#yourName;
    }

    static #createTBody(replay) {
      const
        tBody = replay.tBody,
        isTeamBattle = replay.players.length === 4,
        seconds = ((BigInt(replay.duration) % 600n) / 10n).toString(),
        durationString = `${BigInt(replay.duration) / 600n}:${"0".repeat(2 - seconds.length)}${seconds}`,
        isWinner = replay.you.areTheWinner,
        isYou = replay.you.exists,
        players = replay.players;

      tBody.className = `detail-table--tbody all-table--tbody`;
      tBody.innerHTML = `<tr>
            <td rowspan="4" class="detail-table--td">${new Intl.DateTimeFormat(Const.EMPTY_ARRAY, Const.LOCALE_FORMAT).format(replay.date)}</td>
            <td rowspan="4" class="detail-table--td">${durationString.length <= 4 ? Const.INVISIBLE_ZERO : Const.EMPTY_STRING}${durationString}</td>
            <td rowspan="4" class="detail-table--td">${GameModeName.get(replay.gameMode)}</td>
            <td rowspan="4" class="detail-table--td ${!isWinner ? Const.EMPTY_STRING : isYou ? Const.YOU_EXIST_CLASS_NAME : Const.ALLY_CLASS_NAME}">${!isYou ? Const.EMPTY_STRING : isWinner ? Const.WIN_STRING : Const.LOSE_STRING}</td>
            <td class="detail-table--td ${!players[0]?.name ? "invalid" : isYou ? Const.YOU_EXIST_CLASS_NAME : Const.ALLY_CLASS_NAME}">${players[0]?.name}</td>
            <td class="detail-table--td ${isYou ? Const.YOU_EXIST_CLASS_NAME : Const.ALLY_CLASS_NAME}">${RankName.get(players[0]?.rankId, players[0]?.rating)}</td>
            <td class="detail-table--td ${isYou ? Const.YOU_EXIST_CLASS_NAME : Const.ALLY_CLASS_NAME}">${MasterName.get(players[0]?.masterId)}</td>
            <td class="detail-table--td td--left ${isYou ? Const.YOU_EXIST_CLASS_NAME : Const.ALLY_CLASS_NAME}">${getDeckString(players[0]?.deck) ?? "エラー"}</td>
          </tr>
          <tr class="${isTeamBattle ? Const.SECOND_ALLY_CLASS_NAME : Const.EMPTY_STRING}">
            <td class="detail-table--td${players[1]?.name ? Const.EMPTY_STRING : " invalid"}">${players[1]?.name}</td>
            <td class="detail-table--td">${RankName.get(players[1]?.rankId, players[1]?.rating)}</td>
            <td class="detail-table--td">${MasterName.get(players[1]?.masterId)}</td>
            <td class="detail-table--td td--left">${getDeckString(players[1]?.deck) ?? "エラー"}</td>
          </tr>${isTeamBattle ? `
          <tr class="detail-table--tr3">
            <td class="detail-table--td${players[2]?.name ? Const.EMPTY_STRING : " invalid"}">${players[2]?.name}</td>
            <td class="detail-table--td">${RankName.get(players[2]?.rankId, players[2]?.rating)}</td>
            <td class="detail-table--td">${MasterName.get(players[2]?.masterId)}</td>
            <td class="detail-table--td td--left">${getDeckString(players[2]?.deck) ?? "エラー"}</td>
          </tr>
          <tr>
            <td class="detail-table--td${players[3]?.name ? Const.EMPTY_STRING : " invalid"}">${players[3]?.name}</td>
            <td class="detail-table--td">${RankName.get(players[3]?.rankId, players[3]?.rating)}</td>
            <td class="detail-table--td">${MasterName.get(players[3]?.masterId)}</td>
            <td class="detail-table--td td--left">${getDeckString(players[3]?.deck) ?? "エラー"}</td>
          </tr>` : Const.EMPTY_STRING}`;
    }
  }

  class Counter {
    #counter = new Map();
    get result() {
      return this.#counter;
    }

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

    static setFilterValue(value, propertyName, isDefault) {
      this.#filterElementOf[propertyName].value = value;
      if (isDefault)
        this.#filterElementOf[propertyName].dataset.defaultValue = value;
    }

    static setMatchCountAndWinRate(matchCount, winCount, loseCount) {
      this.#indicatorElementOf.matchCount.textContent = matchCount.toString();
      this.#indicatorElementOf.wins.textContent = winCount;
      this.#indicatorElementOf.loses.textContent = loseCount;
      const winRatePerMilleString = Math.round(winCount * 1000 / (winCount + loseCount)).toString();
      this.#indicatorElementOf.winRateInteger.textContent = winRatePerMilleString.length === 1 ? "0" : winRatePerMilleString.slice(0, -1);
      this.#indicatorElementOf.winRateDecimal.textContent = winRatePerMilleString.charAt(winRatePerMilleString.length - 1);
    }

    static applySummary(yourDeck, yourCard, otherMaster, otherCard, duration, gameMode) {
      const
        elementOf = this.#indicatorElementOf,
        table = elementOf.summaryTable;
      for (const tBody of table.tBodies)
        table.removeChild(tBody);
      const
        fragment = document.createDocumentFragment(),
        tBody = elementOf.summaryTBody;
      tBody.yourMaster = yourDeck.toTBody();
      tBody.yourDeck = yourDeck.toTBody(true);
      tBody.yourCard = yourCard.toTBody();
      tBody.otherMaster = otherMaster.toTBody();
      tBody.otherCard = otherCard.toTBody();
      tBody.duration = duration.toTBody();
      tBody.gameMode = gameMode.toTBody();
      fragment.append(
        tBody.yourMaster, tBody.yourDeck, tBody.yourCard,
        tBody.otherMaster, tBody.otherCard, tBody.duration, tBody.gameMode
      );
      table.appendChild(fragment);
    }

    static triggerSummarySelectorChange() {
      this.#indicatorElementOf.summarySelector.dispatchEvent(this.#changeEvent);
    }

    static #filterProperties = new Set();
    static get filterProperties() {
      return this.#filterProperties;
    }

    static #sortProperties = new SortPropertyStack([["time", false]]);
    static get sortPriorities() {
      return this.#sortProperties;
    }

    static #filterElementOf = Object.freeze({
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
      toTime: filter.toTime/*,
      sorter: $id("replay-sorter")*/
    });
    static #indicatorElementOf = Object.freeze({
      matchCount: $id("match-count"),
      wins: $id("wins"),
      loses: $id("loses"),
      winRateInteger: $id("win-rate-integer"),
      winRateDecimal: $id("win-rate-decimal"),
      summarySelector: $id("summary-selector"),
      summaryTable: $id("summary-table"),
      summaryTHead: {
        master: $id("master-summary-thead"),
        deck: $id("deck-summary-thead"),
        card: $id("card-summary-thead"),
        duration: $id("duration-summary-thead"),
        gameMode: $id("game-mode-summary-thead"),
        current: null
      },
      summaryTBody: {
        current: null
      }
    });
    //static #filterOptionTemplate = $id("filter-option");
    static #changeEvent = new Event("change");
    static #init = this.#initialize();

    static #initialize() {
      $id("replay-sorter").addEventListener("click", (e) => {
        const propertyName = e.target.dataset.sort;
        if (propertyName === undefined)
          return;
        this.#sortProperties.set(propertyName);
        ReplayManager.sort(false);
      });
      this.#indicatorElementOf.summarySelector.addEventListener("change", (e) => {
        const
          target = e.target,
          dataset = target.options[target.selectedIndex].dataset,
          tHead = this.#indicatorElementOf.summaryTHead;
        if (tHead.current !== null)
          tHead.current.hidden = true;
        tHead.current = tHead[dataset.tHead];
        tHead.current.hidden = false;
        const tBody = this.#indicatorElementOf.summaryTBody;
        if (tBody.current !== null)
          tBody.current.hidden = true;
        tBody.current = tBody[dataset.tBody];
        tBody.current.hidden = false;
      });
      for (const radio of this.#filterElementOf.you)
        radio.addEventListener("change", ReplayManager.sort);
      for (const textInputName of [
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
        element.dataset.defaultValue = element.value ?? Const.EMPTY_STRING;
        element.addEventListener("change", ReplayManager.sort);
        element.addEventListener("click", this.#select);
        element.addEventListener("dblclick", this.#onTextInputDoubleClick);
      }

      const element = this.#filterElementOf.name;
      element.addEventListener("change", () => {
        ResultDiv.setReady(false);
        ReplayManager.changeYourName(element.value);
        ReplayManager.sort();
        ResultDiv.setReady(true);
      });
      element.addEventListener("click", this.#select);
      element.addEventListener("dblclick", this.#onTextInputDoubleClick);

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
      target.blur();
      target.dispatchEvent(Const.CHANGE_EVENT);
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

  class ReplayCounter {
    constructor(toString, subToString) {
      this.#toString = toString;
      this.#subToString = subToString;
    }

    get result() {
      return this.#counter;
    }

    count(property, isWin, subProperty) {
      this.#checkSubProperty(subProperty);
      if (!this.#counter.has(property)) {
        this.#addNewProperty(property, isWin, subProperty);
        return;
      }
      this.#countMatchAndWin(property, isWin, subProperty);
    }

    countAll(iterable, isWin, subProperty) {
      for (const item of iterable) {
        this.count(item, isWin, subProperty);
      }
    }

    toTBody(isSubCategory) {
      const tBody = document.createElement("tbody");
      tBody.hidden = true;
      tBody.innerHTML = '<tr>' + ((this.#hasSubProperty && isSubCategory)
        ? Array.from(this.#counter).flatMap(this.#flatMapFunc, this).sort(this.#sortFunc2).map(this.#mapFunc2, this).join('<tr>')
        : Array.from(this.#counter).sort(this.#sortFunc).map(this.#mapFunc, this).join('<tr>'));
      return tBody;
    }

    #counter = new Map();
    #hasSubProperty;
    #toString;
    #subToString;
    #flatMapKey;

    #sortFunc(count, b) {
      return b[1].matchCount - count[1].matchCount;
    }

    #mapFunc(item) {
      return `<td class="summary-td number">${item[1].matchCount}</td>
      <td class="summary-td number">${(item[1].winCount * 100 / item[1].matchCount).toFixed(1)}%</td>
      <td class="summary-td number">${item[1].winCount}</td>
      <td class="summary-td number">${item[1].matchCount - item[1].winCount}</td>
      <td class="summary-td">${this.#toString ? this.#toString(item[0]) : item[0]}</td>`;
    }

    #flatMapFunc(item) {
      this.#flatMapKey = item[0];
      return Array.from(item[1].subCounter.result).map(this.#mapFunc3, this);
    }

    #mapFunc3(item) {
      return {
        key1: this.#flatMapKey,
        key2: item[0],
        value: item[1]
      };
    }

    #sortFunc2(count, b) {
      return b.value.matchCount - count.value.matchCount;
    }

    #mapFunc2(item) {
      return `<td class="summary-td number">${item.value.matchCount}</td>
        <td class="summary-td number">${(item.value.winCount * 100 / item.value.matchCount).toFixed(1)}%</td>
        <td class="summary-td number">${item.value.winCount}</td>
        <td class="summary-td number">${item.value.matchCount - item.value.winCount}</td>
        <td class="summary-td">${this.#toString ? this.#toString(item.key1) : item.key1}</td>
        <td class="summary-td">${this.#subToString ? this.#subToString(item.key2) : item.key2}</td>`;
    }

    #checkSubProperty(hasSubProperty) {
      switch (this.#hasSubProperty) {
        case undefined:
          this.#hasSubProperty = hasSubProperty;
          break;
        case true:
          if (!hasSubProperty)
            throw "サブプロパティを指定してください";
          break;
        case false:
          if (hasSubProperty)
            throw "サブプロパティは指定できません";
          break;
      }
    }

    #addNewProperty(property, isWin, subProperty) {
      if (subProperty === undefined) {
        this.#counter.set(property, { matchCount: 1, winCount: isWin ? 1 : 0 });
        return;
      }
      const subCounter = new ReplayCounter();
      subCounter.#addNewProperty(subProperty, isWin);
      this.#counter.set(property, { subCounter, matchCount: 1, winCount: isWin ? 1 : 0 });
    }

    #countMatchAndWin(property, isWin, subProperty) {
      const item = this.#counter.get(property);
      item.matchCount += 1;
      if (isWin) {
        item.winCount += 1;
      }
      if (subProperty !== undefined) {
        item.subCounter.count(subProperty, isWin);
      }
    }
  }

  class ReplayCounterManager {
    #yourDeck;
    #yourCard;
    #otherMaster;
    #otherCard;
    #duration;
    #gameMode;
    #matchCount;
    #winCount;
    #loseCount;
    constructor() {
      this.#yourDeck = new ReplayCounter(MasterName.boundGet, getDeckString);
      this.#yourCard = new ReplayCounter(CardName.boundGet);
      this.#otherMaster = new ReplayCounter(MasterName.boundGet);
      this.#otherCard = new ReplayCounter(CardName.boundGet);
      this.#duration = new ReplayCounter(ReplayCounterManager.#durationToString);
      this.#gameMode = new ReplayCounter(GameModeName.boundGet);
      this.#matchCount = 0;
      this.#winCount = 0;
      this.#loseCount = 0;
    }

    count(replay) {
      // TODO ワイルドカードの延べ枚数
      this.#matchCount += 1;
      let i = 0;
      for (const player of replay.players) {
        if (i === 0 && replay.you.exists) {
          this.#yourDeck.count(player.masterId, replay.you.areTheWinner, player.deck);
          this.#yourCard.countAll(player.uniqueDeck, replay.you.areTheWinner);
        }
        else {
          this.#otherMaster.count(player.masterId, replay.winTeamId === player.team);
          this.#otherCard.countAll(player.uniqueDeck, replay.winTeamId === player.team);
        }
        i += 1;
      }
      if (!replay.you.exists)
        return;
      this.#duration.count(replay.duration - replay.duration % 600, replay.you.areTheWinner);
      this.#gameMode.count(replay.gameMode, replay.you.areTheWinner);
      if (replay.you.areTheWinner)
        this.#winCount += 1;
      else
        this.#loseCount += 1;
    }

    applyToSummary() {
      UIManager.setMatchCountAndWinRate(this.#matchCount, this.#winCount, this.#loseCount);
      UIManager.applySummary(
        this.#yourDeck, this.#yourCard,
        this.#otherMaster, this.#otherCard, this.#duration, this.#gameMode
      );
    }

    static #durationToString(duration) {
      const min = Math.round(duration / 600);
      return `${min}:00 ~ ${min}:59`;
    }
  }

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
    static #tBodies = this.#element.tBodies;
    static #classList = this.#element.classList;

    static addReplay(replay) {
      // TODO ソートだけの場合はflex-orderのほうがはやいかも
      //      いやtransformのが速いのでは
      this.#element.appendChild(replay.tBody);
    }

    static setReady(isReady) {
      if (isReady)
        this.#classList.add("detail-table--ready");
      else
        this.#classList.remove("detail-table--ready");
    }

    static async clear() {
      for (const tBody of this.#tBodies) {
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

  class ScrollPositionCacher {
    static #beforeY;
    static #filterFormRect = document.forms.filter.getBoundingClientRect();
    static save() {
      this.#beforeY = this.#filterFormRect.y;
    }
    static load() {
      window.scrollBy(this.#beforeY - this.#filterFormRect.y, 0);
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
      console.trace(`${(Date.now() - this.#start) / 1000}sec`);
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