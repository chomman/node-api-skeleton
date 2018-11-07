import * as Hapi from "hapi";

import { IRequest } from "../../common/interfaces/request";

export function init(
  server: Hapi.Server
) {
  server.route({
    method: "GET",
    path: "/",
    handler: (request: IRequest, h: Hapi.ResponseToolkit) => {
      return h.redirect('/a/docs');
    }
  });
}
