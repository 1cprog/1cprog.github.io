app.views.costingSelectView = Backbone.View.extend({
  el: $('.tickets-filter'),
  initialize() {
    this.render();
    this.changeCurrentFilter($('.ticket-option').eq(0));
  },

  events: {
    'click .ticket-option': 'sortTicketsList',
  },

  render() {
    const template = Handlebars.compile(document.querySelector('#ticket-sort').innerHTML);
    this.el.innerHTML = template({elem: [
      {
        key: 'cheapest-ticket',
        value: 'Самый дешёвый'
      },
        {
          key: 'fastest-ticket',
          value: 'Самый быстрый'
        },
        {
          key: 'optimal-ticket',
          value: 'Оптимальный'
        }
      ]
    });
    return this;
  },

  changeCurrentFilter(el) {
    $('.ticket-option').removeClass('selected');
    $(el).addClass('selected');
  },

  sortTicketsList(event) {
    this.changeCurrentFilter(event.target);
    console.log(event.target);
  }
})