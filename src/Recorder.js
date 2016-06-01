'use strict'

import React, { PropTypes } from 'react'

const { MediaRecorder, Blob, alert } = window

const Recorder = React.createClass({
  start () {
    this.mediaRecorder.start()
  },

  stop () {
    this.mediaRecorder.stop()
  },

  pause () {
    this.mediaRecorder.pause()
  },

  resume () {
    this.mediaRecorder.resume()
  },

  componentDidMount () {
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia ||
                              navigator.webkitGetUserMedia)

    if (navigator.getUserMedia && MediaRecorder) {
      const constraints = {audio: true}
      this.chunks = []
      const { blobOpts, onStop, onError, mediaOpts, onPause, onResume, onStart } = this.props

      const onErr = err => {
        console.warn(err)
        if (onError) onError(err)
      }

      const onSuccess = stream => {
        this.mediaRecorder = new MediaRecorder(stream, mediaOpts || {})

        this.mediaRecorder.ondataavailable = e => {
          this.chunks.push(e.data)
        }

        this.mediaRecorder.onstop = e => {
          const blob = new Blob(this.chunks, blobOpts || {type: 'audio/wav'})
          this.chunks = []
          onStop(blob)
        }

        this.mediaRecorder.onerror = onErr
        if (onPause) this.mediaRecorder.onpause = onPause
        if (onResume) this.mediaRecorder.onresume = onResume
        if (onStart) this.mediaRecorder.onstart = onStart
      }

      navigator.getUserMedia(constraints, onSuccess, onErr)
    } else {
      console.warn('Audio recording APIs not supported by this browser')
      const { onMissingAPIs } = this.props
      if (onMissingAPIs) {
        onMissingAPIs(navigator.getUserMedia, MediaRecorder)
      } else {
        alert('Your browser doesn\'t support native microphone recording. For best results, we recommend using Google Chrome or Mozilla Firefox to use this site.')
      }
    }
  },

  componentDidUpdate (prevProps) {
    if (this.props.command && this.props.command !== 'none' && this.prevProps.command !== this.props.command) {
      this[this.props.command]()
    }
  },

  render () {
    return false
  },

  propTypes: {
    command: PropTypes.oneOf(['start', 'stop', 'pause', 'resume', 'none']),
    onStop: PropTypes.func.isRequired,
    onMissingAPIs: PropTypes.func,
    onError: PropTypes.func,
    onPause: PropTypes.func,
    onStart: PropTypes.func,
    onResume: PropTypes.func,
    blobOpts: PropTypes.object,
    mediaOpts: PropTypes.object
  }
})

export default Recorder
