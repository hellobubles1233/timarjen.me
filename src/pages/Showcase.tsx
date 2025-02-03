import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Info, Mail, Github } from "lucide-react";
import { Section } from "../ui/Section";
import { Title } from "../ui/Title";
import { Button } from "../ui/Button";
import { Card, CardTitle, CardDescription } from "../ui/Card";
import { Alert } from "../ui/Alert";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import { Progress } from "../ui/Progress";
import { Stats } from "../ui/Stats";
import { Tag } from "../ui/Tag";
import { Timeline, TimelineItem } from "../ui/Timeline";
import { Tabs } from "../ui/Tabs";
import { Tooltip } from "../ui/Tooltip";
import { Accordion } from "../ui/Accordion";
import { Grid } from "../ui/Grid";

export function Showcase() {
  const [activeTab, setActiveTab] = useState("buttons");

  const tabs = [
    { id: "buttons", label: "Buttons", content: <ButtonShowcase /> },
    { id: "cards", label: "Cards", content: <CardShowcase /> },
    { id: "alerts", label: "Alerts", content: <AlertShowcase /> },
    { id: "badges", label: "Badges & Tags", content: <BadgeShowcase /> },
    {
      id: "progress",
      label: "Progress & Stats",
      content: <ProgressShowcase />,
    },
    { id: "timeline", label: "Timeline", content: <TimelineShowcase /> },
  ];

  return (
    <div className="notion-page pt-32">
      <Section>
        <Title>Component Showcase</Title>
        <p className="text-notion-gray-dark mb-8">
          A comprehensive showcase of all available UI components with their
          variants and states.
        </p>

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Components", href: "#" },
            { label: "Showcase" },
          ]}
          className="mb-8"
        />

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </Section>
    </div>
  );
}

function ButtonShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">With Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button variant="outline">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}

function CardShowcase() {
  return (
    <Grid cols={2} gap="lg">
      <Card>
        <CardTitle>Simple Card</CardTitle>
        <CardDescription>
          A basic card with title and description.
        </CardDescription>
      </Card>

      <Card className="space-y-4">
        <div className="aspect-video rounded-md overflow-hidden">
          <img
            draggable="false"
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
            alt="Card with image"
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle>Card with Image</CardTitle>
        <CardDescription>
          A card featuring an image and content below.
        </CardDescription>
      </Card>
    </Grid>
  );
}

function AlertShowcase() {
  return (
    <div className="space-y-4">
      <Alert variant="info">This is an informational alert message.</Alert>
      <Alert variant="success">Operation completed successfully!</Alert>
      <Alert variant="warning">
        Please review your input before proceeding.
      </Alert>
      <Alert variant="error">
        An error occurred while processing your request.
      </Alert>
    </div>
  );
}

function BadgeShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="green">Success</Badge>
          <Badge variant="blue">Info</Badge>
          <Badge variant="red">Error</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Tag>default</Tag>
          <Tag variant="react">react</Tag>
          <Tag variant="typescript">typescript</Tag>
          <Tag variant="node">node</Tag>
        </div>
      </div>
    </div>
  );
}

function ProgressShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Progress Bars</h3>
        <div className="space-y-4">
          <Progress value={30} label="Basic Progress" showValue />
          <Progress
            value={60}
            variant="success"
            label="Success Progress"
            showValue
          />
          <Progress
            value={90}
            variant="error"
            label="Error Progress"
            showValue
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Stats</h3>
        <Stats
          items={[
            { label: "Total Users", value: "1,234" },
            { label: "Active Now", value: "423" },
            { label: "Revenue", value: "$12.4k" },
          ]}
        />
      </div>
    </div>
  );
}

function TimelineShowcase() {
  return (
    <Timeline>
      <TimelineItem title="Feature Launch" date="March 2024">
        Launched new product features including user authentication and
        real-time updates.
      </TimelineItem>
      <TimelineItem title="Beta Testing" date="February 2024">
        Conducted beta testing with selected users and gathered valuable
        feedback.
      </TimelineItem>
      <TimelineItem title="Initial Development" date="January 2024">
        Started development of the core features and basic infrastructure.
      </TimelineItem>
    </Timeline>
  );
}
