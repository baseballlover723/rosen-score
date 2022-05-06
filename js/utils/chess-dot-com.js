import { Chess as ChessJS } from 'chess.js'

export default {
    convertToLichess: function (chessDotComGame) {
        if (
            chessDotComGame.rules !== 'chess' ||
            chessDotComGame.initial_setup !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
        ) {
            return { variant: 'non standard chess.com game' }
        }

        const lichessGame = {}
        lichessGame.variant = 'standard'
        lichessGame.id = chessDotComGame.url.split('/').slice(-2).join('/')
        lichessGame.players = {
            white: this.convertPlayer(chessDotComGame.white),
            black: this.convertPlayer(chessDotComGame.black),
        }
        lichessGame.pgn = chessDotComGame.pgn
        lichessGame.rated = chessDotComGame.rated
        lichessGame.moves = this.convertMoves(chessDotComGame)
        lichessGame.status = this.convertStatus(chessDotComGame)

        return lichessGame
    },

    convertStatus(chessDotComGame) {
        const chessStatuses = [chessDotComGame.white.result, chessDotComGame.black.result].sort()
        if (chessStatuses.includes('checkmated')) {
            return 'mate'
        } else if (chessStatuses.includes('resigned')) {
            return 'resign'
        } else if (chessStatuses.includes('stalemate')) {
            return 'stalemate'
        } else if (chessStatuses.includes('abandoned')) {
            return 'timeout'
        } else if (chessStatuses.includes('timeout')) {
            return 'outoftime'
        } else if (chessStatuses[0] === chessStatuses[1]) {
            return 'draw'
        } else {
            return 'unknownFinish'
        }
    },

    convertMoves(chessDotComGame) {
        // this is for sure inefficient, since we'll parse it again later
        // it's easier to load the game and the replay it, then trying to parse the pgn to get the move list like lichess does it
        const chessGame = new ChessJS()
        chessGame.load_pgn(chessDotComGame.pgn)
        return chessGame.history().join(' ')
    },

    convertPlayer(chessDotComPlayer) {
        return {
            user: { name: chessDotComPlayer.username, id: chessDotComPlayer['@id'].split('/').pop() },
            rating: chessDotComPlayer.rating,
        }
    },
}
