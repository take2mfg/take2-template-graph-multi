import dotenv from 'dotenv-safe';

if(process.env.NODE_ENV !== 'production') {
  // Enable this when ready to swap local config pattern
  // dotenv.load({path:'.env.local'})
  dotenv.load({
    allowEmptyValues: true,
    sample: `${__dirname}/../sample.env`
  });
}
