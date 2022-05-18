const SegmentsCollection = Backbone.Collection.extend({
  url: '../../db/segments.json',
  model: SegmentModel
})
