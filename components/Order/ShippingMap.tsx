import Image from "next/image";

export const ShippingMap = ({ geolocation }) => {
  const imgWidth = 160;
  const imgHeight = 160;
  const [lat, lng] = geolocation.coordinates;
  const mapImgUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-s+6f36c9(${lat},${lng})/${lat},${lng},12,0/${imgWidth}x${imgHeight}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
  return (
    <div className='rounded overflow-hidden'>
      <Image
        src={mapImgUrl}
        alt='Shipping Map'
        width={imgWidth}
        height={imgHeight}
        className='object-cover object-center'
      />
    </div>
  );
};
