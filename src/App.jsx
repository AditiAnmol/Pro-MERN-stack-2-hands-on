class HelloWorld extends React.Component{
  render(){
    const continents = ['Africa','America','Asia','Australia','Europe'];
    const helloContinents = Array.from(continents, c => `Hello ${c}!`);
    const message = helloContinents.join(' ');
    return (
      <div>
        <div title="Outer div">
          <h1>{message}</h1>
        </div>
        <div title="Outer div">
        <h1>{message}</h1>
      </div>
      </div>
    );
  }
}

const element = <HelloWorld />;

ReactDOM.render(element, document.getElementById('contents'));

