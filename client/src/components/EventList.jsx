import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventList = ({ events, isLoading, selectedDate, onDateChange }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date
                </label>
                <DatePicker
                    selected={selectedDate}
                    onChange={onDateChange}
                    dateFormat="MMMM d, yyyy"
                    className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Events for {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                })}
            </h2>

            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            ) : events.length === 0 ? (
                <div className="text-gray-500 py-4 text-center">No events scheduled</div>
            ) : (
                <div className="space-y-3">
                    {events.map(event => (
                        <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium text-lg text-gray-800">{event.summary}</h3>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {event.accountEmail}
                                </span>
                            </div>

                            <div className="mt-2 text-sm text-gray-600">
                                {event.start.dateTime && event.end.dateTime ? (
                                    <>
                                        <span className="font-medium">
                                            {new Date(event.start.dateTime).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>{" - "}
                                        {new Date(event.end.dateTime).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </>
                                ) : (
                                    <span className="text-gray-400">{" "}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventList;
