import InputConverter from "../../components/InputConverter";
const faker = require("faker");

describe('Input Converter', () => {
    let converter;

    beforeAll(() => {
        converter = new InputConverter();
    });

    test('Return of the input controller is correct', () => {
        const {x, y, type} = setupFakeData();

        expect(converter.convert(type, x, y)).toBe(`${type[0]}|${x > 0 ? "+" : "-"}|${y > 0 ? "+" : "-"}|${calculate(x, y)}`);
    });

    test('Return of start is correct', () => {
        expect(converter.convert('start')).toBe(`s|+|+|0`)
    });

    test('Compressed value is correct', () => {
        const getX = (combined, state) => {
            let x = Number((Math.floor((combined / 1024)) / 1000));
            if (state === '-') {
                x = x * -1;
            }
            return Number(x.toFixed(3));
        };

        const getY = (combined, state) => {
            let y = Number((Math.floor(combined % 1024) / 1000).toFixed(3));
            if (state === '-') {
                y = y * -1;
            }
            return Number(y.toFixed(3));
        };

        const {x, y, type} = setupFakeData();

        // [0] = type | [1] = x sign | [2] = y sign | [3] = combined value
        let result = converter.convert(type, x, y).split("|");

        let resultX = getX(result[3], result[1]);
        let resultY = getY(result[3], result[2]);

        expect(Number(Number(x).toFixed(3)) === resultX && Number(Number(y).toFixed(3)) === resultY).toBeTruthy();
    });

    /**
     * Helper Method to setupFakeData using faker.js.
     * @returns {{x: *, y: *, type: *}}
     */
    const setupFakeData = () => {
        return {
            x: faker.finance.amount(-1, 1, 5),
            y: faker.finance.amount(-1, 1, 5),
            type: faker.random.arrayElement(["left", "right"])
        };
    };

    /**
     * Helper method for compressing two values.
     * @param x
     * @param y
     * @returns {number}
     */
    const calculate = (x, y) => {
        if (x < 0) {
            x *= -1;
        }

        if (y < 0) {
            y *= -1;
        }

        return ((Number(x).toFixed(3) * 1000) * 1024) + (Number(y).toFixed(3) * 1000);
    };
});

