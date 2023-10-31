# Build application for windows

1. Create a folder named `windows`

2. Download [NWJS](https://dl.nwjs.io/v0.81.0/nwjs-v0.81.0-win-x64.zip) and extract it inside the `windows` folder

3. Copy the files `package.json` and `icon.png` inside the `windows` folder

4. Copy the `../dist` folder inside the `windows` folder

You windows folder must be like:

```
| windows/
|    | nw.exe
|    | all other nwjs files
|    | package.json
|    | icon.png
|    | dist/
|        | index.html
|        | all other dist files
```

5. Edit `nw.exe` with `CFF Explorer` to change replace the original nwjs ico with `nwjs.ico`
