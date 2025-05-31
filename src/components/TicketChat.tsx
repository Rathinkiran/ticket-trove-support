
import { useState } from "react";
import { User, Ticket, Message } from "../pages/Index";

interface TicketChatProps {
  ticket: Ticket;
  user: User;
  onBack: () => void;
  onUpdateTicket: (ticket: Ticket) => void;
}

export const TicketChat = ({ ticket, user, onBack, onUpdateTicket }: TicketChatProps) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      ticketId: ticket.id,
      content: newMessage,
      senderRole: user.role,
      senderName: user.name,
      timestamp: new Date().toISOString()
    };

    const updatedTicket: Ticket = {
      ...ticket,
      messages: [...ticket.messages, message],
      updatedAt: new Date().toISOString()
    };

    onUpdateTicket(updatedTicket);
    setNewMessage('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{ticket.title}</h1>
                <p className="text-sm text-gray-600">Ticket #{ticket.id}</p>
              </div>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(ticket.status)}`}>
              {ticket.status.replace('-', ' ')}
            </span>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {ticket.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderRole === user.role ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.senderRole === user.role
                    ? 'bg-blue-600 text-white'
                    : message.senderRole === 'admin'
                    ? 'bg-green-100 text-green-900'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="text-xs opacity-75 mb-1">
                    {message.senderName} • {new Date(message.timestamp).toLocaleString()}
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          {ticket.status !== 'resolved' && (
            <div className="border-t p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Send
                </button>
              </form>
            </div>
          )}

          {ticket.status === 'resolved' && (
            <div className="border-t p-4 bg-green-50">
              <div className="flex items-center text-green-800">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                This ticket has been resolved. Thank you for contacting support!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
