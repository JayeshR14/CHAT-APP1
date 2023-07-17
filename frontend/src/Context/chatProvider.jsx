import {createContext, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
const ChatContext =  createContext();
const ChatProvider = ({children})=>{
   
    const history = useHistory();

    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [notification, setNotification] = useState([]);
    const [latestMessage, setLatestMessage] = useState([]);
    const [alignItem, setAlignItems] = useState(false);


    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
       
        if(!userInfo){
            history.push("/");
        }

    }, [history]);
     
    return ( <ChatContext.Provider value={{user, setUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification, latestMessage, setLatestMessage}}>{children}</ChatContext.Provider> )
};

export const ChatState = () => {
    return useContext(ChatContext);
} 

export default ChatProvider;