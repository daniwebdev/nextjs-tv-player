import { create } from 'zustand'

export type PlayerState = {
    src: string
    setSrc: (src: string) => void
}

const usePlayerState = create<PlayerState>((set) => ({
    src: '/proxy/https://live.cnbcindonesia.com/livecnbc/smil:cnbctv.smil/master.m3u8',
    setSrc: (src: string) => set({ src }),
}))

export default usePlayerState