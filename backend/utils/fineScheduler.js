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

      const isWeekendOrHoliday = async (date) => {
        const day = date.getDay();
        const isWeekend = day === 0 || day === 6;

        const isHoliday = await Holiday.findOne({
          date: {
            $gte: new Date(date.setHours(0, 0, 0, 0)),
            $lt: new Date(date.setHours(23, 59, 59, 999)),
          },
        });

        return isWeekend || isHoliday;
      };

      if (!isWeekendOrHoliday(yesterday)) {
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
      }
    } catch (error) {
      console.error("Error running fine job:", error);
    }
  });
};

module.exports = scheduleFines;
