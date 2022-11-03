import { check } from "express-validator"

import validateResults from "../utils/handleValidator.js"


export const validatorCreate = [
  check("name")
    .exists()
    .notEmpty(),
  check("description")
    .exists()
    .notEmpty(),
  check("price")
    .exists()
    .notEmpty(),  
  (req, res, next) => validateResults(req, res, next)
];
export const validatorGet = [
  check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
  (req, res, next) => validateResults(req, res, next)
];

//check("mediaId")
  //.exists()
  //.notEmpty()
  //.isMongoId(),


