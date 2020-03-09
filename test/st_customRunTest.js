const common = require('../commonMethods');
const csvFilePath = 'csv/data.csv';
const csv = require('csvtojson');
var validate = require('jsonschema').validate;
const expect = require('chai').expect;
const fs = require('fs');
const supertest = require('supertest');
const request = supertest('');
var requests = [];
var urls = [];
var dataFiles = [];
var arrayIndexes = [];
var extractResponses = [];
var updateResponses = [];
var extractedValues = [];
var statusCodes = [];
var reqPayloads = [];
var schemas = [];

describe('Data Driven Api Testing', function () {
    before('should parse the CSV file into JSON and read the data', function (done) {
        csv()
            .fromFile(csvFilePath)
            .then((jsonObj) => {
                var jsonObject = JSON.stringify(jsonObj);
                // Save the parsed CSV data as JSON object in a file
                fs.writeFile("utils/csvData.json", jsonObject, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    // Import the recently created/updated JSON file
                    const csvTestData = require('../utils/csvData.json');
                    csvTestData.forEach(function (obj) {
                        requests.push(obj.reqType);
                        urls.push(obj.url);
                        dataFiles.push(obj.dataFile);
                        arrayIndexes.push(obj.arrayIndex);
                        extractResponses.push(obj.extractResponse);
                        updateResponses.push(obj.updateResponse);
                        statusCodes.push(obj.resStatusCode);
                        reqPayloads.push(obj.reqPayload);
                        schemas.push(obj.schemaToValidate);
                    });
                    done();
                });
            })
    });

    function getRequest(url, ext, obj, file, upd, ind, code, schema, done) {
        request
            .get(url)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.statusCode).to.equal(parseInt(code));
                if (schema !== '') {
                    console.log('Validating Schema!');
                    var result = validate(res.body, schema);
                    expect(result.errors.length).to.equal(0);
                }
                var responseBody = JSON.stringify(res.body);
                fs.writeFile("response/response.json", responseBody, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Response saved to external file.");
                });
                if (file !== '' && upd !== '' && ext !== '' && ind !== '') {
                    extractedValues = common.getValues(res.body, ext);
                    var value = extractedValues[ind];
                    var updatedObj = JSON.stringify(common.updateValues(obj, upd, value));
                    fs.writeFile(file, updatedObj, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("File Updated!");
                    });
                }
                done();
            });
    };

    function postRequest(url, payload, ext, obj, file, upd, ind, code, schema, done) {
        if (payload === '') {
            request
                .post(url)
                .set('Accept', 'application/json')
                .send(obj)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.statusCode).to.equal(parseInt(code));
                    if (schema !== '') {
                        console.log('Validating Schema!');
                        var result = validate(res.body, schema);
                        expect(result.errors.length).to.equal(0);
                    }
                    var responseBody = JSON.stringify(res.body);
                    fs.writeFile("response/response.json", responseBody, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("Response saved to external file.");
                    });
                    if (file !== '' && upd !== '' && ext !== '' && ind !== '') {
                        extractedValues = common.getValues(res.body, ext);
                        var value = extractedValues[ind];
                        var updatedObj = JSON.stringify(common.updateValues(obj, upd, value));
                        fs.writeFile(file, updatedObj, function (err) {
                            if (err) {
                                return console.log(err);
                            }
                            console.log("File Updated!");
                        });
                    }
                    done();
                });
        }
        else if (payload !== '') {
            request
                .post(url)
                .set('Accept', 'application/json')
                .send(payload)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.statusCode).to.equal(parseInt(code));
                    if (schema !== '') {
                        console.log('Validating Schema!');
                        var result = validate(res.body, schema);
                        expect(result.errors.length).to.equal(0);
                    }
                    var responseBody = JSON.stringify(res.body);
                    fs.writeFile("response/response.json", responseBody, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("Response saved to external file.");
                    });
                    if (file !== '' && upd !== '' && ext !== '' && ind !== '') {
                        extractedValues = common.getValues(res.body, ext);
                        var value = extractedValues[ind];
                        var updatedObj = JSON.stringify(common.updateValues(obj, upd, value));
                        fs.writeFile(file, updatedObj, function (err) {
                            if (err) {
                                return console.log(err);
                            }
                            console.log("File Updated!");
                        });
                    }
                    done();
                });
        }
    }

    function putRequest(url, payload, ext, obj, file, upd, ind, code, schema, done) {
        if (payload === '') {
            request
                .put(url)
                .set('Accept', 'application/json')
                .send(obj)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.statusCode).to.equal(parseInt(code));
                    if (schema !== '') {
                        console.log('Validating Schema!');
                        var result = validate(res.body, schema);
                        expect(result.errors.length).to.equal(0);
                    }
                    var responseBody = JSON.stringify(res.body);
                    fs.writeFile("response/response.json", responseBody, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("Response saved to external file.");
                    });
                    if (file !== '' && upd !== '' && ext !== '' && ind !== '') {
                        extractedValues = common.getValues(res.body, ext);
                        var value = extractedValues[ind];
                        var updatedObj = JSON.stringify(common.updateValues(obj, upd, value));
                        fs.writeFile(file, updatedObj, function (err) {
                            if (err) {
                                return console.log(err);
                            }
                            console.log("File Updated!");
                        });
                    }
                    done();
                });
        }
        else if (payload !== '') {
            request
                .put(url)
                .set('Accept', 'application/json')
                .send(payload)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.statusCode).to.equal(parseInt(code));
                    if (schema !== '') {
                        console.log('Validating Schema!');
                        var result = validate(res.body, schema);
                        expect(result.errors.length).to.equal(0);
                    }
                    var responseBody = JSON.stringify(res.body);
                    fs.writeFile("response/response.json", responseBody, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("Response saved to external file.");
                    });
                    if (file !== '' && upd !== '' && ext !== '' && ind !== '') {
                        extractedValues = common.getValues(res.body, ext);
                        var value = extractedValues[ind];
                        var updatedObj = JSON.stringify(common.updateValues(obj, upd, value));
                        fs.writeFile(file, updatedObj, function (err) {
                            if (err) {
                                return console.log(err);
                            }
                            console.log("File Updated!");
                        });
                    }
                    done();
                });
        }
    }

    function itShouldTestEachReq(ind) {
        it('Request #' + ind + " = " + requests[ind], function (done) {
            var dataFileObject = require(dataFiles[ind]);
            if (requests[ind] === "GET") {
                if (schemas[ind] !== '') {
                    var schema = JSON.parse(schemas[ind]);
                }
                else (schema = schemas[ind]);
                getRequest(
                    urls[ind],
                    extractResponses[ind],
                    dataFileObject,
                    dataFiles[ind],
                    updateResponses[ind],
                    arrayIndexes[ind],
                    statusCodes[ind],
                    schema,
                    done
                );
            }
            else if (requests[ind] === "POST") {
                if (reqPayloads[ind] !== '') {
                    var reqBody = JSON.parse(reqPayloads[ind]);
                }
                else (reqBody = reqPayloads[ind]);
                if (schemas[ind] !== '') {
                    var schema = JSON.parse(schemas[ind]);
                }
                else (schema = schemas[ind]);
                postRequest(
                    urls[ind],
                    reqBody,
                    extractResponses[ind],
                    dataFileObject,
                    dataFiles[ind],
                    updateResponses[ind],
                    arrayIndexes[ind],
                    statusCodes[ind],
                    schema,
                    done
                );
            }
            else if (requests[ind] === "PUT") {
                if (reqPayloads[ind] !== '') {
                    var reqBody = JSON.parse(reqPayloads[ind]);
                }
                else (reqBody = reqPayloads[ind]);
                if (schemas[ind] !== '') {
                    var schema = JSON.parse(schemas[ind]);
                }
                else (schema = schemas[ind]);
                putRequest(
                    urls[ind],
                    reqBody,
                    extractResponses[ind],
                    dataFileObject,
                    dataFiles[ind],
                    updateResponses[ind],
                    arrayIndexes[ind],
                    statusCodes[ind],
                    schema,
                    done
                );
            }
        })
    }

    it('Testing all HTTP Requests identified from the CSV File', function () {
        describe('Testing all HTTP Requests identified from the CSV File', () => {
            for (var ind in requests) {
                itShouldTestEachReq(ind);
            }
        });
    });
});