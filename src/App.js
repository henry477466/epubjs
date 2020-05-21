import React from 'react';
import './App.scss';
import EpubView from './components/EpubView';
import axios from 'axios';

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
    let ctxPath = 'http://www.tuibook.com/szyun/books/bilei20191012/unfile/20191012002';
    axios
      .get(`${ctxPath}/META-INF/container.xml`)
      .then((res) => {
        console.log('成功', res);
        try {
          var x2js = new window.X2JS();
          var json = x2js.xml_str2json(res.data);
          let path = json.container.rootfiles.rootfile['_full-path'];
          console.log('地址：', path);
          this.setState({
            // localFile: '/epub/2.epub',
            // localFile: '/epub/1/content.opf',
            localFile: `${ctxPath}/${path}`,
            localName: '图书名字',
          });
        } catch (e) {
          console.log('错误', e);
        }
      })
      .catch((er) => {
        console.log('错误', er);
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
            {localFile ? <EpubView localFile={localFile} epubLoadEd={this.epubLoadEd} /> : null}
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
