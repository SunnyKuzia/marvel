import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';


class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList: charList,
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


    renderItems = () => {

        const listItems = this.state.charList.map((item) => {
            return (
                <li className="char__item" key={item.id}>
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={item.thumbnail.includes('/image_not_available') ?
                            { 'object-fit': 'fill' } : null}
                        onError={(e) => {
                            e.target.src =
                                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
                            e.target.style = 'object-fit: fill;';
                        }
                        } />

                    <div className="char__name">{item.name}</div>
                </li>
            );
        })

        return (
            <ul className="char__grid">
                {listItems}
            </ul>
        );
    }

    render() {

        const { error, loading } = this.state;
        const items = this.renderItems();
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__content">
                <div className="char__list">
                    {errorMessage}
                    {spinner}
                    {content}
                    <button className="button button__main button__long">
                        <div className="inner">load more</div>
                    </button>
                </div>
            </div>
        );
    }
}

export default CharList;