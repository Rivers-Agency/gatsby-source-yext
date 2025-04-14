"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.sourceNodes = void 0;
var lodash_1 = require("lodash");
var utils_1 = require("./utils");
var constants_1 = require("./constants");
var isFirstSource = true;
var sourceNodes = function (gatsbyApi, pluginOptions) { return __awaiter(void 0, void 0, void 0, function () {
    var reporter, actions, getNodes, touchNode, entityTypes, apiKey, apiVersion, accountId, hasRequiredOptions, sourcingTimer, contentTypes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reporter = gatsbyApi.reporter, actions = gatsbyApi.actions, getNodes = gatsbyApi.getNodes;
                touchNode = actions.touchNode;
                entityTypes = pluginOptions.entityTypes, apiKey = pluginOptions.apiKey, apiVersion = pluginOptions.apiVersion, accountId = pluginOptions.accountId;
                hasRequiredOptions = true;
                if (!entityTypes) {
                    reporter.panic("".concat(constants_1.PLUGIN_NAME, ": Missing required option \"entityTypes\". See https://hitchhikers.yext.com/docs/managementapis/content/entities#operation/listEntities"));
                    hasRequiredOptions = false;
                }
                if (!apiKey) {
                    reporter.panic("".concat(constants_1.PLUGIN_NAME, ": Missing required option \"apiKey\""));
                    hasRequiredOptions = false;
                }
                if (!apiVersion) {
                    reporter.panic("".concat(constants_1.PLUGIN_NAME, ": Missing required option \"apiVersion\""));
                    hasRequiredOptions = false;
                }
                if (!accountId) {
                    reporter.panic("".concat(constants_1.PLUGIN_NAME, ": Missing required option \"accountId\""));
                    hasRequiredOptions = false;
                }
                if (!hasRequiredOptions) {
                    return [2 /*return*/];
                }
                sourcingTimer = reporter.activityTimer("Sourcing content from Yext");
                sourcingTimer.start();
                if (isFirstSource) {
                    (0, lodash_1.forEach)(getNodes(), function (node) {
                        if (node.internal.owner !== constants_1.PLUGIN_NAME) {
                            return;
                        }
                        touchNode(node);
                    });
                    isFirstSource = false;
                }
                contentTypes = ['entities', 'folders'];
                return [4 /*yield*/, Promise.all((0, lodash_1.map)(contentTypes, function (contentType) {
                        return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fetchContentFromManagementApi(contentType, gatsbyApi, pluginOptions, reporter)];
                                    case 1:
                                        _a.sent();
                                        resolve();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }))];
            case 1:
                _a.sent();
                sourcingTimer.end();
                return [2 /*return*/];
        }
    });
}); };
exports.sourceNodes = sourceNodes;
function fetchContentFromManagementApi(contentType, gatsbyApi, pluginOptions, reporter) {
    return __awaiter(this, void 0, void 0, function () {
        var createNodeId, createContentDigest, actions, createNode, sourcingTimer, hasNextPage, nextPageToken, response, errors, pageToken, contentNodes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createNodeId = gatsbyApi.createNodeId, createContentDigest = gatsbyApi.createContentDigest, actions = gatsbyApi.actions;
                    createNode = actions.createNode;
                    sourcingTimer = reporter.activityTimer("".concat(constants_1.PLUGIN_NAME, ": Fetching ").concat(contentType, " from Yext Management API"));
                    sourcingTimer.start();
                    hasNextPage = true;
                    nextPageToken = null;
                    _a.label = 1;
                case 1:
                    if (!hasNextPage) return [3 /*break*/, 6];
                    response = void 0;
                    if (!(contentType === 'entities')) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, utils_1.fetchContent)(pluginOptions, nextPageToken)];
                case 2:
                    response = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, (0, utils_1.fetchFolders)(pluginOptions, nextPageToken)];
                case 4:
                    response = _a.sent();
                    _a.label = 5;
                case 5:
                    errors = response.meta.errors;
                    if (errors.length) {
                        reporter.panicOnBuild("".concat(constants_1.PLUGIN_NAME, ": Error fetching ").concat(contentType, " from Yext: ").concat(errors[0].message));
                        hasNextPage = false;
                    }
                    else {
                        pageToken = response.response.pageToken;
                        contentNodes = response.response[contentType];
                        if (!pageToken) {
                            hasNextPage = false;
                        }
                        else {
                            nextPageToken = pageToken;
                        }
                        (0, lodash_1.forEach)(contentNodes, function (contentNode) {
                            var data = {}, nodeType, uniqueId;
                            if (contentType === 'entities') {
                                nodeType = "Yext".concat((0, lodash_1.upperFirst)(contentNode.meta.entityType));
                                uniqueId = contentNode.meta.id;
                                data = contentNode;
                            }
                            else {
                                nodeType = "YextFolder";
                                uniqueId = contentNode.id;
                                data = __assign(__assign({}, contentNode), { folderId: contentNode.id });
                            }
                            var node = __assign(__assign({}, data), { id: createNodeId("".concat(nodeType, "-").concat(uniqueId)), parent: null, children: [], internal: {
                                    type: nodeType,
                                    contentDigest: createContentDigest(data)
                                } });
                            createNode(node);
                        });
                    }
                    return [3 /*break*/, 1];
                case 6:
                    sourcingTimer.end();
                    return [2 /*return*/];
            }
        });
    });
}
