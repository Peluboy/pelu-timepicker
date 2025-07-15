import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { DropdownIconToggle } from './DropdownIconToggle';

interface TimePickerProps {
  className?: string;
  placeholder?: string;
  clearIcon?: React.ReactNode;
  value?: string;
  onChange?: (time: moment.Moment | null) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  className = '',
  placeholder = 'Select time',
  clearIcon = null,
  value,
  onChange,
}) => {
  const [selectedHour, setSelectedHour] = useState<string>('12');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');
  const [amPm, setAmPm] = useState<string>('AM');
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [, setToggleState] = useState<boolean>(false);

  const handleHourChange = (hour: string) => {
    setSelectedHour(hour);
    triggerOnChange(hour, selectedMinute, amPm);
  };

  const handleMinuteChange = (minute: string) => {
    setSelectedMinute(minute);
    triggerOnChange(selectedHour, minute, amPm);
  };

  const handleAmPmChange = (amPmValue: string) => {
    setAmPm(amPmValue);
    triggerOnChange(selectedHour, selectedMinute, amPmValue);
    setIsDropdownVisible(false);
  };

  const triggerOnChange = (hour: string, minute: string, amPmValue: string) => {
    const formattedTime = `${hour}:${minute} ${amPmValue}`;
    const momentTime = moment(formattedTime, 'hh:mm A', true);
    if (onChange && momentTime.isValid()) {
      onChange(momentTime);
    } else {
      onChange?.(null);
    }
  };

  const handleInputClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
    setToggleState(!isDropdownVisible);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownVisible(false);
      setToggleState(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const generateHourOptions = () =>
    [...Array(12)].map((_, i) => {
      const hour = (i + 1).toString().padStart(2, '0');
      return (
        <div
          key={hour}
          className={`py-2 px-4 mr-1 cursor-pointer flex text-center align-middle items-center ${selectedHour === hour ? 'bg-elr-gray text-elr-green font-medium' : 'hover:bg-elr-gray'}`}
          onClick={() => handleHourChange(hour)}
        >
          {hour}
        </div>
      );
    });

  const generateMinuteOptions = () =>
    [...Array(60)].map((_, i) => {
      const minute = i.toString().padStart(2, '0');
      return (
        <div
          key={minute}
          className={`py-2 px-4 mr-1 cursor-pointer flex text-center align-middle items-center ${selectedMinute === minute ? 'bg-elr-gray text-elr-green font-medium' : 'hover:bg-elr-gray'}`}
          onClick={() => handleMinuteChange(minute)}
        >
          {minute}
        </div>
      );
    });

  const generateAmPmOptions = () =>
    ['AM', 'PM'].map((period) => (
      <div
        key={period}
        className={`py-2 px-4 mr-1 cursor-pointer flex text-center align-middle items-center ${amPm === period ? 'bg-elr-gray text-elr-green font-medium' : 'hover:bg-elr-gray'}`}
        onClick={() => handleAmPmChange(period)}
      >
        {period}
      </div>
    ));

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="flex align-middle items-center"
        onClick={handleInputClick}
      >
        <input
          type="text"
          value={value || ''}
          placeholder={placeholder}
          className="border-0 py-1 pl-3 rounded w-full cursor-pointer bg-elr-gray focus:outline-none"
          readOnly
        />
        <span className="opacity-40 relative bottom-0.5">
          <DropdownIconToggle
            isToggled={isDropdownVisible}
            toggle={() => setIsDropdownVisible(!isDropdownVisible)}
            fontSize="small"
          />
        </span>
      </div>
      {isDropdownVisible && (
        <div className="absolute top-full mt-2 w-full flex space-x-1 shadow-lg p-2 rounded-md bg-white z-10">
          <div className="flex-1 overflow-y-auto max-h-40">
            {generateHourOptions()}
          </div>

          <div className="flex-1 overflow-y-auto max-h-40">
            {generateMinuteOptions()}
          </div>

          <div className="flex-1 overflow-y-auto max-h-40">
            {generateAmPmOptions()}
          </div>
        </div>
      )}

      {clearIcon && (
        <button
          type="button"
          className="absolute top-1/2 transform -translate-y-1/2 right-8 text-elr-black-400"
          onClick={() => {
            setSelectedHour('12');
            setSelectedMinute('00');
            setAmPm('AM');
            onChange?.(null);
          }}
        >
          {clearIcon}
        </button>
      )}
    </div>
  );
};

export default TimePicker; 