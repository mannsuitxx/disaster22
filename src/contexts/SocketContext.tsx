import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  drillAlert: any | null;
  joinInstitution: (institutionId: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
  drillAlert: null,
  joinInstitution: () => {}
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [drillAlert, setDrillAlert] = useState<any | null>(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');
    
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    newSocket.on('drill-alert', (alert) => {
      console.log('Drill alert received:', alert);
      setDrillAlert(alert);
      
      // Show browser notification if permission granted
      if (Notification.permission === 'granted') {
        new Notification('Emergency Drill Alert', {
          body: alert.message,
          icon: '/favicon.ico'
        });
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const joinInstitution = (institutionId: string) => {
    if (socket) {
      socket.emit('join-institution', institutionId);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, connected, drillAlert, joinInstitution }}>
      {children}
    </SocketContext.Provider>
  );
};