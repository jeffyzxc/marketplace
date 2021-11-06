# new marketplace
![image](https://user-images.githubusercontent.com/9636557/128913665-f111a704-f4a1-4e4d-9395-8b42d71891d9.png)

## Project setup & Dependencies

Install CryptoBlades and CrpytoBlades API first
```
git clone https://github.com/CryptoBlades/cryptoblades-api
```

```
git clone https://github.com/CryptoBlades/cryptoblades
npm install
mv .env.local .env (copy the example env to your local so it can be used)
npm run contract:prepare (this builds your contracts)
npm run contract:deploy (this deploys your contracts to your local blockchain)
npm run start:frontend
```

```
Run Local Cryptoblades app and forge sword -> make a sell of that sword so it appears on local contract with new marketplace. 
```

```
Copy the "Build" folder from Cryptoblades project inside the new marketplace (root)
```

and on the project itself
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
