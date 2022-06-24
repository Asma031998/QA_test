This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, set your BD in .env.local where {DBNAME}:

```bash
MONGODB_URI=mongodb+srv://mamadou:codedb0@cluster0.rub2l.mongodb.net/{DBNAME}?retryWrites=true&w=majority
MONGODB_DB={DBNAME}

```


Second, install dependence &  run the development server:

```bash
npm install 

npm run dev
# or
yarn install

yarn dev

```
Third , init BD in that order

```bash
localhost/3000/api/insurer/init
localhost/3000/api/term/init
localhost/3000/api/finalTerms/init
```


connect insurer credentials: ` username: insurer@gmail.com, password: 123`
connect reinsurer credentials: 
`username: reinsurer@gmail.com, password: 123` 

`username: reinsurer2@gmail.com, password: 123`

`username: reinsurer3@gmail.com, password: 123`

`username: reinsurer4@gmail.com, password: 123`



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

