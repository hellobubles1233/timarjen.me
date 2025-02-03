import React from 'react';
import { Section } from '../ui/Section';
import { Grid } from '../ui/Grid';
import { Card, CardTitle, CardDescription } from '../ui/Card';
import { Tag } from '../ui/Tag';
import { Badge } from '../ui/Badge';

const posts = [
  {
    title: 'Building Scalable React Applications',
    description: 'Learn how to structure large React applications for scalability and maintainability.',
    date: 'Mar 15, 2024',
    tags: ['react', 'typescript', 'architecture'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'The Future of Web Development',
    description: 'Exploring upcoming trends and technologies in web development.',
    date: 'Mar 10, 2024',
    tags: ['webdev', 'future', 'trends'],
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80'
  }
];

export function Blog() {
  return (
    <div className="notion-page">
      <Section
        title="Blog"
        subtitle="Thoughts, tutorials, and insights about software development and design."
      >
        <Grid cols={2} gap="lg">
          {posts.map((post) => (
            <Card key={post.title} className="overflow-hidden">
              <div className="aspect-video overflow-hidden rounded-lg mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="gray">{post.date}</Badge>
                </div>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag} variant="notion">{tag}</Tag>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>
    </div>
  );
}