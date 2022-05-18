const StopsFilterView = Backbone.View.extend({
  el: $('.stops-checkbox-wrapper'),
  maxStops: -1,
  events: {
    'change input[type="checkbox"]': 'filterStops'
  },

  filterStops(event) {
    const target = event.target;
    const checkedElements = this.$el.find('input:checked');
    if (checkedElements.length) {
      for (let el of checkedElements) {
        switch (el.id) {
          case 'non-stop':
            this.maxStops = 0;
            break;
          case 'one-stop':
            this.maxStops = 1;
            break;
          case 'two-stops':
            this.maxStops = 2;
            break;
          case 'three-stops':
            this.maxStops = 3;
            break;
        }
      }
    } else {
      this.maxStops = -1
    }

    App.models.ticketsFiltersModel.stopsFilter = this.maxStops >= 0;
    App.models.ticketsFiltersModel.set('stops', this.maxStops);
  },

  filterTickets(stops) {
    const stopsFilter = App.filteredData.filter(el => {
      if (el.get('stopsTotal') <= stops) {
        return true;
      }
    });
    App.filteredData.set(stopsFilter);
  }
})