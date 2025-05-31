
import { useState } from "react";
import { UserLogin } from "../components/UserLogin";
import { AdminLogin } from "../components/AdminLogin";
import { UserDashboard } from "../components/UserDashboard";
import { AdminDashboard } from "../components/AdminDashboard";

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  userId: string;
  userName: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  attachments?: string[];
};

export type Message = {
  id: string;
  ticketId: string;
  content: string;
  senderRole: 'user' | 'admin';
  senderName: string;
  timestamp: string;
};

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginType, setLoginType] = useState<'user' | 'admin' | null>(null);

  // Sample tickets data
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      title: 'Unable to reset password',
      description: 'I cannot reset my password using the forgot password link.',
      status: 'open',
      priority: 'high',
      userId: '1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      messages: [
        {
          id: '1',
          ticketId: '1',
          content: 'I cannot reset my password using the forgot password link. I have tried multiple times but no email is being received.',
          senderRole: 'user',
          senderName: 'John Doe',
          timestamp: '2024-01-15T10:30:00Z'
        }
      ]
    },
    {
      id: '2',
      title: 'Billing discrepancy',
      description: 'There seems to be an error in my latest invoice.',
      status: 'in-progress',
      priority: 'medium',
      userId: '2',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      createdAt: '2024-01-14T14:20:00Z',
      updatedAt: '2024-01-15T09:15:00Z',
      messages: [
        {
          id: '2',
          ticketId: '2',
          content: 'There seems to be an error in my latest invoice. I was charged twice for the same service.',
          senderRole: 'user',
          senderName: 'Jane Smith',
          timestamp: '2024-01-14T14:20:00Z'
        },
        {
          id: '3',
          ticketId: '2',
          content: 'Thank you for reaching out. I can see the duplicate charge on your account. Let me investigate this and get back to you within 24 hours.',
          senderRole: 'admin',
          senderName: 'Support Agent',
          timestamp: '2024-01-15T09:15:00Z'
        }
      ]
    }
  ]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setLoginType(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginType(null);
  };

  const updateTicket = (updatedTicket: Ticket) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    ));
  };

  const createTicket = (newTicket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    const ticket: Ticket = {
      ...newTicket,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTickets(prev => [ticket, ...prev]);
  };

  if (!currentUser && !loginType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Support Ticket System
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get help when you need it, manage tickets efficiently
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div 
              onClick={() => setLoginType('user')}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Customer Portal</h3>
                <p className="text-gray-600 mb-4">Submit and track your support tickets</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Create new tickets</li>
                  <li>• Upload attachments</li>
                  <li>• Chat with support</li>
                  <li>• Track ticket status</li>
                </ul>
              </div>
            </div>

            <div 
              onClick={() => setLoginType('admin')}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Admin Panel</h3>
                <p className="text-gray-600 mb-4">Manage and resolve support tickets</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• View all tickets</li>
                  <li>• Filter by status</li>
                  <li>• Respond to customers</li>
                  <li>• Update ticket status</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser && loginType === 'user') {
    return <UserLogin onLogin={handleLogin} onBack={() => setLoginType(null)} />;
  }

  if (!currentUser && loginType === 'admin') {
    return <AdminLogin onLogin={handleLogin} onBack={() => setLoginType(null)} />;
  }

  if (currentUser?.role === 'user') {
    return (
      <UserDashboard 
        user={currentUser} 
        tickets={tickets.filter(t => t.userId === currentUser.id)} 
        onLogout={handleLogout}
        onCreateTicket={createTicket}
        onUpdateTicket={updateTicket}
      />
    );
  }

  if (currentUser?.role === 'admin') {
    return (
      <AdminDashboard 
        user={currentUser} 
        tickets={tickets} 
        onLogout={handleLogout}
        onUpdateTicket={updateTicket}
      />
    );
  }

  return null;
};

export default Index;
