
import { M3uPlaylist, parseM3U, writeM3U } from "@iptv/playlist";

export default class Playlist {

    constructor(protected m3u: string) {

    }


    async getPlaylist(): Promise<M3uPlaylist> {
        return parseM3U(await fetch(this.m3u).then(res => res.text()));
    }

}