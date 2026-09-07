import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My education <span>&</span>
          <br /> certifications
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science and Engineering (IoT)</h4>
                <h5>Raghu Engineering College, Visakhapatnam</h5>
              </div>
              <h3>2023 – 2027</h3>
            </div>
            <p>
              Specializing in Internet of Things. Developing strong foundations in Python, SQL, JavaScript, React, Next.js, and Core Computer Science concepts. CGPA: 8.17 / 10.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intermediate (MPC)</h4>
                <h5>Narayana Junior College, Visakhapatnam</h5>
              </div>
              <h3>2020 – 2022</h3>
            </div>
            <p>
              Board of Intermediate Education, Andhra Pradesh (Mathematics, Physics, Chemistry). Score: 69.8%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Secondary School Certificate (SSC)</h4>
                <h5>Prathibha High School, Visakhapatnam</h5>
              </div>
              <h3>2019 – 2020</h3>
            </div>
            <p>
              Board of Secondary Education, Andhra Pradesh. Score: 99%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AWS Academy Cloud Foundations</h4>
                <h5>AWS Academy</h5>
              </div>
              <h3>Certification</h3>
            </div>
            <p>
              Certified foundation in AWS Cloud concepts, security, architecture, pricing, and services.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Programming in Java</h4>
                <h5>NPTEL Certification</h5>
              </div>
              <h3>Certification</h3>
            </div>
            <p>
              Certified course covering Object-Oriented Programming (OOPs), Java syntax, exception handling, multithreading, and collections framework.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Python Essential Certification</h4>
                <h5>Cisco</h5>
              </div>
              <h3>Certification</h3>
            </div>
            <p>
              Certified in core Python programming, data structures, control flow, and algorithmic problem-solving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
