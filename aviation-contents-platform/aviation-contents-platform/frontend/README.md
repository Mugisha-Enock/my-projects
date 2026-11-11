# Aviation Contents (React + Vite frontend)

    npm install
    npm run dev        # http://localhost:5173
    npm run build

Demo mode: sign-in is a fake user (`ME` in src/data/data.js) and stories live in memory until reload.
Backend hooks: src/services/api/client.js (REST, uses VITE_API_URL) and
src/services/realtime/index.js (event bus; replace with socket.io-client using VITE_SOCKET_URL).
Copy .env.example to .env to configure.
Not yet built: login/register, dashboard, photo lightbox, video player, magazine reader, media upload.
