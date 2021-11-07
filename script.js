function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const audio = document.getElementById('beep');

class App extends React.Component {








  constructor(props) {
    super(props);_defineProperty(this, "state", { breakCount: 5, sessCount: 25, clockCount: 25 * 60, currentTime: 'Session', isPlaying: false });_defineProperty(this, "handlePlayPause",








    () => {
      const { isPlaying } = this.state;

      if (isPlaying) {
        clearInterval(this.loop);
        this.setState({
          isPlaying: false });

      } else {
        this.setState({
          isPlaying: true });


        this.loop = setInterval(() => {
          const { clockCount, currentTimer, breakCount, sessionCount } = this.state;

          if (clockCount === 0) {
            this.setState({
              currentTimer: currentTimer === 'Session' ? 'Break' : 'Session',

              clockCount: currentTimer === 'Session' ? breakCount * 60 : sessionCount * 60 });


            audio.play();

          } else {
            this.setState({
              clockCount: clockCount - 1 });

          }

        }, 1000);
      }
    });_defineProperty(this, "handleReset",

    () => {
      this.setState({
        breakCount: 5,
        sessCount: 25,
        clockCount: 25 * 60,
        currentTime: 'Session',
        isPlaying: false });

      clearInterval(this.loop);

      audio.pause();
      audio.currentTime = 0;
    });_defineProperty(this, "convertToTime",

    count => {
      let mins = Math.floor(count / 60);
      let secs = count % 60;

      mins = mins < 10 ? '0' + mins : mins;

      secs = secs < 10 ? '0' + secs : secs;

      return `${mins}:${secs}`;
    });_defineProperty(this, "handleBreakDecrease",

    () => {
      const { breakCount, isPlaying, currentTime } = this.state;

      if (breakCount > 1) {
        if (!isPlaying && currentTime === 'Break') {
          this.setState({
            breakCount: breakCount - 1,
            clockCount: (breakCount - 1) * 60 });

        } else {
          this.setState({
            breakCount: breakCount - 1 });

        }
      }
    });_defineProperty(this, "handleBreakIncrease",

    () => {
      const { breakCount, isPlaying, currentTime } = this.state;

      if (breakCount < 60) {
        if (!isPlaying && currentTime === 'Break') {
          this.setState({
            breakCount: breakCount + 1,
            clockCount: (breakCount + 1) * 60 });

        } else {
          this.setState({
            breakCount: breakCount + 1 });

        }
      }
    });_defineProperty(this, "handleSessDecrease",

    () => {
      const { sessCount, isPlaying, currentTime } = this.state;

      if (sessCount > 1) {
        if (!isPlaying && currentTime === 'Session') {
          this.setState({
            sessCount: sessCount - 1,
            clockCount: (sessCount - 1) * 60 });

        } else {
          this.setState({
            sessCount: sessCount - 1 });

        }

      }
    });_defineProperty(this, "handleSessIncrease",

    () => {
      const { sessCount, isPlaying, currentTime } = this.state;

      if (sessCount < 60) {
        if (!isPlaying && currentTime === 'Session') {
          this.setState({
            sessCount: sessCount + 1,
            clockCount: (sessCount + 1) * 60 });

        } else {
          this.setState({
            sessCount: sessCount + 1 });

        }
      }
    });this.loop = undefined;}componentWillUnmount() {clearInterval(this.loop);}

  render() {

    const { breakCount, sessCount, clockCount, currentTime, isPlaying } = this.state;

    const breakProps = {
      title: 'Break',
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease };


    const sessionProps = {
      title: 'Session',
      count: sessCount,
      handleDecrease: this.handleSessDecrease,
      handleIncrease: this.handleSessIncrease };


    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "flex" }, /*#__PURE__*/
      React.createElement(SetTimer, breakProps), /*#__PURE__*/
      React.createElement(SetTimer, sessionProps)), /*#__PURE__*/

      React.createElement("div", { className: "clock-container" }, /*#__PURE__*/
      React.createElement("h1", { id: "timer-label" }, currentTime), /*#__PURE__*/
      React.createElement("span", { id: "timer-left" }, this.convertToTime(clockCount)), /*#__PURE__*/

      React.createElement("div", { className: "flex;" }, /*#__PURE__*/
      React.createElement("button", { id: "start-stop", onClick: this.handlePlayPause }, /*#__PURE__*/
      React.createElement("i", { className: `fas fa-${isPlaying ? 'pause' : 'play'}` })), /*#__PURE__*/

      React.createElement("button", { id: "reset", onClick: this.handleReset }, /*#__PURE__*/
      React.createElement("i", { className: "fas fa-redo" }))))));





  }}


const SetTimer = props => {

  const id = props.title.toLowerCase();

  return /*#__PURE__*/(
    React.createElement("div", { className: "timer-container" }, /*#__PURE__*/
    React.createElement("h1", { id: `${id}-label` }, props.title, " Length"), /*#__PURE__*/
    React.createElement("div", { className: "flex actions-wrapper" }, /*#__PURE__*/
    React.createElement("button", { id: `${id}-decrement`, onClick: props.handleDecrease }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-minus" })), /*#__PURE__*/

    React.createElement("span", { id: `${id}-length` }, props.count), /*#__PURE__*/
    React.createElement("button", { id: `${id}-increment`, onClick: props.handleIncrease }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-plus" })))));




};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));