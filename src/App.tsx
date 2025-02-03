import React from "react";
import "./styles/globals.css";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Navigation } from "./ui/Navigation";
import { Title } from "./ui/Title";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Section } from "./ui/Section";
import { Stats } from "./ui/Stats";
import { Avatar } from "./ui/Avatar";
import { Media } from "./pages/Media";
import { Products } from "./pages/Products";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Experience } from "./pages/Experience";
import { Showcase } from "./pages/Showcase";
import { Kronos } from "./pages/Kronos";

const navigationItems = [
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Experience",
    href: "/experience",
  },
  {
    title: "Media",
    href: "/media",
  },
  {
    title: "Products",
    href: "/products",
  },
];

function HomePage() {
  return (
    <main className="notion-page pt-32 pb-20">
      <motion.div
        className="space-y-16"
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {/* Hero Section */}
        <Section id="about" className="space-y-8">
          <div className="flex items-center space-x-6">
            <Avatar alt="Tim Luginbühl" size="xl" />
            <div className="space-y-4">
              <Title>Hi, I'm Tim 👋</Title>
              <div className="flex items-center space-x-2">
                <Badge variant="blue">Front-end Developer</Badge>
                <Badge variant="green">Available for hire</Badge>
              </div>
            </div>
          </div>
          <p className="text-lg leading-relaxed text-notion-light max-w-2xl">
            I specialize in building modern web applications with React,
            Node.js, and TypeScript. Currently working on exciting projects{" "}
            <Badge variant="red" className="text-md">
              <a href="http://www.valaiscom.ch"> @Valaiscom AG</a>
            </Badge>
          </p>
          <Stats
            items={[
              { label: "Years Experience", value: "5" },
              { label: "Projects Completed", value: "13" },
              { label: "Companies Helped", value: "7" },
              { label: "Open Source Contributions", value: "16" },
            ]}
          />
        </Section>

        {/* Contact */}
        <Section id="contact" title="Get in Touch" className="text-center">
          <Card>
            <div>
              <div className="flex items-center justify-center space-x-4">
                <a href="https://github.com/hellobubles1233">
                  <Button variant="outline">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </a>
                <a href="https://istagram.com/tim.luginbuehl">
                  <Button variant="outline">
                    <Instagram className="mr-2 h-4 w-4" />
                    Instagram
                  </Button>
                </a>
                <a href="mailto:portfolio@timarjen.me">
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    E-Mail
                  </Button>
                </a>
                <a href="https://www.linkedin.com/in/tim-luginbuehl/">
                  <Button variant="outline">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </Section>
      </motion.div>
    </main>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation items={navigationItems} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/media" element={<Media />} />
        <Route path="/products" element={<Products />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/kronos" element={<Kronos />} />
      </Routes>
    </div>
  );
}

export default App;