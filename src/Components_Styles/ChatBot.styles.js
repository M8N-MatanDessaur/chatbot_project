import styled from 'styled-components';

export const baseButtonStyles = `
  background-color: #000;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    & svg {
      transition: all 0.05s ease-in-out;
      transform: scale(1.05);
    }
  }
`;

export const ChatBotContainer = styled.div`
  position: absolute;
  bottom: 35px;
  right: 35px;
  display: flex;
  flex-direction: column;
  height: 550px;
  width: 400px;
  border-radius: 35px;
  border: 5px solid #000;
  background-color: #fff;

  @media (max-width: 500px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    border: none;
    bottom: 0;
    right: 0;
  }
`;

export const ChatBotHeader = styled.div`
  background-color: ${props => props.color};
  color: #fff;
  border-radius: 29px 29px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 35px;

  @media (max-width: 500px) {
    border-radius: 0;
  }
`;

export const ChatBotTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
`;

export const CloseButton = styled.button`
  ${baseButtonStyles}
  padding: 2px;
  border-radius: 50px;
`;

export const ChatBotBody = styled.div`
  background-color: transparent;
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
`;

export const ChatBotMessageList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChatBotMessage = styled.div`
  background-color: ${props => props.color};
  border-radius: 15px 15px 0 15px;
  color: #fff;
  margin-bottom: 8px;
  max-width: 85%;
  padding: 8px 16px;
  align-self: flex-start;
`;

export const UserMessage = styled.div`
  background-color: ${props => props.color};
  border-radius: 15px 15px 15px 0;
  color: #fff;
  margin-bottom: 8px;
  max-width: 85%;
  padding: 8px 16px;
  align-self: flex-end;
`;

export const MessageText = styled.p`
  font-size: 1rem;
  margin: 0;
`;

export const ChatBotFooter = styled.div`
  position: relative;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  padding: 16px;
`;

export const ChatBotInput = styled.input`
  border: 1px solid #e0e0e0;
  border-radius: 50px;
  flex-grow: 1;
  font-size: 1.2rem;
  padding: 8px 60px 8px 16px;
  height: 60px;
  background: #000;
  color: #fff;
`;

export const SendButton = styled.button`
  ${baseButtonStyles}
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: #fff;
  padding: 12px;
  border-radius: 50px;
`;

export const Icon = styled.svg`
  height: 28px;
  width: 28px;
`;