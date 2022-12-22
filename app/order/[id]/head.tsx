export default function Head({ params: { id } }) {
  return (
    <>
      <title>Tracker my order</title>
      <meta
        name='description'
        content='Simple Tracker is a simple app to track your orders'
      />
      <link rel='icon' href='/favicon.ico' />
      <meta
        content='width=device-width, initial-scale=1, viewport-fit=cover'
        name='viewport'
      />
      <meta charSet='utf-8' />
      <link
        href='https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css'
        rel='stylesheet'
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-ignore */
        precedence='default'
      ></link>
    </>
  );
}
