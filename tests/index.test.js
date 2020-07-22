import Duration from '../src'

describe('instantiating', () => {
  it('should create empty duration without options', () => {
    let duration = new Duration
    expect(duration.years).toEqual(null)
  })
  it('should instantiate with options', () => {
    let duration = new Duration( { weeks : 10, days : 3 } )
    expect(duration.weeks).toEqual(10)
    expect(duration.days).toEqual(3)
  })
})

describe('parsing', () => {
  it('should parse an ISO8601 string', () => {
    let duration = Duration.fromISO8601('P1Y2M4DT20H44M12.67S')
    expect(duration.years).toEqual(1)
    expect(duration.months).toEqual(2)
    expect(duration.days).toEqual(4)
    expect(duration.minutes).toEqual(44)
    expect(duration.seconds).toEqual(12.67)
  })
})

describe('converting to ISO8601', () => {
  it('should create an ISO8601 string with years', () => {
    let duration = new Duration( { years : 10 } )
    expect(duration.toISO801String()).toEqual('P10Y')
  })
  it('should create an ISO8601 string with months', () => {
    let duration = new Duration( { months : 3 } )
    expect(duration.toISO801String()).toEqual('P3M')
  })
  it('should create an ISO8601 string with weeks', () => {
    let duration = new Duration( { weeks : 6 } )
    expect(duration.toISO801String()).toEqual('P6W')
  })
  it('should create an ISO8601 string with hours', () => {
    let duration = new Duration( { hours : 9 } )
    expect(duration.toISO801String()).toEqual('PT9H')
  })
  it('should create an ISO8601 string that matches parsed', () => {
    let duration = Duration.fromISO8601('P1Y2M4DT20H44M12.67S')
    expect(duration.toISO801String()).toEqual('P1Y2M4DT20H44M12.67S')
  })
})

describe('converting', () => {
  it('should return seconds as-is', () => {
    let duration = new Duration( { seconds : 45 } )
    expect(duration.toSeconds()).toEqual(45)
  })
  it('should convert minutes to seconds', () => {
    let duration = new Duration( { minutes : 1 } )
    expect(duration.toSeconds()).toEqual(60)
  })
  it('should convert hours to seconds', () => {
    let duration = new Duration( { hours : 2 } )
    expect(duration.toSeconds()).toEqual(7200)
  })
  it('should convert days to seconds', () => {
    let duration = new Duration( { days : 3 } )
    expect(duration.toSeconds()).toEqual(259200)
  })
  it('should convert weeks to seconds', () => {
    let duration = new Duration( { weeks : 6 } )
    expect(duration.toSeconds()).toEqual(3628800)
  })
  it('should convert months to seconds', () => {
    let duration = new Duration( { months : 2 } )
    expect(duration.toSeconds()).toEqual(5.256e+6)
  })
})

describe('humanize', () => {
  it('should humanize weeks', () => {
    let duration = new Duration( { weeks : 1 } )
    expect(duration.humanize()).toEqual('1 week')
  })
  it('should humanize weeks', () => {
    let duration = new Duration( { weeks : 2 } )
    expect(duration.humanize()).toEqual('2 weeks')
  })
  it('should humanize weeks', () => {
    let duration = new Duration( { weeks : 5 } )
    expect(duration.humanize({units:['w']})).toEqual('5 weeks')
  })
  it('should humanize weeks exactly', () => {
    //let duration = new Duration( { weeks : 10 } )
    let duration = Duration.fromISO8601( 'P10W' )
    expect(duration.humanize({units:['w']})).toEqual('10 weeks')
  })
  it('should humanize days', () => {
    let duration = new Duration( { days : 3 } )
    expect(duration.humanize()).toEqual('3 days')
  })
  it('should humanize hours', () => {
    let duration = new Duration( { hours : 1 } )
    expect(duration.humanize()).toEqual('1 hour')
  })
  it('should humanize minutes', () => {
    let duration = new Duration( { minutes : 25 } )
    expect(duration.humanize()).toEqual('25 minutes')
  })
  it('should humanize seconds', () => {
    let duration = new Duration( { seconds : 30 } )
    expect(duration.humanize()).toEqual('30 seconds')
  })
  it('should humanize round seconds as minutes', () => {
    let duration = new Duration( { seconds : 60 } )
    expect(duration.humanize()).toEqual('1 minute')
  })
})
