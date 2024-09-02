import PropTypes from 'prop-types';

export const userPropTypes = PropTypes.shape({
    picture: PropTypes.shape({
        medium: PropTypes.string.isRequired
    }).isRequired,
    name: PropTypes.shape({
        first: PropTypes.string.isRequired,
        last: PropTypes.string.isRequired
    }).isRequired,
    fact: PropTypes.string
});


export const errorPropTypes = PropTypes.shape({
    error: PropTypes.object.isRequired
});
