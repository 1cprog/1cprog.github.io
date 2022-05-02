app.views.ticketsList = Backbone.View.extend({
  el: document.querySelector('.tickets-list-container'),
  initialize() {

    this.render()
  },
  render() {
    this.collection = new app.collections.TicketCollection();
    const self = this;

    this.collection.fetch({
      url: this.collection.url,
      type: 'GET',
      contentType: 'application/json',
      success() {
        console.log('success', self.collection);
      },
      error(err) {
        console.error('Something went wrong:', err);
      }
    })
    const ticketList = app.tickets.toJSON();

    const template = Handlebars.compile(document.querySelector('#ticket-template').innerHTML);
    this.el.innerHTML = template({tickets: ticketList});
    return this;
  }
})