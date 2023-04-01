export interface SimplifiedChampion {
  id: number;
  name: string;
  alias?: string;
  squarePortraitPath: string;
  roles: any[];
}

export interface Champion {
  disabled: boolean;
  freeToPlay: boolean;
  freeToPlayForQueue: boolean;
  id: number;
  loyaltyReward: boolean;
  masteryChestGranted: boolean;
  masteryLevel: number;
  masteryPoints: number;
  name: string;
  owned: boolean;
  positionsFavorited: string[];
  rented: boolean;
  roles: string[];
  selectionStatus: {
    banIntented: boolean;
    banIntentedByMe: boolean;
    isBanned: boolean;
    pickIntented: boolean;
    pickIntentedByMe: boolean;
    pickIntentedPosition: string;
    pickedByOtherOrBanned: boolean;
    selectedByMe: boolean;
  };
  squarePortraitPath: string;
  xboxGPReward: boolean;
}

export type GamePhase = 'Matchmaking' | 'ReadyCheck' | 'ChampSelect' | 'Lobby';

export interface Summoner {
  actingBackgroundAnimationState: 'is-acting-background';
  activeActionType: 'pick' | 'ban' | string;
  areSummonerActionsComplete: boolean;
  assignedPosition: string;
  banIntentSquarePortratPath: string;
  cellId: number;
  championIconStyle: 'string';
  championId: number;
  championName: string;
  currentChampionVotePercentInteger: number;
  entitledFeatureType: string;
  isActingNow: boolean;
  isDonePicking: boolean;
  isOnPlayersTeam: boolean;
  isPickIntenting: boolean;
  isPlaceholder: boolean;
  isSelf: boolean;
  nameVisibilityType: string;
  obfuscatedPuuid: string;
  obfuscatedSummonerId: number;
  pickSnipedClass: string;
  puuid: string;
  shouldShowActingBar: boolean;
  shouldShowBanIntentIcon: boolean;
  shouldShowExpanded: boolean;
  shouldShowRingAnimations: boolean;
  shouldShowSelectedSkin: boolean;
  shouldShowSpells: boolean;
  showMuted: boolean;
  showSwaps: boolean;
  showTrades: boolean;
  skinId: number;
  skinSplashPath: string;
  slotId: number;
  spell1IconPath: string;
  spell2IconPath: string;
  statusMessageKey: 'picking_champion' | 'banning_champion';
  summonerId: number;
  swapId: number;
  tradeId: number;
}

export interface Action {
  actorCellId: number;
  championId: number;
  completed: boolean;
  id: 9;
  isAllyAction: boolean;
  isInProgress: boolean;
  type: 'ban' | 'pick' | 'ten_bans_reveal';
}

export interface Session {
  actions: Action[][];
  allowBattleBoost: boolean;
  allowDuplicatePicks: boolean;
  allowLockedEvents: boolean;
  allowRerolling: boolean;
  allowSkinSelection: boolean;
  bans: {
    myTeamBans: [];
    numBans: number;
    theirTeamBans: [];
  };
  benchChampions: [];
  benchEnabled: boolean;
  boostableSkinCount: number;
  chatDetails: {
    chatRoomName: '261b5b60-41c6-4c2f-9cb3-5544f2aebb61@champ-select.pvp.net';
    chatRoomPassword: null;
    multiUserChatId: '261b5b60-41c6-4c2f-9cb3-5544f2aebb61@champ-select.pvp.net';
    multiUserChatJWT: 'eyJraWQiOiIxIiwiYWxnIjoiUlMyNTYifQ.eyJ0Z3QiOiJicjEiLCJzdWIiOiJjZmIzYzg4Yi04MGI4LTU0YzgtODg1YS1lYzU0ZjM4OGRlNDciLCJjaG4iOiIyNjFiNWI2MC00MWM2LTRjMmYtOWNiMy01NTQ0ZjJhZWJiNjEiLCJ0eXAiOiJsb2wtdGIiLCJleHAiOjE2NzYxOTUzMDgsImlhdCI6MTY3NjE5NDcwOCwianRpIjoiOTk3MzkwYjgtZTNiMC00MTkxLTllYTItNTZmMmI4NmUzMTI0In0.AHKH7xFTqv6oFZkl5N4tcl7kq2rLPUGUWiyR7-2YNBfXi7EVdkBsPwBwrvD0EN0cCbCGWVqKBH7DXe_mBV1XI0lqYCElAfQASV_tPf1cZe1WGaLbl_ish6kW3AUtsixUgUx5Oir-9k3tm-lPUjuWI16yeiwk7R98TKzz7RoMNv8N0IH6wSV46GSSTdkaDI0PsBn5jnzipBcWkjAQ6nWbWrzLDt9hE2iI1w51n_fmDet-Ffdcn1uZyonJ5XP1Jb9DBghoCvLciAxxUqXQnyi2j6iN5SUd2-s2zw7aDqpXtuHGq9jwYRIEws6iEgxodaxwp4_BKZIY6Wo07OB5pfsvpA';
    multiUserChatPassword: string;
  };
  counter: number;
  entitledFeatureState: {
    additionalRerolls: number;
    unlockedSkinIds: [];
  };
  gameId: 2680375022;
  hasSimultaneousBans: boolean;
  hasSimultaneousPicks: boolean;
  isCustomGame: boolean;
  isSpectating: boolean;
  localPlayerCellId: number;
  lockedEventIndex: number;
  myTeam: {
    assignedPosition: 'utility';
    cellId: number;
    championId: number;
    championPickIntent: number;
    entitledFeatureType: 'NONE';
    nameVisibilityType: 'VISIBLE' | 'OBFUSCATED';
    obfuscatedPuuid: string;
    obfuscatedSummonerId: number;
    puuid: string;
    selectedSkinId: number;
    spell1Id: number;
    spell2Id: number;
    summonerId: number;
    team: number;
    wardSkinId: number;
  }[];
  pickOrderSwaps: {
    cellId: number;
    id: number;
    state: 'AVAILABLE';
  }[];
  recoveryCounter: number;
  rerollsRemaining: number;
  skipChampionSelect: boolean;
  theirTeam: {
    assignedPosition: string;
    cellId: number;
    championId: number;
    championPickIntent: number;
    entitledFeatureType: string;
    nameVisibilityType: string;
    obfuscatedPuuid: string;
    obfuscatedSummonerId: number;
    puuid: string;
    selectedSkinId: number;
    spell1Id: number;
    spell2Id: number;
    summonerId: number;
    team: 1;
    wardSkinId: -1;
  }[];
  timer: {
    adjustedTimeLeftInPhase: number;
    internalNowInEpochMs: number;
    isInfinite: boolean;
    phase: 'BAN_PICK';
    totalTimeInPhase: number;
  };
  trades: [];
}

