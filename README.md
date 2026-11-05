# KisaanSeva

KisaanSeva is a React frontend with an Express backend for crop, fertilizer,
and plant-disease predictions.

## Run locally

Install dependencies from the project root:

```sh
npm install
```

Start the frontend:

```sh
npm start
```

Start the backend in a separate terminal:

```sh
npm run start:backend
```

The backend listens on `PORT` when set, or port `5000` otherwise. It loads
local secrets from `backend/.env`; set `CHATBASE_API_KEY` and
`CHATBASE_BOT_ID` there to enable chatbot responses.

## Deploy the backend

Use the repository root as the service root and set the start command to
`npm run start:backend`. Configure `CHATBASE_API_KEY` and `CHATBASE_BOT_ID` as
deployment environment variables. The hosting platform supplies the `PORT`
value.

The frontend prediction and chatbot requests currently use
`https://kisaanseva-backend-main.onrender.com`.

## Checks

```sh
npm test -- --watchAll=false
npm run build
```
