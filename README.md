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