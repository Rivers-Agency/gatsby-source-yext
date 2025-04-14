"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.createSchemaCustomization = exports.sourceNodes = exports.onPluginInit = void 0;
var on_plugin_init_1 = require("./on-plugin-init");
__createBinding(exports, on_plugin_init_1, "onPluginInit");
var source_nodes_1 = require("./source-nodes");
__createBinding(exports, source_nodes_1, "sourceNodes");
var create_schema_customization_1 = require("./create-schema-customization");
__createBinding(exports, create_schema_customization_1, "createSchemaCustomization");
