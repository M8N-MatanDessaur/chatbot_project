import React, { useEffect, useState, useRef } from 'react';

// Styles
import {
    ChatBotContainer,
    ChatBotHeader,
    ChatBotTitle,
    CloseButton,
    ChatBotBody,
    ChatBotMessageList,
    ChatBotMessage,
    UserMessage,
    ChatBotFooter,
    ChatBotInput,
    SendButton,
    Icon,
} from '../Components_Styles/ChatBot.styles';

export default function ChatBot({ name = "AI Chatbot", userColor = "#000", botColor = "#2274A5" }) {
    const chatBodyRef = useRef(null);
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Hello there I am your AI assistant' },
        { role: 'user', content: 'Hey 👋🏼' }
    ]);
    const [userInput, setUserInput] = useState('');

    // Scroll to bottom of chat body
    useEffect(() => {
        if (chatBodyRef.current) {
            const element = chatBodyRef.current;
            element.scrollTop = element.scrollHeight;
        }
    }, [chatBodyRef]);

    async function handleSendMessage() {
        // Don't send empty messages
        if (!userInput) return;

        // Add user message to local state
        setMessages(prev => [...prev, { role: 'user', content: userInput }]);

        // Call Netlify function
        try {
            const response = await fetch(`.netlify/functions/ai_chat?input=${encodeURIComponent(userInput)}&history=${encodeURIComponent(messages.map(m => m.content).join(' '))}`);
            const data = await response.json();

            // Add bot's response to local state
            if (data && data.output) {
                setMessages(prev => [...prev, { role: 'bot', content: data.output }]);
            }

        } catch (error) {
            console.error("Error communicating with OpenAI: ", error);
        }

        // Clear the input
        setUserInput('');
    }


    return (
        <ChatBotContainer>
            <ChatBotHeader color={botColor}>
                <ChatBotTitle>{name}</ChatBotTitle>
                <CloseButton>
                    <Icon viewBox="0 0 24 24" fill="#fff">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2Zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793Z"></path>
                    </Icon>
                </CloseButton>
            </ChatBotHeader>
            <ChatBotBody ref={chatBodyRef}>
                <ChatBotMessageList>
                    {messages.map((message, index) => message.role === 'bot' ?
                        <ChatBotMessage key={index} color={botColor}>{message.content}</ChatBotMessage> :
                        <UserMessage key={index} color={userColor}>{message.content}</UserMessage>
                    )}
                </ChatBotMessageList>
            </ChatBotBody>
            <ChatBotFooter>
                <ChatBotInput
                    color={userColor}
                    placeholder="Type a message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <SendButton onClick={handleSendMessage}>
                    <Icon viewBox="0 0 24 24" fill='#000'>
                        <path d="M21.243 12.437a.5.5 0 0 0 0-.874l-2.282-1.268A75.497 75.497 0 0 0 4.813 4.231l-.665-.208A.5.5 0 0 0 3.5 4.5v5.75a.5.5 0 0 0 .474.5l1.01.053a44.41 44.41 0 0 1 7.314.998l.238.053c.053.011.076.033.089.05a.163.163 0 0 1 .029.096c0 .04-.013.074-.029.096-.013.017-.036.039-.089.05l-.238.053a44.509 44.509 0 0 1-7.315.999l-1.01.053a.5.5 0 0 0-.473.499v5.75a.5.5 0 0 0 .65.477l.664-.208a75.499 75.499 0 0 0 14.146-6.064l2.283-1.268Z"></path>
                    </Icon>
                </SendButton>
            </ChatBotFooter>
        </ChatBotContainer>
    );
}