import React from "react"
import Video from "./Video"

const EmbedVideo =(props)=>{
    return(
        <Video videoId={props.match.params.videoId}/>
    )
}
export default EmbedVideo;