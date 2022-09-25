import { TinyColor } from '@ctrl/tinycolor';
import { FC } from 'react';

interface IGeneratedAvatar {
  userId: string;
  username: string;
  className?: string;
}

const GeneratedAvatar: FC<IGeneratedAvatar> = ({ userId, username, className }) => {
  const getCorrectIndex = (number: number) => {
    if (number > 255) {
      return 255;
    }
    if (number < 0) {
      return 0;
    }
    return number > 255 ? 255 : number < 0 ? 0 : number;
  };

  const generateAvatarFromHash = (hash: string) => {
    const [r, g, b] = hash
      .slice(0, 3)
      .split('')
      .map((char) => getCorrectIndex(char.charCodeAt(0)));

    return {
      color: new TinyColor({ r, g, b }).lighten(10).saturate(10).toHexString(),
      colorLighten: new TinyColor({ r, g, b }).saturate(20).darken(20).toHexString(),
    };
  };

  const { color, colorLighten } = generateAvatarFromHash(userId);
  const firstChar = username[0].toUpperCase();
  const classes = 'w-16 h-16 rounded-full flex items-center justify-center text-2xl';
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`,
      }}
      className={className ? `${classes} ${className}` : classes}
    >
      {firstChar}
    </div>
  );
};

export default GeneratedAvatar;
