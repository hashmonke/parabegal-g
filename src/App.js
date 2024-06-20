import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import cornellLogo from './images/cornell.png';
import brownLogo from './images/brown.png';
import demoVideo from './images/parabegaldemo.mov';

function App() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentTime = Date.now();
    if (currentTime - lastSubmissionTime < 30000) {
      toast.error('Please wait 30 seconds before submitting again.');
      return;
    }

    setIsLoading(true);
    setLastSubmissionTime(currentTime);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwoN9tImL7TRjcnhjsClP-1Itw-49KNSHBE7Rkz6HGLlol2MO8-qFVVFKMdpv0zp-9p/exec';

    fetch(scriptURL, {
      method: 'POST',
      body: new URLSearchParams({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success('Sign up successful!');
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error('Sign up failed.');
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-header">
          <h1 className="logo-text"> 🐕 Parabegal</h1>
        </div>
        <div className="hero">
          <div className="text-content">
            <h1 id="header">Mundane paralegal tasks, <span className="highlight">fully automated</span></h1>
            <p id="sub-header">Upload a client intake form & we’ll paste the info into Needles.</p>
            <form onSubmit={handleSubmit}>
              <input
                id="email"
                type="email"
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    Loading...
                    <div className="spinner"></div>
                  </>
                ) : (
                  'Join the waitlist'
                )}
              </button>
            </form>
          </div>
          <div className="video-container">
            <video width="100%" height="auto" controls>
              <source src={demoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </header>
      <main>
        <div className="how-it-works">
          <h2 id="how-it-works">How it works</h2>
          <div className="steps">
            <div className="step">
              <span>1</span>
              <p id="step-text">Connect to Needles</p>
            </div>
            <div className="step">
              <span>2</span>
              <p id="step-text">Upload client intake file</p>
            </div>
            <div className="step">
              <span>3</span>
              <p id="step-text">We auto-fill a new case record in Needles</p>
            </div>
            <div className="step">
              <span id="unique-one">🎉</span>
              <p id="step-text">We auto-email the client your welcome message</p>
            </div>
          </div>
        </div>
        <div className="founders">
          <h2 id="how-it-works">Built by founders at...</h2>
          <div className="logos">
            <img src={cornellLogo} id="cornell" alt="Cornell University" />
            <img src={brownLogo} id="brown" alt="Brown University" />
          </div>
        </div>
      </main>
      <footer>
        <div className="inner-footer">
          <p>Parabegal - Mundane paralegal tasks, fully automated</p>
          <a href="mailto:contact@parabegal.com">Contact us</a>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
}

export default App;