import React from 'react';
import { Section } from '../ui/Section';
import { Timeline, TimelineItem } from '../ui/Timeline';
import { Tag } from '../ui/Tag';
import { Stats } from '../ui/Stats';

const stats = [
  { label: 'Talks Given', value: '25+' },
  { label: 'Conferences', value: '12' },
  { label: 'Countries', value: '8' },
  { label: 'Total Audience', value: '5000+' }
];

const talks = [
  {
    title: 'The Future of React Development',
    date: 'ReactConf 2024',
    description: 'Exploring the latest features and best practices in React development.',
    tags: ['react', 'javascript', 'webdev']
  },
  {
    title: 'Building Scalable Applications',
    date: 'TechSummit 2023',
    description: 'Architecture patterns for building large-scale applications.',
    tags: ['architecture', 'scaling', 'design']
  }
];

export function Speaking() {
  return (
    <div className="notion-page">
      <Section
        title="Speaking"
        subtitle="Conference talks, workshops, and presentations about web development and software architecture."
      >
        <Stats items={stats} className="mb-16" />
        
        <Timeline>
          {talks.map((talk) => (
            <TimelineItem
              key={talk.title}
              title={talk.title}
              date={talk.date}
            >
              <p className="mb-4">{talk.description}</p>
              <div className="flex flex-wrap gap-2">
                {talk.tags.map((tag) => (
                  <Tag key={tag} variant="notion">{tag}</Tag>
                ))}
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </Section>
    </div>
  );
}