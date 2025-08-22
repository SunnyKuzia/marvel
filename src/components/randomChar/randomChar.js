import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png'

class RandomChar extends Component {

    // constructor(props) {
    //     super(props);
    // }

    state = { // state можно прописывать как св-во (вне конструктора)
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 3000);
    }

    componentWillUnmount() {
        // clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    updateChar = () => { // функционал вынесли в отдельную функцию (updateChar), потому что он вызывается не только 1 раз в componentDidMount(после рендера), но и в других местах 
        const id = Math.floor(Math.random() * 20 + 1);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
        // в then приходит аргумент из promise и в this.onCharLoaded автоматически он подставится (поэтому не прописываем char в аргументах)
    }

    render() {

        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || errorMessage) ? <View char={char} /> : null;

        return (
            <div className='randomchar'>
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?</p>
                    <p className="randomchar__title">
                        Or choose another one</p>
                    <button className='button button__main'
                        onClick={this.updateChar}>
                        <div className='inner'>TRY IT</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div >
            </div >
        );
    }
}


const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    return (
        <div className='randomchar__block'>
            <img src={thumbnail}
                alt="Random character"
                className='randomchar__img'
                style={thumbnail.includes('/image_not_available') ? { 'object-fit': 'fill' } : null}
                onError={(e) => {
                    e.target.src = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
                    e.target.style = 'object-fit: fill';
                }}
            />
            <div className='randomchar__info'>
                <div className="randomchar__name">{name}</div>
                <div className="randomchar__descr">
                    {description}
                </div>
                <div className="randomchar__btns">
                    <a href={homepage} className='button button__main'>
                        <div className="inner">HOMEPAGE</div>

                    </a>
                    <a href={wiki} className='button button__secondary'>
                        <div className="inner">WIKI</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;
