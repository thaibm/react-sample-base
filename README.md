# Project

## Structure

```
React App

├── README.md
├── node_modules
├── package.json
├── .env            // Global env variable
├── .eslintrc.json
├── .gitignore
├── .prettierrc.js
├── tsconfig.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
│
└── src
    ├── api/          // Global api folder
    ├── assets/       // Assets folder contain image, svg icons...
    ├── components    // Global Shared components
    ├── features      // Main features
        └── home
            ├── api               // api for local feature
            ├── components        // shared components for local feature
            ├── store             // store for local feature
            ├── type              // shared types, interface, enum for local feature
            ├── HomePage.test.tsx
            └── HomePage.tsx
    ├
    ├── hook          // Global hook
    ├── store         // Global store
    ├── template      // Global template
    ├── types         // Global types, interface, enum
    ├── utils         // Global functions
    ├── App.css
    ├── App.js
    ├── index.css
    ├── index.js
    └── theme.ts      // Global theme variable - should reuse it to customize style
```

## Install project

```
npx husky install

yarn install
```

## Run project locally

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />

#### **Open Browser with** `disable-web-security`

#### **On Mac**

```
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

#### **On Window**

```
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
```

#### **On Linux**

```
google-chrome --disable-web-security
```

### Open application in the browser

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
