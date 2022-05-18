const TicketCollection = Backbone.Collection.extend({
  url: '../../db/tickets.json',
  model: TicketModel,
  sortKey: ['price'],

  comparator(a, b) {
    if (this.sortKey.length === 1) {
      a = a.get(this.sortKey[0]);
      b = b.get(this.sortKey[0]);
      return a > b ? 1 : a < b ? -1 : 0
    } else {
      const diff1 = a.get(this.sortKey[0]) - b.get(this.sortKey[0]);
      const diff2 = a.get(this.sortKey[1]) - b.get(this.sortKey[1]);

      if (diff1 > 0) {
        return 1;
      } else if (diff1 < 0) {
        return -1;
      } else {
        if (diff2 > 0) {
          return 1;
        } else if (diff2 < 0) {
          return -1;
        } else {
          return 0;
        }
      }
    }
  }
})
