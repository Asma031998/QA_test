This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, set your BD in .env.local where {DBNAME}:

```bash
MONGODB_URI=mongodb+srv://mamadou:codedb0@cluster0.rub2l.mongodb.net/{DBNAME}?retryWrites=true&w=majority
MONGODB_DB={DBNAME}
```

Example:

```bash
MONGODB_URI=mongodb+srv://mamadou:codedb0@cluster0.rub2l.mongodb.net/MAMADOU?retryWrites=true&w=majority
MONGODB_DB=MAMADOU
```

Second, install dependence & run the development server:

```bash
npm install

npm run dev
# or
yarn install

yarn dev
```

# Initialize the database

Visit the following url once.

http://localhost:3000/api/initData

You should see the following response indicating the database was populated with default values

```
{"status":200,"data":{"reinsurer":[{"_id":"62b5776ea7970dce0417c3af","name":"Reinsurer 1","email":"reinsurer1@gmail.com","password":"123","type":"REINSURER","__v":0},{"_id":"62b5776ea7970dce0417c3b1","name":"Reinsurer 2","email":"reinsurer2@gmail.com","password":"123","type":"REINSURER","__v":0},{"_id":"62b5776ea7970dce0417c3b3","name":"Reinsurer 3","email":"reinsurer3@gmail.com","password":"123","type":"REINSURER","__v":0},{"_id":"62b5776ea7970dce0417c3b5","name":"Reinsurer 4","email":"reinsurer4@gmail.com","password":"123","type":"REINSURER","__v":0}],"termList":[{"_id":"62b5776fa7970dce0417c3b8","reinsurer":{"_id":"62b5776ea7970dce0417c3af","name":"Reinsurer 1","email":"reinsurer1@gmail.com"},"share":30,"__v":0},{"_id":"62b5776fa7970dce0417c3ba","reinsurer":{"_id":"62b5776ea7970dce0417c3b1","name":"Reinsurer 2","email":"reinsurer2@gmail.com"},"share":30,"__v":0},{"_id":"62b5776fa7970dce0417c3bc","reinsurer":{"_id":"62b5776ea7970dce0417c3b3","name":"Reinsurer 3","email":"reinsurer3@gmail.com"},"share":30,"__v":0},{"_id":"62b5776fa7970dce0417c3be","reinsurer":{"_id":"62b5776ea7970dce0417c3b5","name":"Reinsurer 4","email":"reinsurer4@gmail.com"},"share":30,"__v":0}],"finalTerms":{"price":10,"terms":["62b5776fa7970dce0417c3b8","62b5776fa7970dce0417c3ba","62b5776fa7970dce0417c3bc","62b5776fa7970dce0417c3be"],"_id":"62b5776fa7970dce0417c3c3","__v":0}}}
```

# Open the app

http://localhost:3000

connect insurer credentials: ` username: insurer@gmail.com, password: 123`
connect reinsurer credentials:
`username: reinsurer@gmail.com, password: 123`

`username: reinsurer2@gmail.com, password: 123`

`username: reinsurer3@gmail.com, password: 123`

`username: reinsurer4@gmail.com, password: 123`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Cypress e2e

Cypress e2e framework is installed in the /cypress directory.
See cypress documentaiton and package.json for usage.
