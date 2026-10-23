import { PageSection } from './Section';
import StudentAchievementSlideshow from './StudentAchievementSlideshow';

/**
 * Page 1: Student Achievements
 * Image-driven carousel with student photos, names, achievements, courses
 */
export default function Page1_Achievements() {
  return (
    <PageSection 
      id="achievements" 
      title="Student Achievements" 
      subtitle="Real students. Real results. See what our learners have accomplished."
    >
      <StudentAchievementSlideshow />
    </PageSection>
  );
}
