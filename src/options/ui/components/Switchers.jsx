import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import CustomMenu from './CustomMenu';
import TokenInput from './TokenInput';

export default function Switchees({
  toggleStoreValue,
  store,
  updateItemMenu,
  removeItemMenu,
  updateStore,
  addItemMenu,
  setValue
}) {
  const [state, setState] = React.useState({
    anableLayoutMove: store.anableLayoutMove,
    showUserPhoto: store.showUserPhoto,
    enablePhotoHandler: store.enablePhotoHandler
  });

  const handleChange = name => event => {
    toggleStoreValue(name);
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <FormControl component="fieldset">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={state.anableLayoutMove}
              color="primary"
              onChange={handleChange('anableLayoutMove')}
              value="anableLayoutMove"
              size="small"
            />
          }
          label="Move page layout in issue page"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.enablePhotoHandler}
              onChange={handleChange('enablePhotoHandler')}
              value="enablePhotoHandler"
              color="primary"
              size="small"
            />
          }
          label="Images and Video in modal window"
        />
      </FormGroup>
      <FormHelperText>
        You need refresh the redmine page after changing settings 
      </FormHelperText>
      <CustomMenu
        menu={Object.values(store.menu)}
        updateItemMenu={updateItemMenu}
        removeItemMenu={removeItemMenu}
        updateStore={updateStore}
        addItemMenu={addItemMenu}
      />
      <TokenInput setValue={setValue} store={store} />
    </FormControl>
  );
}
