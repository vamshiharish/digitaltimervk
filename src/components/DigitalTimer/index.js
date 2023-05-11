import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            alt={startOrPauseAltText}
            className="timer-controller-icon"
            src={startOrPauseImageUrl}
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

// import {Component} from 'react'

// import './index.css'

// class Timer extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       timeLimit: 25,
//       timeLeft: 25 * 60,
//       isRunning: false,
//     }

//     this.timerInterval = null
//   }

//   componentDidMount() {
//     const {timeLimit} = this.state
//     document.title = `(${timeLimit}:00) Digital Timer App`
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const {timeLeft} = this.state
//     if (prevState.timeLeft !== timeLeft) {
//       document.title = `(${Math.floor(timeLeft / 60)
//         .toString()
//         .padStart(2, '0')}:${(timeLeft % 60)
//         .toString()
//         .padStart(2, '0')}) Digital Timer App`
//     }
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerInterval)
//   }

//   handleStartPauseClick = () => {
//     const {isRunning, timeLeft} = this.state

//     if (isRunning) {
//       clearInterval(this.timerInterval)
//       this.setState({isRunning: false})
//     } else {
//       this.timerInterval = setInterval(() => {
//         if (timeLeft === 0) {
//           clearInterval(this.timerInterval)
//           this.setState({isRunning: false})
//         } else {
//           this.setState(prevState => ({
//             timeLeft: prevState.timeLeft - 1,
//             isRunning: true,
//           }))
//         }
//       }, 1000)
//     }
//   }

//   handleResetClick = () => {
//     clearInterval(this.timerInterval)
//     this.setState({
//       timeLimit: 25,
//       timeLeft: 25 * 60,
//       isRunning: false,
//     })
//   }

//   handleIncrementClick = () => {
//     this.setState(prevState => ({
//       timeLimit: prevState.timeLimit + 1,
//       timeLeft: (prevState.timeLimit + 1) * 60,
//     }))
//   }

//   handleDecrementClick = () => {
//     const {timeLimit} = this.state
//     if (timeLimit > 1) {
//       this.setState(prevState => ({
//         timeLimit: prevState.timeLimit - 1,
//         timeLeft: (prevState.timeLimit - 1) * 60,
//       }))
//     }
//   }

//   render() {
//     const {timeLeft, isRunning} = this.state
//     const minutes = Math.floor(timeLeft / 60)
//       .toString()
//       .padStart(2, '0')
//     const seconds = (timeLeft % 60).toString().padStart(2, '0')

//     return (
//       //   <div>
//       //     <h1>{`${minutes}:${seconds}`}</h1>
//       //     <button onClick={this.handleStartPauseClick} type="button">
//       //       {isRunning ? 'Pause' : 'Start'}
//       //     </button>
//       //     <button onClick={this.handleResetClick} type="button">
//       //       Reset
//       //     </button>
//       //     <button onClick={this.handleIncrementClick} type="button">
//       //       +
//       //     </button>
//       //     <button onClick={this.handleDecrementClick} type="button">
//       //       -
//       //     </button>
//       //   </div>

//       <div className="digital-timer">
//         <div className="container">
//           <h1>Digital Timer</h1>
//           <div className="container-card">
//             <div className="timer-card">
//               <div className="timer">
//                 <h1 className="time">{`${minutes}:${seconds}`}</h1>
//                 <p className="text-paused">
//                   {isRunning ? 'Running' : 'Paused'}
//                 </p>
//               </div>
//             </div>
//             {/* timer section */}
//             <div className="container-timer">
//               <div className="options">
//                 <img
//                   src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
//                   alt="play icon"
//                   className="paused-image"
//                 />
//                 <button
//                   onClick={this.handleResetClick}
//                   type="button"
//                   className="paused"
//                 >
//                   Reset
//                 </button>
//                 <img
//                   src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
//                   alt="reset icon"
//                   className="reset-image"
//                 />
//                 <button onClick={this.handleStartPauseClick} type="button">
//                   {isRunning ? 'Pause' : 'Start'}
//                 </button>
//               </div>
//               {/* set timer out */}
//               <div className="timer-count">
//                 <p className="set-timer">Set Timer limit</p>
//                 <div className="count">
//                   <button onClick={this.handleIncrementClick} type="button">
//                     +
//                   </button>
//                   <button type="button" className="time-button">
//                     {minutes}
//                   </button>
//                   <button onClick={this.handleDecrementClick} type="button">
//                     -
//                   </button>
//                   <p>25</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default Timer

// // Write your code here

// import './index.css'

// import Component from 'react'

// class DigitalTimer extends Component {

//   state = {time: ""}

//   componentDidMount(){
//       getSetInterval = () => {
//         this.timerID = setInterval(this.tick , 1000);
//       }

//   }

//   tick = () => {
//       this.setState({
//           date:
//       })
//   }
//   render() {
//     const {time} = this.state

//     return (
//       <div className="digital-timer">
//         <div className="container">
//           <h1>Digital Timer</h1>
//           <div className="container-card">
//             <div className="timer-card">
//               <div className="timer">
//                 <h1 className="time">{time}</h1>
//                 <p className="text-paused">Paused</p>
//               </div>
//             </div>
//             {/* timer section */}
//             <div className="container-timer">
//               <div className="options">
//                 <img
//                   src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
//                   alt="play icon"
//                   className="paused-image"
//                 />
//                 <span className="paused">Paused</span>
//                 <img
//                   src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
//                   alt="reset"
//                   className="reset-image"
//                 />
//                 <span className>Reset</span>
//               </div>
//               {/* set timer out */}
//               <div className="timer-count">
//                 <span className="set-timer">Set Timer Limit</span>
//                 <div className="count">
//                   <span className="minus">-</span>
//                   <button type="button" className="time-button">
//                     10
//                   </button>
//                   <span className="addition">+</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default DigitalTimer
