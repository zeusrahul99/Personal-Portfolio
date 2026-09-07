import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              RAHUL
              <br />
              <span>NAYAK</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Specialized</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Full-Stack Dev</div>
              <div className="landing-h2-2">AI & IoT Eng.</div>
            </h2>
            <h2>
              <div className="landing-h2-info">AI & IoT Eng.</div>
              <div className="landing-h2-info-1">Full-Stack Dev</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
