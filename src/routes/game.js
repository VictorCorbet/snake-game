"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt = __importStar(require("jsonwebtoken"));
const db_1 = require("../db");
const shop_1 = require("./shop");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    let claimsSet = jwt.verify(req.cookies["jwt-token"], "mysecret");
    let name = claimsSet["name"];
    let champion;
    let items;
    shop_1.queryPromise(`select itemname as item from users_items where username like "${name}";
  `, db_1.con)
        .then((result) => {
        if (result) {
            items = result;
            return shop_1.queryPromise(`select username as name, highscore as score from users order by highscore desc limit 10;`, db_1.con);
        }
        else {
            console.log("coult not load items of user");
        }
    })
        .then((result) => {
        if (result) {
            champion = result;
            return shop_1.queryPromise(`select highscore , farbe from users where username like "${name}";`, db_1.con);
        }
        else {
            throw new Error("could not lead scorebord (GlobalScores) ");
        }
    })
        .then((result) => {
        if (result) {
            res.render("game", {
                highscore: result[0].highscore,
                player: name,
                champion: champion,
                farbe: result[0].farbe,
                items: items,
            });
        }
        else {
            throw new Error("could not load highscore");
        }
    });
});
router.post("/", (req, res) => {
    db_1.con.query(`update users set highscore=${req.body.highscore} where username like "${req.body.name}";`, (err, data) => {
        if (!err) {
            res.status(201).send();
        }
        else {
        }
    });
});
exports.default = router;
