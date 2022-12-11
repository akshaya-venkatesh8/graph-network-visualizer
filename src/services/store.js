import create from 'zustand';

// this is our useStore hook that we can use in our components to make the mode controls available to all classes
const useModeStore = create((set) => ({
  deleteMode: false,
  colorMode: false,
  color: '#D3D2E4',
  colorNodes: [],
  toggleColorMode: () => set((state) => ({ colorMode: !state.colorMode, deleteMode: false, colorNode: null })),
  toggleDeleteMode: () => set((state) => ({ deleteMode: !state.deleteMode, colorMode: false })),
  setColor: (color) => set({color}),
  setColorNodes: (colorNodes) => set((state) => ({colorNodes}))
}))

export default useModeStore;
