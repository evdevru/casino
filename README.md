# casino

Link storage (Linux):
sudo ln -s /absolute_path_to/casino/server/public/* /absolute_path_to/casino/static

## Client Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Server Setup

```bash
# install dependencies
$ npm install

# migrate database
$ adonis migration:run

# serve at localhost:3333
$ adonis serve

# generate bots
$ adonis seed
```
