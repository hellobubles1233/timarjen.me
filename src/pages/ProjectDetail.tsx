import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Section } from "../ui/Section";
import { Title } from "../ui/Title";
import { Tag } from "../ui/Tag";
import { Badge } from "../ui/Badge";
import { useSupabaseQuery } from "../hooks/useSupabaseQuery";
import { Project } from "../types/database";
import { Alert } from "../ui/Alert";
import ReactMarkdown from 'react-markdown';

export function ProjectDetail() {
  const { id } = useParams();
  const { data: projects, loading, error } = useSupabaseQuery<Project>("projects", {
    filter: { column: "uuid", value: id }
  });

  const project = projects?.[0];

  if (loading) {
    return (
      <div className="notion-page pt-32">
        <Section>
          <div>Loading...</div>
        </Section>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="notion-page pt-32">
        <Section>
          <Alert variant="error">
            {error ? error.message : "Project not found"}
          </Alert>
        </Section>
      </div>
    );
  }

  const statusColors = {
    completed: "green",
    "in-progress": "blue",
    planned: "gray",
  };

  return (
    <div className="notion-page pt-32">
      <Section>
        <Link
          to="/projects"
          className="inline-flex items-center text-notion-gray-dark hover:text-notion-default mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to projects
        </Link>

        <div className="space-y-8">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              draggable="false"
              src={project.content.imageUrl || "https://via.placeholder.com/800x400"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant={statusColors[project.status as keyof typeof statusColors]}>
                {project.status.replace("-", " ")}
              </Badge>
              <div className="text-sm text-notion-gray-dark">
                {new Date(project.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            <Title variant="h2">{project.title}</Title>
            
            {project.lead && (
              <div className="text-notion-gray-dark">Lead: {project.lead}</div>
            )}

            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tech) => (
                <Tag key={tech} variant={tech as any}>
                  {tech}
                </Tag>
              ))}
            </div>

            <article className="prose prose-gray max-w-none">
              <div dangerouslySetInnerHTML={{ __html: project.content.markdown || project.content.description }} />
            </article>
          </div>
        </div>
      </Section>
    </div>
  );
}