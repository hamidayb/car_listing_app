import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAds } from './redux/actions/adActions';

function App() {
  const allAds = useSelector((state) => state.allAds);
  const { loading, ads, error } = allAds;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllAds());
  }, [dispatch]);

  return (
    <div className='App'>
      {ads && ads.map((ad, index) => <p>{ad.model}</p>)}
    </div>
  );
}

export default App;
