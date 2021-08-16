import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 30,
      delay: 1000,
      initial: 1000,
    };

    this.decrementCount = this.decrementCount.bind(this);
    this.startIn = this.startIn.bind(this);
  }

  componentDidMount() {
    const { initial } = this.state;
    setTimeout(this.startIn, initial);
  }

  startIn() {
    const { delay } = this.state;
    const interval = setInterval(this.decrementCount, delay);
    this.setState({ interval });
  }

  decrementCount() {
    const { count, interval } = this.state;

    if (count - 1 <= 0) {
      clearInterval(interval);
      const btns = document.querySelectorAll('button');
      btns.forEach((btn) => {
        btn.disabled = true;
      });
    }

    this.setState({ count: count - 1 });
  }

  render() {
    const { count } = this.state;
    return (
      <div className="cronometer">
        {' '}
        Cronometro:
        {count}
      </div>
    );
  }
}
