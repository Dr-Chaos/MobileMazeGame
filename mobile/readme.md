# Build application for Android

1. Run the follow command to create the android project folder:

```shell
npm run add:android
```

2. Generate assets (logos and splashscreen) by running the command

```shell
npm run generate:assets:android
```

3. Run the follow command to copy `../dist` folder content inside the android app folder
   and build the debug version of the application:

```shell
npm run build:android
```
