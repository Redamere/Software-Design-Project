
async function AuthController(request, response) {

    const {username} = request.body;
    const userDB = await User.findOne({username});
    if(userDB) {
        return response.status(400).send({msg: 'User already exists'});
    }
    else {
      const password = hashPassword(request.body.password);
      console.log(password);
      const newUser = await User.create({username,
          password
      });
      response.status(201).send({msg: 'User created'});
    }
  }
  module.exports = AuthController;