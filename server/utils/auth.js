const jwt = require('jsonwebtoken');
<<<<<<< HEAD
=======

// set token secret and expiration date
>>>>>>> MBdevelop
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
<<<<<<< HEAD
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

=======
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  // function for our authenticated routes
  authMiddleware: function ({req}) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization || req.body.token;
    console.log('\n this is the request \n',req.body)
    console.log('\n This is the Token \n',token);

    // ["Bearer", "<tokenvalue>"]
>>>>>>> MBdevelop
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
<<<<<<< HEAD
      return req;
    }

=======
      return req; //res.status(400).json({ message: 'You have no token!' }); (original starter code)
    }

    // verify token and get user data out of it
>>>>>>> MBdevelop
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
<<<<<<< HEAD
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
=======

      return console.log('this is a return!!'); //return res.status(400).json({ message: 'invalid token!' });
    }

    // send to next endpoint
    return req;
  },
};
>>>>>>> MBdevelop
