# React TimePicker Component

A customizable React time picker component with dropdown interface built with TypeScript.

## Features

- 🕐 12-hour time format with AM/PM selection
- 🎨 Customizable styling with Tailwind CSS classes
- 📱 Responsive design
- ♿ Accessible with proper ARIA attributes
- 🔧 TypeScript support
- 🎯 Moment.js integration for time handling

## Installation

```bash
npm install @pelu/timepicker
```

## Usage

```jsx
import React, { useState } from 'react';
import { TimePicker } from 'react-timepicker-component';
import moment from 'moment';

function App() {
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    console.log('Selected time:', time?.format('hh:mm A'));
  };

  return (
    <div>
      <TimePicker
        value={selectedTime?.format('hh:mm A')}
        onChange={handleTimeChange}
        placeholder="Select time"
        className="w-64"
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes for styling |
| `placeholder` | `string` | `'Select time'` | Placeholder text for the input |
| `clearIcon` | `React.ReactNode` | `null` | Custom clear icon component |
| `value` | `string` | `undefined` | Controlled value for the time picker |
| `onChange` | `(time: moment.Moment \| null) => void` | `undefined` | Callback function when time changes |

## Styling

The component uses Tailwind CSS classes for styling. You can customize the appearance by:

1. **Overriding classes**: Pass custom `className` prop
2. **CSS customization**: Target the component's classes in your CSS
3. **Tailwind configuration**: Extend your Tailwind config to include custom colors

### Default Classes Used

- `bg-elr-gray`: Background color for input and hover states
- `text-elr-green`: Text color for selected items
- `text-elr-black-400`: Text color for clear button

## Dependencies

- React (>=16.8.0)
- React DOM (>=16.8.0)
- Moment.js (>=2.29.4)

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Development mode with watch
npm run dev

# Clean build directory
npm run clean
```

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 