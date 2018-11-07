import * as Hapi from "hapi";
import * as Boom from "boom";
import * as uuidv4 from "uuid/v4";


import { IDatabase } from "../../database/database";
import { IServerConfigurations } from "../../configs";
import { IRequest } from "../../common/interfaces/request";
import { User } from '../../database/entities/mysql/user';
import * as Helpers from '../../common/utils/helper';

export default class UserHandler {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.configs = configs;
    this.database = database;
  }

  public async createUser(request: IRequest, h: Hapi.ResponseToolkit) {
    let newUser: User = <User>request.payload;
    newUser.uuid = uuidv4();
    newUser.password = Helpers.hashPassword(newUser.password);

    try {
      const userRepository = this.database.mysqlConnection.getRepository(User);
      const existingUser = await userRepository.findOne({where: u => u === newUser.email});

      if (existingUser) {
        return Boom.conflict("User already existed");
      }

      const user: User = await userRepository.save(newUser);
      return h.response({ token: Helpers.generateToken(user) }).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async loginUser(request: IRequest, h: Hapi.ResponseToolkit) {
    const loginReq: User = <User>request.payload;

    try {
      const userRepository = this.database.mysqlConnection.getRepository(User);
      const user = await userRepository.findOne({ where: u => u.email === loginReq.email });
      if (!user) {
        return Boom.unauthorized("User does not exists.");
      }

      if (!Helpers.validatePassword(loginReq.password, user.password)) {
        return Boom.unauthorized("Password is invalid.");
      }

      return h.response({ token: Helpers.generateToken(user) }).code(200);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }
}
