import Cookies from "universal-cookie";

import config from "config";

const ActionCable = typeof window === "object" ? require("actioncable") : null;

function getUrl(token: string) {
  const { wsUrl } = config;

  return `${wsUrl}/cable?socket_token=${token}`;
}

function createConsumer() {
  // Note: Socket token usually is avialable in profile api
  // use can set it in profile reducer
  const token = new Cookies().get("socketToken");
  return ActionCable.createConsumer(getUrl(token));
}

export default class WSHelper {
  #channel = null;

  #dispatch = null;

  #App = {
    cable: null,
    chats: null,
    connected: false,
    stack: [],
    requestingProfile: false,
  };

  constructor(channel: string, dispatch: any) {
    this.#channel = channel;
    this.#dispatch = dispatch;
  }

  connect() {
    const App = this.#App;
    const channel = this.#channel;
    const dispatch = this.#dispatch;
    App.cable = createConsumer();

    App.chats = App.cable.subscriptions.create(channel, {
      connected() {
        App.connected = true;
        App.stack.map((item) => this.perform(item.actionName, item.data));
        App.stack = [];
      },
      disconnected() {
        App.stack = [];
      },
      received({ type, ...data }) {
        dispatch({ type: `WS_${type.toUpperCase()}_SUCCESS`, data });
      },
      performOverride(actionName: string, data = {}) {
        if (App.connected) return this.perform(actionName, data);

        App.stack[App.stack.length] = { actionName, data };
        return false;
      },
    });
  }

  disconnect() {
    const App = this.#App;
    const channel = this.#channel;

    App?.chats?.unsubscribe(channel);
  }

  perform(type: string, data = {}) {
    const App = this.#App;
    const dispatch = this.#dispatch;

    dispatch({ type: `WS_${type.toUpperCase()}` });

    return App?.chats?.performOverride(type, data);
  }

  getRooms() {
    this.perform("get_rooms");
  }

  getRoom(data: any) {
    this.perform("get_room", data);
  }

  sendMessage(data: any) {
    this.perform("send_message", data);
  }
}
