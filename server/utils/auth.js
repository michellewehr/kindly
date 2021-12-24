const jwt = require('jsonwebtoken');

const secret = 'secreeeet';
const expiration = '2h';

module.exports = {
  signToken: function ({ email, _id }) {
    const payload = { email, _id };

    const tokenBeingSigned = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    console.log(tokenBeingSigned, 'I am getting signed!!!');
    return tokenBeingSigned;
  },
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    // if no token, return request object as is
    if (!token) return req;

    try {
      console.log(token, 'inside verification function');
      // decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log(data, 'data after verification')
      req.user = data;
      console.log(req.user, 'req.user')
    } catch {
      console.log('Invalid token');
    }
    // return updated request object
    return req;
  }
};
