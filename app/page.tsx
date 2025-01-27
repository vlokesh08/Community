"use client";
import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { CalendarDays, Users } from "lucide-react";
import { Github, Code, Bug, Book, Coffee, Heart, Stars } from "lucide-react";

import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/LandingPage/Footer";
import EventsSection from "@/components/LandingPage/EventsSection";

export default function Home() {
  const words = ["Event", "Connections"];
  return (
    <div className="min-h-screen manrope">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#2563eb] to-[#1d4ed8] opacity-20"
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-36 ">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl text-neutral-600 dark:text-neutral-400">
              Discover Amazing Events Near You
            </h1>
            <p className="mb-8 text-lg max-w-lg text-muted-foreground md:text-lg">
              Find and join exciting events in your area. Connect with
              like-minded people and create unforgettable memories.
            </p>
            {/* <div className="text-5xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
              Discover Amazing
              <span>Events</span>
              Near You
            </div>
            <p className="mb-8 mt-5 text-sm text-muted-foreground md:text-base max-w-lg text-center">
              Find and join exciting events in your area. Connect with
              like-minded people and create unforgettable memories.
            </p> */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-blue-900 hover:bg-blue-800 dark:text-white">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  Browse Events
                </Button>
              </Link>
              <Link href="/auth/signin">
                {/* <SignInButton /> */}
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-neutral-800 bg-transparent border-neutral-500"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <EventsSection />
      </section>

      {/* Features Section */}
      <section className="py-8">
        <div className="container px-4 mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-3xl font-bold text-center"
          >
            TelComm can help you with...
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: (
                  <CalendarDays className="w-12 h-12 mx-auto mb-4 text-primary text-blue-900" />
                ),
                title: "Find Events",
                description:
                  "Discover upcoming events that match your interests",
              },
              {
                icon: <Users className="w-12 h-12 mx-auto mb-4 text-primary text-blue-900" />,
                title: "Create Events",
                description: "Share your events with the community",
              },
              {
                icon: (
                  <CalendarDays className="w-12 h-12 mx-auto mb-4 text-primary text-blue-900" />
                ),
                title: "Track Events",
                description: "Keep track of your upcoming and past events",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="p-2 dark:bg-dark-card rounded-lg border"
              >
                <div className="py-12 bg-neutral-100 dark:bg-dark-button rounded-lg">
                  {feature.icon}
                </div>
                <div className="flex flex-col gap-1 my-3 p-2">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-20 ">
        <div className="container px-4 mx-auto ">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-6" />
            <h2 className="mb-6 text-4xl font-bold">
              Built by the Community, for the Community
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join hundreds of developers who are shaping the future of
              open-source development. Whether you're fixing bugs, improving
              docs, or adding features - every contribution matters.
            </p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="p-8 bg-blue-50 dark:bg-dark-card rounded-2xl">
              <h3 className="text-2xl dark:text-neutral-200 text-neutral-900 font-semibold mb-4">
                Ready to Contribute?
              </h3>
              <p className="mb-6 text-gray-600">
                Start with our beginner-friendly issues or join our Discord
                community for guidance. Every contribution, no matter how small,
                helps make this project better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://github.com/vlokesh08/Community"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="w-full sm:w-auto">
                    <Github className="w-5 h-5 mr-2" />
                    View on GitHub
                  </Button>
                </Link>
                <Link href="/docs/contributing" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Book className="w-5 h-5 mr-2" />
                    Read Contributing Guide
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      {/* <section className="flex items-center justify-center w-full">
        <div className="max-w-7xl p-4 md:p-8 lg:p-16 w-full">
          <div className="relative rounded-xl bg-blue-900">
            <div className="flex items-center justify-between p-8">
              <div className="max-w-2xl">
                <h3 className="mb-6 text-center text-2xl font-normal text-white md:text-left md:text-3xl">
                  Know a tech event? <br /> Feel free to add it in our
                  Community!
                </h3>
                <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                  <Button className="rounded-md bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800">
                    Contribute
                  </Button>
                  <Button className="rounded-md border-2 border-white bg-transparent px-6 py-2 text-white transition-colors hover:bg-white/10">
                    Visit Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      </section>
      <Footer />

    </div>
  );
}
