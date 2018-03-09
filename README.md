# bank-system
PIRIS labs

1. install mongo (globaly)
2. npm install
3. add myData.js file to sources (look at the myData.sample.js)
4. if you need ti change user fields according to variant, you should add it to common/schemas.js in      USER_SCHEMA
5. run db/create.js as node process
6. npm run watch
7. npm run start

If you want to create users with random values, just add 'RandomInput' in mixins to /public/js/components/users/userModal/content/UserModalContent.vue.
To insert personal data - add 'MyCredentials'.
