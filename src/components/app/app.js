import { Component } from 'react';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';



class App extends Component {

    render() {

        return (
            <>
                < RandomChar />
                <div className="char__content">
                    < CharList />
                    < CharInfo />
                </div>
            </>


        );
    }
}

export default App;