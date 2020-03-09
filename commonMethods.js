const responseFile = require('./response/res.json');
const expect = require('chai').expect;
const supertest = require('supertest');
const request = supertest('');
const fs = require('fs');

//return an array of values that match on a certain key
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

// function updateValues(obj, key, val, newVal) {
function updateValues(obj, key, newVal) {
    var newValue = newVal;
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            // objects = objects.concat(updateValues(obj[i], key, val, newValue));
            objects = objects.concat(updateValues(obj[i], key, newValue));
            // } else if (i == key && obj[key] == val) {
        } else if (i == key) {
            obj[key] = newValue;
        }
    }
    return obj;
}

//return an array of keys that match on a certain value
function getKeys(obj, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
}

function readResponseData() {
    return responseFile;
}

function getRequest(url, done) {
    request
        .get(url)
        .end(function (err, res) {
            if (err) return done(err);
            //expect(res.statusCode).to.equal(statusCode);
            //expect(res.body.data.first_name).to.equal(key);
            //console.log(res.body);
            done();
        });
};

function postRequest(url, statusCode, payload) {
    request
        .post(url)
        // Setting Headers
        .set('Accept', 'application/json')
        // Request Payload
        .send(payload)
        .end(function (err, res) {
            if (err) return done(err);
            // Validating the Response Body
            expect(res.body.name).to.equal("morpheus");
            // Validating the Response Status Code
            expect(res.statusCode).to.equal(statusCode);
            done();
        });
}

module.exports = {
    getValues,
    readResponseData,
    getKeys,
    getRequest,
    postRequest,
    updateValues
}