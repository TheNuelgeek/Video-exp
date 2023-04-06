import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import VideoCall from './videoCall';
 
const studioApiKey = process.env.REACT_APP_livepeer_key
const client = createReactClient({
  provider: studioProvider({ apiKey: studioApiKey }),
});
 
// const livepeerTheme: ThemeConfig = {
//   colors: {
//     accent: 'rgb(0, 145, 255)',
//     containerBorderColor: 'rgba(0, 145, 255, 0.9)',
//   },
//   fonts: {
//     display: 'Inter',
//   },
// };
 

function App() {

  return (
    <LivepeerConfig client={client}>
      <div className="App">
        <VideoCall />
      </div>
    </LivepeerConfig>
  )
}

export default App
