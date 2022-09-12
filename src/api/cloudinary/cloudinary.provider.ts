import { ConfigOptions, v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: 'dp5l01lvb',
      api_key: '134598286523366',
      api_secret: '1Al_Z9EpF5H2SOk9e5_QKb7LfN8',
    });
  },
};