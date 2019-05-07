/* library */
import React from 'react'
import { ClipLoader } from 'react-spinners';

const ClipSpinner = (props) => {
    return (
            <ClipLoader
              sizeUnit={"px"}
              size={props.size}
              color={'#123abc'}
              loading={props.loading}
            />
        );
}

export default ClipSpinner;