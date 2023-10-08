const localStorage = {
  getAllItems: () => chrome.storage.local.get(),
  getItem: async key => (await chrome.storage.local.get(key))[key],
  setItem: (key, val) => chrome.storage.local.set({[key]: val}),
  removeItems: keys => chrome.storage.local.remove(keys),
};

export const loadState = async () => {
  try {
    const state = await localStorage.getItem('store');

    return state ? JSON.parse(state) : undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const saveState = state => {
  localStorage.setItem('store', JSON.stringify(state));
};
