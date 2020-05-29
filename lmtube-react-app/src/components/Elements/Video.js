import React from "react"
import { connect } from "react-redux";
import PropTypes from "prop-types"
import {getSelectedVideo} from "../../actions/videoActions"
import Plyr from "plyr";
import videoReducer from "../../reducers/videoReducer";
import axios from "axios"

class Video extends React.Component{

    state = {
        title: "",
        description: "",
        views: 0,
        author: "",
        createdAt: "",
        posterSrc: "",
        videoStreams: [],
    }

    componentDidMount(){
        this.props.getSelectedVideo(this.props.videoId);
    }

    componentWillReceiveProps(newProps){
        if (newProps.video){

            const posterSrc = `http://localhost:8080/lmtube/api/poster/${newProps.video.poster.id}`
            let streams = [];
            newProps.video.videos.forEach((video) => {
            const src = `http://localhost:8080/lmtube/api/video/stream/${video.name}?res=${video.resolution}`;
            const stream = {
                src: src,
                type: video.mimeType,
                size: video.resolution,
            }
            streams.push(stream);
            })    
    
            this.setState({
            title: newProps.video.title ,
            description: newProps.video.description,
            views: newProps.video.views,
            author: newProps.video.author.fullName,
            createdAt: newProps.video.createdAt,
            posterSrc: posterSrc,
            videoStreams: streams,
            })
    
        }
    }
    

    render (){
        const player = new Plyr(document.getElementById("player"), {
            title: "Test video",
            controls: [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "settings",
                "fullscreen",           
             ],
            settings: ["quality", "speed"],
            autoplay: false,
            autopause: true,
            clickToPlay: true,
            hideControls: true,
            fullscreen: {
                enabled: true,
                fallback: true
            }
        })

        player.source = {
            type: "video",
            title: this.state.title,
            sources: this.state.videoStreams,
            poster: this.state.posterSrc,
        }

        
        return(
            <video id="player" preload="auto" controls width="auto" height="100%">
                {
                
                    this.state.videoStreams.map((stream, index) =>{
                        return (
                            <source key={index} src={stream.src} />
                        )
                    })
                }
            </video>        
            )
            
    }



}

Video.propTypes = {
    getSelectedVideo: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired
}

const mapStateToProps = state =>{
    return{
        video: state.videos.video
    }
    
}

export default connect(mapStateToProps, {getSelectedVideo}) (Video);