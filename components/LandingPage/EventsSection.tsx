import { Calendar, Clock, History, PlusCircle } from 'lucide-react';

const features = [
  {
    name: 'Event Categories',
    description:
      'Browse events by timeline - ongoing, upcoming, and past events. Stay organized with our simple categorization.',
    icon: Calendar,
  },
  {
    name: 'Real-time Updates',
    description: 'Get instant updates on event details, locations, and schedule changes as they happen.',
    icon: Clock,
  },
  {
    name: 'Create & Share',
    description: 'Create events in minutes, add them to your calendar, and share with others seamlessly.',
    icon: PlusCircle,
  },
]

export default function EventsSection() {
  return (
    <div className="overflow-hidden bg-white dark:bg-dark-main py-24 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-2 lg:pr-8">
            <div className="lg:max-w-lg">
              {/* <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Event Management Made Simple</h2> */}
              <p className="text-2xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-gray-100 sm:text-5xl">
                Your Events, Your Calendar
              </p>
              <p className="mt-6 text-base/8 text-gray-600 dark:text-gray-300">
                Discover and manage events effortlessly. From ongoing activities to future plans, keep track of everything in one place. Create, share, and sync events directly to your calendar.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 dark:text-gray-300 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-600 dark:text-indigo-400" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline dark:text-gray-300">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="https://res.cloudinary.com/dyhb5midi/image/upload/v1737958433/Screenshot_2025-01-27_at_11.43.26_AM_vft9t8.png"
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 dark:ring-gray-700/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}
