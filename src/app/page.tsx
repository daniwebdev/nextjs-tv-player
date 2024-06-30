'use client'


import ChannelPlayer from "@/components/player";
import PlaylistSidebar from "@/components/playlist-sidebar";
import usePlayerState from "@/state/player-state";
import { createRef, useEffect, useState } from "react";

export default function Home() {
  const playerState = usePlayerState()
  useEffect(() => {
    
  }, [playerState.src])


  return (
    <main className="flex w-full h-full fixed bg-dark-950">
      <aside className="w-64 flex-shrink-0 bg-dark-950 border-r border-r-dark-800">
        <PlaylistSidebar></PlaylistSidebar>
      </aside>
      <section>
        <ChannelPlayer key={playerState.src} src={playerState.src}></ChannelPlayer>
      </section>
    </main>
  );
}
