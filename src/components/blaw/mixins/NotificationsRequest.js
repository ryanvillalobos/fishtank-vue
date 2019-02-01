const axios = require('axios')

/**
 * @mixin
 */
module.exports = {
  props: {
    /**
     * Autoload the data for this component on mount
     */
    autoload: { type: Boolean }
  },
  data () {
    return {
      listItems: [],
      error: null,
      spinning: false
    }
  },
  computed: {
    /**
     * A data structure containing all items, grouped by date
     */
    dateSortedItems () {
      var dateItems = {}
      var lastDate = null
      this.listItems.forEach(item => {
        if (item.dateStr === lastDate) {
          dateItems[lastDate].push(item)
        } else {
          lastDate = item.dateStr
          dateItems[lastDate] = [item]
        }
      })
      return dateItems
    }
  },
  mounted () {
    if (this.autoload) this.open()
  },
  methods: {
    /**
     * Resets the items list, error and spinning state, and makes the ajax request.
     * @public
     * @returns {Promise}
     */
    open () {
      this.listItems = []
      this.error = null
      this.spinning = true
      return axios.get(this.ajaxUrl).then(this.handleSuccess, this.handleFailure)
    },
    /**
     * Called when ajax request succeeds.
     * Sets the list items, or an error if the items list is empty.
     */
    handleSuccess (response) {
      if (response.data.length === 0) {
        this.error = 'No Items'
      } else {
        this.listItems = response.data
      }
      this.spinning = false
    },
    /**
     * Called when ajax request fails.
     * Sets the error.
     */
    handleFailure () {
      this.error = 'Error!'
      this.spinning = false
    }
  }
}
