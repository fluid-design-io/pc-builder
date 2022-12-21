import clsxm from "../../lib/clsxm";

export const OrderDeliveryInfo = ({ status, deliveryDate, className = "" }) => {
  const deliveryDateWeekday = new Date(deliveryDate).toLocaleString("en-US", {
    weekday: "long",
  });
  const deliveryDateMonthYear = new Date(deliveryDate).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const deliveryDateHour = new Date(deliveryDate).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <div className={clsxm(className)}>
      <h2 className='uppercase font-semibold text-sm mb-2 opacity-80'>
        {status !== "DELIVERED" ? "Expected Delivery" : "Delivered"}
      </h2>
      <h1 className='mb-2'>{deliveryDateWeekday}</h1>
      <span className='uppercase font-light tracking-wider text-gray-600 dark:text-gray-400 text-sm'>
        {deliveryDateMonthYear}
        {status !== "DELIVERED" && ` • After ${deliveryDateHour}`}
      </span>
    </div>
  );
};
