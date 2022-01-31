import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

interface Props {
  size?: number;
  className?: string;
  icon: FontAwesomeIconProps['icon'];
  onClick?: (e: React.MouseEvent) => void;
}

export default function Icon({ size = 24, className, icon, onClick }: Props) {
  return (
    <FontAwesomeIcon
      style={{ fontSize: size, width: size, height: size }}
      className={className}
      icon={icon}
      onClick={onClick}
    />
  );
}
