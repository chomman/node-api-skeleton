import * as Hapi from "hapi";
import * as _ from 'lodash';
import * as Joi from 'joi';

import { getProxyConfig } from "../../configs";
import { IRequest } from '../../common/interfaces/request';
import { jwtValidator } from "../users/user-validator";

const buildProxyGateway = (services: string[]) => {
  const r = [];
  services.map(s => {
    r.push({
      method: '*',
      path: `/{${s}*}`,
      handler: {
        proxy: getProxyConfig(s)
      },
      options: {
        validate: {
          headers: jwtValidator
        },
      }
    });
  });

  return r;
};

export function init(
  server: Hapi.Server
) {
  // Register proxy
  server.route(buildProxyGateway(["a"]));

  // Redirect home route
  server.route([{
    method: "GET",
    path: "/",
    options: {
      auth: false
    },
    handler: (request: IRequest, h: Hapi.ResponseToolkit) => {
      return h.redirect('/docs');
    }
  }]);
}