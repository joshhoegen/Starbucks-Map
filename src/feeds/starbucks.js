import GetFeed from '../utils/service'

const flickrFeed = new GetFeed(
  'US Starbucks',
  'https://opendata.socrata.com/resource/e3xz-8cw7.json',
)
  .getFeed()
  .catch(e => {
    console.log(e)
    return []
  })

export default flickrFeed
