import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const limit = 10;
  const [productsList, setProductList] = useState(null);
  const [page, setPage] = useState(1);
  const [displayedData, setDisplayedData] = useState(null);

  const fetchdata = async () => {
    let data = await fetch(`https://dummyjson.com/products?limit=100`);
    data = await data.json();
    setProductList(data.products);
    setPaginatedData(1, data.products);
  }

  const setPaginatedData = (i, data = productsList) => {
    if(!i) i = 1;
    setPage(i);
    setDisplayedData(data.slice(((i-1)*10), ((i*10)+1)))
  }

  const setPageOnArrowClick = (dir) => {
    let curPage = page, valid = false;
    if(dir == 'prev' && curPage > 1) {
        curPage -= 1;
        valid = true;
    } else {
      let maxPage = productsList.length/10;
      if(curPage < maxPage) {
        curPage += 1;
        valid = true;
      }
    }
    if(valid) setPaginatedData();
    
  }

  useEffect(() => {
    fetchdata();
  }, [])

  return (
    <>
    <div className="App">
    {
      displayedData && displayedData.map(el => {
        return <div className='single-product' key={el.id}>
          <img src={el.images[0]} className='single-product__image'></img>
          <p>{el.title}</p>
        </div>
      })
    }
    </div>
     {
      productsList && productsList.length > 0 && <div className='pagination'>
        <span className='pagination__icon' onClick={() => setPageOnArrowClick('prev')}>◀️</span>
          {[...Array(productsList.length/limit)].map((el,i) => <span key={i} onClick={() => setPaginatedData(i)} className={page==i ? 'pagination__selected-number':'pagination__number'}>{i+1}</span>)}
        <span className='pagination__icon' onClick={() => setPageOnArrowClick('next')}>▶️</span>
      </div>
    }
    </>
  )
}

export default App;
