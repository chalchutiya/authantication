const dbconnect = require('../dbcontrol/mongo')

///// To Get the DATA /////
async function getcds() {
  const credentials = await dbconnect();
  const data = await credentials.find({}).toArray();
  return data;
}

//// to set a new user data  ///////
async function setcds(username, password) {

  const credentials = await dbconnect();
  result = await credentials.findOne({ "username": username })

  if (result)
    return "Username Already Exists Choose Unique Username";
  else {
    const inserted = await credentials.insertOne({ "username": username, "password": password, })
    console.log(inserted)
    if (inserted.acknowledged == true)
      return `The username : ${username} Created Thanks!`;
    else
      return "There is some problem in server or Database";
  }
}


// to verify user to login
async function verifycds(username, password) {
 
  const credentials = await dbconnect();
  result = await credentials.findOne({ "username": username })

  if (result) {
    if (result.password == password) {
      console.log(username +" is now looged in.....");
      return {sc:200,message:{result:'YOU ARE LOGGED IN NOW.........'}};
    }
    else {
      return {sc:401,message:{result:'The Given Cridentials are Wrong please try again'}};
    }
  }
  else {
    return {sc:401,message:{result:'The Given Cridentials are Wrong please try again'}};
  }
}

module.exports = {
  getcds,
  setcds,
  verifycds
}