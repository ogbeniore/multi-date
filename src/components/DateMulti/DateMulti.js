import moment from 'moment'
import ClickOutside from 'vue-click-outside'
export default {
  name: 'KDateMulti',
  data: () => ({
    month: '',
    day: '',
    year: '',
    isValid: false,
    invalid: false,
    focus: false,
    count: 0
  }),
  props: {
    value: {
      type: null,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    touched: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    futureDateError: {
      type: String,
      default: 'Please check if you were born in the future.'
    },
    oldDateError: {
      type: String,
      default: 'Please check the date of birth.'
    },
    inValidDateError: {
      type: String,
      default: 'Please enter a valid date'
    }
  },
  watch: {
    month(val) { 
      if (val.length >= 2 || Number(val) >= 12) {
        this.$refs.day.focus()
      }
    },
    day(val) {
      const { month } = this
      if (month && month.length < 2) {
        this.month = (month).toString().padStart(2, '0')
      }
      if(val) {
        if (val.length === 2 || Number(val) >= 31) {
          this.$refs.year.focus()
        }
      }
    },
    year() {
      const { day } = this
      if (day && day.length < 2) {
        this.day = (day).toString().padStart(2, '0')
      }
    },
    isComplete(val) {
      if(val) {
        this.isValid = true
        this.count = 0
      }
    },
    innerValue(val) {
      if(val && this.dateValid) {
        this.$emit("input", val);
        this.$emit("change", val);
      } else {
        this.$emit("input", '');
        this.$emit("change", '');
      }
    },
    focus(val) {
      const { month, day, year } = this
      if(val && !month && !day && !year) {
        this.$refs.month.focus()
      }
    },
    value(val) {
      if (val) {
        const dateArray = val.split('/')
        this.month = dateArray[0]
        this.day = dateArray[1]
        this.year = dateArray[2]
      }
    },
    hasError:{
      handler(val) {
        this.$emit('hasError', val)
      },
      immediate: true
    }
  },
  created() {
    if (this.value) {
      const dateArray = this.value.split('/')
      this.month = dateArray[0]
      this.day = dateArray[1]
      this.year = dateArray[2]
    }
  },
  methods: {
    mask(event, next) {
      const value = event.target.value;
      if(!value && this.count) {
        this.$refs[next].focus()
        this.count = 0
      } else if (!value){
        this.count = 1
      }
    },
    yearMask(event) {
      if(event.keyCode === 32 || (this.year && this.year.length >= 4)) {
        event.preventDefault();
      }
    },
    monthMask(event) {
      if (event.keyCode === 32 || this.month && this.month.length >= 2) {
        event.preventDefault()
      }
    },
    dayMask(event) {
      if (event.keyCode === 32 || this.day && this.day.length >= 2) {
        event.preventDefault()
      }
    },
    focusInput() {
      if(this.focus === false) {
        this.focus = true
        setTimeout(() => {
          this.$refs.month.focus()
        }, 300);
      }
    },
    handleClickOutside() {
      this.focus = false
    }
  },
  directives: {
    ClickOutside
  },
  computed: {
    isComplete() {
      const { month, day, year } = this
      return !!(day && year && month)
    },
    isDirty() {
      const { month, day, year, focus } = this
      return !!(day || month || year) || focus
    },
    dateValid() {
      return this.fullDate.isValid()
    },
    fullDate() {
      const { month, day, year } = this
      return moment(`${month}-${day}-${year}`, 'MM-DD-YYYY', true)
    },
    isFuture() {
      const { fullDate, dateValid } = this,
        fromNow = moment(fullDate).fromNow()
      return dateValid ? fromNow.includes('in') : false
    },
    isTooOld() {
      const { fullDate } = this,
        difference = moment().diff(moment(fullDate), 'years')
      return difference > 100
    },
    hasError() {
      const { dateValid, touched, isComplete, isFuture, isTooOld } = this
      return (!dateValid && touched) || (!dateValid && isComplete) || isFuture || isTooOld
    },
    innerValue: {
      get() {
        return moment(this.fullDate).format('MM/DD/YYYY');
      },
      set(data) {
        if (data) {
          this.$emit("change", data);
        } else {
          this.$emit("change", '');
        }
      }
    },
  }
}