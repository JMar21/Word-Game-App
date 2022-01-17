import React, {useState} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card'

class App extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			squares: [null,null,null,null,null,null,null,null],
			values: [null,null,null,null,null,null,null,null],
			maxWord: null,
			maxScore: 0,
			currScore: 0,
			currWord: null,
			errorState: '',
		};
		this.init();
		
}
init=()=>{
	axios.get('/generateHand').then
		((response)=>
		{
			var i=0;
		 var items = this.state.squares.slice()
	  for(var key in response.data.hand){
		  while (response.data.hand[key]>0 && i<8){
			  response.data.hand[key]-=1;
			  items[i] = key;
			  i+=1;
		  }
	  }
	  this.setState({squares: items});
	  var vals=this.state.values.slice();
	  for(let j=0;j<8;j++){
		  vals[j]=response.data.vals[this.state.squares[j]];
	  }
	  this.setState({values: vals});
	}).catch(function(error){console.log(error);});
}
afterSubmit = (e) => {
		e.preventDefault();
		var temp = e.target[0].value.toUpperCase();
		axios.post('/getMaxWord',{"word":e.target[0].value,"hand":this.state.squares}).then
		((response)=>{
			if(response.data["maxword"]=="invalid input entered"){
				this.setState({errorState:"Invalid input entered"});
			}
			else{
			this.setState({currWord: temp, maxWord: response.data["maxword"],currScore: response.data["currscore"],maxScore: response.data["maxscore"], errorState: ""});
			
			console.log(response);
			axios.get('/generateHand').then
		((response)=>
		{
			var i=0;
		 var items = this.state.squares.slice()
	  for(var key in response.data.hand){
		  while (response.data.hand[key]>0 && i<8){
			  response.data.hand[key]-=1;
			  items[i] = key;
			  i+=1;
		  }
	  }
	  this.setState({squares: items});
	  var vals=this.state.values.slice();
	  for(let j=0;j<8;j++){
		  vals[j]=response.data.vals[this.state.squares[j]];
	  }
	  this.setState({values: vals});
	}).catch(function(error){console.log(error);});
			}
		})
		
		e.target.reset();
	}

  
  renderSquare(i){
	  return <Square letter={this.state.squares[i]} value={this.state.values[i]}/>;
  };
	renderCard(){
	return <TextCard score={this.state.currScore} mscore={this.state.maxScore} currWord={this.state.currWord} maxWord={this.state.maxWord}/>;
	};
  render(){ return(
    <div className="game">
	  <ul className="flex-container">
	    {this.renderSquare(0)}
		{this.renderSquare(1)}
		{this.renderSquare(2)}
		{this.renderSquare(3)}
		{this.renderSquare(4)}
		{this.renderSquare(5)}
		{this.renderSquare(6)}
		{this.renderSquare(7)}
	  </ul>
	  	
		<form type="submit" ref={(ref)=>this.mainInput=ref}onSubmit={this.afterSubmit} required>
		<label className="textInput">
		  Enter Word:
		  <input type="text" />
		</label>
		<input className="submitButton" type="submit" value="Submit" />
		<div className="errorMessage"><h3>{this.state.errorState}</h3></div>
	</form>
	{this.renderCard()}
	</div>
	
	)}
}
function Square(props){
	return(<li className="flex-item">{props.letter} <sub>{props.value}</sub></li>)
}
function TextCard(props){
	return(<Card className="cardTest">
	  <Card.Body>
		<Card.Subtitle>Score:{props.score} Last Word Entered: {props.currWord}</Card.Subtitle>
		<Card.Text>Max Possible Score:{props.mscore} Best Possible Word: {props.maxWord} </Card.Text>
	  </Card.Body>
	</Card>)
	
}
export default App;
