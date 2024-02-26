# Signol task challenge frontend

## Setup

This frontend was made using node 16, but should work across many versions,
with node and npm installed run:

```
npm install
```

## Local deployment

Once you've configured the corresponding backend of your choice, place the host URL
in the file .env (by default I have left it pointing at localhost for `serverless offline`)
and then run the following to start a dev server pointing there:

```
npm start
```

(by default this will launch on http://localhost:3000)

## S3 deployment
Should you want to deploy this in S3 as I have done,
you'll need an appropriately configured S3 bucket, then simply point .env.production at your desired host URL
(by default I have left my own deployed backend's URL there)
and run:

```
npm run build
aws s3 sync build/ s3://<your-bucket-name>
```


## tests
There aren't many tests, but you can run them like this:
```
npm test
```
