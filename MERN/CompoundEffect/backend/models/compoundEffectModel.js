const mongoose = require('mongoose')
const Schema = mongoose.Schema

const compoundEffectSchema = new Schema({
    years: {
        type: [String],
        required: true
    },
    originalAmount: {
        type: [Number],
        required: true
    },
    futureAmount: {
        type: [Number],
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true, strict: true })

// statics method : 
compoundEffectSchema.statics.caculateCE = function (p, pmt, t, n, r) {
    p = Number(p)
    pmt = Number(pmt)
    t = Number(t)
    n = Number(n)
    r = Number(r)
    // create array of years : 
    let years = ['năm 0']
    for (let i = 1; i <= t; i++) {
        years.push(`năm ${i}`);
    }

    // create an array of originalAmount : 
    let originalAmount = [p]
    for (let i = 1; i <= t; i++) {
        originalAmount.push(Math.floor(p + i * 12 * pmt))
    }

    // create an array of futureAmount : 
    const rate = r / 100;
    let futureAmount = [p]
    for (let i = 1; i <= t; i++) {
        let result = p * (Math.pow(1 + rate / n, n * i)) + pmt * ((Math.pow(1 + rate / n, n * i) - 1) / (rate / n));
        futureAmount.push(Math.floor(result))
    }

    return { years, originalAmount, futureAmount }

}

module.exports = mongoose.model('CompoundEffect', compoundEffectSchema)