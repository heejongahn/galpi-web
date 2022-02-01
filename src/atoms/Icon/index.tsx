import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

interface Props {
  size?: number;
  className?: string;
  color?: string;
  icon: FontAwesomeIconProps['icon'];
  onClick?: (e: React.MouseEvent) => void;
}

export default function Icon({
  size = 24,
  className,
  color,
  icon,
  onClick,
}: Props) {
  return (
    <FontAwesomeIcon
      style={{ fontSize: size, width: size, height: size, color }}
      className={className}
      icon={icon}
      onClick={onClick}
    />
  );
}
