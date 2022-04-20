const fenToPosition = require('../js/utils/fen-to-position.js')
const gameChecks = require('../js/goals/game-checks.js')
const pieceStructures = require('../js/goals/piece-structures.js')

describe('test no stalemate tricks', () => {
    test.each([
        'k7/2K5/8/2B5/8/p7/P7/8 b - - 16 76', // https://lichess.org/CP6xHNub/black
    ])(
        'test FEN: %p',
        (fen) => {
            expect(gameChecks.stalemateTricks({ status: 'stalemate' }, fenToPosition(fen), 'white')).toBe(false)
        }
    )
})

// describe('test stalemate tricks', () => {
//     test.each([
//         ['white', 'k7/8/8/8/8/1NN5/1NN5/K7 w - - 0 1'],
//         ['black', 'k7/1nn5/1nn5/8/8/8/8/K7 w - - 0 1'],

//         ['black', '7k/7P/5PK1/8/8/6P1/8/8 b - - 0 55'], // https://lichess.org/7SXEmbld/black#109
//     ])(
//         'test FEN: %p',
//         (color, fen) => {
//             expect(gameChecks.stalemateTricks({ status: 'stalemate' }, fenToPosition(fen), color)).toBe(color)
//         }
//     )
// })
