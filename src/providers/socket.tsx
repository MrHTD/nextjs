'use client';
import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

type SocketContextType = {
    isConnected: boolean;
    socket: {
        on: (event: string, callback: (data: any) => void) => void;
        off: (event: string, callback: (data: any) => void) => void;
        emit: (event: string, data?: any) => void;
        disconnect: () => void;
    };

};

const SOCKET_URL = 'https://mawrid.backend.devxonic.com/websocket';
const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef<WebSocket | null>(null);
    const eventListeners = useRef<Map<string, Set<(data: any) => void>>>(new Map());

    const emit = useCallback((event: string, data?: any) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            // Merge event and data into a single object
            const message = JSON.stringify({ action: event, type: event, ...data });
            console.log('Emitting:', message);
            ws.current.send(message);
        } else {
            console.warn('Socket not connected, cannot emit:', event);
        }
    }, []);

    const on = useCallback((event: string, callback: (data: any) => void) => {
        console.log('Adding listener for:', event);
        if (!eventListeners.current.has(event)) {
            eventListeners.current.set(event, new Set());
        }
        eventListeners.current.get(event)?.add(callback);
    }, []);

    const off = useCallback((event: string, callback: (data: any) => void) => {
        eventListeners.current.get(event)?.delete(callback);
    }, []);

    const disconnect = useCallback(() => {
        if (ws.current) {
            ws.current.close();
            setIsConnected(false);
        }
    }, []);

    useEffect(() => {
        ws.current = new WebSocket(SOCKET_URL);

        ws.current.addEventListener('open', () => {
            console.log('Socket Connected');
            setIsConnected(true);
        });

        ws.current.addEventListener('message', (event) => {
            try {
                console.log('Received: message', event);
                const messageData = JSON.parse(event.data);
                // Extract action and remaining data
                const { action, ...data } = messageData;
                console.log('Received:', action, data);
                // action on get the event name
                eventListeners.current.get('message')?.forEach(callback => callback(data));
            } catch (error) {
                console.error('Error handling message:', error);
            }
        });

        ws.current.addEventListener('close', () => {
            console.log('Socket Disconnected');
            setIsConnected(false);
        });

        ws.current.addEventListener('error', (error) => {
            console.error('Socket Error:', error);
        });

        return () => {
            ws.current?.close();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ isConnected, socket: { emit, on, off, disconnect } }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
