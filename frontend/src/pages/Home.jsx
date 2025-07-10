const handleCommand = (data) => {
  const { type, userInput, response } = data;

  const openInNewTab = (url) => {
    setTimeout(() => {
      window.open(url, '_blank');
    }, 1500);
  };

  const now = new Date();
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('en-IN');
  const day = now.toLocaleDateString('en-IN', { weekday: 'long' });
  const month = now.toLocaleDateString('en-IN', { month: 'long' });

  switch (type) {
    case 'get-time':
      const timeResponse = `The current time is ${time}`;
      speak(timeResponse);
      setAiText(timeResponse);
      break;
    case 'get-date':
      const dateResponse = `Today's date is ${date}`;
      speak(dateResponse);
      setAiText(dateResponse);
      break;
    case 'get-day':
      const dayResponse = `Today is ${day}`;
      speak(dayResponse);
      setAiText(dayResponse);
      break;
    case 'get-month':
      const monthResponse = `Current month is ${month}`;
      speak(monthResponse);
      setAiText(monthResponse);
      break;
    default:
      speak(response);
      setAiText(response); // use Gemini's response only if it's not a date/time type
  }
};
