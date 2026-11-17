import { Section, SectionHeader } from './Section';
import teacherData from '../data/teacher.json';

/**
 * Page 0: Introduction / Opening
 * Teacher/MD hero section with real founder photo, bio, philosophy, CTA
 */
export default function Page0_Intro() {
  return (
    <Section
      id="intro" 
      variant="dark"
      className="intro-section"
      aria-labelledby="intro-title"
    >
      <div className="intro__inner">
        <div className="intro__content">
          <header className="page-section__header">
            <SectionHeader
              title="Meet Your Founder"
              subtitle={teacherData.designation}
              titleId="intro-title"
            />
          </header>

          <p className="intro__name">{teacherData.name}</p>
          
          <p className="intro__introduction">
            {teacherData.introduction}
          </p>
          
          <blockquote className="intro__philosophy">
            &ldquo;{teacherData.philosophy}&rdquo;
          </blockquote>
          
          <div className="intro__cta-group">
            <a href="#courses" className="btn btn-success btn-lg">Explore Courses</a>
            <a href="#contact" className="btn btn-light-outline btn-lg">Contact Us</a>
          </div>
        </div>
        
        <div className="intro__photo">
          <img
            src={teacherData.photo}
            alt="Prof. Shalaka Kale, Founder and Managing Director of EXL Institute"
            className="intro__photo-img"
            width="841"
            height="1266"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </Section>
  );
}
