import React from 'react';

type FontSize = 'small' | 'inherit' | 'default' | 'large';

interface Props {
  isToggled: boolean;
  toggle: Function;
  fontSize?: FontSize;
}

export const DropdownIconToggle: React.FC<Props> = ({
  isToggled,
  toggle,
  fontSize = 'default',
}) => {
  const getFontSize = () => {
    switch (fontSize) {
      case 'small':
        return '12px';
      case 'large':
        return '20px';
      case 'inherit':
        return 'inherit';
      default:
        return '16px';
    }
  };

  return (
    <span style={{ fontSize: getFontSize() }}>
      {!isToggled ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          role="button"
          onClick={() => toggle(!isToggled)}
          style={{ cursor: 'pointer' }}
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          role="button"
          onClick={() => toggle(!isToggled)}
          style={{ cursor: 'pointer' }}
        >
          <path d="M7 14l5-5 5 5z" />
        </svg>
      )}
    </span>
  );
}; 