export interface ParsedWebSocketMessage<Data = any> {
  code: number;
  event: string;
  data: Data;
  eventType: 'Delete' | 'Update' | 'Create';
  uri: string;
}

export type Position = 'BOTTOM' | 'MIDDLE' | 'JUNGLE';

export interface LobbyMember {
  allowedChangeActivity: boolean;
  allowedInviteOthers: boolean;
  allowedKickOthers: boolean;
  allowedStartActivity: boolean;
  allowedToggleInvite: boolean;
  autoFillEligible: boolean;
  autoFillProtectedForPromos: boolean;
  autoFillProtectedForSoloing: boolean;
  autoFillProtectedForStreaking: boolean;
  botChampionId: number;
  botDifficulty: 'NONE' | 'HARD';
  botId: string;
  firstPositionPreference: Position;
  isBot: boolean;
  isLeader: boolean;
  isSpectator: boolean;
  puuid: 'd455a6df-896e-5e14-8c0c-de6c6d87e97e';
  ready: boolean;
  secondPositionPreference: Position;
  showGhostedBanner: boolean;
  summonerIconId: number;
  summonerId: number;
  summonerInternalName: string;
  summonerLevel: number;
  summonerName: string;
  teamId: number;
}

export interface Lobby {
  canStartActivity: boolean;
  chatRoomId: '2c7feec1-5940-4809-a6f3-d72149bc0004';
  chatRoomKey: '2c7feec1-5940-4809-a6f3-d72149bc0004';
  gameConfig: {
    allowablePremadeSizes: number[];
    customLobbyName: string;
    customMutatorName: string;
    customRewardsDisabledReasons: string[];
    customSpectatorPolicy: 'NotAllowed';
    customSpectators: unknown[];
    customTeam100: unknown[];
    customTeam200: unknown[];
    gameMode: 'CLASSIC' | 'ARAM' | 'URF';
    isCustom: boolean;
    isLobbyFull: boolean;
    isTeamBuilderManaged: boolean;
    mapId: number; // 11 is Summoner's Rift
    maxHumanPlayers: number;
    maxLobbySize: number;
    maxTeamSize: number;
    pickType: string;
    premadeSizeAllowed: boolean;
    queueId: 420 | 440 | 840; // 420 is soloQ, 440 is flex and 840 is coopai
    showPositionSelector: boolean;
  };
  invitations: {
    invitationId: string;
    invitationType: 'invalid';
    state: 'Accepted' | 'Denied';
    timestamp: string;
    toSummonerId: number;
    toSummonerName: 'string';
  }[];
  localMember: LobbyMember;
  members: LobbyMember[];
  multiUserChatId: string;
  multiUserChatJWT: string;
  multiUserChatPassword: string;
  partyId: string;
  partyType: 'closed' | 'open';
  restrictions: [];
  scarcePositions: Position[];
  warnings: [];
}
// "uri": "/lol-lobby/v2/lobby"
