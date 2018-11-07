import * as Jwt from "jsonwebtoken";
import * as Bcrypt from 'bcryptjs';

import { getServerConfigs } from "../../configs";

const config: any = getServerConfigs();

//To generate new JWT token using predefined signatire
export const generateToken = (user: any) => {
    console.log(config["jwtSecret"]);
    const jwtSecret = config.jwtSecret;
    const jwtExpiration = config.jwtExpiration;
    const payload = { id: user.id, email: user.email };
    return Jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
};

export const hashPassword = (password: string): string => {
    if (!password) {
      return null;
    }
    return Bcrypt.hashSync(password, Bcrypt.genSaltSync(8));
};

export const validatePassword = (requestPassword, oldPassword) => {
    console.log(requestPassword);
    console.log(oldPassword);
    return Bcrypt.compareSync(requestPassword, oldPassword);
};