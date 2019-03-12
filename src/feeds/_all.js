export default class Aggr {
  constructor(feeds) {
    this.feeds = feeds
  }

  aggrAll() {
    return Promise.all(this.feeds).then(result => {
      const agr = [].concat(...result)
      // sort newest to oldest
      const json = agr.sort((a, b) => b.date.toString().localeCompare(a.date))

      // this.writeCache(json)
      return json
    })
  }
}
