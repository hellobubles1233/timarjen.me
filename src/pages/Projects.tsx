import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Section } from "../ui/Section";
import { Grid } from "../ui/Grid";
import { Card, CardTitle, CardDescription } from "../ui/Card";
import { Tag } from "../ui/Tag";
import { Badge } from "../ui/Badge";
import { Stats } from "../ui/Stats";
import { Tabs } from "../ui/Tabs";
import { useSupabaseQuery } from "../hooks/useSupabaseQuery";
import { Project } from "../types/database";
import { Skeleton } from "../ui/Skeleton";
import { Alert } from "../ui/Alert";

function ProjectCard({ project }: { project: Project }) {
  const statusColors = {
    completed: "green",
    "in-progress": "blue",
    planned: "gray",
  };

  return (
    <Link to={`/projects/${project.uuid}`}>
      <Card className="overflow-hidden group transition-all hover:shadow-lg">
        <div className="aspect-video overflow-hidden rounded-lg mb-4">
          <img
            draggable="false"
            src={project.content.imageUrl || "https://via.placeholder.com/800x400"}
            alt={project.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Badge variant={statusColors[project.status as keyof typeof statusColors]}>
              {project.status.replace("-", " ")}
            </Badge>
            <div className="text-sm text-notion-gray-dark">
              {new Date(project.created_at).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
            {project.lead && (
              <div className="text-sm text-notion-gray-dark">Lead: {project.lead}</div>
            )}
          </div>
          <div>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.content.description}</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tech) => (
              <Tag key={tech} variant={tech as any}>
                {tech}
              </Tag>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<"all" | "completed" | "in-progress" | "planned">("all");
  const { data: projects, loading, error } = useSupabaseQuery<Project>("projects", {
    orderBy: { column: "created_at", ascending: false },
  });

  const tabs = [
    { id: "all", label: "All Projects" },
    { id: "completed", label: "Completed" },
    { id: "in-progress", label: "In Progress" },
    { id: "planned", label: "Planned" },
  ];

  const filteredProjects = projects?.filter((p) => filter === "all" || p.status === filter) || [];

  const stats = {
    totalProjects: projects?.length || 0,
    completedProjects: projects?.filter((p) => p.status === "completed").length || 0,
    inProgressProjects: projects?.filter((p) => p.status === "in-progress").length || 0,
    plannedProjects: projects?.filter((p) => p.status === "planned").length || 0,
  };

  if (error) {
    return (
      <div className="notion-page pt-32">
        <Section title="Error" subtitle="Failed to load projects">
          <Alert variant="error">{error.message}</Alert>
        </Section>
      </div>
    );
  }

  return (
    <div className="notion-page pt-32">
      <Section
        title="Projects"
        subtitle="A collection of my personal and professional projects"
      >
        <Stats
          items={[
            { label: "Total Projects", value: stats.totalProjects },
            { label: "Completed", value: stats.completedProjects },
            { label: "In Progress", value: stats.inProgressProjects },
            { label: "Planned", value: stats.plannedProjects },
          ]}
          className="mb-12"
        />

        <Tabs
          tabs={tabs.map((tab) => ({
            id: tab.id,
            label: tab.label,
            content: null,
          }))}
          activeTab={filter}
          onChange={(id) => setFilter(id as typeof filter)}
          className="mb-8"
        />

        <Grid cols={2} gap="lg">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="space-y-4">
                <Skeleton className="aspect-video rounded-lg" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </Card>
            ))
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard key={project.uuid} project={project} />
            ))
          )}
        </Grid>
      </Section>
    </div>
  );
}