"use client";

import { useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  venue: z.string().min(1, "Venue is required"),
  link: z.string().url().optional(),
  contactInfo: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function CreateEvent() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<EventFormData>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof EventFormData, string>>
  >({});
  const [startDate, setStartDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  const formatDateForPrisma = (dateString: string): string => {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Get timezone offset in minutes and convert to hours and minutes
    const offset = -date.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offset) / 60)
      .toString()
      .padStart(2, "0");
    const offsetMinutes = (Math.abs(offset) % 60).toString().padStart(2, "0");
    const offsetSign = offset >= 0 ? "+" : "-";

    // Format the date in YYYY-MM-DDTHH:mm:ss±hh:mm format
    return (
      date.toISOString().slice(0, 19) +
      `${offsetSign}${offsetHours}:${offsetMinutes}`
    );
  };

  const validateForm = (data: Partial<EventFormData>) => {
    try {
      const formattedData = {
        ...data,
      };

      eventSchema.parse(formattedData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof EventFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    try {
      setLoading(true);

      // Combine date and times for submission
      const combinedStartDateTime = startDate
        ? new Date(
            startDate.setHours(
              parseInt(startTime.split(":")[0]),
              parseInt(startTime.split(":")[1])
            )
          )
        : undefined;

      const combinedEndDateTime = startDate
        ? new Date(
            startDate.setHours(
              parseInt(endTime.split(":")[0]),
              parseInt(endTime.split(":")[1])
            )
          )
        : undefined;

      const submissionData = {
        ...formData,
        startDate: combinedStartDateTime,
        endDate: combinedEndDateTime,
      };
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create event");
      }

      toast({
        title: "Event Created",
        description: "Your event has been submitted for approval.",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Creation error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to create event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl space-y-16 py-5 manrope">
      <h1 className="mb-4 text-3xl text-center font-bold">Create New Event</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            className="py-6 border dark:border-gray-600 dark:bg-neutral-800"
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="h-32 border dark:border-gray-600 dark:bg-neutral-800"
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Venue</label>
          <Input
            name="venue"
            value={formData.venue || ""}
            onChange={handleChange}
            className="py-6 border dark:border-gray-600 dark:bg-neutral-800"
          />
          {errors.venue && (
            <p className="text-sm text-destructive">{errors.venue}</p>
          )}
        </div>

        <div className="flex gap-6 items-center">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <div className="relative max-w-sm">
              <input
                id="datepicker-autohide"
                type="date"
                className="block w-full rounded-lg py-4 border border-gray-300 px-2.5 text-sm dark:bg-neutral-800 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600  dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Select date"
                value={startDate ? startDate.toISOString().split("T")[0] : ""}
                onChange={(e) => setStartDate(new Date(e.target.value))}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Time</label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="py-6 border dark:border-gray-600 dark:bg-neutral-800"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">End Time</label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="py-6 border dark:border-gray-600 dark:bg-neutral-800"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Event Link (Optional)</label>
          <Input
            name="link"
            value={formData.link || ""}
            onChange={handleChange}
            className="py-6 border dark:border-gray-600 dark:bg-neutral-800"
          />
          {errors.link && (
            <p className="text-sm text-destructive">{errors.link}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Contact Info (Optional)</label>
          <Input
            name="contactInfo"
            value={formData.contactInfo || ""}
            onChange={handleChange}
            className="py-6 border dark:border-gray-600 dark:bg-neutral-800"
          />
          {errors.contactInfo && (
            <p className="text-sm text-destructive">{errors.contactInfo}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
}
