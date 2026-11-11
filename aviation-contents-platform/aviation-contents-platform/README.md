# Aviation Contents: full platform

    aviation-contents-platform/
    ├── frontend/            React + Vite (http://localhost:5173)
    ├── backend/             Express + MongoDB + Socket.IO (http://localhost:5000)
    └── docker-compose.yml   optional local MongoDB

Requirements: Node.js 18 or newer, and one MongoDB (Atlas or local, see step 1).

## 1. Get a MongoDB database (pick ONE)

### Option A: MongoDB Atlas (free, cloud, recommended)
1. Sign up at https://www.mongodb.com/cloud/atlas and create a free **M0** cluster.
2. **Database Access** > Add New Database User > username + password (Read and write to any database).
   Prefer letters and numbers in the password; otherwise URL-encode special characters (`@` becomes `%40`).
3. **Network Access** > Add IP Address. Use "Add Current IP Address" (or `0.0.0.0/0` for testing only).
4. **Database** > Connect > Drivers. Copy the connection string and add the database name before the `?`:

       mongodb+srv://USER:PASSWORD@cluster0.abcde.mongodb.net/aviation_contents?retryWrites=true&w=majority

   The `aviation_contents` database and its collections are created automatically on first write.

### Option B: Local MongoDB
- Docker: run `docker compose up -d` in this folder, then use `mongodb://127.0.0.1:27017/aviation_contents`.
- Or install MongoDB Community Server from mongodb.com and use the same URI.

## 2. Configure and start the backend
    cd backend
    cp .env.example .env          # Windows: copy .env.example .env
Edit `.env`:
- `MONGODB_URI` = your string from step 1
- `JWT_SECRET` = a long random value. Generate one with:
  `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
- leave `CLIENT_URL=http://localhost:5173` for development

    npm install
    npm run seed                  # optional: demo users, stories, magazines (wipes those collections)
    npm run dev

You should see `MongoDB connected` and `API + Socket.IO on http://localhost:5000`.
Check it: open http://localhost:5000/api/health, which returns `{"ok":true}`.

## 3. Start the frontend (second terminal)
    cd frontend
    npm install
    npm run dev                   # open http://localhost:5173

No frontend `.env` is needed in development: Vite proxies `/api`, `/uploads` and `/socket.io` to port 5000.

## 4. Make yourself an admin
1. Register in the app (Create Account).
2. In `backend/` run: `npm run make-admin -- you@example.com`
3. Reload the app. A **Dashboard** link appears for editors and admins.
(If you ran the seed, you can instead sign in as `admin@example.com` / `Password123!`. Change that password. All seeded users share it.)

## 5. Check that everything works
- Sign in, click **Write a Story**, publish. The story appears on Home and Explore.
- Open the site in two browser windows. Publish in one; the other shows the "new story" notice and the story appears live.
- Upload a featured image in the editor (stored in `backend/uploads/`).
- Report a story, then resolve it from the Dashboard.
- In Atlas: Browse Collections > `aviation_contents` > users, stories, magazines, reports.

## Troubleshooting
| Symptom | Fix |
|---|---|
| `Could not connect to MongoDB` / timeout | Add your IP in Atlas Network Access; confirm user and password; encode special characters in the password |
| `bad auth` | Wrong database username or password in `MONGODB_URI` |
| `Missing required env var` | `.env` is missing or not in `backend/` |
| Login works but you are signed out on refresh | Use the Vite dev server on :5173 (proxy keeps cookies same-origin); do not open the API URL directly |
| Frontend says "Cannot reach the server" | Backend is not running on port 5000 |
| CORS error | `CLIENT_URL` in `backend/.env` must exactly match the frontend origin |
| Port 5000 busy (macOS AirPlay) | Set `PORT=5001` in `backend/.env` and change the three proxy targets in `frontend/vite.config.js` |

## Going to production
- Frontend: `npm run build`, host `dist/` on any static host. Set `VITE_API_URL=https://api.yourdomain.com/api` and
  `VITE_SOCKET_URL=https://api.yourdomain.com` before building.
- Backend: host on a Node service (Render, Railway, Fly, a VPS). Set `NODE_ENV=production`, a strong `JWT_SECRET`,
  your Atlas `MONGODB_URI`, and `CLIENT_URL=https://yourdomain.com`. Use HTTPS so the cookie can be `Secure`.
- Media: local `uploads/` disappears on most hosts. Switch `backend/src/middleware/upload.js` to S3 or Cloudinary.
- Atlas: replace `0.0.0.0/0` with your server's IP, and never commit `.env`.
- Not included yet: email verification, password reset, the photo lightbox, video player, magazine reader, and automated tests.
