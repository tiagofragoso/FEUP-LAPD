# FEUP-LAPD

Project developed in the LAPD course @FEUP

## **musicl**: Music information platform

**musicl** is a full-stack web application that merges data from different Music APIs to offer information on ALbums, Artists and Tracks as well as lyrics.

### Data sources

- Spotify API
- Wikipedia API
- Vagalume API

> **Disclaimer**: The information provided by this application is owned by the APIs being used and credit should be given to the data sources.

### Technologies

**Backend**:

- Node.js
- Express

**Frontend**:

- React
- Redux
- MaterialUI

### How to run

> Requires Node.js >= v10  

#### Frontend

Populate `fe/.env` with `API_URL`

```bash
cd fe
npm i
npm start
```

#### Backend

Populate `be/.env` with Spotify credentials

```bash
cd be
npm i
npm start # or npm run watch (uses Nodemon and restarts when code changes occur)
```

## Developers

- Mariana Aguiar [mbaguiar](https://github.com/mbaguiar)
- Tiago Castro [tiagoacastro](https://github.com/tiagoacastro)
- Tiago Fragoso [tiagofragoso](https://github.com/tiagofragoso)