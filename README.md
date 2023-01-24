
# MV Test Project

A social media project like instagram for test purpose. This repo consist two projects backend and frontend.

## Frontend App

Is reactjs app with tailwindcss and daisyUi, using reduxtolkit as state management.


### How to run

Clone the project

```bash
  git clone https://github.com/alsocodes/mvtest.git
```

Go to the project directory

```bash
  cd mvtest/frontend
```

Create and update environment as your preferences

```bash
  cp .env.example .env
```

Install dependencies

```bash
  npm install
  or
  yarn install
```

Start the development

```bash
  npm run start
  or 
  yarn start
```


## Backend App
Is restful API build with Nestjs framework, using Prisma as Object Relational Mapping(ORM) and Database Postgresql


### How to run
Clone the project

```bash
  git clone https://github.com/alsocodes/mvtest.git
```

Go to project directory

```bash
  cd mvtest/backend
```

Create and update environment as your preferences

```bash
  cp .env.example .env
```

Install dependencies

```bash
  npm install
  or 
  yarn install

```

Run Prisma Migration

```bash
  yarn prisma db push

```

Start Development Server

```bash
  yarn start:dev
  or
  npm run start:dev

```
## Demo

https://mvtest.alsoproject.my.id/


## Tech Stack

**Client:** React, Redux, TailwindCSS, DaisyUi

**Server:** Node, NestJs, Prisma, Postgresql

