import React from 'react';
import Lottie from 'lottie-react-web';
import animation from '../../assets/images/97930-loading.json'
import "./styles.css"

function Loading() {
  return (
    <div id="loading">
      <div id="loadingcomp">
        <Lottie options={{
          animationData: animation
        }} />
      </div>
    </div>
  )
}

export default Loading;