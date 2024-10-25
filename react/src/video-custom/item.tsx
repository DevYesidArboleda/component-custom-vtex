import React, { useState } from 'react'

const Item = ({ item }: any) => {
    const [showVideo, setShowVideo]= useState(false);

    if(showVideo){
        return <div>
            video
        </div>
    }

    return (
        <div onClick={()=> setShowVideo(true)}>
            imagen
        </div>
    )
}

export default Item