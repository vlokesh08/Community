'use client';

import { motion } from 'framer-motion';
import { Github, Heart, Calendar, Users, Code, GitPullRequest, BookOpen, Sparkles } from 'lucide-react';

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const roadmapSteps = [
    {
      title: 'Getting Started',
      description: 'Set up your local development environment',
      icon: <Github className="w-6 h-6" />
    },
    {
      title: 'Understanding',
      description: 'Read docs and explore code',
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: 'Find an Issue',
      description: 'Choose an open issue to work on',
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: 'Make Changes',
      description: 'Write code following guidelines',
      icon: <Code className="w-6 h-6" />
    },
    {
      title: 'Submit PR',
      description: 'Create your pull request',
      icon: <GitPullRequest className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen manrope dark:bg-dark-main">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

        {/* What is Open Source Section */}
        {/* <motion.section 
          className="mb-16"
          initial="initial"
          whileInView="animate"
          variants={fadeIn}
          viewport={{ once: true }}
        >
          <div className="rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6">What is Open Source?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-card-foreground mb-4">
                  Open source software is code that is designed to be publicly accessible—anyone can see, modify, and distribute the code as they see fit. Open source promotes collaboration, transparency, and community-driven development.
                </p>
                <p className="text-card-foreground">
                  When a project is open source, it means anybody is free to use, study, modify, and distribute your project for any purpose. These permissions are enforced through an open source license.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Heart className="w-24 h-24 text-destructive animate-pulse" />
              </div>
            </div>
          </div>
        </motion.section> */}

        {/* Contribution Roadmap */}
        <motion.section 
          className="mb-16"
          initial="initial"
          whileInView="animate"
          variants={fadeIn}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Contribution Roadmap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {roadmapSteps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:shadow-none dark:border dark:border-border h-full flex flex-col justify-between"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div>
                  <div className="flex justify-center mb-4 text-primary">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">{step.title}</h3>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How to Contribute */}
        <motion.section 
          className="mb-16"
          initial="initial"
          whileInView="animate"
          variants={fadeIn}
          viewport={{ once: true }}
        >
          <div className="rounded-xl p-4 md:p-8">
            <h2 className="text-3xl font-bold mb-6">How to Contribute</h2>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <Github className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="w-full">
                  <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
                  <ol className="list-decimal list-inside text-card-foreground space-y-2">
                    <li>Fork the repository on GitHub</li>
                    <li className="break-all">Clone your fork: <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-sm">git clone https://github.com/yourusername/Events-Manager.git</code></li>
                    <li className="break-all">Add upstream remote: <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-sm">git remote add upstream https://github.com/vlokesh08/Community.git</code></li>
                  </ol>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-4">
                <Code className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="w-full">
                  <h3 className="text-xl font-semibold mb-2">Development Workflow</h3>
                  <ol className="list-decimal list-inside text-card-foreground space-y-2">
                    <li>Install dependencies: <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-sm">npm install</code></li>
                    <li>Create a new branch: <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-sm">git checkout -b feature/your-feature</code></li>
                    <li>Make your changes following our code style</li>
                    <li>Test your changes locally: <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-sm">npm run dev</code></li>
                  </ol>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-4">
                <GitPullRequest className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="w-full">
                  <h3 className="text-xl font-semibold mb-2">Submitting Changes</h3>
                  <ol className="list-decimal list-inside text-card-foreground space-y-2">
                    <li>Stage your changes: <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-sm">git add .</code></li>
                    <li>
                      <span>Commit with a descriptive message:</span>
                      <pre className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded mt-2 text-sm overflow-x-auto whitespace-pre-wrap">
                        git commit -m "type(scope): description

                        - More details about the changes
                        - List any breaking changes
                        
                        Fixes #issue-number"
                      </pre>
                      <p className="text-sm text-muted-foreground mt-2">Types: feat, fix, docs, style, refactor, test, chore</p>
                    </li>
                    <li className="break-all">Push to your fork: <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-sm">git push origin feature/your-feature</code></li>
                    <li>Open a Pull Request with a clear title and description</li>
                  </ol>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="w-full">
                  <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
                  <ul className="list-disc list-inside text-card-foreground space-y-2">
                    <li>Follow our Next.js and TypeScript conventions</li>
                    <li>Use Tailwind CSS for styling</li>
                    <li>Keep components modular and reusable</li>
                    <li>Update documentation for new features</li>
                    <li>Be respectful and collaborative in discussions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}