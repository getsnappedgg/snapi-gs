"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectType = exports.Source = exports.Role = exports.Keyword = void 0;
var Keyword;
(function (Keyword) {
    Keyword["VANILLA"] = "VANILLA";
    Keyword["REVEAL"] = "REVEAL";
    Keyword["DESTROY"] = "DESTROY";
    Keyword["ONGOING"] = "ONGOING";
    Keyword["DISCARD"] = "DISCARD";
    Keyword["MOVE"] = "MOVE";
    Keyword["SPECIAL"] = "SPECIAL";
})(Keyword = exports.Keyword || (exports.Keyword = {}));
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["MODERATOR"] = "MODERATOR";
})(Role = exports.Role || (exports.Role = {}));
var Source;
(function (Source) {
    Source["STARTER"] = "Starter Season";
    Source["RECRUIT"] = "Recruit Season";
    Source["POOL_0"] = "Collection Pool 0";
    Source["POOL_1"] = "Collection Pool 1";
    Source["POOL_2"] = "Collection Pool 2";
    Source["POOL_3"] = "Collection Pool 3";
    Source["POOL_4"] = "Series 4";
    Source["POOL_5"] = "Series 5";
    Source["SEASONPASS"] = "Season Pass";
    Source["SUMMON"] = "Summon";
})(Source = exports.Source || (exports.Source = {}));
var EffectType;
(function (EffectType) {
    EffectType["BUFF_CARD"] = "BUFF_CARD";
    EffectType["NERF_CARD"] = "NERF_CARD";
    EffectType["BUFF_POWER"] = "BUFF_POWER";
    EffectType["NERF_POWER"] = "NERF_POWER";
    EffectType["ADD_TO_LOCATION"] = "ADD_TO_LOCATION";
    EffectType["SPECIAL"] = "SPECIAL";
})(EffectType = exports.EffectType || (exports.EffectType = {}));
//# sourceMappingURL=enums.js.map