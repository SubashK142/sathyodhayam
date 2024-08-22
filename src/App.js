import logo from './logo.svg';
import './App.css';
import Home from './Home/Home';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import SubmitNewsFeed from './News_feeds/News_feed';
import FeedsList from './News_feeds/Manage_News_feed';
import SubmitVoice from './Voice/Voice';
import SubmitMeditation from './Meditation/meditation';
import MeditationList from './Meditation/manage_meditation';
import VoiceList from './Voice/manage_voice';

function App() {
  const router= createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/newsfeed',
      element: <SubmitNewsFeed/>
    },
    {
      path:'/managenewsfeed',
      element:<FeedsList/>
    },
    {
      path:'/voice',
      element:<SubmitVoice/>
    },
    {
      path:'/meditation',
      element:<SubmitMeditation/>
    },
    {
      path:'/managemeditation',
      element:<MeditationList/>
    },
    {
      path:'/managevoice',
      element:<VoiceList/>
    }
  ])
  return (
    <RouterProvider router={router}>
    </RouterProvider>
    
  )
}
export default App;

