import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

export default function BasicTextFields({ setValue, store }) {
  const classes = useStyles();
  const apiKey = store.apiKey;
  const [value, setState] = React.useState(apiKey);
  const handleChange = event => {
    if (value.length === 40) {
      setValue('apiKey', value);
    }
  };

  const onChange = (event) => {
    setState(event.target.value);
  }

  return (
    <div className={classes.root}>
      <TextField
        label="Ключь Redmine API"
        helperText="Сможете найти: My account --> API access key (Левый сайдбар)"
        value={value}
        type="password"
        onChange={onChange}
        onBlur={handleChange} />
    </div>
  );
}