import { PageSection } from './Section';
import teacherData from '../data/teacher.json';

/**
 * Page 0: Introduction / Opening
 * Teacher/MD hero section with large photo, bio, philosophy, CTA
 */
export default function Page0_Intro() {
  return (
    <PageSection 
      id="intro" 
      title="Meet Your Teacher" 
      subtitle={teacherData.designation}
      variant="dark"
      className="intro-section"
    >
      <div className="intro__inner">
        <div className="intro__content">
          <p className="intro__name">{teacherData.name}</p>
          
          <p className="intro__introduction">
            {teacherData.introduction}
          </p>
          
          <blockquote className="intro__philosophy">
            &ldquo;{teacherData.philosophy}&rdquo;
          </blockquote>
          
          <div className="intro__cta-group">
            <a href="#courses" className="btn btn-accent btn-lg">Explore Courses</a>
            <a href="#contact" className="btn btn-secondary btn-lg">Contact Us</a>
          </div>
        </div>
        
        <div className="intro__photo">
          <img
            src={teacherData.photo}
            alt={`${teacherData.name}, ${teacherData.designation} at EXL Institute`}
            className="intro__photo-img"
            loading="eager"
          />
        </div>
      </div>
    </PageSection>
  );
}