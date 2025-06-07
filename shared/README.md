# kataoffical
git add .
git commit -m "update"
git push


npx ng generate library shared-auth --prefix=kata # Hoặc prefix khác
npx ng generate component components/login --project=shared-auth --export
npx ng generate component components/register --project=shared-auth --export
npx ng generate service services/shared-auth --project=shared-auth
npx ng generate guard guards/shared-auth --project=shared-auth
npx ng build shared-auth

npx ng generate library shared-component --prefix=kata
npx ng generate component components/table --project=shared-component --export

npx ng generate library kata --prefix=kata
npx ng generate component components/table --project=kata --export
npx ng generate component button --project=shared --standalone --export
npx ng build kata

npx ng generate library shared --prefix=kata
npx ng generate component components/table --project=shared --export
npx ng generate component components/pagination --project=shared --export
npx ng build shared
npm login
npm publish --access public


abc