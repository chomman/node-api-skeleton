import * as Hapi from "hapi";
import * as Joi from "joi";

import MemberHandler from "./member-handler";
import * as MemberValidator from "./member-validator";
import { IDatabase } from "../../database/database";
import { IServerConfigurations } from "../../configs";

export default function (
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDatabase
) {
  const memberHandler = new MemberHandler(configs, database);
  server.bind(memberHandler);

  server.route([{
    method: "GET",
    path: "/members/{id}",
    options: {
      handler: memberHandler.getMemberById,
      tags: ["api", "members"],
      description: "Get Member by id.",
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Member founded."
            },
            "404": {
              description: "Member does not exists."
            }
          }
        }
      }
    }
  },
  {
    method: "DELETE",
    path: "/members/{id}",
    options: {
      handler: memberHandler.deleteMember,
      tags: ["api", "members"],
      description: "Delete Member by id.",
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deleted Member."
            },
            "404": {
              description: "Member does not exists."
            }
          }
        }
      }
    }
  },
  {
    method: "PUT",
    path: "/members/{id}",
    options: {
      handler: memberHandler.updateMember,
      tags: ["api", "members"],
      description: "Update Member by id.",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: MemberValidator.updateMemberModel
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deleted Member."
            },
            "404": {
              description: "Member does not exists."
            }
          }
        }
      }
    }
  },
  {
    method: "POST",
    path: "/members",
    options: {
      handler: memberHandler.createMember,
      tags: ["api", "members"],
      description: "Create a Member.",
      validate: {
        payload: MemberValidator.createMemberModel
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Created Member."
            }
          }
        }
      }
    }
  }]);
}
