import React, {useState} from 'react'
import CharListContainer from '../charList/CharListContainer'
import MyModal from '../modalCharInfo/Modal/Modal'
import decoration from '../../resources/img/vision.png';
import RandomChar from '../randomChar/RandomChar'
import CharInfoContainer from '../charInfo/CharInfoContainer'
import CharModalInfoModal from '../modalCharInfo/Modal/CharModal/CharInfoModal';
import FindCharContainer from '../findChar/FindCharContainer';
import FindCharContainerTop from '../findCharTop/FindCharContainerTop';

function Main() {

    const [visible, setVisible] = useState(false);
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }
    const setVisibleClick = () => {
        setVisible(true);
    }
    const setInvisible = () => {
        setVisible(false);
    }
    return (
        <>
            <MyModal visible={visible} setInvisible={setInvisible} >
                <CharModalInfoModal charId={selectedChar}/>
            </MyModal>
            <main>
                <RandomChar />
                <FindCharContainerTop/>
                <div className="char__content">
                    <CharListContainer setVisibleClick={setVisibleClick} onCharSelected={onCharSelected}/>
                    <div className='char__content-left'>
                        <CharInfoContainer  charId={selectedChar}/>
                        <FindCharContainer/>
                    </div>
                    
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </>
    )
}

export default Main