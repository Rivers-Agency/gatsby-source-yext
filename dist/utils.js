"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFolders = fetchFolders;
exports.fetchContent = fetchContent;
const headers = {
    "Content-Type": `application/json`,
};
function fetchFolders(pluginOptions_1) {
    return __awaiter(this, arguments, void 0, function* (pluginOptions, pageToken = '') {
        const { apiKey, accountId, apiVersion } = pluginOptions;
        const url = `https://api.yextapis.com/v2/accounts/${accountId}/folders?api_key=${apiKey}&v=${apiVersion}${pluginOptions.pageLimit ? `&limit=${pluginOptions.pageLimit}` : ''}${pageToken ? `&pageToken=${pageToken}` : ''}`;
        const response = yield fetch(url, {
            method: `GET`,
            headers,
        });
        return yield response.json();
    });
}
function fetchContent(pluginOptions_1) {
    return __awaiter(this, arguments, void 0, function* (pluginOptions, pageToken = '') {
        const { apiKey, accountId, apiVersion, entityTypes } = pluginOptions;
        const url = `https://api.yextapis.com/v2/accounts/${accountId}/entities?api_key=${apiKey}&v=${apiVersion}&entityTypes=${entityTypes.join(',')}${pluginOptions.pageLimit ? `&limit=${pluginOptions.pageLimit}` : ''}${pageToken ? `&pageToken=${pageToken}` : ''}`;
        const response = yield fetch(url, {
            method: `GET`,
            headers,
        });
        return yield response.json();
    });
}
