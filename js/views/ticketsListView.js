const TicketsListView = Backbone.View.extend({
  el: document.querySelector('.tickets-list-container'),
  template: Handlebars.compile(document.querySelector('#ticket-template').innerHTML),

  preinitialize() {
    this.on('rerender', this.render, this);
  },

  render() {
    const ticketList = App.filteredData.toJSON();

    this.el.innerHTML = this.template({
      tickets: ticketList
    });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    return this;
  }
})