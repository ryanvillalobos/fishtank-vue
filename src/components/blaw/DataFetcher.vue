<script>
import axios from 'axios'

/** Event fired on request error
 * @event error
 * @type {Event}
 */

/** Triggered when request succeeds and pass server response
 * @event success
 * @type {Event}
 */

export default {
  name: 'DataFetcher',
  data () {
    return {
      cache: {},
      fetchedData: { data: {} },
      lastRequest: '',
      loading: false
    }
  },
  props: {
    /**
     * Enable request caching
     */
    enableCache: Boolean,

    /**
     * Url to request data from, will make new request when changed
     */
    url: String
  },
  watch: {
    url (newValue) {
      this.lastRequest = newValue
      if (!this.loading) this._request(newValue)
    }
  },
  methods: {
    _request (url) {
      if (this.cache[url]) {
        this.fetchedData = this.cache[url]
        this.loading = false
        return
      }

      this.loading = true
      axios
        .get(url)
        .then(res => {
          this.fetchedData = res.data
          if (this.enableCache) this.cache[url] = res.data

          this._successCallback(res)
        })
        .catch(res => this.$emit('error', res))
        .finally(() => { this.lastRequest !== url ? this._request(this.lastRequest) : this.loading = false })
    },
    _successCallback (res) {
      this.$emit('success', res)
    }
  },
  render () {
    return this.$scopedSlots.default({
      loading: this.loading,
      fetchedData: this.fetchedData
    })
  },
  created () {
    if (this.url) {
      this.lastRequest = this.url
      this._request(this.url)
    }
  }
}
</script>
