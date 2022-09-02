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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_api_v2_1 = require("twitter-api-v2");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Trying to tweet');
        if (typeof process.env.BEARER_TOKEN === 'string' &&
            typeof process.env.ACCESS_TOKEN === 'string' &&
            typeof process.env.ACCESS_TOKEN_SECRET === 'string' &&
            typeof process.env.CONSUMER_KEY === 'string' &&
            typeof process.env.CONSUMER_SECRET === 'string') {
            const access = process.env.ACCESS_TOKEN;
            const accessSecret = process.env.ACCESS_TOKEN_SECRET;
            const consumer = process.env.CONSUMER_KEY;
            const consumerSecret = process.env.CONSUMER_SECRET;
            const client = new twitter_api_v2_1.TwitterApi({
                appKey: consumer,
                appSecret: consumerSecret,
                accessToken: access,
                accessSecret: accessSecret,
            });
            // First, post all your images to Twitter
            const mediaIds = yield Promise.all([
                // file path
                client.v1.uploadMedia('./perstai.jpg'),
            ]);
            console.log('Posting');
            // mediaIds is a string[], can be given to .tweet
            yield client.v1.tweet('Perstai!', {
                media_ids: mediaIds,
            });
            console.log('Posted');
        }
        else
            throw new Error(`Invalid tokens`);
    });
}
const checkFriday = () => {
    const day = new Date().getUTCDay();
    const hours = new Date().getUTCHours();
    console.log('Day: ', day);
    console.log('Hours: ', hours);
    if (day === 5 && hours >= 8 && hours < 9) {
        void main();
    }
};
checkFriday();
setInterval(checkFriday, 3600000); // one hour check.
