

class Chatroom {
  constructor(room, username){
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
  }
  async addChat(message){
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callback){
    this.chats
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added'){
            if (change.type === 'added'){
              callback(change.doc.data());
            }
          }
        });
      });
  }
}



const chatroom = new Chatroom('general', 'gia');

chatroom.getsChats((data) => {
  console.log(data);
});