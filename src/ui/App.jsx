import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import Init from './components/Initialize';
import Keys from './components/Keys';
import Sign from './components/Sign';
import Unlock from './components/Unlock';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Switchees from './components/Switchers';

@observer // У Компонета с этим декоратом будет автоматически вызван метод render, если будут изменены observable на которые он ссылается
export default class App extends Component {
  constructor(props) {
    super(props);

    this.updateStore = this.updateStore.bind(this);
  }

  state = {};

  componentDidMount() {
    this.setState({
      store: this.props.background.store
    });
  }

  updateStore() {
    this.props.background.getSettings().then(store => this.setState({ store }));
  }

  render() {
    const {
      toggleStoreValue,
      updateItemMenu,
      removeItemMenu,
      addItemMenu
    } = this.props.background;
    const { store } = this.state;

    if (!store) {
      return null;
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            component="h3"
            style={{ margin: '50px 0 50px 0' }}
          >
            Настройки
          </Typography>
          <Switchees
            toggleStoreValue={toggleStoreValue}
            store={store}
            updateItemMenu={updateItemMenu}
            removeItemMenu={removeItemMenu}
            addItemMenu={addItemMenu}
            updateStore={this.updateStore}
          />
        </Container>
      </React.Fragment>
    );
  }
}
