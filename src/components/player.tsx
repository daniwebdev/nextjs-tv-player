'use client'


import Hls from "hls.js";
import { createRef, RefObject, useEffect, useRef } from "react";
import ReactHlsPlayer from "react-hls-player";

export default function ChannelPlayer({
    src
}: {
    src: string
}) {

    // const videoRef = useRef<HTMLVideoElement>(null);
    // const url = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';

    // useEffect(() => {
    //   if (Hls.isSupported() && videoRef.current) {
    //     const hls = new Hls();
    //     hls.loadSource(url);
    //     hls.attachMedia(videoRef.current);
    //     hls.on(Hls.Events.MANIFEST_PARSED, () => {
    //       videoRef.current?.play();
    //     });
    //     alert('hi')
    //   } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
    //     videoRef.current.src = url;
    //     videoRef.current.addEventListener('loadedmetadata', () => {
    //       videoRef.current?.play();
    //     });
    //   }
    // }, [url]);
  
    // return (
    //   <video ref={videoRef} controls autoPlay style={{ width: '100%' }} />
    // );

    const playerRef: RefObject<HTMLVideoElement> = useRef(null);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.play();
        }
    }, []);

    return (
        <ReactHlsPlayer
            src={src}
            // src="/proxy/https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
            // src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
            autoPlay={true}
            onPlay={() => {
                console.log('onPlay')
            }}
            controls={true}
            playerRef={playerRef}
            className="w-full h-full"
        />
    )
}