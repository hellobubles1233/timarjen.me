import React from "react";
import { Section } from "../ui/Section";
import { Timeline, TimelineItem } from "../ui/Timeline";
import { Tag } from "../ui/Tag";
import { Stats } from "../ui/Stats";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { useSupabaseQuery } from "../hooks/useSupabaseQuery";
import { Experience as ExperienceType } from "../types/database";
import { Skeleton } from "../ui/Skeleton";
import { Alert } from "../ui/Alert";

function ExperienceCard({ experience }: { experience: ExperienceType }) {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">{experience.jobtitle}</h3>
          <p className="text-notion-gray-dark">{experience.company}</p>
        </div>
        <Badge variant="gray">{experience.type}</Badge>
      </div>

      <div className="space-y-4">
        <p className="text-notion-gray-dark">{experience.content.description}</p>

        {experience.content.responsibilities && (
          <div>
            <h4 className="font-medium mb-2">Key Responsibilities:</h4>
            <ul className="list-disc list-inside space-y-1 text-notion-gray-dark">
              {experience.content.responsibilities.map((resp: string, index: number) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </div>
        )}

        {experience.content.achievements && (
          <div>
            <h4 className="font-medium mb-2">Achievements:</h4>
            <ul className="list-disc list-inside space-y-1 text-notion-gray-dark">
              {experience.content.achievements.map((achievement: string, index: number) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {experience.tags?.map((tech) => (
            <Tag key={tech} variant={tech as any}>
              {tech}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function Experience() {
  const { data: experiences, loading, error } = useSupabaseQuery<ExperienceType>(
    "experience",
    {
      orderBy: { column: "created_at", ascending: false },
    }
  );

  const stats = {
    totalYears: experiences?.reduce((acc, exp) => {
      const start = new Date(exp.created_at);
      const end = exp.ended_at ? new Date(exp.ended_at) : new Date();
      return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
    }, 0) || 0,
    totalCompanies: new Set(experiences?.map((e) => e.company)).size || 0,
    totalRoles: experiences?.length || 0,
    technologiesUsed: new Set(experiences?.flatMap((e) => e.tags || [])).size || 0,
  };

  if (error) {
    return (
      <div className="notion-page pt-32">
        <Section title="Error" subtitle="Failed to load experience data">
          <Alert variant="error">{error.message}</Alert>
        </Section>
      </div>
    );
  }

  return (
    <div className="notion-page pt-32">
      <Section
        title="Experience"
        subtitle="My professional journey and career highlights"
      >
        <Stats
          items={[
            { label: "Years Experience", value: Math.round(stats.totalYears) },
            { label: "Companies", value: stats.totalCompanies },
            { label: "Roles", value: stats.totalRoles },
            { label: "Technologies", value: stats.technologiesUsed },
          ]}
          className="mb-12"
        />

        <Timeline>
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <TimelineItem
                key={index}
                title={<Skeleton className="h-6 w-48" />}
                date={<Skeleton className="h-4 w-32" />}
              >
                <Card className="space-y-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </Card>
              </TimelineItem>
            ))
          ) : (
            experiences?.map((exp) => (
              <TimelineItem
                key={exp.uuid}
                title={`${exp.jobtitle} at ${exp.company}`}
                date={`${new Date(exp.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })} - ${
                  exp.ended_at
                    ? new Date(exp.ended_at).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : "Present"
                }`}
              >
                <ExperienceCard experience={exp} />
              </TimelineItem>
            ))
          )}
        </Timeline>
      </Section>
    </div>
  );
}