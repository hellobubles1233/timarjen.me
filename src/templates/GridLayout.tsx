import React from 'react';
import { Section } from '../ui/Section';
import { Grid } from '../ui/Grid';

interface GridLayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

export function GridLayout({
  header,
  footer,
  children,
  cols = 3,
  gap = 'lg'
}: GridLayoutProps) {
  return (
    <div className="notion-page py-32">
      <Section>
        {header && <div className="mb-12">{header}</div>}
        <Grid cols={cols} gap={gap}>
          {children}
        </Grid>
        {footer && <div className="mt-12">{footer}</div>}
      </Section>
    </div>
  );
}