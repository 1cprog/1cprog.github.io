app.collections.TicketCollection = Backbone.Collection.extend({
  url: '../../db/tickets.json',
  model: app.models.Ticket,
  initialize() {
    for (const ticket of ticketsExampleList) {
      const ticketData = new app.models.Ticket(ticket);
      this.add(ticketData);
    }
  }
})