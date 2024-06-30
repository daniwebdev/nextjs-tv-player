'use client'


import Hls from "hls.js";
import { createRef, FC, RefObject, useEffect, useRef, useState } from "react";
import ReactHlsPlayer from "react-hls-player";

export default function ChannelPlayer({
    src
}: {
    src: string
}) {

    const videoRef = useRef<HTMLVideoElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        if (Hls.isSupported() && videoRef.current) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef.current);
            // hls.on(Hls.Events.MANIFEST_PARSED, () => {
            //     videoRef.current?.play();
            // });

        } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src;
            // videoRef.current.addEventListener('loadedmetadata', () => {
            //     videoRef.current?.play();
            // });
        }
    }, [src]);

    useEffect(() => {

        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current?.play();
            } else {
                videoRef.current?.pause();
            }
        }

    }, [isPlaying]);

    return (
        <div className="w-full h-full relative">
            <div className="absolute bottom-3 left-3 z-[1005] flex gap-3">
                {
                    isPlaying ? (
                        <button className=" bg-dark-800 fill-white p-3 rounded-lg" onClick={() => setIsPlaying(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width={24} height={24}><path d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z"></path></svg>
                        </button>
                    ) : (
                        <button className=" bg-dark-800 fill-white p-3 rounded-lg" onClick={() => setIsPlaying(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="#fff" width={24} height={24}><path d="M19.376 12.4161L8.77735 19.4818C8.54759 19.635 8.23715 19.5729 8.08397 19.3432C8.02922 19.261 8 19.1645 8 19.0658V4.93433C8 4.65818 8.22386 4.43433 8.5 4.43433C8.59871 4.43433 8.69522 4.46355 8.77735 4.5183L19.376 11.584C19.6057 11.7372 19.6678 12.0477 19.5146 12.2774C19.478 12.3323 19.4309 12.3795 19.376 12.4161Z"></path></svg>
                        </button>
                    )
                }
            </div>
            <video ref={videoRef} className="w-full h-full" />
        </div>
    );

    // const playerRef: RefObject<HTMLVideoElement> = useRef(null);

    // useEffect(() => {
    //     if (playerRef.current) {
    //         playerRef.current.play();
    //     }
    // }, []);

    // return (
    //     <ReactHlsPlayer
    //         src={src}
    //         // src="/proxy/https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
    //         // src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
    //         autoPlay={true}
    //         onPlay={() => {
    //             console.log('onPlay')
    //         }}
    //         controls={true}
    //         playerRef={playerRef}
    //         className="w-full h-full"
    //     />
    // )
}