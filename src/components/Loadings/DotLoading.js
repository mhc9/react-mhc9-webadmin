import React from 'react'

const DotLoading = ({ size='md' }) => {
    return (
        <div className="text-center">
            <span className={`loading loading-dots loading-${size}`}></span>
        </div>
    )
}

export default DotLoading