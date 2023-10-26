import React from "react";
const MessageContext = React.createContext(null)
const MessageProvider = MessageContext.Provider
const MessageConsumer = MessageContext.Consumer

export {MessageConsumer, MessageProvider}