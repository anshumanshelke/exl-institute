import { Children } from 'react';

/**
 * Section Wrapper - Consistent layout for all page sections
 * Uses the design system container, spacing, and scroll-margin
 */
export function Section({ 
  id, 
  children, 
  className = '', 
  variant = 'default', // 'default' | 'alt' | 'dark'
  header,
  ...props 
}) {
  const variantClass = variant !== 'default' ? `page-section--${variant}` : '';
  const combinedClass = `page-section ${variantClass} ${className}`.trim();

  return (
    <section 
      id={id} 
      className={combinedClass} 
      {...props}
      aria-labelledby={header ? `${id}-title` : undefined}
    >
      <div className="container">
        {header && (
          <header className="page-section__header">
            {header}
          </header>
        )}
        <div className="page-section__content">
          {children}
        </div>
      </div>
    </section>
  );
}

/**
 * SectionHeader - Standardized section title/subtitle
 */
export function SectionHeader({ title, subtitle, titleId }) {
  return (
    <>
      <h2 id={titleId} className="page-section__title">
        {title}
      </h2>
      {subtitle && (
        <p className="page-section__subtitle">
          {subtitle}
        </p>
      )}
    </>
  );
}

/**
 * PageSection - High-level page section with standardized header
 */
export function PageSection({ 
  id, 
  title, 
  subtitle, 
  children, 
  variant = 'default',
  className = '',
  ...props 
}) {
  const header = (
    <SectionHeader title={title} subtitle={subtitle} titleId={id + '-title'} />
  );
  
  return (
    <Section 
      id={id} 
      variant={variant}
      className={className}
      header={header}
      {...props}
    >
      {children}
    </Section>
  );
}