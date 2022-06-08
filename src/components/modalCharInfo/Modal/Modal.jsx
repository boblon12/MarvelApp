import React from 'react';

import cl from './Modal.module.scss'

const MyModal = ({ children, visible, setInvisible }) => {

    const rootClass = [cl.MyModal]
    if (visible) {
        rootClass.push(cl.active)
    }

    return (
        <div className={rootClass.join(' ')} onClick={setInvisible}>
            <div className={cl.myModal__content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default MyModal