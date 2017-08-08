    const shapeshift = require('shapeshift');
    const pair = 'btc_ltc';

    shapeshift.getRate(pair)
      .then(function(data) {
        console.log('data: ', data)
        //do something w/ data
        // document.body.innerHTML = "<h1>" + data + "</h1>"
      });
