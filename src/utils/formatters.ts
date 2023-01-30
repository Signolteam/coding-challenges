const dateFormatter = new Intl.DateTimeFormat('en-gb', { month: 'short', day: '2-digit', year: 'numeric' });

export const formatDate = (date: string) => dateFormatter.format(new Date(date));