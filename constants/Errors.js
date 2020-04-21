'use strict';

/**
 *
 * @type {{displayText: string, slug: string}}
 */
export const WEBSOCKET_NO_CONNECTIONS = {
  slug: "ws_no_connection",
  displayText: "Es konnte keine Verbindung zum Server hergestellt werden."
};

/**
 *
 * @param type
 * @returns {string}
 * @constructor
 */
export const TYPE_DOESNT_EXISTS = type => `The type ${type} doesn't exists!`;