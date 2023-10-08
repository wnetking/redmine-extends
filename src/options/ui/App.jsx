import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Switchees from './components/Switchers';
import { API } from '../../services/api';

/**
 * @typedef AppProps
 * @property {API} api
 * 
 * @param {AppProps} props
 * @return {React.ReactNode} 
 */
export const App = ({
  api
}) => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateStore = async () => {
    const {
      result: settings
    } = await api.fetch({ method: 'getSettings' });

    setStore(settings);
  };

  useEffect(() => {
    updateStore();
  }, []);

  const withLoading = (wrappFunc) => {
    return async (params) => {
      setLoading(true);

      await wrappFunc(params);

      setLoading(false);
    }
  };

  const toggleStoreValue = withLoading(async (name) => {
    await api.fetch({ method: 'toggleStoreValue', params: name, })
    await updateStore();
  });

  const updateItemMenu = withLoading(async (params) => {
    await api.fetch({ method: 'updateItemMenu', params, })
    await updateStore();
  });
  const removeItemMenu = withLoading(async (params) => {
    await api.fetch({ method: 'removeItemMenu', params, })
    await updateStore();
  });

  const addItemMenu = withLoading(async (params) => {
    await api.fetch({ method: 'addItemMenu', params, })
    await updateStore();
  });

  const setValue = withLoading(async (params) => {
    await api.fetch({ method: 'setValue', params, })
    await updateStore();
  });

  if (!store) {
    return null;
  };

  return (
    <React.Fragment>
      {loading && <LinearProgress style={{ position: 'fixed', width: '100%', top: 0 }} />}
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          component="h3"
          style={{ margin: '50px 0 50px 0' }}
        >
          Settings
        </Typography>
        <Switchees
          toggleStoreValue={toggleStoreValue}
          store={store}
          updateItemMenu={updateItemMenu}
          removeItemMenu={removeItemMenu}
          addItemMenu={addItemMenu}
          updateStore={updateStore}
          setValue={setValue}
        />
      </Container>
    </React.Fragment>
  )
}
