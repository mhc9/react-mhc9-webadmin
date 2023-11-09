import React from 'react'

const RingLoading = ({ size='md' }) => {
    return (
        <div className="text-center">
            <span class={`loading loading-ring loading-${size}`}></span>
        </div>
    )
}

export default RingLoading