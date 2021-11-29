<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/leandrodcs/gratibox-front">
    <img src="./gratibox.gif" alt="Logo" width="auto" height="auto">
  </a>

  <h3 align="center">Gratibox</h3>

  <p align="center">
    Helping you to be more grateful!
    <br />
    <a href="https://github.com/leandrodcs/gratibox-front"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://gratibox-front.vercel.app/">View Demo</a>
    <br />
  </p>
</p>

## Technologies

The following tools and frameworks were used in the construction of the project:
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white'>
</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Create a root project folder named gratibox for semantics
```sh
mkdir gratibox
```
2. Clone the front-end repo (within the /gratibox folder)
```sh
git clone https://github.com/leandrodcs/gratibox-front.git
```
3. Install NPM packages for the front-end repo
```sh
npm install
```
4. Clone the back-end repo (within the /gratibox folder)
```sh
git clone https://github.com/leandrodcs/gratibox-back.git
```
5. Install NPM packages for the back-end repo
```sh
npm install
```
6. Create a database using the command below via postgres
```sh
CREATE DATABASE gratibox
```
7. Inside the created database, create tables using the dump included in the back-end repo <a href="https://github.com/leandrodcs/gratibox-back/blob/main/dump.sql">here</a>.

8. Connect to the created database using the .env.example included in the back-end repo <a href="https://github.com/leandrodcs/gratibox-back/blob/main/.env.example">here</a>, to make it easy, name your .env file like so ".env.dev".

### Running

1. On the back-end repo run the server connected to the database you just created using the following command.
```sh
npm run dev
```
2. Now on the fron-end repo use the same command you just used on step 8 and you should be good.


<!-- USAGE EXAMPLES -->
## Usage

Visitors can `Subscribe` to two different plans, being them `monthly` or `weekly`.

Both plans can provide you with three different kinds of products, being them: `teas`, `organic products` and `incense`. You are free to choose the one you want or even all of them.

The `monthly` subscription will give you one box per month, the `weekly` subscription will give you one box per week.

When you become a subscriber, the `Homepage` will provide you with all your subscription data, including your next three delivery dates, according to the date you chose while subscribing.

<!-- Developer -->
## Developer

* [Leandro D. C. Schmidt ](https://github.com/leandrodcs)