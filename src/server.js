require ("express-async-errors");
require("dotenv/config");
const migrationsRun = require("./database/sqlite/migrations")
const uploadConfig= require("./configs/upload")
const AppError = require("./utils/AppError")

const cors = require("cors");
const express = require("express");

migrationsRun();

const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes);

app.use(( error, request, response, next ) => {

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    error: "Internal Server Error"
  });
})

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));





/*
Get = leitura
Post = Criação
Put = Atualização
Delete = Deleção
Patch = Atualização Parcial



*/

//fgdjifdskfsdf54641684