'use client';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/contexts/user/UserContext';
import { listenToMessagesGlobal } from '@/graphql/chat/subscription';
import { client } from '@/contexts/AmplifyContext';
import { listMyChats } from '@/graphql/chat/query';

export default function MessageNotification() {
    const { user } = useContext(UserContext);
    const [chats, setChats] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const retrieveChats = async () => {
            try {
                const { data } = await client.graphql({
                    query: listMyChats,
                    variables: { customerId: user.id }
                });
                const combinedChats = [
                    ...data.listChatsWithTechnicians.items,
                    ...data.listChatsWithAdmins.items
                ];
                setChats(combinedChats);
            } catch (error) {
                console.error("Error fetching chats", error);
            }
        };

        if (user?.id) {
            retrieveChats();
        }
    }, [user?.id]);

    useEffect(() => {
        const cleanupSubscriptions = () => {
            subscriptions.forEach(sub => sub.unsubscribe());
            setSubscriptions([]);
        };

        const subscribeToMessages = () => {
            cleanupSubscriptions();
            const subs = chats.map(chat =>
                client.graphql({
                    query: listenToMessagesGlobal,
                    variables: { chatId: chat.id }
                }).subscribe({
                    next: ({ data }) => {
                        const newMessage = data.onCreateMessage;
                        if (newMessage.sender !== user.id) {
                            console.log("Notification triggered for:", newMessage.content);
                            showNotification(newMessage);
                        }
                    },
                    error: (error) => console.warn("Subscription error", error)
                })
            );
            setSubscriptions(subs);
        };

        if (chats.length > 0) {
            subscribeToMessages();
        }

        return cleanupSubscriptions; // Cleanup on component unmount
    }, [chats]);

    const showNotification = (message) => {
        if (Notification.permission === 'granted') {
            new Notification('New message', {
                body: message.content,
            });
        }
    };

    useEffect(() => {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
    }, []);

    return null;
}
