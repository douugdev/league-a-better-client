import axios from 'axios';
import { ApiGridChampion, ParsedWebSocketMessage } from './types';

/**
 * Subscribe to a specific endpoint, and trigger callback function when that endpoint is called
 * @param {string} endpoint Endpoint you wish to monitor. ex: /lol-gameflow/v1/gameflow-phase , send "" to subscribe to all
 * @param {function} callback The callback function
 */
export const subscribeToEndpoint = <Data = any>(
  endpoint: string,
  callback: (ev: ParsedWebSocketMessage<Data>) => void
) => {
  const uri = document.querySelector<HTMLLinkElement>(
    'link[rel="riot:plugins:websocket"]'
  )!.href;
  const ws = new WebSocket(uri, 'wamp');
  const eventName = endpoint.replace(/\//g, '_');

  if (endpoint && process.env.DEBUG) {
    console.log(`[WEBSOCKET] Subscribed to OnJsonApiEvent${eventName}`);
  }

  ws.onopen = () => ws.send(JSON.stringify([5, 'OnJsonApiEvent' + eventName]));
  ws.onmessage = (received) => {
    const websocketMessage = JSON.parse(received.data) as any;
    if (
      Array.isArray(websocketMessage) &&
      websocketMessage.length === 3 &&
      typeof websocketMessage[2] !== 'string'
    ) {
      const [code, event, message] = websocketMessage as [
        number,
        string,
        { data: any; eventType: 'Delete' | 'Update' | 'Create'; uri: string }
      ];

      callback({
        code,
        event,
        eventType: message.eventType,
        uri: message.uri,
        data: message.data,
      });
    } else {
      console.error(`[WEBSOCKET] Invalid message: ${received.data}`);
    }
  };

  return () => {
    ws.close(1000);
    if (endpoint && process.env.DEBUG) {
      console.log(`[WEBSOCKET] Unsubscribed to OnJsonApiEvent${eventName}`);
    }
  };
};

export const matchmakingReadyAccept = async () => {
  await axios.post('/lol-matchmaking/v1/ready-check/accept');
};

export const matchmakingChampionIntent = async (
  actionId: number,
  championId: number
) => {
  await axios.patch(`lol-champ-select/v1/session/actions/${actionId} `, {
    championId,
  });
};
export const matchmakingChampionLock = async (
  actionId: number,
  championId: number
) => {
  await axios.patch(`lol-champ-select/v1/session/actions/${actionId} `, {
    completed: true,
    championId,
  });
};

export const getAllGridChampions = async () => {
  return (
    await axios.get<ApiGridChampion[]>(
      '/lol-game-data/assets/v1/champion-summary.json'
    )
  ).data;
};

export const getDataChampions = async () => {
  return (
    await axios.get<ApiGridChampion[]>(
      '/lol-game-data/assets/v1/champion-summary.json'
    )
  ).data;
};

export const dodgeQueue = async () => {
  await axios.post(
    '/lol-login/v1/session/invoke?destination=lcdsServiceProxy&method=call&args=["","teambuilder-draft","quitV2",""]',
    ['', 'teambuilder-draft', 'quitV2', '']
  );
  window.location.reload();
};
export const cancelChampSelect = async () => {
  await axios.post('/lol-lobby/v1/lobby/custom/cancel-champ-select');
};
