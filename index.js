
const randomstring = require('randomstring');
const random_name = require('node-random-name');
const starwars = require('starwars-names');
const lotr = require('lotr-names');
const niceware = require('niceware')

const emailDomains = require('./email-domains');
const passwords = require('./top-passwords');

function getRandom(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomInitialLastName() {
  return `${randomChar()}${randomSeparator()}${random_name({last:true,random: Math.random}).toLowerCase()}`
}

function randomFullName() {
  return `${random_name({first:true,random: Math.random}).toLowerCase()}${randomSeparator()}${random_name({last:true,random: Math.random}).toLowerCase()}`
}

function randomChar() {
  return randomstring.generate({
    charset: 'alphabetic',
    length: 1,
  });
}

function randomSeparator() {
  const num = Math.random();
  return num < .25 ? 
    num < .5 ?
    '.' : '_' : ''
}

function randomStarWarsName() {
  const names = starwars.random().split(/\s/);
  return names[getRandom(0, names.length)].toLowerCase();
}

function randomLotrName() {
  const names = lotr.random().split(/\s/);
  return names[getRandom(0, names.length)].toLowerCase();
}

function getRandomUsername() {
  const rand = getRandom(0,31);
  if (rand === 30) return randomStarWarsName();
  if (rand === 29) return randomLotrName();
  if (rand > 20) return randomFullName();
  return randomInitialLastName();
}

function getRandomPassword() {
  const rand = getRandom(0,20);
  if (rand > 28) return randomPassphrase();
  if (rand === 20) return randomRandomPassword();
  if (rand > 20) return randomFullName();
  if (rand > 10) return `${randomCommonPassword()}${getRandom(10,99)}`;
  return randomCommonPassword();
}

function getRandomHostname() {
  return emailDomains.domains[getRandom(0, emailDomains.domains.length)];
}

function randomRandomPassword() {
  return randomstring.generate(getRandom(8,24));
}

function randomPassphrase() {
  const num = getRandom(1,4);
  return niceware.generatePassphrase(6).slice(0,num).join(randomSeparator());
}

function randomCommonPassword() {
  return passwords.passwords[getRandom(0,passwords.passwords.length)];
}

function randomCredentials() {
  return `${getRandomUsername().toLowerCase()}@${getRandomHostname()}:${getRandomPassword()}`;
}

module.exports = {
  getRandom,
  randomInitialLastName,
  randomFullName,
  randomChar,
  randomSeparator,
  randomStarWarsName,
  randomLotrName,
  getRandomUsername,
  getRandomPassword,
  getRandomHostname,
  randomRandomPassword,
  randomPassphrase,
  randomPassphrase,
  randomCommonPassword,
  randomCredentials
}
