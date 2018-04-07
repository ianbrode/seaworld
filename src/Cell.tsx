import * as React from 'react';

interface Props {
  status: number;
  callback?: (a: number) => void;
}

type State = {
  opened: boolean;
  status: string;
};

export default class Cell extends React.Component<Props, State> {
  state: State = {
    opened: false,
    status: this.props.status ? '_hit' : '_empty',
  };

  openCell = () => {
    if (this.state.opened) {
      return;
    }

    this.setState({ opened: true });

    if (this.props.callback) {
      this.props.callback(this.props.status);
    }
  }

  public render() {
    const klass: string = `Cell ${this.state.opened ? this.state.status : ''}`;

    return <div onClick={this.openCell} className={klass} />;
  }
}