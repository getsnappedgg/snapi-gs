"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const build = (data) => {
    const { id, name, cost, power, description, sourceId, keywords } = data;
    return {
        id,
        name,
        cost,
        power,
        description,
        source: sourceId,
        keywords,
    };
};
exports.build = build;
//# sourceMappingURL=cardModel.js.map