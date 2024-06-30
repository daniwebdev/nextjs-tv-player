'use client'


import ChannelPlayer from "@/components/player";
import PlaylistSidebar from "@/components/playlist-sidebar";
import usePlayerState from "@/state/player-state";
import { createRef, useEffect, useState } from "react";

export default function Home() {
  const playerState = usePlayerState()
  const [videoSrc, setVideoSrc] = useState<string>('');

  useEffect(() => {
    setVideoSrc('/proxy/https://live.cnbcindonesia.com/livecnbc/smil:cnbctv.smil/master.m3u8');
  }, [])


  useEffect(() => {
    setVideoSrc(playerState.src);
  }, [playerState.src])


  return (
    <main className="flex w-full h-full fixed bg-dark-950">
      <aside className="w-64 flex-shrink-0 bg-dark-950 border-r border-r-dark-800">
        <PlaylistSidebar></PlaylistSidebar>
      </aside>
      <section className="relative">
        <div className="p-3 absolute bottom-0 right-0 text-sm z-[1000]">
          Created by <a target="_blank" href="https://github.com/daniwebdev">@daniwebdev</a>
        </div>
        <ChannelPlayer key={videoSrc} src={videoSrc}></ChannelPlayer>
      </section>
    </main>
  );
}
