import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';

const NEWS_API = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=b35512f2248e4519b8c58c213d8ee15d';
const NEXT_WEB = 'https://newsapi.org/v2/everything?domains=thenextweb.com&apiKey=b35512f2248e4519b8c58c213d8ee15d';
const TECHCRUNCH_NEWS ='https://newsapi.org/v2/everything?domains=techcrunch.com&language=en&apiKey=b35512f2248e4519b8c58c213d8ee15d';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    
  }

  render() {
    return (
      <Router>
        <div id='nav'>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/thenextweb">The Next Web</Link>
              </li>
              <li>
                <Link to="/techcrunch">TechCrunch</Link>
              </li>
              <li>
                <Link to="/search">Search...</Link>
              </li>

            </ul>
          </nav>  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path='/thenextweb'>
                <TheNextWeb />
            </Route> 
            <Route path='/search'>
                <Search />
            </Route> 
            <Route path='/techcrunch'>
              <TechCrunch />
            </Route>
            <Route path="/home">
              <Home />
            </Route>

          </Switch>
        </div>
      </Router>
    );
  }
}

const TopArticles = ({article}) => {
  return (
    <div className='gridArticles'>
      {
        article && article.map(articles => {
          console.log(articles)
          return (
            <div className='gridArticle'> 
              <a href={ articles.url }>
                <img src={ articles.urlToImage } />
              <h3> { articles.title } </h3>
              <h4>by { articles.author }</h4>
              </a>
            </div>
          )
        })
      }
    </div>
  )
}

const NextWeb = ({article}) => {
  return (
    <div className='gridArticles'>
      {
        article && article.map(articles => {
          console.log(articles)
          return (
            <div className='gridArticle'> 
              <a href={ articles.url }>
                <img src={ articles.urlToImage } />
              <h3> { articles.title } </h3>
              <h4>by { articles.author }</h4>
              </a>
            </div>
          )
        })
      }
    </div>
  )
}

const TechCrunchNews = ({article}) => {
  return (
    <div className='gridArticles'>
      {
        article && article.map(articles => {
          console.log(articles)
          return (
            <div className='gridArticle'> 
              <a href={ articles.url }>
                <img src={ articles.urlToImage } />
              <h3> { articles.title } </h3>
              <h4>by { articles.author }</h4>
              </a>
            </div>
          )
        })
      }
    </div>
  )
}

const SearchArticles = ({article}) => {
  return (
    <div className='gridArticles'>
      {
        article && article.map(articles => {
          console.log(articles)
          return (
            <div className='gridArticle'> 
              <a href={ articles.url }>
                <img src={ articles.urlToImage } />
              <h3> { articles.title } </h3>
              <h4>by { articles.author }</h4>
              </a>
            </div>
          )
        })
      }
    </div>
  )
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async getArticles() {
    try {
      const res = await axios.get(NEWS_API);
      this.setState({ news: res.data.articles });
      console.log(this.state.news);
    } catch(e) {
      console.error(e);
    }
  }

  componentDidMount(){
    this.getArticles();
  }

  render(){
    return (
      <div className='page'>
        <br></br>
        <h1 className='pageTitle'>Top Articles in the U.S</h1>
        <div>
          <TopArticles article={this.state.news} />
        </div>
      </div>
    )
  }
}

class TechCrunch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:''
    }
  }
  

  async getArticles() {
    try {
      const res = await axios.get(TECHCRUNCH_NEWS);
      this.setState({ news: res.data.articles });
      console.log(this.state.news);
    } catch(e) {
      console.error(e);
    }
  }

  componentDidMount(){
    this.getArticles();
  }

  render(){
    return (
      <div id='techcrunch'>
        <br></br>
        <h1 className='pageTitle'>Tech Crunch</h1>
        <div>
          <TechCrunchNews article={this.state.news} />
        </div>
      </div>
    )
  }
}

class TheNextWeb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async getArticles() {
    try {
      const res = await axios.get(NEXT_WEB);
      this.setState({ news: res.data.articles });
      console.log(this.state.news);
    } catch(e) {
      console.error(e);
    }
  }

  componentDidMount(){
    this.getArticles();
  }

  render(){
    return (
      <div className='page'>
        <br></br>
        <h1 className='pageTitle'>The Next Web</h1>
        <div>
          <NextWeb article={this.state.news} />
        </div>
      </div>
    )
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
      try {
        const res = await axios.get(`https://newsapi.org/v2/everything?q=${event.target.value}&apiKey=b35512f2248e4519b8c58c213d8ee15d`);
        this.setState({ news: res.data.articles });
        console.log(this.state.news);
      } catch(e) {
        console.error(e);
      }
    }

  render(){
    return (
      <div className='page'>
        <br></br>
        <h1 className='pageTitle'>Search for articles</h1>
        <form onChange={ this.handleChange } onSubmit={ this.handleSubmit } >
        <input type="text" id='search' value={this.state.value} 
          onChange={this.handleChange} placeholder='Search...' onSubmit={this.handleSubmit} />
        </form>
      <div>
        {
          this.state.news && <SearchArticles article={this.state.news} />
        }
        </div>
      </div>
    )
  }
}