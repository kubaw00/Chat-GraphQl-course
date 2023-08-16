import { gql } from '@apollo/client';

export const messagesQuery = gql`
  query MessagesQuery {
    messages {
      id
      user
      text
    }
  }
`;

export const addMessageMutation = gql`
  mutation AddMessageMutation($text: String!) {
    message: addMessage(text: $text) {
      id
      user
      text
    }
  }
`;

export const addSubscription = gql`
  subscription AddMessageSubscription {
    message: messageAdded {
      id
      text
      user
    }
  }
`;
