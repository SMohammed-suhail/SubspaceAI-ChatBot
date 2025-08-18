# SubspaceAI-ChatBot
A modern, real-time AI chat application built with React, TypeScript, and Firebase. Features secure authentication, persistent conversations, and seamless integration with Google's Gemini AI for intelligent responses.

## ✨ Features

- 🤖 **AI-Powered Conversations** - Integrated with Google Gemini 2.0 Flash for intelligent responses
- 🔐 **Secure Authentication** - Firebase Auth with email verification
- 💬 **Real-time Chat** - Instant messaging with persistent conversation history
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ☁️ **Cloud Storage** - Conversations saved securely in Firestore
- 🎨 **Modern Interface** - Clean, intuitive design with Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project with Authentication and Firestore enabled
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/subspaceai.git
   cd subspaceai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password) and Firestore
   - Update `src/config/firebase.ts` with your Firebase config

4. **Set up Gemini AI**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Update the API key in `src/services/gemini.ts`

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **AI Integration**: Google Gemini 2.0 Flash
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AuthScreen.tsx   # Authentication interface
│   ├── ChatArea.tsx     # Main chat interface
│   ├── ChatList.tsx     # Chat history sidebar
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Authentication logic
│   └── useChats.ts      # Chat management
├── services/            # External service integrations
│   └── gemini.ts        # Gemini AI API client
├── config/              # Configuration files
│   └── firebase.ts      # Firebase configuration
└── types/               # TypeScript type definitions
    └── index.ts
```

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Authentication with Email/Password provider
3. Create a Firestore database
4. Update `src/config/firebase.ts` with your config

### Gemini AI Setup
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Generate an API key
3. Replace the API key in `src/services/gemini.ts`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📝 Usage

1. **Sign Up**: Create an account with email verification
2. **Verify Email**: Check your inbox (and spam folder) for verification link
3. **Sign In**: Access the chat interface after verification
4. **Start Chatting**: Create new conversations and chat with AI
5. **History**: Access previous conversations from the sidebar

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://deepmind.google/technologies/gemini/) for powerful AI capabilities
- [Firebase](https://firebase.google.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Firebase**
