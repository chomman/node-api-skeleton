import * as Jwt from "jsonwebtoken";
import { getServerConfigs } from "../../configs";

const config: any = getServerConfigs();

//To generate new JWT token using predefined signatire
export const generateToken = (user: any) => {
    console.log(config["jwtSecret"]);
    const jwtSecret = config.jwtSecret;
    const jwtExpiration = config.jwtExpiration;
    const payload = { id: user["_id"] };
    return Jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
};