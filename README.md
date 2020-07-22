# Durations JS

A small JS library for working with durations.

## Basic Usage

```js
let duration = new Duration( { hours: 2, minutes: 30 } )
console.log( duration.toSeconds( ) )
console.log( duration.humanize( ) )
```

## ISO 8601

You can create an instance from an ISO 8601 duration string:

```js
let duration = Duration.fromISO8601('P1Y2M4DT20H44M12.67S')
```

You can also convert to ISO 8601:

```js
let duration = new Duration( { days : 6, hours: 3 } )
console.log( duration.toISO801String( ) ) // P6DT3H
```