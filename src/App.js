import logo from './logo.svg'
import './App.css'
import './UtilStyle.css'
import Block from './components/Block'

function App () {
  
  return (
    <div className='App'>
      <main>
        <div className='title-container'>
          <h1 className='m-0'>Memory Blocks</h1>
          <p className='m-0'>How much pattern you can memorize?</p>
        </div>
        <div className='flex flex-center'>
          <div className='blocks-container'>
            <Block value={1} />
            <Block value={1} />
            <Block value={1} />
            <Block value={1} />
            <Block value={1} />
            <Block value={1} />
            <Block value={1} />
            <Block value={1} />
            <Block value={1} />
          </div>
        </div>
        <div className='flex flex-center'>
          <div className='btn-play-container'>
            <button className='btn-play' onClick={play}>
              Play
            </button>
          </div>
        </div>
        <footer>
          <p>Created by: Darwin</p>
        </footer>
      </main>
    </div>
  )
}

export default App
