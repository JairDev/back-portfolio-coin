const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
  try {
    //obtener el token del encabezado de autorización
    const token = await request.headers.authorization.split(" ")[1];
    //comprobar si el token generado coincide con la cadena
    const decodeToken = await jwt.verify(token, "RANDOM-TOKEN");
    const user = decodeToken;
    request.user = user;
    next();
  } catch (error) {
    response.status.json({
      error: new Error("Invalid request!"),
    });
  }
};
