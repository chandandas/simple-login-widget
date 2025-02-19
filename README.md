# simple-feedback-widget

Simple feedback widget with useful functions.

[![NPM version][npm-image]][npm-url]

[npm-image]: http://img.shields.io/npm/v/rc-table.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/simple-feedback-widget

## install

```
npm i simple-feedback-widget
npm start
```

## Example


## Usage
```js

import { SimpleFeedbackWidget } from 'simple-feedback-widget';

import 'simple-feedback-widget/dist/css/simple-feedback-widget.css';
import FeedbackSnapShotPlaceHolder from 'simple-feedback-widget/dist/images/image-placeholder.jpg';
const FeedbackAPI = "";
const FeedbackAPIKey = "GENERATED KEY";
import logo from "Company Logo";

export default function FeedbackWidget() {
  
  return (
      
   <SimpleFeedbackWidget logo={logo.src} imagePlaceHolder={FeedbackSnapShotPlaceHolder} 
      apiUrl={FeedbackAPI} apiKey={FeedbackAPIKey}
      buttonType='plus' dimension={30}  direction="right"/>
  );
}



<FeedbackWidget />
     


```


