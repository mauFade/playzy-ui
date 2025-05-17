export interface ChatMessageInterface {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private messageHandlers: ((message: ChatMessageInterface) => void)[] = [];

  connect(userId: string, otherUserId: string) {
    const wsUrl = `ws://localhost:8080/ws?userID=${userId}&otherUserID=${otherUserId}`;
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        // Convert the timestamp string back to Date object
        message.timestamp = new Date(message.timestamp);
        this.messageHandlers.forEach((handler) => handler(message));
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.ws.onclose = () => {
      console.log("WebSocket connection closed");
      // Attempt to reconnect after 5 seconds
      setTimeout(() => this.connect(userId, otherUserId), 5000);
    };
  }

  sendMessage(message: ChatMessageInterface) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected");
    }
  }

  addMessageHandler(handler: (message: ChatMessageInterface) => void) {
    this.messageHandlers.push(handler);
  }

  removeMessageHandler(handler: (message: ChatMessageInterface) => void) {
    this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const websocketService = new WebSocketService();
