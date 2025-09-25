import { useState, useEffect } from 'react';
import { MessageCircle, X, Bot, User } from 'lucide-react';

const OmegaChatbotSimple = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! I\'m Omega Assistant, your virtual assistant to discover our research and consulting services.',
      isBot: true,
      timestamp: new Date()
    }
  ]);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative"
        >
          <div className="relative">
            <Bot className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" />
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 absolute -bottom-1 -right-1 bg-white text-blue-600 rounded-full p-0.5 group-hover:scale-110 transition-transform" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full animate-pulse flex items-center justify-center">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-[min(85vw,500px)] h-[min(70vh,600px)] sm:w-[500px] sm:h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 sm:p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Omega Assistant</h3>
                <p className="text-xs text-blue-100 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto h-[calc(min(70vh,600px)-8rem)] sm:h-[450px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[90%] sm:max-w-[85%] ${
                  message.isBot ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {message.isBot ? <Bot className="w-4 h-4 sm:w-5 sm:h-5" /> : <User className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
                  <div className={`px-3 py-2 sm:px-4 sm:py-2 rounded-2xl ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}>
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isBot ? 'text-gray-500' : 'text-blue-100'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OmegaChatbotSimple;
