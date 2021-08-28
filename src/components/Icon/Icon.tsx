import * as React from 'react';
import { IconMap } from './IconMap';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof IconMap;
}

const Icon: React.FC<IconProps> = ({ name, width = '24', height = '24', ...rest }: IconProps) => {
  const MatchIcon = IconMap[name] || null;
  return <MatchIcon width={width} height={height} {...rest} />;
};

export default Icon;
