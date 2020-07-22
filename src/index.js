import humanizeDuration from 'humanize-duration'

export default class Duration {

    constructor( config = { } ) {
        this.sign                   =   null
        this.years                  =   null
        this.months                 =   null
        this.weeks                  =   null
        this.days                   =   null
        this.hours                  =   null
        this.minutes                =   null
        this.seconds                =   null
        Object.keys( config ).forEach( key => this[key] = config[key] )
    }

    static fromISO8601( iso ) {
        const iso8601DurationRegex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/

        const matches = iso.match( iso8601DurationRegex )

        let duration = new this

        duration.sign = ( matches[1] === undefined ? '+' : '-' )
        duration.years = ( matches[2] === undefined ? 0 : parseInt( matches[2] ) )
        duration.months = ( matches[3] === undefined ? 0 : parseInt( matches[3] ) )
        duration.weeks = ( matches[4] === undefined ? 0 : parseInt( matches[4] ) )
        duration.days = ( matches[5] === undefined ? 0 : parseInt( matches[5] ) )
        duration.hours = ( matches[6] === undefined ? 0 : parseInt( matches[6] ) )
        duration.minutes = ( matches[7] === undefined ? 0 : parseInt( matches[7] ) )
        duration.seconds = ( matches[8] === undefined ? 0 : parseFloat( matches[8] ) )
        return duration
    }

    parse( duration ) {
        const iso8601DurationRegex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/

        const matches = duration.match( iso8601DurationRegex )

        this.sign = ( matches[1] === undefined ? '+' : '-' )
        this.years = ( matches[2] === undefined ? 0 : parseInt( matches[2] ) )
        this.months = ( matches[3] === undefined ? 0 : parseInt( matches[3] ) )
        this.weeks = ( matches[4] === undefined ? 0 : parseInt( matches[4] ) )
        this.days = ( matches[5] === undefined ? 0 : parseInt( matches[5] ) )
        this.hours = ( matches[6] === undefined ? 0 : parseInt( matches[6] ) )
        this.minutes = ( matches[7] === undefined ? 0 : parseInt( matches[7] ) )
        this.seconds = ( matches[8] === undefined ? 0 : parseFloat( matches[8] ) )
    }

    toSeconds( ) {
        let seconds = 0
        if ( this.years ) {
            seconds += ( 3.154e+7 * this.years )
        }
        if ( this.months ) {
            seconds += ( 2.628e+6 * this.months )
        }
        if ( this.weeks ) {
            seconds += ( 604800 * this.weeks )
        }
        if ( this.days ) {
            seconds += ( 86400 * this.days )
        }
        if ( this.hours ) {
            seconds += ( 3600 * this.hours )
        }
        if ( this.minutes ) {
            seconds += ( 60 * this.minutes )
        }
        if ( this.seconds ) {
            seconds += this.seconds
        }
        return seconds
    }

    toMilliseconds( ) {
        return this.toSeconds( ) * 1000
    }

    humanize( options = { } ) {
        return humanizeDuration( this.toMilliseconds( ), options )
    }

    toISO801String( ) {
        let str = 'P'
        if ( this.years && this.years > 0 ) {
            str += `${this.years}Y`
        }
        if ( this.months && this.months > 0 ) {
            str += `${this.months}M`
        }
        if ( this.weeks && this.weeks > 0 ) {
            str += `${this.weeks}W`
        }
        if ( this.days && this.days > 0 ) {
            str += `${this.days}D`
        }
        if ( this.hours || this.minutes || this.seconds ) {
            str += 'T'
        }
        if ( this.hours && this.hours > 0 ) {
            str += `${this.hours}H`
        }
        if ( this.minutes && this.minutes > 0 ) {
            str += `${this.minutes}M`
        }
        if ( this.seconds && this.seconds > 0 ) {
            str += `${this.seconds}S`
        }
        return str
    }

}
