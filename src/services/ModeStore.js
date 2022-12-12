import create from 'zustand';

// this is our useStore hook that we can use in our components to make the mode controls available to all classes
const useModeStore = create((set) => ({
  deleteMode: false,
  colorMode: false,
  directedMode: false,
  color: '#D3D2E3',
  showNodeLabels: true,
  toggleColorMode: () => set((state) => ({ colorMode: !state.colorMode, deleteMode: false })),
  toggleDeleteMode: () => set((state) => ({ deleteMode: !state.deleteMode, colorMode: false })),
  toggleShowNodeLabels: () => set((state) => ({ showNodeLabels: !state.showNodeLabels })),
  toggleDirectedMode: () => set((state) => ({directedMode: !state.directedMode})),
  setColor: (color) => set({color}),
  reset: () => set(() => ({colorMode: false, deleteMode:false, color: '#D3D2E3', showNodeLabels: true})),
  resetDirectedMode: () => set(() => ({directedMode: false})),
}))

export default useModeStore;
