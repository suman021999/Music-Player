## Screenshots

### Home Screen
![Home Screen](public/images/Home.png)

### Playlist Screen
![Playlist Screen](public/images/playlist.png)



� Music Player App - README
📝 Overview
A full-stack music player application built with the MERN stack (MongoDB, Express.js, React, and Node.js) that allows users to browse and play music tracks, create playlists, and manage their music library.
______________________________________________________________________________________________________________________________________________________________________________________________________________
✨ Features
🎵 Core Features
🎧 Music Playback: Play, pause, skip tracks with a responsive audio player.

📋 Playlist Management: Create, view, and manage custom playlists.

🎶 Track Browser: Browse available music tracks with details.

🔍 Search Functionality: Search for tracks in your library.

📱 Responsive UI: Works on both desktop and mobile devices.

⚙️ Technical Features
🔄 MERN Stack Architecture: MongoDB, Express, React, and Node.js.

🌐 RESTful API: Backend service for music and playlist management.
______________________________________________________________________________________________________________________________________________________________________________________________________________
🛠️ Installation
📋 Prerequisites
Node.js (v14 or later)

MongoDB (local or Atlas cluster)

npm or yarn

🔧 Setup Instructions
Clone the repository:

bash
git clone https://github.com/suman021999/Music-Player

cd music-player-mern
Install dependencies:

bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
Environment Setup:
Create a .env file in the server directory with:

text
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
🚀 Run the application:

bash
# Start server
cd server && npm start

# Start client (in another terminal)
cd client && npm start
______________________________________________________________________________________________________________________________________________________________________________________________________________

📂 Project Structure
text
music-player-mern/
├── client/               # React frontend
│   ├── public/           # 🖼️ Static assets
│   ├── src/              # ⚛️ React components
│   │   ├── components/   # 🔄 Reusable UI components
│   │   ├── pages/        # 📄 Page components
│   │   ├── sidebar/      # 🗂️ Sidebar for all pages
│   │   ├── index/        # 🎨 Index CSS
│   │   └── App.js        # 🏁 Main App component
│   └── package.json      # 📦 Frontend dependencies
│
├── server/               # 🖥️ Express backend
│   ├── config/           # ⚙️ Cloudinary config
│   ├── database/         # 🗃️ Database store
│   ├── controllers/      # 🎮 Route controllers
│   ├── models/           # 📊 MongoDB models
│   ├── routes/           # 🛣️ API routes
│   ├── middleware/       # 🔐 Custom middleware
│   └── server.js         # 🚀 Server entry point
│
└── README.md             # 📖 Project documentation
______________________________________________________________________________________________________________________________________________________________________________________________________________

🌐 API Endpoints
Endpoint	Method	Description
/upload	POST	🎵 Upload music (audio file)
/delete/:id	DELETE	🗑️ Delete music track
/	GET	📜 Get all music tracks
_______________________________________________________________________________________________________________________________________________________________________________________________________________

� Available Scripts
🖥️ Client (React)
npm start: Start development server

npm build: Create production build

npm test: Run tests

🖥️ Server (Node.js/Express)
npm start: Start server

npm run dev: Start server with nodemon

npm test: Run tests

______________________________________________________________________________________________________________________________________________________________________________________________________________

🤝 Contributing
Contributions are welcome! Please follow these steps:

🍴 Fork the repository

🌿 Create a feature branch (git checkout -b feature/your-feature)

💾 Commit your changes (git commit -m 'Add some feature')

🚀 Push to the branch (git push origin feature/your-feature)

🔄 Open a Pull Request
_____________________________________________________________________________________________________________________________________________________________________________________________________________

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

_____________________________________________________________________________________________________________________________________________________________________________________________________________

🎧 Happy listening! If you have any questions, please open an issue in the repository.
_____________________________________________________________________________________________________________________________________________________________________________________________________________

