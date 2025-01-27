"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, SquareArrowOutUpRight, Calendar, Pin, MapPin } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { SelectSeparator } from "@/components/ui/select";
import EventLoader from "@/components/Loaders/EventLoader";

interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  startDate: string;
  endDate: string;
  link?: string;
  contactInfo?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = (type: "thisMonth" | "upcoming" | "past") => {
    if (!Array.isArray(events)) return [];
    
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    return events.filter((event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      
      switch (type) {
        case "thisMonth":
          // Show only upcoming events for this month
          return startDate >= now && 
                 startDate <= endOfMonth;
        case "upcoming":
          // Show events from next month onwards
          return startDate > endOfMonth;
        case "past":
          // Show events that have ended
          return startDate < now;
        default:
          return false;
      }
    });
  };

  const EventCard = ({ event }: { event: Event }) => {
    const generateGoogleCalendarUrl = (event: Event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      
      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        details: event.description,
        location: event.venue,
        dates: `${startDate.toISOString().replace(/-|:|\.\d+/g, '')}/${endDate.toISOString().replace(/-|:|\.\d+/g, '')}`,
      });

      return `https://calendar.google.com/calendar/render?${params.toString()}`;
    };

    return (
      <div className="group manrope border border-blue-900 relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg transition-all hover:shadow-xl dark:from-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 transition-opacity group-hover:opacity-10 dark:from-blue-900 dark:to-indigo-900"></div>
        
        <div className="relative flex h-full flex-col">
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold tracking-tight ">{event.title}</h3>
              <span className="flex-shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                {format(new Date(event.startDate), "MMM d")}
              </span>
            </div>
            
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{event.venue}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{format(new Date(event.startDate), "p")} - {format(new Date(event.endDate), "p")}</span>
              </div>
            </div>
          </div>

          <div className=" flex items-center gap-4 mt-5">
            {event.link && (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Button className="bg-blue-900 dark:text-white hover:bg-blue-800">

                View 
                <SquareArrowOutUpRight className="ml-1 h-4 w-4" />
                </Button>
              </a>
            )}
            
            <a
              href={generateGoogleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Button variant={'outline'} className="bg-transparent border border-blue-900 hover:bg-neutral-200 hover:dark:bg-neutral-800">

              Add to Calendar
              <Calendar className="ml-1 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <EventLoader />;
  }

  const thisMonthEvents = filterEvents("thisMonth");
  const upcomingEvents = filterEvents("upcoming");
  const pastEvents = filterEvents("past");

  return (
    <div className="container px-3 md:px-1 manrope mx-auto max-w-6xl space-y-16 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Events Dashboard</h1>
        <Link href="/dashboard/create">
          <Button className="bg-blue-900 hover:bg-blue-800 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </Link>
      </div>

      <div className="space-y-12">
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">This Month's</h2>
            <span className="text-sm text-muted-foreground">
              {thisMonthEvents.length} events
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {thisMonthEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {thisMonthEvents.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground">
                No upcoming events this month
              </div>
            )}
          </div>
        </section>

        <Separator />

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Upcoming </h2>
            <span className="text-sm text-muted-foreground">
              {upcomingEvents.length} events 
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {upcomingEvents.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground">
                No upcoming events scheduled
              </div>
            )}
          </div>
        </section>
        <Separator />

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Past </h2>
            <span className="text-sm text-muted-foreground">
              {pastEvents.length} events
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {pastEvents.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground">
                No past events
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}