import { useState, useEffect } from 'react'
import './App.css'
import selfPic from './assets/SelfPic.jpeg'
import emailjs from "@emailjs/browser";



function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      alert("Message sent successfully!");
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send message. Please try again!");
    });
  };
  
  

  const skills = [
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'Java', level: 75 },
    { name: 'Node.js', level: 80 },
    { name: 'HTML/CSS', level: 90 },
    { name: 'Git', level: 85 },
    { name: 'MongoDB', level: 75 },
  ]

  const projects = [
    {
      title: 'Morpheus Pod',
      description: 'Developed a smart pillow system integrating ESP32, accelerometer, microphone, and heart rate sensors for real-time sleep stage monitoring using embedded TinyML models. Built a cross-platform React Native app with Bluetooth/WiFi connectivity.',
      tech: ['Python', 'React Native', 'TinyML', 'REST API', 'Node.js'],
      github: 'https://github.com/Ajinkya0605',
      demo: '#'
    },
    {
      title: 'Helper-Hub',
      description: 'Built an on-demand service booking app using React Native and MongoDB for real-time data management. Designed a user-friendly UI with seamless appointment scheduling for various home services.',
      tech: ['React-Native', 'Node.js', 'MongoDB', 'APIs'],
      github: 'https://github.com/Ajinkya0605',
      demo: '#'
    }
  ]

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo" onClick={() => scrollToSection('home')}>
            <span className="logo-text">&lt;Portfolio /&gt;</span>
          </div>
          <ul className="nav-menu">
            <li><a 
              href="#home" 
              className={activeSection === 'home' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('home') }}
            >Home</a></li>
            <li><a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('about') }}
            >About</a></li>
            <li><a 
              href="#skills" 
              className={activeSection === 'skills' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('skills') }}
            >Skills</a></li>
            <li><a 
              href="#projects" 
              className={activeSection === 'projects' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('projects') }}
            >Projects</a></li>
            <li><a 
              href="#education" 
              className={activeSection === 'education' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('education') }}
            >Education</a></li>
            <li><a 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}
            >Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="greeting">Hello, I'm</p>
            <h1 className="hero-name">
              <span className="gradient-text">Ajinkya Kale</span>
            </h1>
            <h2 className="hero-title">Computer Science Engineering Student</h2>
            <p className="hero-description">
              Motivated and passionate final year Computer Science student with a strong foundation in data structures, 
              algorithms, problem-solving, competitive programming, and front-end development. Seeking opportunities to 
              apply skills in a dynamic tech environment.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                View My Work
              </button>
              <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                Get In Touch
              </button>
            </div>
            <div className="social-links">
              <a href="https://github.com/Ajinkya0605" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/ajinkya-kale-442002264" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="mailto:kaleajinkya2005@gmail.com" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                </svg>
        </a>
      </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">
            <span className="section-number">01.</span> About Me
          </h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Hello! I'm Ajinkya Kale, a final year Computer Science Engineering student at Sharad Institute of Technology, 
                Ichalkaranji. I have a passion for software development, problem-solving, and creating innovative solutions 
                that make a difference.
              </p>
              <p>
                I have hands-on experience in full-stack development through internships at Three Star InfoTech and WolFox Services. 
                I've worked on projects involving React Native, TinyML, IoT, and web development technologies.
              </p>
              <p>
                Here are a few technologies I've been working with recently:
              </p>
              <ul className="tech-list">
                <li>JavaScript</li>
                <li>React & React Native</li>
                <li>Python</li>
                <li>Node.js</li>
                <li>Java</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div className="about-image">
              <div className="image-wrapper">
                <img 
                  src={selfPic} 
                  alt="Ajinkya Kale" 
                  className="profile-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">
            <span className="section-number">02.</span> Skills & Technologies
          </h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="tech-tags">
            <span className="tag">Frontend Development</span>
            <span className="tag">Backend Development</span>
            <span className="tag">Mobile Development</span>
            <span className="tag">Database Management</span>
            <span className="tag">Version Control</span>
            <span className="tag">Problem Solving</span>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">
            <span className="section-number">03.</span> Featured Projects
          </h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="15 3 21 3 21 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="10" y1="14" x2="21" y2="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education">
        <div className="container">
          <h2 className="section-title">
            <span className="section-number">04.</span> Education
          </h2>
          <div className="education-content">
            <div className="education-item">
              <div className="education-header">
                <h3 className="education-degree">B.Tech in Computer Science and Engineering</h3>
                <span className="education-year">Nov 2022 – Present</span>
              </div>
              <p className="education-institution">Sharad Institute of Technology, Ichalkaranji, India</p>
              <p className="education-details">
                Academic Performance: CGPA 7.73/10.0
              </p>
            </div>
            <div className="education-item" style={{marginTop: '2rem'}}>
              <div className="education-header">
                <h3 className="education-degree">Higher Secondary Education (XII)</h3>
                <span className="education-year">June 2020 – June 2022</span>
              </div>
              <p className="education-institution">Sharad Science and Commerce College, Yadrav, India</p>
              <p className="education-details">
                Academic Performance: 66.67% (Maharashtra State Board)
              </p>
            </div>
            <div className="education-item" style={{marginTop: '2rem'}}>
              <div className="education-header">
                <h3 className="education-degree">Secondary Education (X)</h3>
                <span className="education-year">June 2019 – June 2020</span>
              </div>
              <p className="education-institution">Shri Balaji Public School, Takawade, India</p>
              <p className="education-details">
                Academic Performance: 77.20% (Central Board of Secondary Education)
              </p>
            </div>
          </div>
      </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">
            <span className="section-number">05.</span> Get In Touch
          </h2>
          <div className="contact-content">
            <p className="contact-intro">
              I'm currently looking for opportunities in software development. Whether you have
              a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows="6"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-large">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>Designed & Built by Ajinkya Kale</p>
          <p className="footer-year">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
