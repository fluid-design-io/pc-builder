import clsxm from "../../lib/clsxm";
import { TimelineOverlay } from "./TimelineOverlay";
import { TimelineDot } from "./TimelineDot";

const TimelineSegment = ({
  title,
  date,
  isActive = false,
  description = "",
  last = false,
  index = 0,
}: {
  title: string;
  date?: string;
  isActive?: boolean;
  description?: string;
  last?: boolean;
  index?: number;
}) => {
  const currentStage = () => {
    if (date && !isActive) return "done";
    if (isActive) return "active";
    return "default";
  };
  const dateStr = date ? new Date(date).toLocaleString() : "";
  return (
    <div className='relative flex min-h-[6rem] items-stretch gap-4'>
      {isActive && (
        <div className='card-primary-bg absolute -left-4 -top-4 right-0 bottom-4 z-[0]' />
      )}
      <div className='relative flex-shrink-0'>
        <TimelineDot type={currentStage()} index={index} />
        <div
          className={clsxm(
            "absolute top-0 left-3 h-full w-2 bg-gray-300 dark:bg-gray-600",
            last && "hidden"
          )}
        />
      </div>
      <div className='relative z-[1] flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <h3
              className={clsxm(
                "mb-1 text-sm font-medium text-gray-900 dark:text-gray-50",
                !date && "mt-1.5 opacity-50"
              )}
            >
              {title}
            </h3>
            {date && (
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {dateStr}
              </p>
            )}
          </div>
        </div>
        {description && <p className='flex flex-shrink-0'>{description}</p>}
      </div>
    </div>
  );
};

export const Timeline = ({ statuses, currentStatus }) => {
  const defaultStatuses = [
    "PLACED",
    "PROCESSED",
    "BUILDING",
    "TESTING",
    "SHIPPED",
    "DELIVERED",
  ];
  // An object that checks if statuses exist in the default statuses
  const statusExists = defaultStatuses.reduce((acc, status) => {
    acc[status] = statuses.some((s) => s.status === status);
    return acc;
  }, {});
  // Progress is the percentage of the timeline that is done
  const completedCount = statuses.reduce((acc, status) => {
    if (statusExists[status.status]) {
      acc += 1;
    }
    return acc;
  }, 0);
  const progress = (completedCount - 1) / defaultStatuses.length;
  return (
    <div className='relative flex flex-col'>
      <div className='overflow-hidden rounded-full'>
        <TimelineOverlay progress={progress} />
      </div>
      {defaultStatuses.map((status, i) => {
        if (!statusExists[status]) {
          return (
            <TimelineSegment
              key={status}
              title={status}
              last={i === defaultStatuses.length - 1}
              index={i}
            />
          );
        } else {
          return (
            <TimelineSegment
              key={status}
              title={status}
              date={statuses.find((s) => s.status === status).createdAt}
              isActive={status === currentStatus}
              last={i === defaultStatuses.length - 1}
              index={i}
            />
          );
        }
      })}
    </div>
  );
};
