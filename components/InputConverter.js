import {TYPE_DOESNT_EXISTS} from "../constants/Errors";

/**
 * Converter Class
 */
export default class InputConverter {

    /**
     * Converter Constructor to setup the types.
     */
    constructor() {
        this.types = {
            left: {
                shorthand: "L",
            },
            right: {
                shorthand: "R"
            },
            start: {
                shorthand: "S",
                value: 0,
                x: {
                    symbol: "+"
                },
                y: {
                    symbol: "+"
                }
            }
        }
    }

    /**
     *
     * @param type
     * @param x
     * @param y
     * @returns {*}
     */
    convert(type, x = null, y = null) {
        switch (type) {
            case "start":
                const typeInformation = this.types[type];
                return this._buildString(typeInformation.shorthand, typeInformation.x.symbol, typeInformation.y.symbol, typeInformation.value);
            case "left":
            case "right":
                if (x === null || y === null) {
                    throw "X or Y is not set!"
                }

                return this._buildString(this.types[type].shorthand, this._plusOrMinus(x), this._plusOrMinus(y), this._calculate(x, y));
            default:
                throw TYPE_DOESNT_EXISTS(type);
        }
    }

    /**
     *
     * @param x
     * @param y
     * @returns {number}
     * @private
     */
    _calculate = (x, y) => {
        0 > x && (x *= -1);
        0 > y && (y *= -1);

        return ((Number(x).toFixed(3) * 1000) * 1024) + (Number(y).toFixed(3) * 1000);
    };

    /**
     *
     * @param type
     * @param symbolX
     * @param symbolY
     * @param value
     * @returns {string}
     * @private
     */
    _buildString = (type, symbolX, symbolY, value) => {
        return `${type}|${symbolX}|${symbolY}|${value}`;
    };

    /**
     *
     * @param axis
     * @returns {string}
     * @private
     */
    _plusOrMinus = axis => {
        return Number(axis) > 0 ? "+" : "-";
    };
}