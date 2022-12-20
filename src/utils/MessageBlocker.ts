import { BLOCKING_MESSAGE_DURATION } from "./constants";

export interface UserBlockedType{
    [ userId : string] : {
        timestamp : number
    }
}

export interface FindUserBlockedResponse{
    
}

const MessageBlocker = () => {
  let blockingList: UserBlockedType = {};

  const readBlockingList = () => blockingList;

  //0:is blocking
  //number:not blocking 
  const findUserIsBlocking =  (userId: string):  number => {
    const existing =  blockingList[userId];
    if (existing) {
      //Is blocking
      if (existing.timestamp >= Date.now()) {
        console.log(userId, ' :is Blocking');
        return 0;
        //Not blocking => insert userId timestamp blocking
      } else {
        return insertOrUpdateBlockingList(userId);
      }
      //Not blocking and have in list => update userId timestamp blocking
    } else {
      return insertOrUpdateBlockingList(userId);
    }
  };

  const insertOrUpdateBlockingList =  (userId: string): number => {
    const timestamp: number = Date.now() + BLOCKING_MESSAGE_DURATION;
     blockingList[userId] = {
      timestamp,
    };
    return BLOCKING_MESSAGE_DURATION;
  };

  return { readBlockingList, insertOrUpdateBlockingList, findUserIsBlocking };
};

export default MessageBlocker();
