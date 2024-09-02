import React, { forwardRef } from 'react';
import { userPropTypes } from '../../../utils/propTypes';

// forwarRef to get the ref when is the last card of the fetched cards.
const Card = forwardRef(({ user }, ref) => {
    const { picture: { medium: src }, name: { first, last }, fact: description } = user
    return (
        <div ref={ref} className="p-6 bg-white border border-gray-200 rounded-lg shadow w-[40rem] min-h-[10rem]">
            <div className="flex items-center gap-4">
                <img className="w-10 h-10 rounded-full" src={src} alt="Rounded avatar" />
                <h1 className="font-bold">{`${first + ' ' + last}`}</h1>
            </div>
            <p className="mt-3 font-normal text-gray-500 text-start">{description || 'a'}</p>
        </div>
    )
})

Card.propTypes = {
    user: userPropTypes.isRequired
};

export default Card;