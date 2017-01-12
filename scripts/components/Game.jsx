const React = require('react');
const bindActionCreators = require('redux').bindActionCreators;
const connect = require('react-redux').connect;

const actions = require('../redux/actions');
const utils = require('../utils');
const constants = require('../constants');

const Namecard = require('./Namecard');

class Game extends React.Component {
	constructor (props) {
		super(props);
        this.onToggleHints = this.onToggleHints.bind(this);
        this.onHandleClick = this.onHandleClick.bind(this);
        this.startGame = this.startGame.bind(this);
        this.setBoardSize = this.setBoardSize.bind(this);
	}

    componentDidMount () {
        this.props.loadData();
	}

    startGame () {
        this.props.startGame();
    }

    onToggleHints () {
        this.props.toggleHints();
    }

    setBoardSize (e) {
        this.props.setBoardSize(e.target.value);
    }

    onHandleClick (i, j) {
        this.props.selectCard(i, j);
    }

	render () {
        const game = this.props.game;

        if (game.loading) {
            return <p>Loading...</p>;
        }

        const board = game.board;
        const boardSize = game.boardSize;
        const rows = game.rows;
        const cols = game.cols;
        const nameList = game.nameList;
        const onHandleClick = game.resetTimerRunning ? ()=>{} : this.onHandleClick;
        const hints = game.showHints;
        const startText = game.firstGame ? 'Begin!' : 'Play Again';

        let remaining = 'Click to start';

        if (game.remaining === 0 && game.winner) {
            remaining = 'You win!';
        } else if (game.remaining > 0) {
            remaining = game.remaining + ' pairs remaining!';
        }

		return (
			<div id="game-container">
                <h1>WillowTree Employee Matching Game</h1>
                <div id="game-controls">
                    <label htmlFor="boardSize">Board Size</label>
                    <select value={boardSize} onChange={this.setBoardSize}>
                        <option value={constants.SMALL}>Small (3x2)</option>
                        <option value={constants.MEDIUM}>Medium (4x3)</option>
                        <option value={constants.LARGE}>Large (6x3)</option>
                    </select>
                    <br/>
                    <label htmlFor="showHints">Enable Hints</label>
                    <input id="showHints" type="checkbox" checked={hints} onChange={this.onToggleHints}/>
                    <button className="start-button" onClick={this.startGame}>{startText}</button>
                    <h2>{remaining}</h2>
                </div>
                <div id="game-board">
                    {board.map((row, i) => {
                        return (
                            <div key={i}>
                                {row.map((card, j) => {
                                    return (
                                        <Namecard
                                            key={j}
                                            onFlip={onHandleClick}
                                            cardData={nameList[card.person]}
                                            flipped={card.flipped}
                                            found={card.found}
                                            mismatch={card.mismatch}
                                            row={i}
                                            col={j}
                                            hint={hints}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
			</div>
		);
	}
}

Game.displayName = 'Game';

Game.propTypes = {
    game: React.PropTypes.object.isRequired,
    loadData: React.PropTypes.func.isRequired,
    startGame: React.PropTypes.func.isRequired,
};

function mapStateToProps (state) {
    return {
        game: state,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        loadData: bindActionCreators(actions.loadData, dispatch),
        startGame: bindActionCreators(actions.startGame, dispatch),
        toggleHints: bindActionCreators(actions.toggleHints, dispatch),
        setBoardSize: bindActionCreators(actions.setBoardSize, dispatch),
        selectCard: bindActionCreators(actions.selectCard, dispatch),
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Game);
