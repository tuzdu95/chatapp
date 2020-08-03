import firebase from "firebase";
import { FirebaseConfig } from "./config";

class Fire {
  constructor() {
    this.init();
    //this.checkout();
  }
  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseConfig);
    } else {
      firebase.app();
    }
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
    });
    this.db.push();
  };

  parse = (message) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);
    return {
      _id,
      user,
      text,
      createdAt,
    };
  };

  get = callback =>{
      this.db.on("child added", snapshot =>callback(this.parse(snapshot)))
  }

  off() {
      this.db.off();
  }

  get db() {
    return firebase.database.ref("messages");
  }

  get uid() {
      return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
