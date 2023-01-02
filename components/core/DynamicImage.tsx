import clsxm from 'lib/clsxm';
import Image, { StaticImageData } from 'next/image';
import { Fragment } from 'react';

export const DynamicImage = ({
  src,
  className = '',
  width,
  height,
  alt = '',
  ...props
}: {
  src: { light: string | StaticImageData; dark?: string | StaticImageData };
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
  [key: string]: any;
}) => {
  return (
    <Fragment>
      <Image
        className={clsxm(className, 'dark:hidden')}
        src={src.light}
        alt={alt}
        width={width}
        height={height}
        {...props}
      />
      <Image
        className={clsxm(className, 'hidden dark:block')}
        src={src.dark}
        alt={alt}
        width={width}
        height={height}
        {...props}
      />
    </Fragment>
  );
};
