1. npm init -y
2. npm i @types/node typescript
3. npm i -D ts-node
4. git init
5. touch .gitignore // creamos archivo .gitignore
6. en gitingore sacamos carpeta node_modules
7. creamos carpeta ~/src
8. npm i -g typescript
9. tsc --init
10. editamos tsconfig generado en 9 y seeamos outDir: "./dist" y rootDir: "./src"
11. agregamos carpeta dist a .gitignore
12. git add .
13. git commit -m "Iniciando servidor web"
14. en package.json
```
"scripts": {
    "dev": "ts-node ./src/app.ts",
    "start": "node ./dist/app.js",
    "build": "tsc"
  },
```
15. npm i express @types/express