import React from 'react'
import LoaderSpinner from "react-loader-spinner";


const Loader = () => {
    return (
        <div className="bg-gray-800 css-hight flex justify-center align-item-center items-center">
            <div className="flex justify-center">
                <LoaderSpinner 
                    type="Rings"
                    color="white"
                    height={100}
                    width={100} />
            </div>
        </div>
    )
}

export default Loader
