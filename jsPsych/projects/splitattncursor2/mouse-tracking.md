# Study-page mouse tracking

The study uses the standard jsPsych mouse-tracking extension with a compact
adapter. `mouse_tracking_data` is an array of `[t, x, y]` samples, where `t`
is milliseconds since tracking started and `x` and `y` are viewport-relative
CSS pixels. `mouse_tracking_columns` records this order. Only mouse movement
is recorded, at the configured minimum interval.

`viewport_changes` lists `{t, width, height}` at tracking start and when the
viewport changes. For each sample use the last entry at or before its `t` to
calculate viewport-relative coordinates: `x / width` and `y / height`.
`browser_dimensions` contains the final viewport dimensions.

`mouse_tracking_targets` contains the standard extension's initial bounding
rectangles for the image and its container. These rectangles are captured once,
not updated for resizing, scrolling or other layout changes. Verify image bounds
in pilot data before using them to draw trajectories on the image. `page`
identifies the study page.

DataPipe saves the trial data as JSON, including the sample arrays and the
original `extension_type` and `extension_version` fields. The Firebase backup is
disabled. If re-enabled, it stores the tracking field as a JSON string because
Firestore does not support arrays directly inside arrays. Parse it to recover
the sample arrays. The backup still has Firestore's 1 MiB document limit.
