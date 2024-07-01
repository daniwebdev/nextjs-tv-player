'use client'


import ChannelPlayer from "@/components/player";
import PlaylistSidebar from "@/components/playlist-sidebar";
import usePlayerState from "@/state/player-state";
import { createRef, useEffect, useRef, useState } from "react";

export default function Home() {
  const playerState = usePlayerState()
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVideoSrc('/proxy/https://live.cnbcindonesia.com/livecnbc/smil:cnbctv.smil/master.m3u8');
  }, [])


  useEffect(() => {
    setVideoSrc(playerState.src);
  }, [playerState.src])

  useEffect(() => {
    if (sidebarRef.current) {
      if(openSidebar) {
        sidebarRef.current.classList.add('left-0');
        sidebarRef.current.classList.remove('-left-64');
      } else {
        sidebarRef.current.classList.remove('left-0');
        sidebarRef.current.classList.add('-left-64');
      }
    }
  }, [openSidebar])


  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  }


  return (
    <main className="flex w-full h-full fixed bg-dark-950">
      <aside className="w-64 flex-shrink-0 bg-dark-950 border-r border-r-dark-800 transition-[left] absolute -left-64 left-0 z-[2000]" ref={sidebarRef}>
        <button className="absolute -right-12 bg-dark-900 p-3 top-1 rounded-lg" onClick={() => toggleSidebar()}>
          <svg className="!fill-white w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
        </button>
        <PlaylistSidebar></PlaylistSidebar>
      </aside>
      <section className="relative w-full">
        <div className="p-3 absolute bottom-0 right-0 text-sm z-[1000] bg-black/50 rounded-tl-xl px-6">
          Created by <a target="_blank" href="https://github.com/daniwebdev" className="text-blue-500">@daniwebdev</a>
        </div>
        <ChannelPlayer key={videoSrc} src={videoSrc}></ChannelPlayer>
      </section>
    </main>
  );
}
