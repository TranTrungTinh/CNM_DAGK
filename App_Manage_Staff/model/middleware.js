const {createToken , verifyToken} = require('./jwt');
const db = require('./fbConfig');
const email = "trantrungtinh4954@gmail.com";

class Middleware {
  static async signIn(usname , passw) {
    const data = await db().ref('signin').once('value');
    data.forEach(user => {
      const {username , password} = user.val();
      if(usname != username || passw != password) throw new Error('FAIL');
    });
    const payload = {username: usname , email};
    const token = await createToken(payload);
    if(!token) throw new Error('FAIL');
    return token;
  }

  static isLogin(req , res , next) {
    const {token} = req.cookies;
    if(!token) return res.send({error: "FAIL"});
    verifyToken(token)
    .then(data => createToken(data))
    .then(newToken => next())
    .catch(() => res.send({error: "FAIL"}));
  }
}
module.exports = Middleware;