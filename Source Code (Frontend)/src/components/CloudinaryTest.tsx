import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { cloudinaryConfig } from '../config/cloudinary';

const CloudinaryTest: React.FC = () => {
  const cld = new Cloudinary({ 
    cloud: { cloudName: cloudinaryConfig.cloudName } 
  });
  
  // Use the sample image from Cloudinary
  const img = cld
    .image('cld-sample-5')
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(300).height(300));

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Cloudinary Test</h3>
      <p>If you can see the image below, Cloudinary is working correctly!</p>
      <AdvancedImage cldImg={img} />
    </div>
  );
};

export default CloudinaryTest;
