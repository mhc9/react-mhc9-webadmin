import React from 'react'

const DotLoading = ({ size='md' }) => {
    return (
        <div className="text-center">
            <span class={`loading loading-dots loading-${size}`}></span>
        </div>
    )
}

export default DotLoading