module.exports = {
  greetingOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Студент', callback_data: 'student' }],
        [{ text: 'Работодатель', callback_data: 'employer' }],
      ],
    }),
  },
};
