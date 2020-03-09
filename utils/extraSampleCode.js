const assert = require('assert');
const forEach = require('mocha-each');
require('it-each')();
require('it-each')({ testPerIteration: true });
/* it('should read data and make the respective request', function () {
        for (var ind in requests) {
            itShouldTestEachReq(ind);
        }
    }); */

/* for (var ind in requests) {
    it('HTTP Request # ' + ind, function (done) {
        if (requests[ind] === "GET") {
            common.getRequest(urls[ind], done)
        }
        else if (requests[ind] === "POST") {
            common.getRequest(urls[ind], done)
        }
    });
}; */

/* it('testing .......', function () {
    it.each(requests, 'Testing %s Request', ['element'], function (element, next) {
        if (requests[ind] === "GET") {
            //common.getRequest(urls[ind], done)
            console.log(element);
            next();
        }
        else if (requests[ind] === "POST") {
            //common.getRequest(urls[ind], done)
            console.log(element);
            next();
        }
        var ind = ind + 1;
    });
}) */

/* it('testing .......', function () {
    forEach(requests)
        .it('Test HTTP Request %s', (req, done) => {
            if (requests[ind] === "GET") {
                //common.getRequest(urls[ind], done)
                console.log(req);
                done();
            }
            else if (requests[ind] === "POST") {
                //common.getRequest(urls[ind], done)
                console.log(req);
                done();
            }
        });
    var ind = ind + 1;
}) */