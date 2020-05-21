import React from 'react';
import './App.scss';
import EpubView from './components/EpubView';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      toc: [],
      localFile: null,
      localName: null,
    };
  }
  componentDidMount() {
    this.setState({
      // localFile: '/epub/2.epub',
      localFile: '/epub/1/content.opf',
      // localFile: `file:///data/user/0/com.cjread/files/epub/1.epub`,
      localName: '图书名字',
    });
  }
  //加载完成
  epubLoadEd = (toc) => {
    this.setState({
      toc: toc,
      loaded: true,
    });
  };
  render() {
    const { toc, localFile, localName, loaded } = this.state;
    return (
      <div className='App'>
        <div className='book-root'>
          <div className='book-border'>
            {localFile ? <EpubView localFile={localFile} epubLoadEd={this.epubLoadEd}/> : null}
            {/* <button className='FontSizeButton'>文字大小</button> */}
          </div>
        </div>
        <div className={`file-loading ${loaded ? 'hide' : ''}`}>
          <p>Loading Book ...</p>
        </div>
      </div>
    );
  }
}

export default App;
