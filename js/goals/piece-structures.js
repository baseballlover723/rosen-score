export default {
    quadrupledPawns: function (files) {
        for (let file of files) {
            if ((file.match(/P/g) || []).length >= 4) {
                return 'white'
            } else if ((file.match(/p/g) || []).length >= 4) {
                return 'black'
            }
        }

        return false
    },

    tripleDoublePawns: function (position) {
        // Fast check for any kind of doubled pawns to quickly eliminate most positions
        if (!/P[A-Za-z.]{7}P|p[A-Za-z.]{7}p/.test(position)) {
            return false
        }

        for (const piece of ['P', 'p']) {
            const inFile = new Set()
            const re = new RegExp(`${piece}(?=[A-Za-z.]{7}${piece})`, 'g')
            for (const m of position.matchAll(re)) {
                inFile.add(m.index % 8)
            }
            if (inFile.size > 2) {
                return piece === 'P' ? 'white' : 'black'
            }
        }

        return false
    },

    sixPawnsInTheSameFile: function (position) {
        return !!position.match(/p([A-Za-z\.]{7})p([A-Za-z\.]{7})p([A-Za-z\.]{7})p([A-Za-z\.]{7})p([A-Za-z\.]{7})p/i)
    },

    pawnCube: function (position) {
        let match

        match = position.match(/PP([A-Za-z\.]{6})PP/)
        if (match && match.index % 8 < 7) {
            return 'white'
        }

        match = position.match(/pp([A-Za-z\.]{6})pp/)
        if (match && match.index % 8 < 7) {
            return 'black'
        }

        return false
    },

    pawnCubeCenter: function (position) {
        if (position.match(/^([A-Za-z\.]{27})PP([A-Za-z\.]{6})PP/)) {
            return 'white'
        } else if (position.match(/^([A-Za-z\.]{27})pp([A-Za-z\.]{6})pp/)) {
            return 'black'
        }

        return false
    },

    knightCube: function (position) {
        let match

        match = position.match(/NN([A-Za-z\.]{6})NN/)
        if (match && match.index % 8 < 7) {
            return 'white'
        }

        match = position.match(/nn([A-Za-z\.]{6})nn/)
        if (match && match.index % 8 < 7) {
            return 'black'
        }

        return false
    },

    knightRectangle: function (position) {
        let match

        // check for 3x2 rectangle
        match = position.match(/NNN([A-Za-z\.]{5})NNN/)
        if (match && match.index % 8 < 6) {
            return 'white'
        }

        match = position.match(/nnn([A-Za-z\.]{5})nnn/)
        if (match && match.index % 8 < 6) {
            return 'black'
        }

        // check for 2x3 rectangle
        match = position.match(/NN([A-Za-z\.]{6})NN([A-Za-z\.]{6})NN/)
        if (match && match.index % 8 < 7) {
            return 'white'
        }

        match = position.match(/nn([A-Za-z\.]{6})nn([A-Za-z\.]{6})nn/)
        if (match && match.index % 8 < 7) {
            return 'black'
        }

        return false
    },

    threeByThreeCubes: function (position) {
        return [...position.matchAll(/([\w]{3})[\w\.]{5}([\w]{3})[\w\.]{5}([\w]{3})/g)]
            .map(function (matches) {
                if (matches.index % 8 < 6) {
                    return matches[1] + matches[2] + matches[3]
                }
            })
            .filter(Boolean)
    },

    pawnDiamond: function (position) {
        let match

        match = position.match(/P([A-Za-z\.]{6})P([A-Za-z\.]{1})P([A-Za-z\.]{6})P/)
        if (match && match.index % 8 !== 0 && match.index % 8 !== 7) {
            return 'white'
        }

        match = position.match(/p([A-Za-z\.]{6})p([A-Za-z\.]{1})p([A-Za-z\.]{6})p/)
        if (match && match.index % 8 !== 0 && match.index % 8 !== 7) {
            return 'black'
        }

        return false
    },

    _connectEightOnRank: function (position, rank) {
        if (position.substr(64 - 8 * rank, 8) === 'PPPPPPPP') {
            return 'white'
        } else if (position.substr(8 * (rank - 1), 8) === 'pppppppp') {
            return 'black'
        }

        return false
    },

    connectEightOnRank4: function (position) {
        return this._connectEightOnRank(position, 4)
    },

    connectEightOnRank5: function (position) {
        return this._connectEightOnRank(position, 5)
    },

    connectEightOnRank6: function (position) {
        return this._connectEightOnRank(position, 6)
    },

    connectEightOnRank7: function (position) {
        return this._connectEightOnRank(position, 7)
    },

    verticalConnect8: function (position) {
        let ranks = position.match(/.{8}/g)
        for (let file = 0; file <= 7; file++) {
            let piecesOnRanksForFile = ranks
                .map((pieces) => pieces.substr(file, 1))
                .join('')
                .replace(/\./g, '')
            if (piecesOnRanksForFile.length === 8) {
                return true
            }
        }
        return false
    },

    _convertPositionToDiagonalStringA1toH8(position) {
        return (
            position[0] +
            position[8] +
            position[1] +
            position[16] +
            position[9] +
            position[2] +
            position[24] +
            position[17] +
            position[10] +
            position[3] +
            position[32] +
            position[25] +
            position[18] +
            position[11] +
            position[4] +
            position[40] +
            position[33] +
            position[26] +
            position[19] +
            position[12] +
            position[5] +
            position[48] +
            position[41] +
            position[34] +
            position[27] +
            position[20] +
            position[13] +
            position[6] +
            position[56] +
            position[49] +
            position[42] +
            position[35] +
            position[28] +
            position[21] +
            position[14] +
            position[7] +
            position[57] +
            position[50] +
            position[43] +
            position[36] +
            position[29] +
            position[22] +
            position[15] +
            position[58] +
            position[51] +
            position[44] +
            position[37] +
            position[30] +
            position[23] +
            position[59] +
            position[52] +
            position[45] +
            position[38] +
            position[31] +
            position[60] +
            position[53] +
            position[46] +
            position[39] +
            position[61] +
            position[54] +
            position[47] +
            position[62] +
            position[55] +
            position[63]
        )
    },

    _convertPositionToDiagonalStringH1toA8(position) {
        return (
            position[7] +
            position[15] +
            position[6] +
            position[23] +
            position[14] +
            position[5] +
            position[31] +
            position[22] +
            position[13] +
            position[4] +
            position[39] +
            position[30] +
            position[21] +
            position[12] +
            position[3] +
            position[47] +
            position[38] +
            position[29] +
            position[20] +
            position[11] +
            position[2] +
            position[55] +
            position[46] +
            position[37] +
            position[28] +
            position[19] +
            position[10] +
            position[1] +
            position[63] +
            position[54] +
            position[45] +
            position[36] +
            position[27] +
            position[18] +
            position[9] +
            position[0] +
            position[62] +
            position[53] +
            position[44] +
            position[35] +
            position[26] +
            position[17] +
            position[8] +
            position[61] +
            position[52] +
            position[43] +
            position[34] +
            position[25] +
            position[16] +
            position[60] +
            position[51] +
            position[42] +
            position[33] +
            position[24] +
            position[59] +
            position[50] +
            position[41] +
            position[32] +
            position[58] +
            position[49] +
            position[40] +
            position[57] +
            position[48] +
            position[56]
        )
    },

    _connectDiagonally: function (position, number) {
        if (this._convertPositionToDiagonalStringA1toH8(position).includes('P'.repeat(number))) {
            return 'white'
        } else if (this._convertPositionToDiagonalStringH1toA8(position).includes('P'.repeat(number))) {
            return 'white'
        } else if (this._convertPositionToDiagonalStringA1toH8(position).includes('p'.repeat(number))) {
            return 'black'
        } else if (this._convertPositionToDiagonalStringH1toA8(position).includes('p'.repeat(number))) {
            return 'black'
        }

        return false
    },

    connectFour: function (position) {
        return this._connectDiagonally(position, 4)
    },

    connectFive: function (position) {
        return this._connectDiagonally(position, 5)
    },

    connectSix: function (position) {
        return this._connectDiagonally(position, 6)
    },

    pawnTrapezoid: function (position) {
        let match

        match = position.substr(0, 40).match(/PP([A-Za-z\.]{5})P([A-Za-z\.]{2})P([A-Za-z\.]{3})P([A-Za-z\.]{4})P/)
        if (match && match.index % 8 >= 2 && match.index % 8 <= 4) {
            return 'white'
        }

        match = position.substr(24, 64).match(/p([A-Za-z\.]{4})p([A-Za-z\.]{3})p([A-Za-z\.]{2})p([A-Za-z\.]{5})pp/)
        if (match && match.index % 8 <= 2) {
            return 'black'
        }

        return false
    },
}
