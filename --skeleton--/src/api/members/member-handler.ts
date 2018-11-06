import * as Hapi from "hapi";
import * as Boom from "boom";

import { IDatabase } from "../../database/database";
import { IServerConfigurations } from "../../configs";
import { IRequest } from "../../common/interfaces/request";
import { Member } from "../../database/entities/mongo/member";

export default class MemberHandler {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.configs = configs;
    this.database = database;
  }

  public async createMember(request: IRequest, h: Hapi.ResponseToolkit) {
    var newMember: Member = <Member>request.payload;

    try {
      const memberRepository = this.database.mongoConnection.getRepository(Member);
      let member: Member = await memberRepository.save(newMember);
      return h.response(member).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async updateMember(request: IRequest, h: Hapi.ResponseToolkit) {
    const id = request.params["id"];
    const reqMember: Member = <Member>request.payload;

    try {
      const memberRepository = this.database.mongoConnection.getRepository(Member);
      await memberRepository.update(
        id,
        reqMember
      );

      const member: Member = await memberRepository.findOne(id);

      if (member) {
        return member;
      } else {
        return Boom.notFound();
      }
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async deleteMember(request: IRequest, h: Hapi.ResponseToolkit) {
    let id = request.params["id"];

    const memberRepository = this.database.mongoConnection.getRepository(Member);
    let deletedMember = await memberRepository.delete(id);

    if (deletedMember) {
      return deletedMember;
    } else {
      return Boom.notFound();
    }
  }

  public async getMemberById(request: IRequest, h: Hapi.ResponseToolkit) {
    const id = request.params["id"];

    const memberRepository = this.database.mongoConnection.getRepository(Member);
    const member = await memberRepository.findOne(id,
      {
        cache: {
          id: `memberInfo-${id}`,
          milliseconds: 25000
        }
      });

    if (member) {
      return member;
    } else {
      return Boom.notFound();
    }
  }
}
