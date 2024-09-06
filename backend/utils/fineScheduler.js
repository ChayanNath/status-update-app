const cron = require("node-cron");
const User = require("../models/User");
const Status = require("../models/Status");
const Holiday = require("../models/Holiday");

const scheduleFines = () => {
  cron.schedule("30 10 * * *", async () => {
    try {
      const users = await User.find();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const getWeekendOrHoliday = async (date) => {
        const day = date.getDay();
        const isWeekend = day === 0 || day === 6;

        // Check if the date is a holiday
        const holiday = await Holiday.findOne({
          date: {
            $gte: new Date(date.setHours(0, 0, 0, 0)),
            $lt: new Date(date.setHours(23, 59, 59, 999)),
          },
        });

        // If it's a weekend or a holiday, return the holiday (if found) or true for weekends
        if (isWeekend) return { isWeekend: true };
        if (holiday) return { isHoliday: true, holiday };

        return { isWeekend: false, isHoliday: false };
      };

      const { isWeekend, isHoliday, holiday } = await getWeekendOrHoliday(
        yesterday
      );

      // If it's neither a weekend nor a holiday, check for missed status updates
      if (!isWeekend && !isHoliday) {
        for (const user of users) {
          const status = await Status.findOne({
            user: user._id,
            date: {
              $gte: new Date(yesterday.setHours(0, 0, 0, 0)),
              $lt: new Date(yesterday.setHours(23, 59, 59, 999)),
            },
          });

          if (!status) {
            // If no status found, create a new status with a fine and notification
            const newStatus = new Status({
              title: "Missed Update",
              description:
                "You missed updating your status. A fine of 10 rupees has been added.",
              user: user._id,
              team: user.team,
              date: yesterday,
              fine: 10,
            });
            await newStatus.save();
          } else {
            console.log(
              `Status update found for user ${
                user.username
              } on ${yesterday.toDateString()}. No fine added.`
            );
          }
        }
      } else if (isHoliday) {
        // If it’s a holiday, create a status with the holiday title and description
        for (const user of users) {
          const status = await Status.findOne({
            user: user._id,
            date: {
              $gte: new Date(yesterday.setHours(0, 0, 0, 0)),
              $lt: new Date(yesterday.setHours(23, 59, 59, 999)),
            },
          });

          if (!status) {
            const holidayStatus = new Status({
              title: holiday.event,
              description: "It's a holiday, no need to update the status.",
              user: user._id,
              team: user.team,
              date: yesterday,
              fine: 0,
            });
            await holidayStatus.save();
          }
        }
      }
    } catch (error) {
      console.error("Error running fine job:", error);
    }
  });
};

module.exports = scheduleFines;
