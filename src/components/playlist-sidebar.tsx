// eslint-disable-next-line jsx-a11y/alt-text
'use client'

import Playlist from "@/lib/playlist";
import usePlayerState from "@/state/player-state";
import { M3uChannel, M3uPlaylist } from "@iptv/playlist";
import { useEffect, useState } from "react";

export default function PlaylistSidebar() {
    const [channels, setChannels] = useState<M3uChannel[]>([]);
    const [listChannels, setListChannels] = useState<M3uChannel[]>([]);

    const playerState = usePlayerState();
    const masterSourceUrl = "https://iptv-org.github.io/iptv/index.m3u";
    const playlistSourceUrl = "https://iptv-org.github.io/iptv/countries/id.m3u";
  
    const playlistSource = new Playlist(playlistSourceUrl);
    const masterSource = new Playlist(masterSourceUrl);
  
    useEffect(() => {
      playlistSource.getPlaylist().then(playlist => {
        const items = channels.concat(playlist.channels);

        setChannels(items);
        setListChannels(items);
      })

      masterSource.getPlaylist().then(playlist => {
        // const items = channels.concat(playlist.channels);

        // setChannels(items);
        // setListChannels(items);
      })
    }, [])

    const onClickChannel = (channel: M3uChannel) => {
        console.log(channel);

        if(channel.url != '') {
            playerState.setSrc(`/proxy/${channel.url}`);
        }
    }

    const onSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {

        const query = e.target.value;

        const filtered = channels.filter((channel: M3uChannel) => channel.name?.toLowerCase().includes(query.toLowerCase()));

        setListChannels(filtered);
    }

    return (<>
        <h2 className="p-3 text-xl border-b border-b-dark-800 bg-dark-900">Channels</h2>
        <div className="h-[32px]">
            <input onChange={onSearch} type="text" className="w-full px-3  h-full border-b border-b-dark-800 bg-dark-900 placeholder:text-sm placeholder:italic outline-none text-dark-400 placeholder:text-dark-500" autoFocus placeholder="Search Channels" />
        </div>
        <ul className="h-[calc(100vh-53px-32px)] overflow-auto">
            {
                listChannels.map((channel, index) => {

                    return (
                        <li key={index} className="px-3 flex cursor-pointer hover:bg-dark-700 justify-start gap-3 items-center py-2 border-b border-b-dark-800 text-sm" onClick={() => {
                            onClickChannel(channel);
                        }}>
                            <div className="w-10 h-10 flex-shrink-0">
                                <img src={channel.tvgLogo} className="w-full h-full object-contain" onError={(e) => e.currentTarget.parentElement?.classList.add('hidden')} />
                            </div>
                            {channel.name}
                        </li>
                    )
                })
            }
        </ul>
    </>);
}