# react-recorder
A react component that records audio using the MediaRecorder API

## Installation

```
npm install react-recorder
```

## Browser Requirements

This component is dependent on browser implementation of both the `navigator.getUserMedia` and `MediaRecorder` APIs. Currently only Google Chrome and Mozilla Firefox fully support these APIs. The `Recorder` component provides an `onMissingAPIs` prop that allows developers to specify the appropriate behavior if a browser is lacking support for these APIs. If `onMissingAPIs` is undefined, it defaults to calling the `alert` function to notify the user to use either Chrome or Firefox.

## Example

You can see the Recorder in action [here](https://agrasley.github.io/react-audio-example/). Check out the source code [here](https://github.com/agrasley/react-audio-example).

## Usage with Redux

If you're using Redux to handle your client-side state, [react-recorder-redux](https://github.com/agrasley/react-recorder-redux) provides actions and reducers for working with this library.

## Usage

```js
import React from 'react'
import Recorder from 'react-recorder'

const onStop = (blob) => {
  // Do something with the blob file of the recording
}

const ExampleRecorder = () => (
  <div>
    <Recorder onStop={onStop} />
  </div>
)
export default ExampleRecorder
```

## Props

### onStop

The `onStop` prop is the only required prop for the Recorder component. `onStop` should be a function with a single argument representing the `Blob` object returned by the `MediaRecorder` when recording has stopped. You can then use this `Blob` object to play back the recorded audio, download the recorded clip, upload the recording to a server, etc.

### onMissingAPIs

The `onMissingAPIs` prop is a function called when the browser fails to implement either the `navigator.getUserMedia` or `MediaRecorder` APIs required by the component. The function is passed the values for `navigator.getUserMedia` and `MediaRecorder` as arguments in case the developer wants to implement individualized error messages for the various APIs. If `onMissingAPIs` is left undefined, the default behavior is to call `window.alert` to notify the user to use either Chrome or Firefox.

### onError

The `onError` prop is a function called when either `navigator.getUserMedia` or `MediaRecorder` returns an `Error` object. The resulting error is passed to the `onError` function.

### onPause

A function called when the `MediaRecorder` pauses its recording.

### onResume

A function called when the `MediaRecorder` resumes recording after being paused.

### onStart

A function called when the `MediaRecorder` begins recording.

### gotStream

A function called after a call to `navigator.getUserMedia` successfully captures the input audio stream. The function is passed the resulting stream, which can then be used with the Web Audio API to provide audio visualizations, etc.

### blobOpts

The options passed to the `Blob` constructor, including specifying the MIMEType of the resulting `Blob` object. Defaults to `{type: 'audio/wav'}`.

### mediaOpts

The options passed to the `MediaRecorder` constructor. Defaults to `{}`.

### command

Useful for Redux-like environments where changes in state are communicated via props. When the `command` prop is changed, the corresponding method is called. Allowed values are the method name strings (`['start', 'stop', 'resume', 'pause']`) as well as `'none'`, representing no method call. Developers can also call these methods directly by accessing the component's `ref`.

## Rendering

The `Recorder` component does not have an actual representation in the DOM, returning only `false` in its render method.
