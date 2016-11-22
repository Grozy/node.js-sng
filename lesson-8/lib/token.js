'use strict';
const request = require('request');
const qs = require('querystring');
const config = require('../conf/app_config');
const fs = require('fs');
const getAccessToken = function(){
  let queryParams = {
    'grant_type': 'client_credential',
    'appid': config.appId,
    'secret': config.appSecret
  }

  let wxAccessTokenBaseUrl = 'https://api.weixin.qq.com/cgi-bin/token?'+qs.stringify(queryParams);
  let options = {
    method: 'GET',
    url: wxAccessTokenBaseUrl
  };
  return new Promise((resolve, reject) => {
    request(options, function(err, res, body) {
      if (body) {
        console.log('getAccessToken - request finish ' + body);
        resolve(JSON.parse(body));

      } else {
        reject(err);
      }
    });
  });
}

const saveToken = function() {
  getAccessToken().then(res => {
    let token = res['access_token'];
    console.log('token is ' + token);
    fs.writeFile('./token_str', token, function(err){
      console.log('write token fail: ' + err);
    });
  })
}

const refreshToken = function(){
  saveToken();
  setInterval(function(){
    saveToken();
  }, 7000 * 1000);
}

module.exports = refreshToken;
