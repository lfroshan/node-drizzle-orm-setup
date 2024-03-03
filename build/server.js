"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const envConfigs_1 = require("./config/envConfigs");
const connection_1 = __importDefault(require("./db/postgres/connection"));
connection_1.default.getInstance()
    .then(res => {
    console.info(`Connected to Database Successfully!`);
    app_1.default.listen(envConfigs_1.ENV_COFIGS.port, () => {
        console.info(`Server Started, Listening on PORT: ${envConfigs_1.ENV_COFIGS.port}`);
    });
})
    .catch(err => {
    console.error(`Error in connection: \n${err.message}`);
});
