import { createMedia } from '@artsy/fresnel';

const GalpiMedia = createMedia({
  breakpoints: {
    mobile: 0,
    desktop: 1200,
  },
});

export const { Media, MediaContextProvider } = GalpiMedia;
export const mediaStyles = GalpiMedia.createMediaStyle();
