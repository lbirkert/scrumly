npm install
cp default.env .env
mkdir -p run/avatars
npx prisma db push
npm run dev

