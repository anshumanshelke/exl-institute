import Navigation from './components/Navigation';
import Page0_Intro from './components/Page0_Intro';
import Page1_Achievements from './components/Page1_Achievements';
import Page2_Courses from './components/Page2_Courses';
import Page3_HowWeTeach from './components/Page3_HowWeTeach';
import Page4_Testimonials from './components/Page4_Testimonials';
import Page5_Contact from './components/Page5_Contact';
import Footer from './components/Footer';

/**
 * Main App Component
 * Composes all 6 page sections with anchor navigation
 * Single-page application with smooth scrolling
 */
function App() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Page0_Intro />
        <Page1_Achievements />
        <Page2_Courses />
        <Page3_HowWeTeach />
        <Page4_Testimonials />
        <Page5_Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;