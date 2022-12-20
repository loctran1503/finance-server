

const SocketManager = () => {
    let socketList = {

    };
  

    const readSocket = () => socketList;
    const insertSocket = ({name,socketId} : {name:string,socketId:string}) => {
      socketList[socketId.toString()] = {
        name,
        socketId
      } 
      return socketList;
    };
  
    const deleteSocket = (socketId :string) => {
        if(socketList[socketId]){
          delete socketList[socketId]
        }
      return socketList
    };
   

  
    return { readSocket,insertSocket,deleteSocket };
  };
  
  export default SocketManager();
  