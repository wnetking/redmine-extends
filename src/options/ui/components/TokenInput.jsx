import React, { useState } from 'react';
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
  const [openError, setOpenError] = useState(false);
  const apiKey = store.apiKey;
  const [value, setState] = React.useState(apiKey);
  
  const handleChange = () => {
    if (value.length === 40) {
      setValue({ key: 'apiKey', value });
    } else if(value.length > 0) {
      setOpenError(true);
    }
  };

  const onChange = (event) => {
    setOpenError(false);
    setState(event.target.value);
  }

  return (
    <div className={classes.root}>
      <TextField
        label="Redmine API Key"
        helperText={openError ? "Not correct token format!" :"Can find: My account --> API access key (Left sidebar)"}
        value={value}
        type="password"
        onChange={onChange}
        onBlur={handleChange}
        error={openError}
      />
    </div>
  );
}