export const getSender = (loggedUser, users) => {
   return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
}

export const getSenderFull = (loggedUser, users) => {
   return users[0]._id === loggedUser._id ? users[1] : users[0];
}

export const isSameSenderMargin = (message, m, i, userId) => {
   if(
      (i < message.length-1) && 
      (message[i+1].sender._id === m.sender._id) && 
      (message[i].sender._id !== userId) 
   ) return 0;
   else if((i< message.length-1) && (message[i+1].sender._id !== m.sender._id) && (message[i].sender._id !== userId) || 
   (i===message.length-1 && message[i].sender._id !== userId)) return 0
   else return "auto";
 
}

export const isSameUser = (message, m, i) => {
   return i > 0 && message[i-1].sender._id === m.sender._id;
}