import * as Hapi from "hapi";
import * as _ from 'lodash';

import { getProxyConfig, IProxyConfigurations, IProxyService } from "../../configs";
import { IRequest } from '../../common/interfaces/request';

const buildProxyGateway = (proxyConfigs: IProxyConfigurations) => {
  let r = [];
  const services = proxyConfigs.services;
  services.map(s => {
    r.push({
      method: '*',
      path: `/{${s.prefixPath}*}`,
      handler: {
        proxy: s.config
      }
    });
    // Register documentation routes
    r = _.concat(r, buildWildcardRoutes(s, ["docs", "swaggerui/{c*}", "swagger.json"], 'GET'));
  });

  return r;
};

const buildWildcardRoutes = (service: IProxyService, patterns: string[], method: string) => {
  const r = [];
  patterns.map(p => {
    r.push({
      method: method,
        path: `/${service.prefixPath}/${p}`,
        handler: {
          proxy: service.config
        },
        options: {
          auth: false,
          tags: p === 'docs' ? [service.tag, "api"] : []
        }
    });
  });

  return r;
};

export function init(
  server: Hapi.Server
) {
  // Register proxy
  server.route(buildProxyGateway(getProxyConfig()));

  // Redirect home route
  server.route([
    {
      method: "GET",
      path: "/",
      options: {
        auth: false
      },
      handler: (request: IRequest, h: Hapi.ResponseToolkit) => {
        return h.redirect('/docs');
      }
    }
  ]);
}