import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface AppState {
  previousPage: string | null;
  isFilterPageOpen: boolean;
  currentTab: string;
  displayBackButtonOnHeader: boolean;
  pageTitle: string;
}

type AppAction =
  | { type: 'SET_PREVIOUS_PAGE'; payload: string }
  | { type: 'TOGGLE_FILTER_PAGE' }
  | { type: 'SET_FILTER_PAGE'; payload: boolean }
  | { type: 'SET_CURRENT_TAB'; payload: string }
  | { type: 'SET_PAGE_TITLE'; payload: string }
  | { type: 'RESET_STATE' };

const initialState: AppState = {
  previousPage: null,
  isFilterPageOpen: false,
  currentTab: 'home',
  displayBackButtonOnHeader: false,
  pageTitle: 'Rent Easy 9ja'
};

const appStateReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_PREVIOUS_PAGE':
      return { ...state, previousPage: action.payload };
    case 'TOGGLE_FILTER_PAGE':
      return { ...state, isFilterPageOpen: !state.isFilterPageOpen };
    case 'SET_FILTER_PAGE':
      return { ...state, isFilterPageOpen: action.payload };
    case 'SET_CURRENT_TAB':
      return { ...state, currentTab: action.payload };
    case 'SET_PAGE_TITLE':
      return { ...state, pageTitle: action.payload };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
};

interface AppStateContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

export const useHeaderState = () => {
  const { state, dispatch } = useAppState();

  const setPageTitle = (title: string) => {
    dispatch({ type: 'SET_PAGE_TITLE', payload: title });
  }

  return {
    title: state.pageTitle,
    displayBackButtonOnHeader: state.displayBackButtonOnHeader,
    setPageTitle,
  }
}

export const useCustomNavigation = () => {
  const { state, dispatch } = useAppState();

  const setPreviousPage = (page: string) => {
    dispatch({ type: 'SET_PREVIOUS_PAGE', payload: page });
  };

  const setCurrentTab = (tab: string) => {
    dispatch({ type: 'SET_CURRENT_TAB', payload: tab });
  };

  return {
    previousPage: state.previousPage,
    currentTab: state.currentTab,
    setPreviousPage,
    setCurrentTab,
  };
};

export const useFilterState = () => {
  const { state, dispatch } = useAppState();

  const toggleFilterPage = () => {
    dispatch({ type: 'TOGGLE_FILTER_PAGE' });
  };

  const setFilterPageOpen = (isOpen: boolean) => {
    dispatch({ type: 'SET_FILTER_PAGE', payload: isOpen });
  };

  return {
    isFilterPageOpen: state.isFilterPageOpen,
    toggleFilterPage,
    setFilterPageOpen,
  };
};
