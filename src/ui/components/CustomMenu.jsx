import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import uuid from 'uuid/v1';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '50px',
    marginBottom: '50px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  divider: {
    marginBottom: '50px'
  },
  addItem: {
    color: '#9b9b9b'
  }
}));

function AddItem({ addItemMenu, updateStore }) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    url: '',
    content: '',
    id: uuid()
  });

  const handleChange = name => event => {
    if (name === 'target') {
      const newValue = state.target === '_blank' ? 'false' : '_blank';
      return setState({ ...state, [name]: newValue });
    }

    setState({ ...state, [name]: event.target.value });
  };

  const resetItem = () => {
    setState({ url: '', content: '', id: uuid() });
  };

  const addItem = () => {
    addItemMenu(state);
    updateStore();
    resetItem();
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<AddIcon />}>
        <Typography className={`${classes.heading} ${classes.addItem}`}>
          {'Добавить пункт меню'}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
          <TextField
            label="Анкор ссылки"
            value={state.content}
            onChange={handleChange('content')}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Url"
            value={state.url}
            onChange={handleChange('url')}
            margin="normal"
            fullWidth
          />
          {/* <FormControlLabel
        control={
          <Checkbox
            checked={state.target === '_blank' ? true : false}
            onChange={handleChange('target')}
            value={'_blank'}
          />
        }
        label='Установить target="_blank"'
      /> */}
        </div>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button size="small" color="primary" onClick={addItem}>
          Сохранить
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

function Item({ item, updateItemMenu, removeItemMenu, updateStore }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    ...item
  });

  const handleChange = name => event => {
    if (name === 'target') {
      const newValue = state.target === '_blank' ? 'false' : '_blank';
      return setState({ ...state, [name]: newValue });
    }

    setState({ ...state, [name]: event.target.value });
  };

  const saveItem = () => {
    updateItemMenu(state);
    updateStore();
  };

  const deleteItem = () => {
    removeItemMenu(state);
    updateStore();
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>{item.content}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
          <TextField
            label="Анкор ссылки"
            value={state.content}
            onChange={handleChange('content')}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Url"
            value={state.url}
            onChange={handleChange('url')}
            margin="normal"
            fullWidth
          />
          {/* <FormControlLabel
            control={
              <Checkbox
                checked={state.target === '_blank' ? true : false}
                onChange={handleChange('target')}
                value={'_blank'}
              />
            }
            label='Установить target="_blank"'
          /> */}
        </div>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button size="small" onClick={deleteItem}>
          Удалить
        </Button>
        <Button size="small" color="primary" onClick={saveItem}>
          Сохранить
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

export default function CustomMenu({
  menu,
  updateItemMenu,
  removeItemMenu,
  updateStore,
  addItemMenu
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Divider className={classes.divider} />
      <Typography variant="h6" component="h5" style={{ marginBottom: '30px' }}>
        Дополнительные пункты меню в хедере
      </Typography>
      {menu.map((item, index) => (
        <Item
          key={index}
          item={item}
          updateItemMenu={updateItemMenu}
          removeItemMenu={removeItemMenu}
          updateStore={updateStore}
        />
      ))}

      <AddItem addItemMenu={addItemMenu} updateStore={updateStore} />
    </div>
  );
}
