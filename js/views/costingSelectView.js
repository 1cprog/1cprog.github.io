const CostingSelectView = Backbone.View.extend({
  el: $('.tickets-filter'),
  template: Handlebars.compile(document.querySelector('#ticket-sort').innerHTML),

  initialize() {
    this.render();
    App.models.ticketsFiltersModel.set('sortBy', $('.ticket-option').eq(0));
    App.models.ticketsFiltersModel.ticketsFilter = true;
    this.changeCurrentFilter($('.ticket-option').eq(0));
  },

  events: {
    'click .ticket-option': 'sortTicketsList',
  },

  render() {
    this.el.innerHTML = this.template({
      elem: [
        {
          key: 'cheapest',
          value: 'Самый дешёвый'
        },
        {
          key: 'fastest',
          value: 'Самый быстрый'
        },
        {
          key: 'optimal',
          value: 'Оптимальный'
        }
      ]
    });
    return this;
  },

  changeCurrentFilter(el) {
    $('.ticket-option').removeClass('selected');
    $(el).addClass('selected');
    const sortAttr = $(el).attr('data-sort');
    switch (sortAttr) {
      case 'cheapest':
        this.sortBy = CostOrder.CHEAPEST;
        break;
      case 'fastest':
        this.sortBy = CostOrder.FASTEST;
        break;
      case 'optimal':
        this.sortBy = CostOrder.OPTIMAL;
        break;
    }
    App.filteredData.sortKey = this.sortBy;
    App.filteredData.sort();
    App.filteredData.trigger('change');
    App.views.ticketsListView.render();
  },

  sortTicketsList(event) {
    App.models.ticketsFiltersModel.set('sortBy', event.target);
    App.models.ticketsFiltersModel.trigger('change');
  }
})