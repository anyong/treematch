const React = require('react');

function Namecard (props) {
    const classNames = ['namecard'];

    if (props.flipped) {
        classNames.push('namecard--flipped');
    }

    if (props.found) {
        classNames.push('namecard--found');
    } else if (props.mismatch) {
        classNames.push('namecard--mismatch');
    }

    function flip () {
        if (!props.flipped) {
            props.onFlip(props.row, props.col);
        }
    }

    function hint () {
        return props.cardData.name.split(' ').reduce((hint, name) => hint + name[0], '');
    }

    return (
		<div onClick={flip} className={classNames.join(' ')}>
            <div className="namecard-contents">
                <div className="namecard-front">
                    <img src={props.cardData.url}/>
                    <p>{props.cardData.name}</p>
                </div>
                <div className="namecard-back">
                    <img src="https://pbs.twimg.com/profile_images/626192764531830784/dsoEDnDj.jpg"/>
                    {props.hint && <p>{hint()}</p>}
                </div>
            </div>
        </div>
    );
}

Namecard.displayName = 'Namecard';

Namecard.propTypes = {
    cardData: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
    }).isRequired,
    flipped: React.PropTypes.bool.isRequired,
    onFlip: React.PropTypes.func.isRequired,
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired,
    found: React.PropTypes.bool.isRequired,
    mismatch: React.PropTypes.bool.isRequired,
    hint: React.PropTypes.bool.isRequired,
};

module.exports = Namecard;
