import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, MessageSquare } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: '',
    company: '',
    sector: ''
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-open after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial bot message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage: Message = {
        id: 1,
        text: "👋 Hello! I'm here to help you learn more about Omega Research. Let me ask you a few quick questions to better assist you.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, [isOpen, messages.length]);

  const conversationFlow = [
    {
      question: "What's your name?",
      field: 'name' as keyof typeof userInfo
    },
    {
      question: "What's your company name?",
      field: 'company' as keyof typeof userInfo
    },
    {
      question: "What sector does your company operate in?",
      field: 'sector' as keyof typeof userInfo
    }
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let botResponse = '';

    if (currentStep < conversationFlow.length) {
      // Store user info and ask next question
      setUserInfo(prev => ({
        ...prev,
        [conversationFlow[currentStep].field]: inputValue
      }));
      
      setCurrentStep(prev => prev + 1);
      
      if (currentStep < conversationFlow.length) {
        botResponse = conversationFlow[currentStep].question;
      } else {
        botResponse = `Thank you ${inputValue}! Now, how can I help you today? Feel free to ask me anything about our research services, methodologies, or how we can assist your business.`;
      }
    } else {
      // After all questions are answered, provide contact response
      botResponse = `Thank you for your question! Based on your information (${userInfo.name} from ${userInfo.company} in the ${userInfo.sector} sector), our team will contact you soon to discuss how Omega Research can help with your specific needs. We typically respond within 24 hours. Is there anything else I can help you with?`;
    }

    const botMessage: Message = {
      id: Date.now() + 1,
      text: botResponse,
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep(0);
    setUserInfo({ name: '', company: '', sector: '' });
    setInputValue('');
  };


  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative"
        >
          <div className="relative">
            <Bot className="w-5 h-5 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" />
            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 absolute -bottom-1 -right-1 bg-white text-blue-600 rounded-full p-0.5 group-hover:scale-110 transition-transform" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full animate-pulse flex items-center justify-center">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
          isMinimized 
            ? 'w-72 h-16 sm:w-80' 
            : 'w-[min(70vw,450px)] h-[min(60vh,500px)] sm:w-[420px] sm:h-[500px]'
        }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 sm:p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-3 h-3 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Omega Research Assistant</h3>
              <p className="text-xs text-blue-100">Online now</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto h-[calc(min(60vh,500px)-8rem)] sm:h-[350px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] sm:max-w-[80%] ${
                    message.isBot ? 'flex-row' : 'flex-row-reverse'
                  }`}>
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isBot 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {message.isBot ? <Bot className="w-3 h-3 sm:w-4 sm:h-4" /> : <User className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </div>
                    <div className={`px-3 py-2 sm:px-4 sm:py-2 rounded-2xl ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-600 text-white'
                    }`}>
                      <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
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
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="px-3 py-2 sm:px-4 sm:py-2 rounded-2xl bg-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-1.5 sm:p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
              
              {/* Reset button */}
              <div className="mt-2 text-center">
                <button
                  onClick={resetChat}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Start new conversation
                </button>
              </div>
            </div>
          </>
        )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
