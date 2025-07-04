import { Component } from 'react';
import './randomChar.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    render() {
        return (
            <div className='randomchar'>
                <div className='randomchar__block'>
                    <img src={thor} alt="Random character" className='randomchar__img' />
                    <div className='randomchar__info'>
                        <div className="randomchar__name">THOR</div>
                        <div className="randomchar__descr">As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...</div>
                        <div className="randomchar__btns">
                            <a href="#" className='button button__main'>
                                <div className="inner">HOMEPAGE</div>

                            </a>
                            <a href="#" className='button button__secondary'>
                                <div className="inner">WIKI</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?</p>
                    <p className="randomchar__title">
                        Or choose another one</p>
                    <button className='button button__main'>
                        <div className='inner'>TRY IT</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div >
            </div >
        );
    }
}

export default RandomChar;