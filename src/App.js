import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      count: 0,
      winnersX: 0,
      winnersO: 0,
      choise: 'X'
    }
    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

  };

  isWinner = () => {
    let s = '';
    if(this.state.choise === 'X') {
      s = (this.state.count % 2 === 0) ? 'X' : 'O';
    }else {
      s = (this.state.count % 2 === 0) ? 'O' : 'X';
    }
    for (let i = 0; i < 8; i++) {
      let line = this.winnerLine[i];
      if( this.state.squares[line[0]] === s
        && this.state.squares[line[1]] === s
        && this.state.squares[line[2]] === s ){
          setTimeout(()=> {
            alert(s + ' win');
          }, 500)
          if(s === 'X') {
            this.setState(prevstate => ({winnersX: prevstate.winnersX + 1}))
          }else {
            this.setState(prevstate => ({winnersO: prevstate.winnersO + 1}))
          }
          setTimeout(()=> {
            this.setState({squares: Array(9).fill(null)});
            this.setState({count: 0});
        }, 2000)
      }else if(this.state.count === 8 && s !== null ){
        setTimeout(()=> {
          alert('Ничья');
        }, 500);
        setTimeout(()=> {
          this.setState({squares: Array(9).fill(null)});
          this.setState({ count: 0});
        }, 2000)
        return false;
      }
    }
  }

  clearField = () => {
    this.setState({squares: Array(9).fill(null)});
    this.setState({count: 0});
  }

  beginZero = () => {
    this.setState({squares: Array(9).fill(null)});
    this.setState({count: 0});
    this.setState({choise: 'O'});
  }

  beginCross = () => {
    this.setState({squares: Array(9).fill(null)});
    this.setState({count: 0});
    this.setState({choise: 'X'});
  }

  clickHandler = (event) => {
    let data = event.target.getAttribute('data');
    let currentSquares = this.state.squares;
    let currentChoise = this.state.choise;
    // console.log(currentSquares);
    if(currentSquares[data] == null && currentChoise === 'X'){
      currentSquares[data] = (this.state.count % 2 === 0) ? 'X' : 'O';
      this.setState({count: this.state.count + 1})
      this.setState({squares: currentSquares});
    }else if(currentSquares[data] == null && currentChoise === 'O'){
      currentSquares[data] = (this.state.count % 2 === 0) ? 'O' : 'X';
      this.setState({count: this.state.count + 1})
      this.setState({squares: currentSquares});
    }else {
      alert('Так нельзя!!!');
    }
    this.isWinner();
  }

  render() {
    return (
      <div className="container">
        <div className="tic-tac-toe">
          <div className="ttt-grid" onClick={this.clickHandler} data="0">{this.state.squares[0]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="1">{this.state.squares[1]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="2">{this.state.squares[2]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="3">{this.state.squares[3]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="4">{this.state.squares[4]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="5">{this.state.squares[5]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="6">{this.state.squares[6]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="7">{this.state.squares[7]}</div>
          <div className="ttt-grid" onClick={this.clickHandler} data="8">{this.state.squares[8]}</div>
        </div>
        <button type="button" onClick={this.clearField}>Очистить игру</button>
        <table>
          <tbody>
            <tr>
              <th>победы крестиков</th>
              <th>победы ноликов</th>
            </tr>
            <tr>
              <td>{this.state.winnersX}</td>
              <td>{this.state.winnersO}</td>
            </tr>
          </tbody>
        </table>
        <button type="button" onClick={this.beginZero}>Начать игру за нолики</button>
        <button type="button" onClick={this.beginCross}>Начать игру за крестики</button>
      </div>
    );
  }

};

export default App;