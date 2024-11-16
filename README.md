

---

# VibeCircle - Twitter Clone | Full-Stack App (MERN)

Welcome to **VibeCircle**, a modern social media platform inspired by Twitter, built with the **MERN stack**. This project leverages powerful tools and libraries like **JWT authentication** and **Cloudinary** for media uploads, providing a complete social experience.

### Key Features:
- **Tech Stack**: React.js, MongoDB, Node.js, Express, Tailwind CSS
- **Authentication**: Secure login and registration with **JSON Web Tokens (JWT)**
- **Data Fetching**: Efficient data handling with **React Query** (caching, background sync, etc.)
- **Follow Users**: Suggest and follow other users
- **Posts**: Create, edit, and delete posts
- **Comments**: Add and view comments on posts
- **Likes**: Like posts to show appreciation
- **Profile Management**: Edit user profile details, including cover and profile images
- **Image Uploads**: Seamless image uploads via **Cloudinary**
- **Notifications**: Real-time notifications for interactions
- **Deployment**: https://vibecircle.onrender.com/

### Setup Instructions:

#### 1. Clone the repository
```bash
git clone https://github.com/ainan-code/vibecircle.git
```

#### 2. Install dependencies
Navigate to the project folder and run:
```bash
npm install
```

#### 3. Configure environment variables
Create a `.env` file at the root of the project and add the following values:

```plaintext
MONGO_URI=your_mongo_connection_string
PORT=your_preferred_port
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development_or_production
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### 4. Build the application
To build the project for production, run:
```bash
npm run build
```

#### 5. Start the app
To run the application in development mode, use:
```bash
npm start
```

---

