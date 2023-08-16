import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { addMessageMutation, addSubscription, messagesQuery } from './queries';

export function useAddMessage() {
  const [mutate] = useMutation(addMessageMutation);

  const addMessage = async (text) => {
    const {
      data: { message },
    } = await mutate({
      variables: { text },
    });
    return message;
  };

  return { addMessage };
}

export function useMessages() {
  const { data } = useQuery(messagesQuery);

  useSubscription(addSubscription, {
    onData: ({ client, data }) => {
      const newMessage = data.data.message;
      client.cache.updateQuery({ query: messagesQuery }, ({ messages }) => {
        return {
          messages: [...messages, newMessage],
        };
      });
    },
  });

  return {
    messages: data?.messages ?? [],
  };
}
