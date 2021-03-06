import React, { Component } from 'react';

import './App.css';


let defaultStyle = {
  color: '#fff'

}
let fakeServerData = {
  user: {
    name: 'Teo',
    playlists: [
      {
        name: 'My favorite',
        songs: [{name: 'Beat it', duration: 1345}, {name: 'Beat it', duration: 1345},{name: 'Beat it', duration: 1345}]

      },
      {
        name: 'Discover Weekly',
        songs: [{name: 'Beat it', duration: 1345}, {name: 'Feat it', duration: 1345},{name: 'Beach it', duration: 1345}]

      },
      {
        name: 'My favorite',
        songs: [{name: 'Beat it', duration: 1345}, {name: 'Beat it', duration: 1345}, {name: 'Beat it', duration: 1345}]

      },
      {
        name: 'Other Playlist',
        songs: [{name: 'Beat it', duration: 1345}, {name: 'Beat it', duration: 1345}, {name: 'Beat it', duration: 1345}],

      }
    ]
  }
}
class PlaylistCounter extends Component {
  render() {
    return (
    <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
      <h2 >{ this.props.playlists.length} Playlists</h2>
    </div>
    )
  }
}
class HourCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist)=> { return songs.concat(eachPlaylist.songs)
    },[])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
    <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
      <h2 >{Math.floor(totalDuration/(60*60))} Hours</h2>
    </div>
    )
  }
}
class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img alt=""/>
        <input type="text" onChange={event => this.props.onTextChange(event.target.value) }/>

      </div>
    )
  }
}
class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{...defaultStyle, width: "25%", display: 'inline-block'}}>
        <img alt=""/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => <li>{song.name}</li>)}
        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
    serverData:{},
    filterString: ''
    }

  }
  componentDidMount() {
    setTimeout(() =>{
      this.setState({serverData: fakeServerData})
    }, 200)

  }
  render() {

    return (
      <div className="App">
      {this.state.serverData.user ? <div> <h1 style={{...defaultStyle, 'font-size': '54px'}}> {this.state.serverData.user.name}'s playlist</h1>

          <PlaylistCounter playlists= {this.state.serverData.user.playlists}/>
          <HourCounter playlists= {this.state.serverData.user.playlists}/>

        <Filter onTextChange={text => this.setState({filterString: text})}/>
        {
          this.state.serverData.user.playlists.filter(
            playlist => playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
          ).map(playlists =>
          <Playlist playlist={playlists}/> )
        }


      </div> : <h1 style={defaultStyle}>Loading...</h1>}
      </div>
    );
  }
}

export default App;
