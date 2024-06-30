import { create } from 'zustand'

export type PlayerState = {
    src: string
    setSrc: (src: string) => void
}

const usePlayerState = create<PlayerState>((set) => ({
    src: '',
    setSrc: (src: string) => set({ src }),
}))

export default usePlayerState